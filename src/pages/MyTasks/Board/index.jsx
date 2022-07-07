/* eslint-disable react/prop-types */
import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from "react-router-dom"
import { getMyTasksStore } from "store"
import ReactLoading from "react-loading"
import { tasksFilter } from ".."
import TaskDetails from "../TaskDetails"
import TaskCard from "./components/TaskCard"
import "./styles.scss"

const Board = ({ match }) => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { todoTasks, doneTasks, filterItems, loading } = useSelector(
    getMyTasksStore()
  )

  const todoTasksM = useMemo(
    () => todoTasks.filter(tasksFilter(filterItems)),
    [todoTasks, filterItems]
  )

  const doneTasksM = useMemo(
    () => doneTasks.filter(tasksFilter(filterItems)),
    [doneTasks, filterItems]
  )

  return (
    <>
      {loading.getAllTasks && (
        <div className="flex jc-center">
          <ReactLoading type="bubbles" color="#00AEED" />
        </div>
      )}
      <div className="boards-container">
        <div>
          <div className="board-container mR30">
            <div className="s15 w600 cBlackL mB20">To Do</div>
            {todoTasksM.length
              ? todoTasksM.map(item => (
                  <TaskCard
                    task={item}
                    key={item._id}
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

        <div>
          <div className="board-container">
            <div className="s15 w600 cBlackL mB20">Done</div>
            {doneTasksM.length
              ? doneTasksM.map(item => (
                  <TaskCard
                    task={item}
                    key={item._id}
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
    </>
  )
}

export default Board
