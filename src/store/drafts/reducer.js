import {
  GET_DRAFTS_FAIL,
  GET_DRAFTS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  drafts: [],
  error: null,
  loading: false,
}

const drafts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.payload,
        loading: false,
        error: null
      }

    case GET_DRAFTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default drafts
