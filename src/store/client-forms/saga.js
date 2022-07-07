import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_CLIENT_FORMS } from "./actionTypes"
import { getClientFormsSuccess, getClientFormsFail } from "./actions"

//Include Both Helper File with needed methods
import { getClientForms } from "helpers/fakebackend_helper"

function* fetchClientForms() {
  try {
    const response = yield call(getClientForms)
    yield put(getClientFormsSuccess(response))
  } catch (error) {
    yield put(getClientFormsFail(error))
  }
}

function* clientFormsSaga() {
  yield takeEvery(GET_CLIENT_FORMS, fetchClientForms)
}

export default clientFormsSaga
