import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:

      return {
        ...state,
        users: [...state.users, {
          id: action.payload.user._id,
          first_name: action.payload.user.first_name,
          last_name: action.payload.user.last_name,
          email: action.payload.user.email,
          company: action.payload.user.company,
          userrole: action.payload.user.userrole,
          confirmed: action.payload.user.confirmed,
          phone_number: action.payload.user.phone_number,
          job_title: action.payload.user.job_title,
        }],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id.toString() === action.payload.user._id.toString()
            ? {
              id: user.id,
              first_name: action.payload.user.first_name,
              last_name: action.payload.user.last_name,
              email: action.payload.user.email,
              company: action.payload.user.company,
              userrole: action.payload.user.userrole,
              confirmed: action.payload.user.confirmed,
              phone_number: action.payload.user.phone_number,
              job_title: action.payload.user.job_title,
            }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.user._id.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
