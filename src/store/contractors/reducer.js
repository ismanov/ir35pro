import {
  GET_CONTRACTORS_FAIL,
  GET_CONTRACTORS_SUCCESS,
  GET_PROGRESSES_FAIL,
  GET_PROGRESSES_SUCCESS,
  GET_CONTRACTOR_DETAIL_FAIL,
  GET_CONTRACTOR_DETAIL_SUCCESS,
  ADD_CONTRACTOR_SUCCESS,
  ADD_CONTRACTOR_FAIL,
  UPDATE_CONTRACTOR_SUCCESS,
  UPDATE_CONTRACTOR_FAIL,
  DELETE_CONTRACTOR_SUCCESS,
  DELETE_CONTRACTOR_FAIL,
  GET_DOCSLIST_SUCCESS,
  GET_DOCSLIST_FAIL,
  SET_MANAGERS,
  SET_ENGAGEMENTS,
  SETTER,
} from "./actionTypes"

const INIT_STATE = {
  contractors: [],
  progresses: [],
  docslist: [],
  managers: [],
  engagements: [],
  contractorDetail: null,
  error: null,
  loading: false,
  errors: {},
  loadings: {},
  successes: {},
}

const contractors = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCSLIST_SUCCESS:
      return {
        ...state,
        docslist: action.payload,
        loading: false,
        error: null,
      }

    case GET_CONTRACTORS_SUCCESS:
      return {
        ...state,
        contractors: action.payload,
        loading: false,
        error: null,
      }

    case GET_PROGRESSES_SUCCESS:
      return {
        ...state,
        progresses: action.payload,
        loading: false,
        error: null,
      }

    case GET_DOCSLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_CONTRACTORS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_PROGRESSES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case ADD_CONTRACTOR_SUCCESS:
      return {
        ...state,
        contractors: [...state.contractors, action.payload],
        loading: false,
        error: "success",
      }

    case ADD_CONTRACTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_CONTRACTOR_DETAIL_SUCCESS:
      return {
        ...state,
        contractorDetail: action.payload,
        loading: false,
        error: null,
      }

    case SET_MANAGERS:
      return {
        ...state,
        managers: action.payload,
      }

    case SET_ENGAGEMENTS:
      return {
        ...state,
        engagements: action.payload,
      }

    case UPDATE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        progresses: state.progresses.map(progress => ({
          ...progress,
          progresses: progress.progresses.map(contractor =>
            contractor.id.toString() ===
            action.payload.contractor._id.toString()
              ? {
                  id: contractor.id,
                  engagement_name: action.payload.contractor.engagement_name,
                  client_company: action.payload.contractor.client_company,
                  hiring_manager_email:
                    action.payload.contractor.hiring_manager_email,
                  hiring_manager_phone:
                    action.payload.contractor.hiring_manager_phone,
                  hiring_manager_first_name:
                    action.payload.contractor.hiring_manager_first_name,
                  hiring_manager_last_name:
                    action.payload.contractor.hiring_manager_last_name,
                  start_date: action.payload.contractor.start_date,
                  agency_name: action.payload.contractor.agency_name,
                  recruiter_name: action.payload.contractor.recruiter_name,
                  ir_status: action.payload.contractor.ir_status,
                  progress: action.payload.contractor.progress,
                  update_progress: action.payload.contractor.update_progress,
                  overDue: action.payload.contractor.overDue,
                  reason_recruit: action.payload.contractor.reason_recruit,
                  day_rate: action.payload.contractor.day_rate,
                  assign_users: action.payload.contractor.assign_users,
                  statuses: action.payload.contractor.statuses,
                  recruiter_email: action.payload.contractor.recruiter_email,
                  recruiter_phone: action.payload.contractor.recruiter_phone,
                  contractor_id: action.payload.contractor.contractor_id,
                  con_website: action.payload.contractor.con_website,
                }
              : contractor
          ),
        })),
        loading: false,
        error: null,
      }

    case UPDATE_CONTRACTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case DELETE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        progresses: state.progresses.map(progress => ({
          ...progress,
          progresses: progress.progresses.filter(
            item =>
              item.id.toString() !== action.payload.contractor._id.toString()
          ),
        })),
        loading: false,
      }

    case DELETE_CONTRACTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_CONTRACTOR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case SETTER:
      return action.payload(state)

    default:
      return state
  }
}

export default contractors
