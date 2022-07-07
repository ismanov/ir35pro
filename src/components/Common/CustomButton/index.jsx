/* eslint-disable react/prop-types */
import React from "react"
import "./styles.scss"

const CustomButton = props => {
  const {
    type,
    outline,
    link,
    children,
    disabled,
    style,
    margin,
    width,
    height,
    padding,
    className,
    autoWidth,
    onClick,
    ...containerProps
  } = props
  return (
    <div
      {...containerProps}
      className={`button-style  button-type-${type}  ${
        outline ? "border-outline " : ""
      } ${className || ""} ${link ? "link" : ""} ${
        autoWidth ? "auto-width" : ""
      } ${disabled ? "disabled-button" : ""} `}
      style={{ ...style, width, margin, padding, height }}
      onClick={() => {
        if (disabled) return
        onClick && onClick()
      }}
    >
      <span>{children}</span>
    </div>
  )
}

export default CustomButton
