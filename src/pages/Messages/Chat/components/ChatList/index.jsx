/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react"
import ReactLoading from "react-loading"
import { SearchIcon } from "assets/svg-icons/chat-icons"

import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchChats,
  fetchMessagesById,
  setMessages,
  setSelectedChat,
} from "store/actions"
import ChatItem from "./components/ChatItem"
import { NavLink, useHistory } from "react-router-dom"
import moment from "moment"
import { getChatStore } from "store"

const ChatList = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { selectedChat, chatList, loading } = useSelector(getChatStore())

  const chatListMemo = useMemo(
    () =>
      chatList.sort((a, b) => {
        if (a.lastMessage?.updatedAt && b.lastMessage?.updatedAt) {
          return moment(a.lastMessage.updatedAt).isSameOrBefore(
            b.lastMessage.updatedAt
          )
            ? 1
            : -1
        }
        if (a.lastMessage?.updatedAt) return -1

        return 1
      }),
    [chatList]
  )

  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchChats())
  }, [])

  useEffect(() => {
    if (!selectedChat && chatListMemo && chatListMemo.length) {
      history.push(`${match?.path}/${chatListMemo[0].id}`)
    } else if (selectedChat) {
      history.push(`${match?.path}/${selectedChat.id}`)
    }
  }, [chatListMemo])

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessagesById({ chatId: selectedChat.id }))
    }
  }, [selectedChat])

  const onChangeSearchHandler = e => {
    setSearch(e.target.value)
  }

  const filterChatList = item => {
    const byName = (item.name || "")
      .toUpperCase()
      .includes(search.toUpperCase())
    const byContractorId = (item.contractorId || "")
      .toUpperCase()
      .includes(search.toUpperCase())

    return byName || byContractorId
  }

  return (
    <div className="chat-list-container">
      <div className="search-container">
        <SearchIcon />
        <input
          type="text"
          className="mL16"
          placeholder="Search"
          value={search}
          onChange={onChangeSearchHandler}
        />
      </div>
      <div className="chats-list">
        {loading.fetchChats && (
          <div className="flex jc-center">
            <ReactLoading type="bubbles" color="#C4C4C4" />
          </div>
        )}
        {chatListMemo.filter(filterChatList).map(chat => (
          <NavLink
            key={`${chat.id}${chat.lastMessage?.id || ""}`}
            to={`${match?.path}/${chat.id}`}
          >
            <ChatItem chat={chat} />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default ChatList
