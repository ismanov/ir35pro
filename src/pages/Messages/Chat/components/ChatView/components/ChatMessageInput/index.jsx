import {
  AttachmentIcon,
  CancelEditingMessageIcon,
  CheckEditedIcon,
  CloseButtonIcon,
  FileIcon,
  SendPlaneIcon,
} from "assets/svg-icons/chat-icons"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChatStore } from "store"
import {
  addMessage,
  createMessage,
  editMessage,
  setEditingMessage,
  setReplyingMessage,
  updateMessage,
} from "store/actions"
import FileView from "./components/FileView"
import "./styles.scss"

const ChatMessageInput = () => {
  const textareaRef = React.useRef(null)
  const dispatch = useDispatch()
  const selectedChat = useSelector(getChatStore("selectedChat"))
  const editingMessage = useSelector(getChatStore("editingMessage"))
  const replyingMessage = useSelector(getChatStore("replyingMessage"))
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])

  const bottomElement = document.getElementById("scroll-to-bottom")

  const onChangeTextHandler = e => {
    setText(e.target.value)
  }

  React.useLayoutEffect(() => {
    if (textareaRef.current.scrollHeight < 90) {
      textareaRef.current.style.height = "inherit"
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        16
      )}px`
    }
  }, [text])

  useEffect(() => {
    if (editingMessage?.text) {
      setText(editingMessage.text)
    }
    if (editingMessage?.file) {
      setFiles([editingMessage.file])
    }
  }, [editingMessage])

  const onChangeFileHandler = e => {
    if (e.target.files[0].size > 5242880) {
      return
    }
    setFiles(prev => [...prev, ...e.target.files])
  }

  const onCancelFileHandler = index => {
    setFiles(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  const onSubmit = () => {
    if (files.length || text) {
      let body = {
        text,
        chatId: selectedChat.id,
      }
      if (files.length) {
        body.file = files[0]
      }

      if (replyingMessage) body.repliedMessage = replyingMessage
      dispatch(createMessage(body))
      setFiles([])
      setText("")

      setTimeout(() => {
        bottomElement?.scrollIntoView({ behavior: "smooth" })
      }, 200)
    }
    dispatch(setReplyingMessage(null))
  }

  const onSendEditMessage = () => {
    if (files.length || text) {
      let body = {
        text,
        message: editingMessage,
      }
      if (files.length) {
        body.file = files[0]
      }

      dispatch(updateMessage(body))
      setFiles([])
      setText("")
      dispatch(setEditingMessage(null))
      dispatch(setReplyingMessage(null))
    }
  }

  const onClickButtonHandler = () => {
    editingMessage ? onSendEditMessage() : onSubmit()
  }

  return (
    <div className="message-input-container">
      <div className="pointer message-input-upload">
        <label htmlFor="file-input">
          <AttachmentIcon />
        </label>

        <input id="file-input" type="file" onChange={onChangeFileHandler} />
      </div>
      <div className="bottom-center-content">
        {editingMessage && (
          <div
            className="editing-message space-between mB12 pointer "
            onClick={() => {
              const element = document.getElementById(
                `message-id-${editingMessage.id}`
              )
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
                element.style.background = "rgba(0,0,0,0.1)"
                setTimeout(() => {
                  element.style.background = "transparent"
                }, 1500)
              }
            }}
          >
            <span className="s12 cBlue">Edit message</span>
            <span
              className="cancel-btn"
              onClick={() => dispatch(setEditingMessage(null))}
            >
              <CancelEditingMessageIcon />
            </span>
          </div>
        )}
        {replyingMessage && !editingMessage && (
          <div
            className="editing-message space-between pointer mB12"
            onClick={() => {
              document
                .getElementById(`message-id-${replyingMessage.id}`)
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="s12 w400 cBlue">
              Replying to{" "}
              <span className="w500">{`${replyingMessage.user?.first_name} ${replyingMessage.user?.last_name}`}</span>
            </span>
            <span
              className="cancel-btn"
              onClick={() => dispatch(setReplyingMessage(null))}
            >
              <CancelEditingMessageIcon />
            </span>
          </div>
        )}
        <div className="files-view-content">
          {files.map((file, index) => {
            return (
              <FileView
                file={file}
                key={index}
                href={`C:\\fakepath\\3i...pdf`}
                onCancel={() => onCancelFileHandler(index)}
              />
            )
          })}
        </div>
        <textarea
          className="chat-message-textarea"
          placeholder="Write a message..."
          value={text}
          rows={1}
          ref={textareaRef}
          onChange={onChangeTextHandler}
          onKeyDown={event => {
            if (event.key === "Enter" && event.ctrlKey) {
              event.preventDefault()
              onClickButtonHandler()
            }
          }}
        />
      </div>
      <div className="mH15 pointer" onClick={onClickButtonHandler}>
        {editingMessage ? (
          <CheckEditedIcon disabled={!text.trim() && !files.length} />
        ) : (
          <SendPlaneIcon disabled={!text.trim() && !files.length} />
        )}
      </div>
    </div>
  )
}

export default ChatMessageInput
