import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Input } from "reactstrap"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard"
import ProgressList from "./ProgressList"

import "assets/scss/tasks.scss"
import {
  getProgresses as onGetProgresses,
  getUsers as onGetUsers,
  getCompanies as onGetCompanies,
  getClientForms as onGetClientForms,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import ProgressHeader from "./ProgressHeader"
import moment from "moment"

const ProgressKanban = props => {
  const dispatch = useDispatch()

  const {
    progresses,
    usersList,
    companies,
    engagements,
    managers,
    clientForms,
  } = useSelector(state => ({
    progresses: state.projects.progresses,
    usersList: state.contacts.users,
    companies: state.company.companies,
    clientForms: state.clientForms.clientForms,
    managers: state.projects.managers,
    engagements: state.projects.engagements,
    clientForms: state.clientForms.clientForms,
  }))

  const [showBoard, setShowBoard] = useState(false)
  const [is_filter, setFilter] = useState(false)
  const [is_search, setSearch] = useState(false)
  const [filterData, setFilterData] = useState([])
  const [searchStr, setSearchStr] = useState("")
  const [role, setrole] = useState("")

  const [filter_roles, setFilterRole] = useState()
  const [filter_hiring, setFilterHiring] = useState()
  const [filter_companies, setFilterCompany] = useState()
  const [filter_irstatus, setFilterIrstatus] = useState()
  const [filter_date, setFilterDate] = useState()
  const [filter_assign, setFilterAssign] = useState()
  const [filter_archived, setFilterArchived] = useState("unarchived")
  const [filter_statuses, setFilterStatuses] = useState()
  const [filter_overdue, setFilterOverDue] = useState(false)

  const data = map(progresses, progress => ({
    ...progress,
    cards: progress.progresses.filter(
      item => item.ir_status.toString() != "archived"
    ),
  }))
  useEffect(() => {
    dispatch(onGetProgresses())
    dispatch(onGetUsers())
    dispatch(onGetCompanies())
    dispatch(onGetClientForms())
  }, [])
  const contractorStep = localStorage.getItem("ContractorStep")
  const contractorStepID = localStorage.getItem("contractorStepID")
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setrole(obj.userrole)
      }
    }
  }, [])

  function showProgress(showMode) {
    setShowBoard(showMode)
  }

  const filter_company = e => {
    const temp = e
    setFilterCompany(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      temp,
      filter_irstatus,
      filter_date,
      filter_assign,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_role = e => {
    const temp = e
    setFilterRole(temp)
    getFilterData(
      temp,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      filter_date,
      filter_assign,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_hiring_manager = e => {
    const temp = e
    setFilterHiring(temp)
    getFilterData(
      filter_roles,
      temp,
      filter_companies,
      filter_irstatus,
      filter_date,
      filter_assign,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_ir35status = e => {
    const temp = e
    console.log(temp)
    setFilterIrstatus(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      temp,
      filter_date,
      filter_assign,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_adddate = e => {
    const temp = e
    setFilterDate(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      temp,
      filter_assign,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_assignuser = e => {
    const temp = e || ""
    setFilterAssign(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      filter_date,
      temp,

      filter_statuses,
      filter_archived,
      filter_overdue
    )
  }

  const filter_statusess = e => {
    const temp = e
    setFilterStatuses(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      filter_date,
      filter_assign,

      temp,
      filter_archived,
      filter_overdue
    )
  }

  const filter_archiveds = e => {
    const temp = e
    setFilterArchived(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      filter_date,
      filter_assign,

      filter_statuses,
      temp,
      filter_overdue
    )
  }

  const filter_overdues = e => {
    const temp = e
    setFilterOverDue(temp)
    getFilterData(
      filter_roles,
      filter_hiring,
      filter_companies,
      filter_irstatus,
      filter_date,
      filter_assign,

      filter_statuses,
      filter_archived,
      temp
    )
  }

  const compareDate = (contractorDate, dateFilter) => {
    const month = new Date(contractorDate).getMonth()
    const year = new Date(contractorDate).getFullYear()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    if (dateFilter.type == "1") {
      if (currentYear == year && currentMonth == month) return false
      else return true
    } else if (dateFilter.type == "2") {
      if (currentYear == year) return false
      else return true
    } else if (dateFilter.type == "3") {
      if (currentYear > year) return false
    } else if (dateFilter.type == "4") {
      const contractorDateValue = new Date(contractorDate).valueOf()
      const fStartDate = new Date(
        moment(dateFilter.startDate).format("MM.DD.YYYY")
      ).valueOf()
      const fEndDate = new Date(
        moment(dateFilter.endDate).format("MM.DD.YYYY")
      ).valueOf()
      if (fStartDate <= contractorDateValue && fEndDate >= contractorDateValue)
        return false
      else return true
    } else {
      return false
    }
  }

  function getFilterData(
    roles = [],
    hiring,
    company,
    irstatus,
    date,
    assign = [],
    statuses,
    archived = "unarchived",
    overdue
  ) {
    if (
      !(Array.isArray(roles) && roles.length) &&
      !(Array.isArray(hiring) && hiring.length) &&
      !(Array.isArray(company) && company.length) &&
      !(Array.isArray(irstatus) && irstatus.length) &&
      !date?.type &&
      !(Array.isArray(assign) && assign.length) &&
      !(Array.isArray(statuses) && statuses.length) &&
      archived == "unarchived" &&
      !overdue
    ) {
      setFilter(false)
      if (is_search) {
        let result = []
        result = map(progresses, progress => ({
          ...progress,
          cards: progress.progresses.filter(item => {
            return item.contractor_id.toLowerCase().search(searchStr) != -1
          }),
        }))
        setFilterData(result)
      }
      return
    }
    setFilter(true)
    const filter_data = map(progresses, progress => ({
      ...progress,
      cards: progress.progresses.filter(item => {
        console.log()
        if (
          Array.isArray(roles) &&
          roles.length &&
          !roles.includes(item.engagement_name.toString())
        )
          return false
        if (
          Array.isArray(hiring) &&
          hiring.length &&
          !hiring.includes(
            `${item.hiring_manager_first_name} ${item.hiring_manager_last_name}`
          )
        )
          return false
        if (
          Array.isArray(company) &&
          company.length &&
          !company.includes(item.client_company.toString())
        )
          return false
        if (
          Array.isArray(irstatus) &&
          irstatus.length &&
          !irstatus.includes(item.ir_status.toString())
        )
          return false
        if (date && compareDate(item.start_date, date)) return false
        if (
          Array.isArray(assign) &&
          assign.length &&
          !assign.find(asg => item.assign_users.includes(asg))
        )
          return false
        if (
          Array.isArray(statuses) &&
          statuses.length &&
          !statuses.includes(item.statuses.toString())
        )
          return false
        if (archived != "unarchived" && item.ir_status.toString() != archived)
          return false
        if (overdue && !item.overDue) return false
        return item.contractor_id.toLowerCase().search(searchStr) != -1
      }),
    }))
    setFilterData(filter_data)
  }

  const handleSearch = event => {
    let value = event.target.value.toLowerCase()
    if (value.length > 0) {
      setSearch(true)
    } else {
      setSearch(false)
    }
    setSearchStr(value)
    let result = []
    if (is_filter) {
      result = map(filterData, progress => ({
        ...progress,
        cards: progress.progresses.filter(item => {
          if (
            Array.isArray(filter_roles) &&
            !filter_roles.includes(item.engagement_name.toString())
          )
            return false
          if (
            filter_hiring &&
            item.hiring_manager_first_name +
              " " +
              item.hiring_manager_last_name !=
              filter_hiring
          )
            return false
          if (
            filter_companies &&
            item.client_company.toString() != filter_companies
          )
            return false
          if (filter_irstatus && item.ir_status.toString() != filter_irstatus)
            return false
          if (filter_date.type && compareDate(item.start_date, filter_date))
            return false
          if (
            Array.isArray(filter_assign) &&
            filter_assign.length &&
            !filter_assign.find(asg => item.assign_users.includes(asg))
          )
            return false
          if (filter_statuses && item.statuses.toString() != filter_statuses)
            return false
          if (
            filter_archived != "unarchived" &&
            item.ir_status.toString() != filter_archived
          )
            return false
          if (filter_overdue && !item.overDue) return false
          return (
            item.contractor_id
              .toLowerCase()
              .includes(event.target.value || "") ||
            item.engagement_name.toLowerCase().includes(value)
          )
        }),
      }))
    } else {
      result = map(progresses, progress => ({
        ...progress,
        cards: progress.progresses.filter(item => {
          return (
            item.contractor_id
              .toLowerCase()
              .includes(event.target.value || "") ||
            item.engagement_name.toLowerCase().includes(value)
          )
        }),
      }))
    }
    setFilterData(result)
  }

  const clearFilter = () => {
    setFilterRole()
    setFilterHiring()
    setFilterCompany()
    setFilterIrstatus()
    setFilterDate()
    setFilterAssign()
    setFilterArchived()
    setFilterStatuses()
    setFilterOverDue()

    getFilterData()
  }

  const statusOptions = [
    { key: "under_assessment", name: "Under Assessment" },
    { key: "inside", name: "Inside" },
    { key: "outside", name: "Outside" },
  ]
  return (
    <React.Fragment>
      <div>
        <ProgressHeader
          {...{
            handleSearch,
            showBoard,
            clearFilter,
            roleFilter: {
              options: engagements || [],
              onChange: filter_role,
              value: filter_roles,
            },
            assignedUserFilter: {
              options: usersList || [],
              onChange: filter_assignuser,
              value: filter_assign,
            },
            managerFilter: {
              options: managers || [],
              onChange: filter_hiring_manager,
              value: filter_hiring,
            },
            companyFilter: {
              options: companies || [],
              onChange: filter_company,
              value: filter_companies,
            },
            statusFilter: {
              options: statusOptions || [],
              onChange: filter_ir35status,
              value: filter_irstatus,
            },
            statusesFilter: {
              onChange: filter_statusess,
              value: filter_statuses,
            },
            dateFilter: {
              onChange: filter_adddate,
              value: filter_date,
            },
            overdueFilter: {
              onChange: filter_overdues,
              value: filter_overdue,
            },
            archivedFilter: {
              onChange: filter_archiveds,
              value: filter_archived,
            },
          }}
          onClickList={() => showProgress(false)}
          onClickBoard={() => showProgress(true)}
        />
      </div>
      <div className="mH36" style={{ minHeight: 500 }}>
        {!isEmpty(data) && showBoard && (
          <UncontrolledBoard
            board={{ columns: is_filter || is_search ? filterData : data }}
            content={is_filter || is_search ? filterData : data}
            usersList={usersList}
            companies={companies}
            clientForms={clientForms}
          />
        )}
        {!showBoard && (
          <ProgressList
            progresses={is_filter || is_search ? filterData : data}
            companies={companies}
            clientForms={clientForms}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default ProgressKanban
