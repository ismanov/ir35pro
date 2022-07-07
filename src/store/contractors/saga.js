import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CONTRACTORS,
  GET_PROGRESSES,
  GET_CONTRACTOR_DETAIL,
  ADD_NEW_CONTRACTOR,
  DELETE_CONTRACTOR,
  UPDATE_CONTRACTOR,
  GET_DOCSLIST,
  ASSIGN_USER,
  CHANGE_STATUSES,
} from "./actionTypes"
import {
  getContractorsSuccess,
  getProgressesSuccess,
  getContractorsFail,
  getProgressesFail,
  getContractorDetailSuccess,
  getContractorDetailFail,
  addContractorFail,
  addContractorSuccess,
  updateContractorSuccess,
  updateContractorFail,
  deleteContractorSuccess,
  deleteContractorFail,
  getDocsListSuccess,
  getDocsListFail,
  setEngagementsAC,
  setManagersAC,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getContractors,
  getProgresses,
  getDocsList,
  getContractorsDetails,
  addNewContractor,
  updateContractor,
  deleteContractor,
} from "helpers/fakebackend_helper"
import { api } from "api"
import { isEmpty } from "lodash"

function* fetchDocsList({ contractorId }) {
  try {
    const response = yield call(getDocsList, contractorId)
    yield put(getDocsListSuccess(response))
  } catch (error) {
    yield put(getDocsListFail(error))
  }
}

function* fetchContractors() {
  try {
    const response = yield call(getContractors)
    yield put(getContractorsSuccess(response))
  } catch (error) {
    yield put(getContractorsFail(error))
  }
}

function* fetchProgresses() {
  try {
    const progresses = yield call(getProgresses)
    if (!isEmpty(progresses)) {
      let roles = []
      let containRole = false
      let manager = []
      let containManager = false
      for (let i = 1; i < 8; i++) {
        for (let j = 0; j < progresses[i].progresses.length; j++) {
          for (let k = 0; k < roles.length; k++) {
            if (roles[k] == progresses[i].progresses[j].engagement_name) {
              containRole = true
              break
            }
            containRole = false
          }
          if (!containRole) {
            roles.push(progresses[i].progresses[j].engagement_name)
          }
          for (let l = 0; l < manager.length; l++) {
            if (
              manager[l] ==
              progresses[i].progresses[j].hiring_manager_first_name +
                " " +
                progresses[i].progresses[j].hiring_manager_last_name
            ) {
              containManager = true
              break
            }
            containManager = false
          }
          if (!containManager) {
            manager.push(
              progresses[i].progresses[j].hiring_manager_first_name +
                " " +
                progresses[i].progresses[j].hiring_manager_last_name
            )
          }
        }
      }
      yield put(setManagersAC(manager))
      yield put(setEngagementsAC(roles))
    }
    yield put(getProgressesSuccess(progresses))
  } catch (error) {
    yield put(getProgressesFail(error))
  }
}

function* fetchContractorDetail({ contractorId }) {
  try {
    const response = yield call(getContractorsDetails, contractorId)
    yield put(getContractorDetailSuccess(response))
  } catch (error) {
    yield put(getContractorDetailFail(error))
  }
}

function* onUpdateContractor({ payload: contractor }) {
  try {
    const response = yield call(updateContractor, contractor)
    yield put(updateContractorSuccess(response))
  } catch (error) {
    yield put(updateContractorFail(error))
  }
}

function* onDeleteContractor({ payload: contractor }) {
  try {
    const response = yield call(deleteContractor, contractor)
    yield put(deleteContractorSuccess(response))
  } catch (error) {
    yield put(deleteContractorFail(error))
  }
}

function* onAddNewContractor({ payload: { contractor, history } }) {
  try {
    const response = yield call(addNewContractor, contractor)
    yield put(addContractorSuccess(response))
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        if (obj.userrole == "user") {
          localStorage.removeItem("ContractorStep")
          localStorage.removeItem("contractorStepID")
          localStorage.setItem("ContractorStep", 2)
          localStorage.setItem("contractorStepID", response.contractor._id)
          window.location.href = "/form-survey/" + response.contractor._id
        } else {
          history.push(response.redirect)
        }
      }
    }
  } catch (error) {
    yield put(addContractorFail(error))
  }
}

function* assignUser({ payload }) {
  try {
    const response = yield call(api.progress.assignUser, payload)
    yield put(updateContractorSuccess(response))
  } catch (error) {
    yield put(updateContractorFail(error))
  }
}

function* changeStatuses({ payload }) {
  try {
    const response = yield call(api.progress.changeStatuses, payload)
    yield put(updateContractorSuccess(response))
  } catch (error) {
    yield put(updateContractorFail(error))
  }
}

function* contractorsSaga() {
  yield takeEvery(GET_CONTRACTORS, fetchContractors)
  yield takeEvery(GET_DOCSLIST, fetchDocsList)
  yield takeEvery(GET_PROGRESSES, fetchProgresses)
  yield takeEvery(GET_CONTRACTOR_DETAIL, fetchContractorDetail)
  yield takeEvery(ADD_NEW_CONTRACTOR, onAddNewContractor)
  yield takeEvery(UPDATE_CONTRACTOR, onUpdateContractor)
  yield takeEvery(DELETE_CONTRACTOR, onDeleteContractor)
  yield takeEvery(ASSIGN_USER, assignUser)
  yield takeEvery(CHANGE_STATUSES, changeStatuses)
}

export default contractorsSaga
