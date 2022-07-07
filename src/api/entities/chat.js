import { del, get, patch, post, put } from "helpers/api_helper"

// chats >>>
export const fetchChats = params => get("/api/chats", params)

export const createChat = data => post("/api/chats", data)

export const getChatById = (id, data) => get(`/api/chats/${id}`, data)

export const addMember = (id, data) => post(`/api/chats/${id}/add-user`, data)
// <<< end

// messages >>>
export const createMessage = data => post("/api/messages", data)

export const fetchMessagesByChatId = params => get("api/messages", {}, params)

export const updateMessage = (id, data) => patch(`/api/messages/${id}`, data)

export const deleteChatById = id => del(`/api/messages/${id}`)
// <<< end

// upload file >>>
export const uploadFile = data =>
  post("/api/upload-doc", data, { "Content-Type": "multipart/form-data" })
// <<< end
