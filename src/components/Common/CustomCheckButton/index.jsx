/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { CheckedIcon } from "assets/svg-icons/common-icons"

const CustomCheckButton = ({
  checked,
  onChange,
  title,
  titleStyle,
  className,
  fill,
}) => {
  const [check, setCheck] = useState(checked)

  useEffect(() => {
    setCheck(checked)
  }, [checked])

  return (
    <div
      className={`pointer ${title ? "flex ai-center" : "mR8"} ${
        className || ""
      }`}
      onClick={() => {
        onChange ? onChange(!check) : setCheck(prev => !prev)
      }}
    >
      <CheckedIcon checked={check} fill={fill} />
      <span className="mL8" style={titleStyle}>
        {title}
      </span>
    </div>
  )
}

export default React.memo(CustomCheckButton)
