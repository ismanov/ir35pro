/* eslint-disable react/prop-types */
import React, { useState, useMemo } from "react"

import ReactLoading from "react-loading"
import { UpArrowIcon } from "assets/svg-icons/contractors-icons"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from "react-router-dom"
import { getMyTasksStore } from "store"
import { tasksFilter } from ".."
import TaskDetails from "../TaskDetails"
import TaskRow from "./components/TaskRow"
import "./styles.scss"

const List = ({ match }) => {
  const history = useHistory()

  const { doneTasks, todoTasks, filterItems, loading } = useSelector(
    getMyTasksStore()
  )

  const [show, setShow] = useState({ todo: true, done: true })

  const todoTasksM = useMemo(
    () => todoTasks.filter(tasksFilter(filterItems)),
    [todoTasks, filterItems]
  )

  const doneTasksM = useMemo(
    () => doneTasks.filter(tasksFilter(filterItems)),
    [doneTasks, filterItems]
  )

  return (
    <div className="list-container">
      <div className="list-table-header pH40 s14 w400 cBlackLOpc mB24">
        <div className="name-column flex ai-center">
          <span>Task Name</span>
        </div>
        <div className="date-column flex ai-center">
          <span className="mL16">Due Date</span>
        </div>
        <div className="contractor-column flex ai-center">
          <span className="mL16">Contractor</span>
        </div>
      </div>

      {loading.getAllTasks && (
        <div className="flex jc-center">
          <ReactLoading type="bubbles" color="#00AEED" />
        </div>
      )}

      <div className={`list-table ${show.todo ? "" : "list-table-hide"}`}>
        <div className="flex mB24 chLT">
          <div
            className={`hide-show-btn ${show.todo ? "show" : "hide"}-mode`}
            onClick={() => setShow(prev => ({ ...prev, todo: !prev.todo }))}
          >
            <UpArrowIcon />
          </div>
          <span className="s15 w600 cBlackL mL12">To Do</span>
        </div>

        <div>
          {todoTasksM.length
            ? todoTasksM.map((item, index) => (
                <TaskRow
                  key={item._id}
                  task={item}
                  index={index}
                  onClickButton={() => {
                    history.push(`${match.path}/${item._id}`, {
                      status: item.status,
                    })
                  }}
                />
              ))
            : !loading.getAllTasks && (
                <div className="flex jc-center">
                  <span className="s18 w600 cBlackL">Task is not found</span>
                </div>
              )}
        </div>
      </div>

      <div className={`list-table ${show.done ? "" : "list-table-hide"} mT20`}>
        <div className="flex mB24 chLT">
          <div
            className={`hide-show-btn ${show.done ? "show" : "hide"}-mode`}
            onClick={() => setShow(prev => ({ ...prev, done: !prev.done }))}
          >
            <UpArrowIcon />
          </div>
          <span className="s15 w600 cBlackL mL12">Done</span>
        </div>

        <div>
          {doneTasksM.length
            ? doneTasksM.map((item, index) => (
                <TaskRow
                  key={item._id}
                  task={item}
                  index={index}
                  done
                  onClickButton={() => {
                    history.push(`${match.path}/${item._id}`, {
                      status: item.status,
                    })
                  }}
                />
              ))
            : !loading.getAllTasks && (
                <div className="flex jc-center">
                  <span className="s18 w600 cBlackL">Task is not found</span>
                </div>
              )}
        </div>
      </div>
      <Route path={`${match.path}/:taskId`} component={TaskDetails} />
    </div>
  )
}

export default List
