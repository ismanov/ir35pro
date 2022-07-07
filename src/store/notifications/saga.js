import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  ADD_NOTIFICATION
} from "./actionTypes"
import {
  getNotificationsSuccess,
  getNotificationsFail,
  updateNotificationSuccess,
  updateNotificationFail,
  addNotificationSuccess,
  addNotificationFail
} from "./actions"

//Include Both Helper File with needed methods
import {
  getNotifications,
  addNotification,
  updateNotification,
} from "helpers/fakebackend_helper"

function* fetchNotifications() {
  try {
    const response = yield call(getNotifications)
    yield put(getNotificationsSuccess(response))
  } catch (error) {
    yield put(getNotificationsFail(error))
  }
}

function* onUpdateNotification({ payload: notification }) {
  try {
    const response = yield call(updateNotification, notification)
    yield put(updateNotificationSuccess(response))
  } catch (error) {
    yield put(updateNotificationFail(error))
  }
}

function* onAddNotification({ payload: notification }) {
  try {
    const response = yield call(addNotification, notification)
    yield put(addNotificationSuccess(response))
  } catch (error) {

    yield put(addNotificationFail(error))
  }
}

function* tasksSaga() {
  yield takeEvery(GET_NOTIFICATIONS, fetchNotifications)
  yield takeEvery(UPDATE_NOTIFICATION, onUpdateNotification)
  yield takeEvery(ADD_NOTIFICATION, onAddNotification)
}

export default tasksSaga
