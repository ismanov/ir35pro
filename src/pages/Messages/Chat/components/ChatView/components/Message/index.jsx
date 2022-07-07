/* eslint-disable react/prop-types */
import moment from "moment"
import React from "react"
import MyMessage from "./MyMesage"
import NotMyMessage from "./NotMyMesage"
import "./styles.scss"

const Message = props => {
  return props.message?.isMyMessage ? (
    <MyMessage {...props} />
  ) : (
    <NotMyMessage {...props} />
  )
}

export default Message
