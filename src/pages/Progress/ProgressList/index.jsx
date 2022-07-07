/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect, useCallback } from "react"

import ReactLoading from "react-loading"
import { UpArrowIcon } from "assets/svg-icons/contractors-icons"
import { useDispatch, useSelector } from "react-redux"
import { Route, useHistory } from "react-router-dom"
import { getMyTasksStore } from "store"
import DraftRow from "./components/DraftRow"
import "./styles.scss"

const ProgressList = props => {
  const history = useHistory()

  const usersList = useSelector(state => state.contacts.users)

  const progresses = props.progresses
  const companies = props.companies || []
  const clientForms = props.clientForms
  const match = props.match

  const [userRole, setUserRole] = useState("user")

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole)
    }
  }, [])

  const getCompanyName = companyId => {
    const company = companies.find(item => item.id === companyId)
    if (company) return company.company_name
    else return ""
  }

  const RenderTable = useCallback(
    ({ progress, index }) => {
      const [show, setShow] = useState(true)

      return (
        <div className="overflow-auto without-scrollbar " key={index}>
          <div
            className={`list-table mB20 hidden-x ${
              show ? "" : "list-table-hide"
            }`}
          >
            <div className="flex mB24 chLT">
              <div
                className={`hide-show-btn ${show ? "show" : "hide"}-mode`}
                onClick={() => setShow(prev => !prev)}
              >
                <UpArrowIcon />
              </div>
              <span className="s15 w600 cBlackL mL12">{progress.title}</span>
            </div>

            <div>
              {progress.cards?.map((item, i) => (
                <DraftRow
                  key={item.id}
                  row={item}
                  type={String(progress.id)}
                  index={i}
                  usersList={usersList}
                  getCompanyName={getCompanyName}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>
        </div>
      )
    },
    [getCompanyName, usersList, userRole, progresses]
  )

  return (
    <div className="progress-list-container">
      <div className="list-table-header pH40 s14 w400 cBlackLOpc mB24 overflow-auto without-scrollbar ">
        <div className="name-column flex ai-center">
          <span>Engagement Name</span>
        </div>
        <div className="h-manager-column flex ai-center">
          <span className="mL16">Hiring Manager</span>
        </div>
        <div className="client-company-column flex ai-center">
          <span className="mL16">Client Company</span>
        </div>
        <div className="ir35pro-status-column flex ai-center">
          <span className="mL16">IR35Pro status</span>
        </div>
        <div className="statuses-column flex ai-center">
          <span className="mL16">Statuses</span>
        </div>
        <div className="fit-content flex ai-center">
          <span className="mL16 text-nowrap">Assigned User</span>
        </div>
      </div>

      {progresses.map((progress, index) => (
        <RenderTable {...{ progress, index }} key={progress.id} />
      ))}
    </div>
  )
}

export default ProgressList
