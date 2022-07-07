import {
  GET_COMPANIES,
  GET_COMPANIES_FAIL,
  GET_COMPANIES_SUCCESS,
  ADD_NEW_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

export const getCompanies = () => ({
  type: GET_COMPANIES,
})

export const getCompaniesSuccess = companies => ({
  type: GET_COMPANIES_SUCCESS,
  payload: companies,
})

export const addNewCompany = company => ({
  type: ADD_NEW_COMPANY,
  payload: company,
})

export const addCompanySuccess = company => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
})

export const addCompanyFail = error => ({
  type: ADD_COMPANY_FAIL,
  payload: error,
})

export const getCompaniesFail = error => ({
  type: GET_COMPANIES_FAIL,
  payload: error,
})

export const updateCompany = company => ({
  type: UPDATE_COMPANY,
  payload: company,
})

export const updateCompanySuccess = company => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: company,
})

export const updateCompanyFail = error => ({
  type: UPDATE_COMPANY_FAIL,
  payload: error,
})

export const deleteCompany = company => ({
  type: DELETE_COMPANY,
  payload: company,
})

export const deleteCompanySuccess = company => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: company,
})

export const deleteCompanyFail = error => ({
  type: DELETE_COMPANY_FAIL,
  payload: error,
})
