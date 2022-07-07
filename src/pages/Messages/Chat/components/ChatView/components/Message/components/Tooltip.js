/* eslint-disable react/prop-types */
import React from "react"
import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  ReplyIcon,
} from "assets/svg-icons/chat-icons"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteMessage,
  deleteMessageById,
  setEditingMessage,
  setReplyingMessage,
} from "store/actions"
import { getChatStore } from "store"

const Tooltip = ({ classes, message, isMyMessage, timeExpired }) => {
  const dispatch = useDispatch()
  const editingMessage = useSelector(getChatStore("editingMessage"))

  const onClickReplyButton = () => {
    dispatch(setReplyingMessage(message))
  }

  const onClickEditButton = () => {
    dispatch(setEditingMessage(message))
  }

  const onClickCopyButton = () => {
    navigator.clipboard.writeText(message.text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!")
      },
      err => {
        console.error("Async: Could not copy text: ", err)
      }
    )
  }

  const onClickDeleteButton = () => {
    if (editingMessage?.id === message.id) {
      dispatch(setEditingMessage(null))
    }
    dispatch(deleteMessageById(message.id))
  }

  return (
    <div className={`message-option-tooltip ${classes || ""}`}>
      <div
        className="tooltip-button flex ai-center "
        onMouseDown={onClickReplyButton}
      >
        <ReplyIcon />
        <span className="mR12 s14 w400 cBlackL">Reply</span>
      </div>
      {isMyMessage && !timeExpired && (
        <div className="tooltip-button" onMouseDown={onClickEditButton}>
          <EditIcon />
          <span className="mR12 s14 w400 cBlackL">Edit</span>
        </div>
      )}
      <div className="tooltip-button" onMouseDown={onClickCopyButton}>
        <CopyIcon />
        <span className="mR12 s14 w400 cBlackL">Copy Text</span>
      </div>
      {isMyMessage && !timeExpired && (
        <div className="tooltip-button" onMouseDown={onClickDeleteButton}>
          <DeleteIcon />
          <span className="mR12 s14 w400 cBlackL">Delete</span>
        </div>
      )}
    </div>
  )
}

export default Tooltip
