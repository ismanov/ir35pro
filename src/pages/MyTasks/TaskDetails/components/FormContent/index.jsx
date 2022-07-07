/* eslint-disable react/prop-types */
import React from "react"
import ReactLoading from "react-loading"

import { CloseButtonIcon } from "assets/svg-icons/chat-icons"
import { getShortName } from "helpers/common_utils"
import CustomButton from "components/Common/CustomButton"
import { CHANGE_STATUS, DECLINE } from "../../TaskDetailComponent"
import "./styles.scss"
import { useState } from "react"

const FormContent = props => {
  const { onCancel, onSend, screen, loading, onClose } = props

  const isDecline = screen === DECLINE
  const isChangeStatus = screen === CHANGE_STATUS

  const [description, setDescription] = useState("")

  return (
    <div className={`form-content-container`}>
      <div className="space-between">
        <span
          className={`s18 w500 ${
            isDecline ? "cRed" : isChangeStatus ? "cOrange2" : "cBlue"
          }`}
        >
          {isDecline
            ? "Decline Task"
            : isChangeStatus
            ? "Change Status"
            : "Ask Question"}
        </span>
        <div className="pointer" onClick={onClose}>
          <CloseButtonIcon fill="#A0A5B2" />
        </div>
      </div>
      {isDecline && (
        <div className="s14 w400 cBlackL mT16">
          {isChangeStatus
            ? "Why you deсide to make changes to this task ?"
            : "Why you deсide to decline this task ?"}
        </div>
      )}
      <div className="text-area">
        <textarea
          placeholder="Write your question..."
          value={description}
          onChange={e => {
            setDescription(e.target.value)
          }}
        />
      </div>

      <div className="flex jc-end mT40">
        <CustomButton
          type={isDecline ? "error" : isChangeStatus ? "warning" : "primary"}
          outline
          onClick={onCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton
          className="mL20"
          type={isDecline ? "error" : isChangeStatus ? "warning" : "primary"}
          disabled={!isDecline && !isChangeStatus && !description}
          onClick={() => {
            !loading && onSend(description)
          }}
        >
          {loading ? (
            <ReactLoading width={27} height={27} type="bars" color="#fff" />
          ) : isDecline ? (
            "Decline and Send to Chat"
          ) : isChangeStatus ? (
            "Change and Send to Chat"
          ) : (
            "Send To Chat"
          )}
        </CustomButton>
      </div>
    </div>
  )
}

export default FormContent
