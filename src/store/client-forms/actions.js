import { GET_CLIENT_FORMS, GET_CLIENT_FORMS_FAIL, GET_CLIENT_FORMS_SUCCESS } from "./actionTypes"

export const getClientForms = () => ({
  type: GET_CLIENT_FORMS,
})

export const getClientFormsSuccess = clientForms => ({
  type: GET_CLIENT_FORMS_SUCCESS,
  payload: clientForms,
})

export const getClientFormsFail = error => ({
  type: GET_CLIENT_FORMS_FAIL,
  payload: error,
})
