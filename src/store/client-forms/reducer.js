import { GET_CLIENT_FORMS_SUCCESS, GET_CLIENT_FORMS_FAIL } from "./actionTypes"

const INIT_STATE = {
  clientForms: [],
  error: {},
}

const clientForms = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENT_FORMS_SUCCESS:
      return {
        ...state,
        clientForms: action.payload,
      }

    case GET_CLIENT_FORMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default clientForms
