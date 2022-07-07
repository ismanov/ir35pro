/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { CloseButtonIcon } from "assets/svg-icons/chat-icons"
import { SendIcon } from "assets/svg-icons/my-tasks-icons"
import { validateEmail } from "helpers/common_utils"
import ReactLoading from "react-loading"
import CustomButton from "components/Common/CustomButton"
import "./styles.scss"

const SendForm = props => {
  const { onSend, onCancel, loading } = props

  const [email, setEmail] = useState("")
  return (
    <div className={`send-form-container`}>
      <div className="flex jc-end">
        <div className="pointer">
          <CloseButtonIcon fill="#A0A5B2" />
        </div>
      </div>
      <div className="mV16">
        <SendIcon />
      </div>

      <span className="s18 w500 cBlackL">Send Form</span>
      <span className="s14 w400 mT24 cBlackL mB16">
        Write an email address to send this form
      </span>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <div className="flex jc-center mT40">
        <CustomButton type="success" outline onClick={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton
          disabled={loading || !validateEmail(email)}
          className="mL20"
          type="success"
          onClick={() => {
            !loading && onSend(email)
          }}
        >
          {" "}
          {loading ? (
            <ReactLoading width={27} height={27} type="bars" color="#fff" />
          ) : (
            "Send"
          )}
        </CustomButton>
      </div>
    </div>
  )
}

export default SendForm
