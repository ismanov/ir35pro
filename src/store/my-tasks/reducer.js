import { SET_ALL_TASKS, SETTER, SET_TASK } from "./actionTypes"

const INIT_STATE = {
  todoTasks: [],
  doneTasks: [],
  currentTask: null,
  filterItems: {},
  loading: {},
  success: {},
  error: {},
}

const myTasks = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ALL_TASKS: {
      const allTasks = action.payload
      const todoTasks = []
      const doneTasks = []

      allTasks.forEach(task => {
        switch (task.status) {
          case "done":
            doneTasks.push(task)
            break
          case "todo":
            todoTasks.push(task)
            break
          default:
            todoTasks.push(task)
        }
      })
      return { ...state, doneTasks, todoTasks }
    }
    case SET_TASK:
      return { ...state, currentTask: action.payload }
    case SETTER:
      return action.payload(state)
    default:
      return { ...state }
  }
}

export default myTasks
