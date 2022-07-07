/* eslint-disable react/prop-types */
import { CloseButtonIcon } from "assets/svg-icons/chat-icons"
import React, { useState, useEffect } from "react"
import Notification from "./Notification"
import "./styles.scss"

export const ModalContext = React.createContext()
export const NotificationContext = React.createContext()

const Overlays = ({ children }) => {
  const [notification, setNotification] = useState(null)
  const [notifications, setNotifications] = useState([])

  const [modalComponent, setModalComponent] = useState(null)
  const [modalOption, setModalOption] = useState({})
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    if (notification) {
      const currentDate = new Date()
      const filterData = notifications.filter(
        item => currentDate.valueOf() - item.date.valueOf() < getTime(item.type)
      )
      let timeoutId
      setNotifications([...filterData, notification])

      timeoutId = setTimeout(() => {
        const newDate = new Date()
        setNotifications(prev =>
          prev.filter(
            item => newDate.valueOf() - item.date.valueOf() < getTime(item.type)
          )
        )
      }, getTime(notification.type))

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [notification])

  const setNotificationData = val => {
    setNotification({ ...val, date: new Date() })
  }

  return (
    <NotificationContext.Provider
      value={{ setNotification: setNotificationData }}
    >
      <ModalContext.Provider
        value={{ setModalComponent, setModalOption, setConfirm }}
      >
        {modalOption.open && (
          <div className="root-modal-container">{modalComponent}</div>
        )}
        {children}
        {confirm && (
          <div className="root-modal-container">
            <div className="alert-container">
              <div className="close-btn" onClick={() => setConfirm(null)}>
                <CloseButtonIcon />
              </div>
              <div className="flex jc-center">
                <span className="s18 w500 cBlackL">
                  Do you want to delete this document ?
                </span>
              </div>

              <div className="mT40 flex jc-center">
                <div className="custom-button cancel-button alert-btn">
                  <span className="s14 w400 cBlackL">Cancel</span>
                </div>
                <div
                  className={`custom-button add-button ${
                    true ? "" : "disabled-button"
                  } alert-btn`}
                >
                  <span className="s14 w400 cWhite">Delete</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalContext.Provider>
      <div className="notifications-container">
        {notifications.map(item => {
          return (
            <React.Fragment key={item?.date?.valueOf()}>
              <GetNotificationComponent {...item} />
            </React.Fragment>
          )
        })}
      </div>
    </NotificationContext.Provider>
  )
}

export default Overlays

const GetNotificationComponent = ({ type, title, text }) => {
  switch (type) {
    case "SUCCESS":
      return <Notification.Success title={title}>{text}</Notification.Success>

    case "WARNING":
      return <Notification.Warning title={title}>{text}</Notification.Warning>

    case "ERROR":
      return <Notification.Error title={title}>{text}</Notification.Error>

    default:
      return <Notification title={title}>{text}</Notification>
  }
}

const getTime = (type = "PRIMARY") => {
  switch (type) {
    case "SUCCESS":
      return 5500
    case "ERROR":
    case "WARNING":
      return 8500

    default:
      return 5500
  }
}
