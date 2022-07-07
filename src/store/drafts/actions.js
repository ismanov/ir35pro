import {
  GET_DRAFTS,
  GET_DRAFTS_FAIL,
  GET_DRAFTS_SUCCESS,
} from "./actionTypes"

export const getDrafts = () => ({
  type: GET_DRAFTS,
})

export const getDraftsFail = error => ({
  type: GET_DRAFTS_FAIL,
  payload: error,
})

export const getDraftsSuccess = drafts => ({
  type: GET_DRAFTS_SUCCESS,
  payload: drafts,
})