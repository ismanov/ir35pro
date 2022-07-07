import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAIL,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
} from "./actionTypes"

export const getNotifications = () => ({
  type: GET_NOTIFICATIONS,
})

export const getNotificationsSuccess = notifications => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: notifications,
})

export const getNotificationsFail = error => ({
  type: GET_NOTIFICATIONS_FAIL,
  payload: error,
})

export const updateNotification = notification => ({
  type: UPDATE_NOTIFICATION,
  payload: notification,
})

export const updateNotificationSuccess = notification => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload: notification,
})

export const updateNotificationFail = error => ({
  type: UPDATE_NOTIFICATION_FAIL,
  payload: error,
})

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
})

export const addNotificationSuccess = notification => ({
  type: ADD_NOTIFICATION_SUCCESS,
  payload: notification,
})

export const addNotificationFail = error => ({
  type: ADD_NOTIFICATION_FAIL,
  payload: error,
})