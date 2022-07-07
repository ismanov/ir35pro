/* eslint-disable react/prop-types */
import {
  ChatLinkIcon,
  DeclineIcon,
  LinkIcon,
  UserLineIcon,
} from "assets/svg-icons/my-tasks-icons"
import React from "react"
import { useHistory } from "react-router-dom"

const Tooltip = ({ classes, onDecline, onClose, chatId, contractorId }) => {
  const history = useHistory()

  const onClickContractorsChat = () => {
    onClose && onClose()
    history.push(`/i/chat/${chatId || ""}`)
  }

  const onClickContractorsOverview = () => {
    onClose && onClose()
    history.push(`/contractors-overview/${contractorId || ""}`)
  }

  const onClickCopyButton = () => {
    navigator.clipboard.writeText(location.href).then(
      () => {
        console.log("Async: Copying to clipboard was successful!")
      },
      err => {
        console.error("Async: Could not copy text: ", err)
      }
    )
  }

  return (
    <div
      className={`tooltip-container s14 w400 cBlackL text-nowrap ${
        classes || ""
      }`}
    >
      <div className="tooltip-action" onClick={onClickCopyButton}>
        <LinkIcon />
        <span className="mL8">Copy Task Link</span>
      </div>
      <div className="tooltip-action" onMouseDown={onClickContractorsChat}>
        <ChatLinkIcon />
        <span className="mL8">Contractor’s Chat</span>
      </div>
      <div className="tooltip-action" onClick={onClickContractorsOverview}>
        <UserLineIcon />
        <span className="mL8">Contractor’s Overview</span>
      </div>
      <div className="tooltip-action" onClick={onDecline}>
        <DeclineIcon />
        <span className="mL8 cRed">Decline Task</span>
      </div>
    </div>
  )
}

export default Tooltip
