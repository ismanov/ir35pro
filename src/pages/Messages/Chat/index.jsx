/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { useNotification } from "helpers/hooks"
import { Route } from "react-router-dom"
import ChatList from "./components/ChatList"
import ChatView from "./components/ChatView"

import "./styles.scss"
import { useDispatch, useSelector } from "react-redux"
import { getChatStore } from "store"
import { setChatSuccessAC } from "store/actions"

const Chat = props => {
  const dispatch = useDispatch()
  const setNotification = useNotification()
  const { success } = useSelector(getChatStore())

  useEffect(() => {
    if (success.deletedMessage) {
      setNotification("Message deleted")
      dispatch(setChatSuccessAC({ deletedMessage: false }))
    }
    if (success.addMember) {
      setNotification.setSuccess("Member added")
      dispatch(setChatSuccessAC({ addMember: false }))
    }
  }, [success])

  const { match } = props
  return (
    <div className="chat-screen-body">
      <div className="chat-list">
        <ChatList match={match} />
      </div>
      <div className="chat-view">
        <Route path={`${match?.path}/:chatId`} component={ChatView} />
      </div>
    </div>
  )
}

export default Chat
