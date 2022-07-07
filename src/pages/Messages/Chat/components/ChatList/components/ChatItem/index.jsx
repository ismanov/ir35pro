/* eslint-disable react/prop-types */
import { getShortName, reduceText } from "helpers/common_utils"
import moment from "moment"
import React from "react"
import { useLocation } from "react-router-dom"

const ChatItem = props => {
  const { chat } = props
  const { pathname } = useLocation()
  reduceText
  return (
    <div
      className={`chat-container pointer ${
        pathname.includes(chat.id) ? "active-chat" : ""
      }`}
      {...props}
    >
      <div className="chat-avatar">
        <span>{getShortName(chat.name)}</span>
      </div>
      <div className="flex-column  mL12 fg1 hidden">
        <div className="space-between mB4">
          <span className="chat-name">{chat.name}</span>
          <span className="chat-date">
            {moment(chat.lastMessage?.createdAt).format("dddd").slice(0, 3)}
          </span>
        </div>
        <div className="space-between">
          <span className="chat-last-message hidden">
            {chat.lastMessage?.text ||
              (chat.lastMessage?.upload &&
                `📎 ${reduceText(chat.lastMessage.upload.doc_title, 25, 7)}`)}
            &nbsp;
          </span>
          {false && (
            <div className="unread-message fsh0 mL8">
              <span>1</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChatItem)
