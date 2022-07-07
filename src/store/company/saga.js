import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_COMPANIES,
  ADD_NEW_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
} from "./actionTypes"

import {
  getCompaniesSuccess,
  getCompaniesFail,
  addCompanyFail,
  addCompanySuccess,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCompanies,
  addNewCompany,
  updateCompany,
  deleteCompany,
} from "../../helpers/fakebackend_helper"

function* fetchCompanies() {
  try {
    const response = yield call(getCompanies)
    yield put(getCompaniesSuccess(response))
  } catch (error) {
    yield put(getCompaniesFail(error))
  }
}

function* onUpdateCompany({ payload: company }) {
  try {
    const response = yield call(updateCompany, company)
    yield put(updateCompanySuccess(response))
  } catch (error) {
    yield put(updateCompanyFail(error))
  }
}

function* onDeleteCompany({ payload: company }) {
  try {
    const response = yield call(deleteCompany, company)
    yield put(deleteCompanySuccess(response))
  } catch (error) {
    yield put(deleteCompanyFail(error))
  }
}

function* onAddNewCompany({ payload: company }) {
  try {
    const response = yield call(addNewCompany, company)
    yield put(addCompanySuccess(response))
    window.location.reload()
  } catch (error) {
    yield put(addCompanyFail(error))
  }
}

function* companySaga() {
  yield takeEvery(GET_COMPANIES, fetchCompanies)
  yield takeEvery(ADD_NEW_COMPANY, onAddNewCompany)
  yield takeEvery(UPDATE_COMPANY, onUpdateCompany)
  yield takeEvery(DELETE_COMPANY, onDeleteCompany)
}

export default companySaga
