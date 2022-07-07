/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react"

import { ModalContext } from "components/Overlays"

import TaskDetailsComponent from "./TaskDetailComponent"
import { useHistory, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getTaskByIdAC, setCurrentTaskAC } from "store/my-tasks/actions"

const TaskDetails = ({ match }) => {
  const { setModalComponent, setModalOption } = useContext(ModalContext)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const taskId = match.params?.taskId

  useEffect(() => {
    dispatch(getTaskByIdAC(taskId))

    setModalComponent(
      <TaskDetailsComponent
        status={location.state?.status}
        taskId={match.params?.taskId}
        onClose={() =>
          history.push((match.path || "").split("/").slice(0, -1).join("/"))
        }
      />
    )
    setModalOption({ open: true })

    return () => {
      setModalComponent(null)
      setModalOption({ open: false })
      dispatch(setCurrentTaskAC(null))
    }
  }, [])

  return null
}

export default React.memo(TaskDetails)
