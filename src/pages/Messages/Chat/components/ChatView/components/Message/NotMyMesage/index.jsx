/* eslint-disable react/prop-types */
import { MessageOptionIcon } from "assets/svg-icons/chat-icons"
import { getShortName } from "helpers/common_utils"
import moment from "moment"
import React from "react"
import FileView from "../components/FileView"
import Tooltip from "../components/Tooltip"

const NotMyMessage = props => {
  const message = props.message || {}
  const isPending = message.status === "PENDING"
  let isUpdatedMessage = message.updatedAt !== message.createdAt

  return (
    <div className="message-container" id={`message-id-${message.id}`}>
      <div className="avatar">
        <span className="s16 cBlue">
          {getShortName(
            `${message.user?.first_name} ${message.user?.last_name}`
          )}
        </span>
      </div>
      <div className="vector">
        <div />
      </div>
      <div className="message-body">
        <span className="cBlue s14 mB4">{`${message.user?.first_name} ${message.user?.last_name}`}</span>

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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {isUpdatedMessage && (
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            )}
          </span>
        )}

        <span className="message-date cBlackLOpc w400 s12">
          {isUpdatedMessage && "Edited "}
          {moment(message.updatedAt).format("hh:mm A")}
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
            classes={`l24 ${props.index === 0 ? "b-10" : "t0"}`}
            message={message}
          />
        </div>
      </div>
    </div>
  )
}

export default NotMyMessage
