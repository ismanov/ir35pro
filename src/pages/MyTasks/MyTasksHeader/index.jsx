import React, { useState, useEffect } from "react"
import { SearchIcon } from "assets/svg-icons/chat-icons"
import { BoardIcon, ListIcon } from "assets/svg-icons/my-tasks-icons"
import { NavLink, useLocation } from "react-router-dom"
import "./styles.scss"
import CustomSelect from "components/Common/CustomSelect"
import { useDispatch, useSelector } from "react-redux"
import { clearFilterItemsAC, setFilterItemsAC } from "store/my-tasks/actions"
import { getMyTasksStore } from "store"
import { getCompanies, getProgresses, getUsers } from "store/actions"
import CustomButton from "components/Common/CustomButton"

const MyTasksHeader = () => {
  const dispatch = useDispatch()

  const filterItems = useSelector(getMyTasksStore("filterItems"))
  const users = useSelector(state => state.contacts.users)
  const companies = useSelector(state => state.company.companies)
  const { managers, engagements } = useSelector(state => ({
    managers: state.projects.managers,
    engagements: state.projects.engagements,
  }))

  const { pathname } = useLocation()
  const isListMode = pathname === "/my-tasks/list"
  const isBoardMode = pathname === "/my-tasks/board"

  useEffect(() => {
    !(users || []).length && dispatch(getUsers())

    if (!(managers || []).length || !(engagements || []).length)
      dispatch(getProgresses())

    !(companies || []).length && dispatch(getCompanies())

    return () => {}
  }, [])

  const onChangeHandler = field => {
    dispatch(setFilterItemsAC(field))
  }

  return (
    <div className="my-tasks-header-container">
      <div className="s16 w500 cBlackL mB24 uCase">My Tasks</div>
      <div className="tabs-panel">
        <div className="tabs">
          <NavLink to="/my-tasks/list">
            <div className={`tab ${isListMode ? "active-tab" : ""}`}>
              <ListIcon />
              <span className="s16 w500 mL8">List</span>
            </div>
          </NavLink>
          <NavLink to="/my-tasks/board">
            <div className={`tab ${isBoardMode ? "active-tab" : ""}`}>
              <BoardIcon />
              <span className="s16 w500 mL8">Board</span>
            </div>
          </NavLink>
        </div>
        <div className="input-container">
          <SearchIcon fill="rgba(73, 80, 87, 0.4)" />
          <input
            type="text"
            placeholder="Search"
            value={filterItems.search || ""}
            onChange={e => onChangeHandler({ search: e.target.value })}
          />
        </div>
      </div>
      <div className="filters-container f-nowrap">
        <CustomSelect
          className="mR20 flex1"
          value={filterItems.engagements}
          onChange={engagements => onChangeHandler({ engagements })}
          placeholder="Engagement name"
          multiSelect
          options={engagements.map(item => ({
            key: item,
            name: item,
          }))}
        />
        <CustomSelect
          className="mR20 flex1"
          placeholder={"Hiring Manager"}
          value={filterItems.managers}
          multiSelect
          onChange={managers => onChangeHandler({ managers })}
          options={managers.map(item => ({
            key: item,
            name: item,
          }))}
        />
        <CustomSelect
          className="mR20 flex1 "
          placeholder="IR35Pro Status"
          value={filterItems.status}
          onChange={status => onChangeHandler({ status })}
          options={[
            { key: "under_assessment", name: "Under Assessment" },
            { key: "inside", name: "Inside" },
            { key: "outside", name: "Outside" },
          ]}
        />
        <CustomSelect
          className="mR20 mB16 flex1"
          value={filterItems.company}
          onChange={company => onChangeHandler({ company })}
          placeholder="Company"
          options={(companies || []).map(company => ({
            key: company.id,
            name: company.company_name,
          }))}
        />
        <CustomSelect
          className="flex1"
          value={filterItems.assignedUser}
          multiSelect
          onChange={assignedUser => onChangeHandler({ assignedUser })}
          placeholder="Assigned User"
          options={(users || []).map(user => ({
            key: user.id,
            name: `${user.first_name || ""} ${user.last_name || ""}`,
          }))}
        />
        <CustomButton
          link
          type="primary"
          className={"flex1"}
          style={{ height: 36 }}
          onClick={() => dispatch(clearFilterItemsAC())}
        >
          Clear all filters
        </CustomButton>
      </div>
    </div>
  )
}

export default MyTasksHeader
