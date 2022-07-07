/* eslint-disable react/prop-types */
import {
  DoneCheckBoxIcon,
  ToDoCheckBoxIcon,
} from "assets/svg-icons/my-tasks-icons"
import moment from "moment"
import { getPredefinedStatusesColor } from "pages/MyTasks"
import React from "react"

const TaskCard = ({ task, done = false, onClickButton }) => {
  return (
    <div className="card flex-column text-nowrap" key={task.id}>
      <div className="space-between">
        <div className="flex ai-center">
          {done ? <DoneCheckBoxIcon /> : <ToDoCheckBoxIcon />}
          <span className={`mL12 ${done ? "cGrey2" : ""}`}>{task.title}</span>
        </div>
        <span
          className={`${
            done
              ? "cGrey2"
              : moment().isBefore(moment(task.endDate))
              ? "cBlackL"
              : "cRed"
          }`}
        >{`${moment(task.startDate).format("DD MMM")} - ${moment(
          task.endDate
        ).format("DD MMM")}`}</span>
      </div>

      <div className="space-between mT16">
        <div className="flex-column fg1 hidden">
          <span className="s12 w400 cGreyL2 mB2">Contractor</span>
          <div className="flex ai-center fg1">
            <div
              className="point mR8"
              style={{
                backgroundColor: getPredefinedStatusesColor(
                  task.contractor?.statuses,
                  task.roleType
                ),
              }}
            />
            <span className={`text-nowrap fg1 hidden mR12 ${done && "cGrey2"}`}>
              {task.contractor?.engagement_name}
            </span>
          </div>
        </div>
        <div
          className={`card-button ${done ? "orange-button" : "blue-button"}`}
          onClick={onClickButton}
        >
          <span className="text-nowrap">
            {done ? "Change Status" : "Details"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
