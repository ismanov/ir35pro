/* eslint-disable react/prop-types */
import React from "react"
import "./styles.scss"

const Status = props => {
  const { status, children, className, ...containerProps } = props
  return (
    <div
      {...containerProps}
      className={`status-style status-${status || "primary"} ${
        className || ""
      }`}
    >
      <span>{children}</span>
    </div>
  )
}

export default Status
