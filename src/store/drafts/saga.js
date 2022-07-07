import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_DRAFTS,
} from "./actionTypes"
import {
  getDraftsSuccess,
  getDraftsFail
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDrafts,
} from "helpers/fakebackend_helper"

function* fetchDrafts() {
  try {
    const response = yield call(getDrafts)
    yield put(getDraftsSuccess(response))
  } catch (error) {
    yield put(getDraftsFail(error))
  }
}

function* draftsSaga() {
  yield takeEvery(GET_DRAFTS, fetchDrafts)
}

export default draftsSaga
