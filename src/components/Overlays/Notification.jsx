/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react"

import { ErrorInfoIcon, InfoIcon } from "assets/svg-icons/common-icons"
import { CloseButtonIcon } from "assets/svg-icons/chat-icons"
import { DoneCheckBoxIcon } from "assets/svg-icons/my-tasks-icons"

const Notification = props => {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setHide(true)
    }, 6000)

    return () => {
      clearTimeout(id)
    }
  }, [])

  if (hide) return null
  return (
    <div className="notification notification-primary">
      <InfoIcon />
      <div className="flex-column fg1 mH20">
        <span className="notification-title">{props.title || "Info"}</span>
        <span className="notification-info">{props.children}</span>
      </div>
      <div className="point" onClick={() => setHide(true)}>
        <CloseButtonIcon />
      </div>
    </div>
  )
}

Notification.Success = props => {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setHide(true)
    }, 6000)

    return () => clearTimeout(id)
  }, [])

  if (hide) return null
  return (
    <div className="notification notification-success">
      <DoneCheckBoxIcon />
      <div className="flex-column fg1 mH20">
        <span className="notification-title">{props.title || "Success"}</span>
        <span className="notification-info">{props.children}</span>
      </div>
      <div className="point" onClick={() => setHide(true)}>
        <CloseButtonIcon />
      </div>
    </div>
  )
}

Notification.Warning = props => {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setHide(true)
    }, 9000)

    return () => clearTimeout(id)
  }, [])

  if (hide) return null
  return (
    <div className="notification notification-warning">
      <InfoIcon fill="#F6A031" />
      <div className="flex-column fg1 mH20">
        <span className="notification-title">{props.title || "Warning"}</span>
        <span className="notification-info">{props.children}</span>
      </div>
      <div className="point" onClick={() => setHide(true)}>
        <CloseButtonIcon />
      </div>
    </div>
  )
}

Notification.Error = props => {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setHide(true)
    }, 9000)

    clearTimeout(id)
  }, [])

  if (hide) return null
  return (
    <div className="notification notification-error">
      <ErrorInfoIcon />
      <div className="flex-column fg1 mH20">
        <span className="notification-title">{props.title || "Error"}</span>
        <span className="notification-info">{props.children}</span>
      </div>
      <div className="point" onClick={() => setHide(true)}>
        <CloseButtonIcon />
      </div>
    </div>
  )
}

export default Notification
