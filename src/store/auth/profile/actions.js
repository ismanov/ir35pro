import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG } from "./actionTypes"

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = user => {
  return {
    type: PROFILE_SUCCESS,
    payload: user,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
