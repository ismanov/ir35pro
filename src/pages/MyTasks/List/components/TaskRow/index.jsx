/* eslint-disable react/prop-types */
import {
  DoneCheckBoxIcon,
  ToDoCheckBoxIcon,
} from "assets/svg-icons/my-tasks-icons"
import moment from "moment"
import { getPredefinedStatusesColor } from "pages/MyTasks"
import React from "react"
import { NavLink } from "react-router-dom"

const TaskRow = ({ task, done = false, onClickButton, index }) => {
  return (
    <div
      className={`list-table-row ${
        index > 0 ? "" : "border-top"
      } border-bottom s14 w400`}
    >
      <div className="name-column pL4 pR24 space-between border-right">
        <div className="flex ai-center">
          {done ? <DoneCheckBoxIcon /> : <ToDoCheckBoxIcon />}
          <span
            className={`mL12 ${done ? "cGrey2" : "cBlackL"} text-nowrap hidden`}
          >
            {task.title}
          </span>
        </div>
        <div
          className={`${done ? "cOrange" : "cBlue"} text-nowrap pointer`}
          onClick={onClickButton}
        >
          {done ? "Change Status" : "Detail"}
        </div>
      </div>

      <div className="date-column flex ai-center pH16 border-right">
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

      <NavLink
        to={`/contractors-overview/${task.contractor?.id}`}
        onClick={e => !task.contractor?.id && e.preventDefault()}
        className="contractor-column flex ai-center pH16 border-right"
      >
        <div
          className={`point mR8`}
          style={{
            backgroundColor: getPredefinedStatusesColor(
              task.contractor?.statuses,
              task.roleType
            ),
          }}
        />
        <span className={done ? "cGrey2" : "cBlackL"}>
          {task.contractor?.engagement_name}
        </span>
      </NavLink>
    </div>
  )
}

export default TaskRow
