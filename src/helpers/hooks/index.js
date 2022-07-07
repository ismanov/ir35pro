import { useContext } from "react"

import { NotificationContext } from "components/Overlays"
import { isObject } from "lodash"

export const useNotification = () => {
  const { setNotification } = useContext(NotificationContext)

  const setNotificationData = (type, arg1, arg) => {
    if (!arg1) return

    if (isObject(arg1, arg)) {
      setNotification({ ...arg1, type })
    } else {
      setNotification({
        text: arg1,
        type,
        title: arg[1],
        delay: arg[2],
      })
    }
  }
  const setCustomNotification = (arg1, ...arg) =>
    setNotificationData("PRIMARY", arg1, arg)

  setCustomNotification.setPrimary = (arg1, ...arg) =>
    setNotificationData("PRIMARY", arg1, arg)
  setCustomNotification.setSuccess = (arg1, ...arg) =>
    setNotificationData("SUCCESS", arg1, arg)
  setCustomNotification.setWarning = (arg1, ...arg) =>
    setNotificationData("WARNING", arg1, arg)
  setCustomNotification.setError = (arg1, ...arg) =>
    setNotificationData("ERROR", arg1, arg)

  return setCustomNotification
}
