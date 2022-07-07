/* eslint-disable react/prop-types */
import { getShortName } from "helpers/common_utils"
import React from "react"
import "./styles.scss"

const User = props => {
  const { fullName, className, ...containerProps } = props
  return (
    <div {...containerProps} className={`user-container ${className}`}>
      <div className="avatar">
        <span>{getShortName(fullName)}</span>
      </div>
      <span className="full-name text-nowrap">{fullName}</span>
    </div>
  )
}

export default User
