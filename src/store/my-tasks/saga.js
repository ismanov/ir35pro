import { call, put, takeEvery } from "redux-saga/effects"

import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  SEND_FORM,
  UPDATE_TASK,
} from "./actionTypes"

import { api } from "api"
import {
  setAllTasksAC,
  setCurrentTaskAC,
  setMyTasksLoadingAC,
  setMyTasksSuccessAC,
  setterAC,
} from "./actions"
import { arrayItemRemover, arrayItemUpdater } from "helpers/common_utils"

function* getAllTasks() {
  yield put(setMyTasksLoadingAC({ getAllTasks: true }))
  try {
    const response = yield call(api.myTasks.getAllTasks)
    yield put(setAllTasksAC(Object.values(response)))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setMyTasksLoadingAC({ getAllTasks: false }))
  }
}

function* getTaskById({ payload }) {
  yield put(setMyTasksLoadingAC({ getTask: true }))
  try {
    const response = yield call(api.myTasks.getTaskById, payload)
    yield put(setCurrentTaskAC(response))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setMyTasksLoadingAC({ getTask: false }))
  }
}

function* createTask({ payload }) {
  try {
    const response = yield call(api.myTasks.createTask, payload)
    yield put(
      setterAC(state => {
        const key = `${response.status}Tasks`
        return { [key]: { ...state[key], response } }
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function* updateTask({ payload }) {
  try {
    yield put(setMyTasksLoadingAC({ taskUpdate: true }))
    const response = yield call(api.myTasks.updateTask, payload)

    if (response) {
      yield put(
        setterAC(state => {
          const key = `${response.status}Tasks`
          return { [key]: arrayItemUpdater(state[key] || [], response) }
        })
      )
      yield put(setMyTasksSuccessAC({ taskUpdate: true }))
    }
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setMyTasksLoadingAC({ taskUpdate: false }))
  }
}

function* sendForm({ payload }) {
  try {
    yield put(setMyTasksLoadingAC({ sendForm: true }))
    yield call(api.myTasks.sendForm, payload)

    yield put(setMyTasksSuccessAC({ sendForm: true }))
  } catch (error) {
    console.log(error)
  } finally {
    yield put(setMyTasksLoadingAC({ sendForm: false }))
  }
}

function* deleteTask({ payload: task }) {
  try {
    const response = yield call(api.myTasks.deleteTaskById, task._id)

    if (response.code === 200)
      yield put(
        setterAC(state => {
          const key = `${task.status}Tasks`
          return { [key]: arrayItemRemover(state[key] || [], task._id) }
        })
      )
  } catch (error) {
    console.log(error)
  }
}

function* myTasksSaga() {
  yield takeEvery(GET_ALL_TASKS, getAllTasks)
  yield takeEvery(GET_TASK_BY_ID, getTaskById)
  yield takeEvery(CREATE_TASK, createTask)
  yield takeEvery(UPDATE_TASK, updateTask)
  yield takeEvery(DELETE_TASK, deleteTask)
  yield takeEvery(SEND_FORM, sendForm)
}

export default myTasksSaga
