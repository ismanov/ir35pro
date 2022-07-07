import {
  ADD_CHAT,
  ADD_MEMBER,
  ADD_MESSAGE,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_BY_ID,
  EDIT_MESSAGE,
  FETCH_CHATS,
  FETCH_MESSAGES_BY_ID,
  GET_CHAT_BY_ID,
  SETTER,
  SET_CHAT_LIST,
  SET_EDITING_MESSAGE,
  SET_MESSAGES,
  SET_REPLYING_MESSAGE,
  SET_SELECTED_CHAT,
  UPDATE_CHAT,
  UPDATE_CHAT_LAST_MESSAGE,
  UPDATE_MESSAGE,
} from "./actionTypes"

export const fetchChats = () => ({ type: FETCH_CHATS })

export const fetchMessagesById = payload => ({
  type: FETCH_MESSAGES_BY_ID,
  payload,
})

export const getChatById = payload => ({
  type: GET_CHAT_BY_ID,
  payload,
})

export const addChat = payload => ({
  type: ADD_CHAT,
  payload,
})

export const updateChat = payload => ({
  type: UPDATE_CHAT,
  payload,
})

export const updateChatLastMessage = payload => ({
  type: UPDATE_CHAT_LAST_MESSAGE,
  payload,
})

export const addMemberAC = payload => ({
  type: ADD_MEMBER,
  payload,
})

export const setChatList = chatList => ({
  type: SET_CHAT_LIST,
  payload: chatList,
})

export const setMessages = messages => ({
  type: SET_MESSAGES,
  payload: messages,
})

export const setSelectedChat = chat => ({
  type: SET_SELECTED_CHAT,
  payload: chat,
})

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
})

export const createMessage = (message, onSuccess) => ({
  type: CREATE_MESSAGE,
  payload: message,
  onSuccess,
})
export const updateMessage = payload => ({
  type: UPDATE_MESSAGE,
  payload,
})

export const deleteMessageById = id => ({
  type: DELETE_MESSAGE_BY_ID,
  payload: id,
})

export const deleteMessage = messageId => ({
  type: DELETE_MESSAGE,
  payload: messageId,
})

export const editMessage = message => ({
  type: EDIT_MESSAGE,
  payload: message,
})

export const setReplyingMessage = message => ({
  type: SET_REPLYING_MESSAGE,
  payload: message,
})

export const setEditingMessage = message => ({
  type: SET_EDITING_MESSAGE,
  payload: message,
})

export const setterAC = cb => ({
  type: SETTER,
  payload: state => ({ ...state, ...cb(state) }),
})

export const setChatLoadingAC = loading => ({
  type: SETTER,
  payload: state => ({ ...state, loading: { ...state.loading, ...loading } }),
})

export const setChatSuccessAC = success => ({
  type: SETTER,
  payload: state => ({ ...state, success: { ...state.success, ...success } }),
})

export const setChatErrorAC = error => ({
  type: SETTER,
  payload: state => ({ ...state, error: { ...state.error, ...error } }),
})
