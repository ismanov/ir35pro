import {
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAIL,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  companies: [],
  error: {},
}

const company = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
      }

    case GET_COMPANIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_COMPANY_SUCCESS:

      return {
        ...state,
        companies: [...state.companies, {
          id: action.payload.company._id,
          company_name: action.payload.company.company_name,
          company_phone: action.payload.company.company_phone,
          company_address: action.payload.company.company_address,
          company_website: action.payload.company.company_website,
        }],
      }

    case ADD_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id.toString() === action.payload.company._id.toString()
            ? {
              id: company.id,
              company_name: action.payload.company.company_name,
              company_phone: action.payload.company.company_phone,
              company_address: action.payload.company.company_address,
              company_website: action.payload.company.company_website,
            }
            : company
        ),
      }

    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          company => company.id.toString() !== action.payload.company._id.toString()
        ),
      }

    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default company
