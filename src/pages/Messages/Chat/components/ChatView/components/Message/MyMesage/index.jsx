/* eslint-disable react/prop-types */
import { MessageOptionIcon, SentIcon } from "assets/svg-icons/chat-icons"
import Tooltip from "../components/Tooltip"
import React from "react"
import FileView from "../components/FileView"
import moment from "moment"
import { isTimeExpired } from "helpers/common_utils"

const MyMessage = props => {
  const message = props.message || {}

  let isUpdatedMessage = message.updatedAt !== message.createdAt

  const isPending = message.status === "PENDING"
  return (
    <div
      className="message-container my-message-container"
      id={`message-id-${message.id}`}
    >
      <div className="message-body my-message-body">
        {message.repliedMessage && (
          <div
            className="replied-message pointer"
            onClick={() => {
              document
                .getElementById(`message-id-${message.repliedMessage.id}`)
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="s12 cBlue">
              {`${message.repliedMessage.user?.first_name} ${message.repliedMessage.user?.last_name}`}
            </span>
            <span className="s12 w400 text-nowrap">
              {message.repliedMessage.text}
            </span>
          </div>
        )}

        {message.upload && (
          <div className="mB2">
            <FileView file={message.upload} pending={isPending} />
          </div>
        )}
        {message.text && (
          <span className="message-text s14 w400 cBlackL">
            {message.text}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isUpdatedMessage && (
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            )}
          </span>
        )}

        <span className="message-date w400 s12">
          <span className="cBlackLOpc">
            {isUpdatedMessage && "Edited "}
            {moment(message.updatedAt).format("hh:mm A")}
          </span>{" "}
          <SentIcon isRead={message.status === "READ"} pending={isPending} />
        </span>
        <div className="option">
          <input type="text" id={message.id} />

          <div
            className="mH4 pointer btn"
            onClick={e => {
              document.getElementById(message.id)?.focus()
            }}
          >
            <MessageOptionIcon />
          </div>
          <Tooltip
            classes={`${props.index < 2 ? "b-18" : "t0"}`}
            message={message}
            isMyMessage
            timeExpired={isTimeExpired(new Date(message.createdAt), 86400000)}
          />
        </div>
      </div>
      <div className="vector my-vector">
        <div />
      </div>
    </div>
  )
}

export default MyMessage
