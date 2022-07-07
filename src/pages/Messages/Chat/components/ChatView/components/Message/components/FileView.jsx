/* eslint-disable react/prop-types */
import React from "react"
import { CloseButtonIcon, FileIcon } from "assets/svg-icons/chat-icons"
import ReactLoading from "react-loading"
import "../styles.scss"
import { parseByte, reduceText } from "helpers/common_utils"

const FileView = props => {
  const { file, pending } = props
  return (
    <a
      href={file.doc_path}
      onClick={e => {
        pending && e.preventDefault()
      }}
      className="file-view-box"
      target="_blank"
      rel="noreferrer"
    >
      <div className="file-icon">
        {pending ? (
          <ReactLoading
            type="spin"
            color="#fff"
            height={"100%"}
            width={"100%"}
          />
        ) : (
          <FileIcon />
        )}
      </div>
      <div className="file-info">
        <span className="s14 w500 cBlackL text-nowrap">
          {reduceText(file.doc_title, 29, 7)}
        </span>
        <span className="s12 w400 cBlackLOpc mR36 pR36">
          {parseByte(file.size)}&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </a>
  )
}

export default FileView
