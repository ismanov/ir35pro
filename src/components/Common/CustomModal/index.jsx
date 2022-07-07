/* eslint-disable react/prop-types */
import React from "react"
import "./styles.scss"
const CustomModal = ({ children, onClose, visible }) => {
  if (!visible) return null
  return (
    <div className="root-custom-modal-container" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export default CustomModal
