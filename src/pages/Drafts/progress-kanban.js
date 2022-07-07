import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Input } from "reactstrap"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard"
// import ProgressList from "./progress-list"

import "assets/scss/tasks.scss"
import {
  getDrafts as onGetDrafts,
  getUsers as onGetUsers,
  getCompanies as onGetCompanies,
  getClientForms as onGetClientForms,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const ProgressKanban = props => {
  const dispatch = useDispatch()

  const { drafts, usersList, companies, clientForms } = useSelector(state => ({
    drafts: state.drafts.drafts,
    usersList: state.contacts.users,
    companies: state.company.companies,
    clientForms: state.clientForms.clientForms
  }))

  // const [showBoard, setShowBoard] = useState(true);
  const [is_filter, setFilter] = useState(false);
  const [is_search, setSearch] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [engagements, setEngagement] = useState([]);
  const [managers, setManagers] = useState([]);

  const [filter_roles, setFilterRole] = useState("0");
  const [filter_hiring, setFilterHiring] = useState("0");
  const [filter_irstatus, setFilterIrstatus] = useState("0");
  const [filter_date, setFilterDate] = useState("0");
  const [filter_overdue, setFilterOverDue] = useState("0");

  const data = map(drafts, draft => ({
    ...draft,
    cards: draft.contractors.filter(
      item => item.ir_status.toString() != "archived"
    )
  }))
  useEffect(() => {
    dispatch(onGetDrafts())
    dispatch(onGetUsers())
    dispatch(onGetCompanies())
    dispatch(onGetClientForms())
  }, [])


  useEffect(() => {
    if (!isEmpty(drafts)) {
      let roles = [];
      let containRole = false;
      let manager = [];
      let containManager = false;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < drafts[i].contractors.length; j++) {
          for (let k = 0; k < roles.length; k++) {
            if (roles[k] == drafts[i].contractors[j].engagement_name) {
              containRole = true;
              break;
            }
            containRole = false;
          }
          if (!containRole) {
            roles.push(drafts[i].contractors[j].engagement_name)
          }
          for (let l = 0; l < manager.length; l++) {
            if (manager[l] == (drafts[i].contractors[j].hiring_manager_first_name + " " + drafts[i].contractors[j].hiring_manager_last_name)) {
              containManager = true;
              break;
            }
            containManager = false;
          }
          if (!containManager) {
            manager.push(drafts[i].contractors[j].hiring_manager_first_name + " " + drafts[i].contractors[j].hiring_manager_last_name)
          }
        }
      }
      setEngagement(roles);
      setManagers(manager);
    }
  }, [drafts]);

  const filter_role = (e) => {
    const temp = e.target.value
    setFilterRole(temp)
    getFilterData(temp, filter_hiring, filter_irstatus, filter_date, filter_overdue)
  }

  const filter_hiring_manager = (e) => {
    const temp = e.target.value
    setFilterHiring(temp)
    getFilterData(filter_roles, temp, filter_irstatus, filter_date, filter_overdue)
  }

  const filter_ir35status = (e) => {
    const temp = e.target.value
    setFilterIrstatus(temp)
    getFilterData(filter_roles, filter_hiring, temp, filter_date, filter_overdue)
  }

  const filter_adddate = (e) => {
    const temp = e.target.value
    setFilterDate(temp)
    getFilterData(filter_roles, filter_hiring, filter_irstatus, temp, filter_overdue)
  }

  const filter_overdues = (e) => {
    const temp = e.target.value
    setFilterOverDue(temp)
    getFilterData(filter_roles, filter_hiring, filter_irstatus, filter_date, temp)
  }

  const compareDate = (contractorDate, statusdate) => {
    const month = new Date(contractorDate).getMonth();
    const year = new Date(contractorDate).getFullYear();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (statusdate == "1") {
      if (currentYear == year && currentMonth == month) return false;
      else return true;
    } else if (statusdate == "2") {
      if (currentYear == year) return false;
      else return true;
    } else if (statusdate == "3") {
      if (currentYear > year) return false;
      else return true;
    } else {
      return false;
    }
  }

  function getFilterData(roles, hiring, irstatus, date, overdue) {
    if (roles == "0" &&
      hiring == "0" &&
      irstatus == "0" &&
      date == "0" &&
      (overdue == "0" || overdue == "all")) {
      setFilter(false);
      if (is_search) {
        let result = [];
        result = map(drafts, draft => ({
          ...draft,
          cards: draft.contractors.filter(
            item => {
              return item.contractor_id.toLowerCase().search(searchStr) != -1;
            }
          )
        }));
        setFilterData(result)
      }
      return;
    }
    setFilter(true);
    const filter_data = map(drafts, draft => ({
      ...draft,
      cards: draft.contractors.filter(
        item => {
          if (roles != "0" && item.engagement_name.toString() != roles) return false
          if (hiring != "0" && (item.hiring_manager_first_name + " " + item.hiring_manager_last_name) != hiring) return false
          if (irstatus != "0" && item.ir_status.toString() != irstatus) return false
          if (date != "0" && compareDate(item.start_date, date)) return false
          if (overdue == "true" && item.overDue.toString() != overdue) return false
          return item.contractor_id.toLowerCase().search(searchStr) != -1;
        }
      )
    }))
    setFilterData(filter_data)
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    if (value.length > 0) {
      setSearch(true);
    } else {
      setSearch(false);
    }
    setSearchStr(value);
    let result = [];
    if (is_filter) {
      result = map(filterData, draft => ({
        ...draft,
        cards: draft.contractors.filter(
          item => {
            if (filter_roles != "0" && item.engagement_name.toString() != filter_roles) return false
            if (filter_hiring != "0" && (item.hiring_manager_first_name + " " + item.hiring_manager_last_name) != filter_hiring) return false
            if (filter_irstatus != "0" && item.ir_status.toString() != filter_irstatus) return false
            if (filter_date != "0" && compareDate(item.start_date, filter_date)) return false
            if (filter_overdue == "true" && item.overDue.toString() != filter_overdue) return false
            return item.contractor_id.toLowerCase().search(value) != -1;
          }
        )
      }));
    } else {
      result = map(drafts, draft => ({
        ...draft,
        cards: draft.contractors.filter(
          item => {
            return item.contractor_id.toLowerCase().search(value) != -1;
          }
        )
      }));
    }
    setFilterData(result)
  }

  function addNew() {
    window.location.href = "/add-contractor";
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Progress Board | IR35Pro</title>
        </MetaTags>

        <Container fluid>
          <Breadcrumbs title="Contractors" breadcrumbItem="Contractors Board" />
          <Row>

            <Col lg={6}>
              <div style={{ position: "relative" }}>
                <label style={{ width: "100%", maxWidth: "350px" }}>
                  <Input onChange={(event) => handleSearch(event)} type="text" aria-labelledby="search-bar-id-label" placeholder="Enter Contractor ID" style={{ paddingLeft: "40px" }} />
                </label>
                <i className="bx bx-search-alt search-icon" style={{ fontSize: "16px", position: "absolute", left: "13px", lineHeight: "36px" }}></i>
              </div>
            </Col>
            <Col lg={6} style={{ textAlign: "right" }}>
              <Link onClick={() => { addNew() }} className="btn btn-primary" style={{ marginLeft: "10px" }}>
                Add Contractor
              </Link>
            </Col>
          </Row>
          <Row className="mt-3" style={{ marginBottom: "2%" }}>
            <Col xl={12} style={{ display: "flex" }}>
              <select defaultValue="0" className="form-select" id="filter_roles" onChange={(e) => { filter_role(e) }} style={{ marginRight: "10px" }}>
                <option value="0">Role...</option>
                {map(engagements, (item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
              <select defaultValue="0" className="form-select" id="filter_hiring" onChange={(e) => { filter_hiring_manager(e) }} style={{ marginRight: "10px" }}>
                <option value="0">Hiring manager...</option>
                {map(managers, (item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
              <select defaultValue="0" className="form-select" id="filter_ir35status" onChange={(e) => { filter_ir35status(e) }} style={{ marginRight: "10px" }}>
                <option value="0">IR35Pro status...</option>
                <option value="under_assessment">Under Assessment</option>
                <option value="inside">Inside</option>
                <option value="outside">Outside</option>
              </select>
              <select defaultValue="0" className="form-select" id="filter_date" onChange={(e) => { filter_adddate(e) }} style={{ marginRight: "10px" }}>
                <option value="0">Date of adding...</option>
                <option value="1">This month</option>
                <option value="2">This year</option>
                <option value="3">Last year</option>
              </select>
              <select defaultValue="0" className="form-select" id="filter_overdue" onChange={(e) => { filter_overdues(e) }}>
                <option value="0">Filter by Overdue...</option>
                <option value="true">Overdue</option>
                <option value="all">All</option>
              </select>
            </Col>
          </Row>
          <UncontrolledBoard board={{ columns: ((is_filter || is_search) ? filterData : data) }} content={(is_filter || is_search) ? filterData : data} usersList={usersList} companies={companies} clientForms={clientForms} />
        </Container>
      </div >
    </React.Fragment >
  )
}

export default ProgressKanban
