import {
  ADD_CHAT,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  SETTER,
  SET_CHAT_LIST,
  SET_EDITING_MESSAGE,
  SET_MESSAGES,
  SET_REPLYING_MESSAGE,
  SET_SELECTED_CHAT,
  UPDATE_CHAT_LAST_MESSAGE,
} from "./actionTypes"

const INIT_STATE = {
  chatList: [],
  selectedChat: null,
  replyingMessage: null,
  editingMessage: null,
  selectedChatMessages: [],
  loading: {},
  error: {},
  success: {},
}

const chat = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.payload.filter(item => item.status === "active"),
      }

    case UPDATE_CHAT_LAST_MESSAGE: {
      let newList = [...state.chatList]
      for (let index = 0; index < state.chatList.length; index++) {
        if (newList[index].id === action.payload.id) {
          newList[index].lastMessage = action.payload.lastMessage
          break
        }
      }
      return {
        ...state,
        chatList: newList,
      }
    }
    case ADD_CHAT:
      if (action.payload?.status === "archived") return { ...state }
      return {
        ...state,
        chatList: [action.payload, ...state.chatList],
      }
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      }
    case SET_REPLYING_MESSAGE:
      return {
        ...state,
        replyingMessage: action.payload,
      }
    case SET_MESSAGES:
      return {
        ...state,
        selectedChatMessages: action.payload,
      }
    case SET_EDITING_MESSAGE:
      return {
        ...state,
        editingMessage: action.payload,
      }
    case ADD_MESSAGE:
      return {
        ...state,
        selectedChatMessages: [
          {
            ...action.payload,
          },
          ...state.selectedChatMessages,
        ],
      }
    case DELETE_MESSAGE: {
      let arr = []
      for (let i = 0; i < state.selectedChatMessages.length; i++) {
        if (action.payload === state.selectedChatMessages[i].id) {
          arr = [...arr, ...state.selectedChatMessages.slice(i + 1)]
          break
        } else {
          arr.push(state.selectedChatMessages[i])
        }
      }
      return {
        ...state,
        selectedChatMessages: arr,
      }
    }
    case EDIT_MESSAGE: {
      let arr = []
      for (let i = 0; i < state.selectedChatMessages.length; i++) {
        if (action.payload.id === state.selectedChatMessages[i].id) {
          arr = [
            ...arr,
            {
              ...action.payload,
              id: action.payload[
                state.selectedChatMessages[i].status === "PENDING"
                  ? "_id"
                  : "id"
              ],
            },
            ...state.selectedChatMessages.slice(i + 1),
          ]
          break
        } else {
          arr.push(state.selectedChatMessages[i])
        }
      }

      return {
        ...state,
        selectedChatMessages: arr,
      }
    }
    case SETTER:
      return action.payload(state)
    default:
      return { ...state }
  }
}

export default chat
