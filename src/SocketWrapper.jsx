/* eslint-disable react/prop-types */
import { API_URL } from "helpers/api_helper"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"
import { getChatStore } from "store"
import {
  addChat,
  addMessage,
  deleteMessage,
  editMessage,
  updateChat,
  updateChatLastMessage,
} from "store/actions"

const SocketWrapper = ({ children }) => {
  const socket = useRef(null)

  const dispatch = useDispatch()
  const {
    chatList: myChatsList,
    selectedChat,
    selectedChatMessages,
  } = useSelector(getChatStore())

  const authUser = localStorage.getItem("authUser")

  const user = JSON.parse(authUser)
  const token = user && user.user?.token
  const userId = user?._id

  useEffect(() => {
    if (token) {
      socket.current = io(API_URL, {
        transports: ["polling"],
        auth: { token },
      })

      return () => {
        socket.current.disconnect()
      }
    }
  }, [token])

  useEffect(() => {
    socket.current?.on("chats:created", onChatCreated)
    socket.current?.on("chats:update", onChatUpdated)

    return () => {
      socket.current?.off("chats:created", onChatCreated)
      socket.current?.off("chats:update", onChatUpdated)
    }
  }, [myChatsList?.length])

  useEffect(() => {
    socket.current?.on("message:created", onMessageCreated)
    socket.current?.on("message:deleted", onMessageDeleted)
    socket.current?.on("message:updated", onMessageUpdated)
    return () => {
      socket.current?.off("message:created", onMessageCreated)
      socket.current?.off("message:deleted", onMessageDeleted)
      socket.current?.off("message:updated", onMessageUpdated)
    }
  }, [selectedChat, myChatsList.length])

  // chat >>>>>>>>>>>>

  const onChatCreated = chat => {
    const isMember = chat?.users?.find(item => item === userId)
    if (isMember) {
      dispatch(addChat({ id: chat._id, ...chat }))
    }
  }

  const onChatUpdated = chat => {
    const isMember = chat?.users?.find(item => item._id === userId)
    if (isMember) {
      dispatch(updateChat(chat))
    }
  }

  // message >>>>>>>>>>>>

  const onMessageCreated = message => {
    const isMyMessage = message.user?._id === userId
    const messageChat = isMyMessage
      ? true
      : myChatsList.find(chat => {
          return chat.id === message.chatId
        })
    if (messageChat) {
      if (!isMyMessage && messageChat?.id === selectedChat?.id) {
        if (message.parentId) {
          message.repliedMessage = (selectedChatMessages || []).find(
            item => item._id === message.parenId
          )
        }
        dispatch(addMessage(message))
      }
      dispatch(
        updateChatLastMessage({
          id: message.chatId,
          lastMessage: { ...message, id: message._id },
        })
      )
    }
  }

  const onMessageUpdated = message => {
    if (message.user?._id === userId) return

    const messageChat = myChatsList.find(chat => chat.id === message.chatId)
    if (messageChat) {
      if (messageChat.id === selectedChat.id) {
        dispatch(editMessage({ ...message, id: message._id }))
      }
    }
  }

  const onMessageDeleted = message => {
    if (message.user === userId) return
    const messageChat = myChatsList.find(chat => chat.id === message.chatId)
    if (messageChat) {
      if (messageChat.id === selectedChat?.id) {
        dispatch(deleteMessage(message._id))
      }
    }
  }

  return <>{children}</>
}

export default SocketWrapper
