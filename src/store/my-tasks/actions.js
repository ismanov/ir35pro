import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  SEND_FORM,
  SETTER,
  SET_ALL_TASKS,
  SET_TASK,
  UPDATE_TASK,
} from "./actionTypes"

export const getAllTasksAC = payload => ({
  type: GET_ALL_TASKS,
  payload,
})

export const getTaskByIdAC = payload => ({
  type: GET_TASK_BY_ID,
  payload,
})

export const updateTaskAC = payload => ({
  type: UPDATE_TASK,
  payload,
})

export const createTaskAC = payload => ({
  type: CREATE_TASK,
  payload,
})

export const deleteTaskAC = payload => ({
  type: DELETE_TASK,
  payload,
})

export const sendFormAC = payload => ({
  type: SEND_FORM,
  payload,
})

export const setAllTasksAC = payload => ({
  type: SET_ALL_TASKS,
  payload,
})

export const setCurrentTaskAC = payload => ({
  type: SET_TASK,
  payload,
})

export const setterAC = cb => ({
  type: SETTER,
  payload: state => ({ ...state, ...cb(state) }),
})

export const setMyTasksLoadingAC = loading => ({
  type: SETTER,
  payload: state => ({ ...state, loading: { ...state.loading, ...loading } }),
})

export const setMyTasksSuccessAC = success => ({
  type: SETTER,
  payload: state => ({ ...state, success: { ...state.success, ...success } }),
})

export const setMyTasksErrorAC = error => ({
  type: SETTER,
  payload: state => ({ ...state, error: { ...state.error, ...error } }),
})

export const setFilterItemsAC = filter => ({
  type: SETTER,
  payload: state => ({
    ...state,
    filterItems: { ...state.filterItems, ...filter },
  }),
})

export const clearFilterItemsAC = () => ({
  type: SETTER,
  payload: state => ({ ...state, filterItems: {} }),
})
