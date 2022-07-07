import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAIL,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  notifications: [],
  error: {},
}

const notifications = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      }

    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
        loading: false,
        error: null,
      }

    case ADD_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case UPDATE_NOTIFICATION_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id.toString() === action.payload.id.toString()
            ? { notification, ...action.payload }
            : notification
        ),
      }

    case UPDATE_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default notifications
