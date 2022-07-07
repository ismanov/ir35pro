import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_MEMBER,
  CREATE_MESSAGE,
  DELETE_MESSAGE_BY_ID,
  FETCH_CHATS,
  FETCH_MESSAGES_BY_ID,
  GET_CHAT_BY_ID,
  UPDATE_MESSAGE,
} from "./actionTypes"

import { api } from "api"
import {
  addMessage,
  deleteMessage,
  editMessage,
  setChatList,
  setChatLoadingAC,
  setChatSuccessAC,
  setMessages,
  setSelectedChat,
} from "./actions"
import { generateUid } from "helpers/common_utils"

const user = localStorage.getItem("authUser")
const userEmail = user ? JSON.parse(user).email : ""

function* fetchChats() {
  yield put(setChatLoadingAC({ fetchChats: true }))
  try {
    const response = yield call(api.chat.fetchChats)
    yield put(setChatList(Object.values(response)))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setChatLoadingAC({ fetchChats: false }))
  }
}

function* getChatById({ payload: chatId }) {
  if (!chatId) return
  yield put(setChatLoadingAC({ getChat: true }))
  try {
    const response = yield call(api.chat.getChatById, chatId)
    yield put(setSelectedChat(response))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setChatLoadingAC({ getChat: false }))
  }
}

function* addMember({ payload }) {
  yield put(setChatLoadingAC({ addMember: true }))
  try {
    yield call(api.chat.addMember, payload.id, payload.data)
    yield put(setChatSuccessAC({ addMember: true }))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setChatLoadingAC({ addMember: false }))
  }
}

function* fetchMessagesById({ payload }) {
  if (payload?.chatId) {
    yield put(setMessages([]))
    yield put(setChatLoadingAC({ fetchMessages: true }))
    try {
      const response = yield call(api.chat.fetchMessagesByChatId, payload)
      yield put(
        setMessages(
          Object.values(response).map(message => {
            if (message.parentId) {
              message.repliedMessage = response[message.parentId]
            }
            return {
              ...message,
              isMyMessage: message?.user.email === userEmail,
            }
          })
        )
      )
    } catch (error) {
      console.log(error)
    } finally {
      yield put(setChatLoadingAC({ fetchMessages: false }))
    }
  }
}

function* createMessage({ payload, onSuccess }) {
  try {
    const temporaryUid = generateUid()
    let upload
    yield put(
      addMessage({
        id: temporaryUid,
        status: "PENDING",
        text: payload.text,
        parentId: payload.parentId,
        isMyMessage: true,
        repliedMessage: payload.repliedMessage,
        upload: payload.file
          ? {
              doc_title: payload.file.name,
              doc_path: "",
              size: payload.file.size,
            }
          : null,
      })
    )

    const createMessageBody = {
      text: payload.text,
      chatId: payload.chatId,
    }
    if (payload.repliedMessage)
      createMessageBody.parentId = payload.repliedMessage.id
    if (payload.file) {
      const formData = new FormData()
      formData.append("id", payload.chatId)
      formData.append("file", payload.file)
      formData.append("name", payload.file.name)
      const res = yield call(api.chat.uploadFile, formData)
      if (res?.document?._id) {
        createMessageBody.upload = res.document._id
      }
      upload = res.document
    }
    const response = yield call(api.chat.createMessage, createMessageBody)
    onSuccess && onSuccess()
    yield put(
      editMessage({
        ...response,
        repliedMessage: payload.repliedMessage,
        isMyMessage: true,
        id: temporaryUid,
        upload,
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function* updateMessage({ payload }) {
  try {
    let upload
    yield put(
      editMessage({
        ...payload.message,
        status: "PENDING",
        text: payload.text,
        upload: payload.file
          ? {
              doc_title: payload.file.name,
              doc_path: "",
              size: payload.file.size,
            }
          : null,
      })
    )

    const editMessageBody = {
      text: payload.text,
    }
    if (payload.file) {
      const formData = new FormData()
      formData.append("file", payload.file)
      formData.append("name", payload.file.name)
      const res = yield call(api.chat.uploadFile, formData)
      if (res?.document?._id) {
        editMessageBody.upload = res.document._id
      }
      upload = res.document
    }
    const response = yield call(
      api.chat.updateMessage,
      payload.message.id,
      editMessageBody
    )
    yield put(
      editMessage({ ...response, id: response._id, isMyMessage: true, upload })
    )
  } catch (error) {
    console.log(error)
  }
}

function* deleteMessageById({ payload }) {
  try {
    const response = yield call(api.chat.deleteChatById, payload)
    if (response?.code == 200) {
      yield put(setChatSuccessAC({ deletedMessage: true }))
      yield put(deleteMessage(payload))
    }
  } catch (error) {
    console.log(error)
  }
}

function* chatSaga() {
  yield takeEvery(FETCH_CHATS, fetchChats)
  yield takeEvery(CREATE_MESSAGE, createMessage)
  yield takeEvery(FETCH_MESSAGES_BY_ID, fetchMessagesById)
  yield takeEvery(UPDATE_MESSAGE, updateMessage)
  yield takeEvery(DELETE_MESSAGE_BY_ID, deleteMessageById)
  yield takeEvery(GET_CHAT_BY_ID, getChatById)
  yield takeEvery(ADD_MEMBER, addMember)
}

export default chatSaga
