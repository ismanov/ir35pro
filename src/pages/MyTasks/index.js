/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import {
  clearFilterItemsAC,
  getAllTasksAC,
  setFilterItemsAC,
} from "store/my-tasks/actions"

import Board from "./Board"
import List from "./List"
import MyTasksHeader from "./MyTasksHeader"

import "./styles.scss"

const MyTasks = ({ match, location }) => {
  const dispatch = useDispatch()
  const contractorId = new URLSearchParams(location.search).get("contractorId")

  useEffect(() => {
    dispatch(getAllTasksAC())
    contractorId && dispatch(setFilterItemsAC({ search: contractorId }))

    return () => {
      dispatch(clearFilterItemsAC())
    }
  }, [])

  return (
    <div className="my-tasks-container">
      <MyTasksHeader />
      <div>
        <Switch>
          <Route path={`${match.path}/list`} component={List} />
          <Route path={`${match.path}/board`} component={Board} />
          <Route
            path={match.path}
            component={() => (
              <Redirect to={`${match.path}/list${location.search}`} />
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
export default MyTasks

export const tasksFilter = filterItems => {
  return item => {
    const byEngagementName = (item.contractor?.engagement_name || "")
      .toUpperCase()
      .includes((filterItems.search || "").toUpperCase())
    const byContractorId = (item.contractor?._id || "")
      .toUpperCase()
      .includes((filterItems.search || "").toUpperCase())

    const byEngagementNames =
      filterItems.engagements?.includes(item.contractor?.engagement_name) ||
      !filterItems.engagements?.length

    const byStatus =
      filterItems?.status?.includes(item.contractor?.ir_status) ||
      !filterItems.status?.length

    const byManagers =
      filterItems.managers?.includes(
        `${item.contractor?.hiring_manager_first_name || ""} ${
          item.contractor?.hiring_manager_first_name || ""
        }`
      ) || !filterItems.managers?.length

    console.log(item, ">>>filter", filterItems)

    const byAssignedUser =
      (item.contractor?.assign_users || []).includes(
        filterItems.assignedUser
      ) || !filterItems.assignedUser

    const byCompany =
      item.contractor?.client_company === filterItems.company ||
      !filterItems.company

    return (
      (byContractorId || byEngagementName) &&
      byEngagementNames &&
      byManagers &&
      byAssignedUser &&
      byStatus &&
      byCompany
    )
  }
}

export const getPredefinedStatusesColor = (status = "", role = "") => {
  switch (status) {
    case "client action required":
      return role == "ir35pro" ? "#0FA3B1" : "#FB8500"
    case "ir35 pro reviewing":
      return "#3F6CFE"
    default:
      return "transparent"
  }
}
