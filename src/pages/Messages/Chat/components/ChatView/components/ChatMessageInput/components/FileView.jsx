/* eslint-disable react/prop-types */
import React from "react"
import { CloseButtonIcon, FileIcon } from "assets/svg-icons/chat-icons"
import "../styles.scss"
import { parseByte, reduceText } from "helpers/common_utils"

const FileView = props => {
  const { file, onCancel, href } = props
  return (
    <div className="file-view-box">
      <div className="file-icon">
        <FileIcon />
      </div>
      <div className="file-info">
        <span className="s14 w500 cBlackL text-nowrap">
          {reduceText(file.name, 29, 7)}
        </span>
        <span className="s12 w400 cBlackLOpc">{parseByte(file.size)}</span>
      </div>
      <div className="cancel-btn" onClick={onCancel}>
        <CloseButtonIcon />
      </div>
    </div>
  )
}

export default FileView
