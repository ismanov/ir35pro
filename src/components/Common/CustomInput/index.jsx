/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react"

import { CalendarIcon } from "assets/svg-icons/chat-icons"
import "./styles.scss"
import moment from "moment"

const CustomInput = ({ title, placeholder, type, edit, onChange, value }) => {
  const inputRef = useRef()

  return (
    <div className="custom-input">
      <span className="s14 w500 cBlackL mB15">{title}</span>
      <div className={`input-container ${edit ? "" : "disabled"}`}>
        {type === "date" && (
          <>
            <CalendarIcon />
            <span className="s14 w400 mL12">
              {moment(value).format("DD MMM YY")}
            </span>
          </>
        )}
        <input
          disabled={!edit}
          value={value || (edit ? "" : "no information")}
          onChange={onChange}
          ref={inputRef}
          type={type || "text"}
          placeholder={placeholder || ""}
          className={!(value && !edit) && "no-information"}
        />
      </div>
    </div>
  )
}

export default CustomInput
