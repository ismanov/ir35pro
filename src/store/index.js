import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store

// getters sore

const getChatStore = key => state => key ? state.chat[key] : state.chat
const getMyTasksStore = key => state => key ? state.myTasks[key] : state.myTasks

export { getChatStore, getMyTasksStore }
