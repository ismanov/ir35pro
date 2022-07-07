import {
  GET_CONTRACTORS,
  GET_CONTRACTORS_FAIL,
  GET_CONTRACTORS_SUCCESS,
  GET_PROGRESSES,
  GET_PROGRESSES_FAIL,
  GET_PROGRESSES_SUCCESS,
  GET_CONTRACTOR_DETAIL,
  ADD_NEW_CONTRACTOR,
  ADD_CONTRACTOR_SUCCESS,
  ADD_CONTRACTOR_FAIL,
  UPDATE_CONTRACTOR,
  UPDATE_CONTRACTOR_SUCCESS,
  UPDATE_CONTRACTOR_FAIL,
  DELETE_CONTRACTOR,
  DELETE_CONTRACTOR_SUCCESS,
  DELETE_CONTRACTOR_FAIL,
  GET_CONTRACTOR_DETAIL_FAIL,
  GET_CONTRACTOR_DETAIL_SUCCESS,
  GET_DOCSLIST,
  GET_DOCSLIST_SUCCESS,
  GET_DOCSLIST_FAIL,
  ASSIGN_USER,
  CHANGE_STATUSES,
  SET_MANAGERS,
  SET_ENGAGEMENTS,
  SETTER,
} from "./actionTypes"

export const getDocsList = contractorId => ({
  type: GET_DOCSLIST,
  contractorId,
})

export const getDocsListSuccess = docslist => ({
  type: GET_DOCSLIST_SUCCESS,
  payload: docslist,
})

export const getDocsListFail = error => ({
  type: GET_DOCSLIST_FAIL,
  payload: error,
})

export const getContractors = () => ({
  type: GET_CONTRACTORS,
})

export const getProgresses = () => ({
  type: GET_PROGRESSES,
})

export const getProgressesSuccess = progresses => ({
  type: GET_PROGRESSES_SUCCESS,
  payload: progresses,
})

export const getContractorsSuccess = contractors => ({
  type: GET_CONTRACTORS_SUCCESS,
  payload: contractors,
})

export const addNewContractor = (contractor, history) => ({
  type: ADD_NEW_CONTRACTOR,
  payload: { contractor, history },
})

export const addContractorSuccess = contractor => ({
  type: ADD_CONTRACTOR_SUCCESS,
  payload: contractor,
})

export const addContractorFail = error => ({
  type: ADD_CONTRACTOR_FAIL,
  payload: error,
})

export const updateContractor = contractor => ({
  type: UPDATE_CONTRACTOR,
  payload: contractor,
})

export const updateContractorSuccess = contractor => ({
  type: UPDATE_CONTRACTOR_SUCCESS,
  payload: contractor,
})

export const updateContractorFail = error => ({
  type: UPDATE_CONTRACTOR_FAIL,
  payload: error,
})

export const deleteContractor = contractor => ({
  type: DELETE_CONTRACTOR,
  payload: contractor,
})

export const deleteContractorSuccess = contractor => ({
  type: DELETE_CONTRACTOR_SUCCESS,
  payload: contractor,
})

export const deleteContractorFail = error => ({
  type: DELETE_CONTRACTOR_FAIL,
  payload: error,
})

export const getContractorsFail = error => ({
  type: GET_CONTRACTORS_FAIL,
  payload: error,
})

export const getProgressesFail = error => ({
  type: GET_PROGRESSES_FAIL,
  payload: error,
})

export const getContractorDetail = contractorId => ({
  type: GET_CONTRACTOR_DETAIL,
  contractorId,
})

export const getContractorDetailSuccess = contractorDetails => ({
  type: GET_CONTRACTOR_DETAIL_SUCCESS,
  payload: contractorDetails,
})

export const getContractorDetailFail = error => ({
  type: GET_CONTRACTOR_DETAIL_FAIL,
  payload: error,
})

export const assignUserAC = payload => ({
  type: ASSIGN_USER,
  payload,
})

export const changeStatusesAC = payload => ({
  type: CHANGE_STATUSES,
  payload,
})

export const setManagersAC = payload => ({
  type: SET_MANAGERS,
  payload,
})

export const setEngagementsAC = payload => ({
  type: SET_ENGAGEMENTS,
  payload,
})

export const setterProgressAC = cb => ({
  type: SETTER,
  payload: state => ({ ...state, ...cb(state) }),
})

export const setProgressLoadingAC = loading => ({
  type: SETTER,
  payload: state => ({ ...state, loading: { ...state.loadings, ...loading } }),
})

export const setProgressSuccessAC = success => ({
  type: SETTER,
  payload: state => ({ ...state, success: { ...state.successes, ...success } }),
})

export const setProgressErrorAC = error => ({
  type: SETTER,
  payload: state => ({ ...state, error: { ...state.errors, ...error } }),
})
