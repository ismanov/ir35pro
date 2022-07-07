/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { getChatById, setSelectedChat } from "store/actions"
import ChatHeader from "./components/ChatHeader"
import ReactLoading from "react-loading"
import ChatMessageInput from "./components/ChatMessageInput"
import Message from "./components/Message"
import "./styles.scss"
import { getChatStore } from "store"

const ChatView = props => {
  const { match } = props
  const dispatch = useDispatch()
  const { selectedChat, selectedChatMessages, loading } = useSelector(
    getChatStore()
  )
  const chatId = match?.params?.chatId
  if (!chatId) return null

  useEffect(() => {
    chatId && dispatch(getChatById(chatId))

    // return () => {
    //   dispatch(setSelectedChat(null))
    // }
  }, [chatId])

  let messageDate = selectedChatMessages[0]?.createdAt
  let isMyMessage = selectedChatMessages[0]?.isMyMessage

  return (
    <div className="chat-view-container">
      <ChatHeader selectedChat={selectedChat} />
      <div className="chat-view-messages">
        <div id="scroll-to-bottom" />

        {selectedChatMessages.length ? (
          selectedChatMessages.map((message, index) => {
            let split = false
            let currentMessageDate = messageDate
            if (!moment(message.createdAt).isSame(messageDate, "day")) {
              messageDate = message.createdAt
              split = true
            }

            let mTop = false
            if (message.isMyMessage != isMyMessage) {
              isMyMessage = message.isMyMessage
              mTop = true
            }
            return (
              <React.Fragment key={message.id + (message.updatedAt || "")}>
                {mTop && <div className="mT12" />}
                {split && (
                  <div className="separator mT20 mB10">
                    <div className="separator-line" />
                    <span className="s14 w500 cBlackL mH8">
                      {moment(currentMessageDate).format("LL")}
                    </span>
                    <div className="separator-line" />
                  </div>
                )}
                <Message message={message} index={index} />
                {index === selectedChatMessages.length - 1 && (
                  <div className="separator mT20 mB10">
                    <div className="separator-line" />
                    <span className="s14 w500 cBlackL mH8">
                      {moment(messageDate).format("LL")}
                    </span>
                    <div className="separator-line" />
                  </div>
                )}
              </React.Fragment>
            )
          })
        ) : (
          <div className="flex jc-center">
            {loading.fetchMessages ? (
              <ReactLoading type="bubbles" color="#C4C4C4" />
            ) : (
              <span className="s18 w600 cBlackL">No messages here yet</span>
            )}
          </div>
        )}
      </div>

      <div className="chat-message-input" id="chat-message-input-id">
        <ChatMessageInput />
      </div>
    </div>
  )
}

export default ChatView
