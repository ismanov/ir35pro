import PropTypes, { element } from "prop-types"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody } from "reactstrap"
import classNames from "classnames"
import { ir35Status } from "common/data/progress"
import axiosApi from "helpers/api_helper"
import { map } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import warningIcon from "../../assets/images/warning-icon.png"
import { useNotification } from "helpers/hooks"

const CardTaskBox = props => {
  const dispatch = useDispatch()
  const data = props.data
  const companies = props.companies
  const usersList = props.userList
  const clientForms = props.clientForms
  const setNotification = useNotification()

  const [copyString, setCopyString] = useState("Request Form")
  const [assignUsersName, setAssignUsers] = useState([])
  const [userRole, setUserRole] = useState("user")
  const [contractorName, setContractorName] = useState("")

  useEffect(() => {
    onLoad()
  }, [])

  useEffect(() => {
    if (copyString === "Copied Link!")
      setNotification("Link for the request form has been successfully copied.")
  }, [copyString])

  function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole)
    }
  }

  const copyFormLink = id => {
    var textField = document.createElement("textarea")
    textField.innerText =
      window.location.protocol +
      "://" +
      window.location.hostname +
      "/form-client/" +
      id
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
    setCopyString("Copied Link!")
    setTimeout(() => {
      setCopyString("Request Form")
    }, 3000)
  }

  const assignUsers = async e => {
    e.preventDefault()
    let userListElement = document.getElementById("pro_user_list_" + data.id)
    if (userListElement.classList.contains("d-none")) {
      userListElement.classList.remove("d-none")
    } else {
      userListElement.classList.add("d-none")
    }
  }

  const onClickUser = async (e, userId, contractorId) => {
    e.preventDefault()
    let data = {
      prouser: userId,
    }
    await axiosApi()
      .put(`api/assign-user/${contractorId}`, data)
      .then(response => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    let assingUsersData = data.assign_users.toString().split(",")
    let assignUserName = []
    assingUsersData.forEach(element => {
      map(usersList, (item, index) => {
        if (item.id == element) {
          assignUserName.push(item.first_name)
        }
      })
    })
    setAssignUsers(assignUserName)
  }, [usersList])

  useEffect(() => {
    let clientForm = []
    map(clientForms, (item, index) => {
      if (item.contractor == data.id) {
        clientForm.push(item)
      }
    })
    if (clientForm.length == 1) {
      setContractorName(
        clientForm[0].first_name + " " + clientForm[0].last_name
      )
    } else if (clientForm.length > 1) {
      let todayDate = new Date()
      let firstDate = new Date(clientForm[0].createdAt)
      let minVal = todayDate - firstDate
      setContractorName(
        clientForm[0].first_name + " " + clientForm[0].last_name
      )
      for (let i = 1; i < clientForm.length; i++) {
        let dateTemp = new Date(clientForm[i].createdAt)
        if (minVal > todayDate - dateTemp) {
          minVal = todayDate - dateTemp
          setContractorName(
            clientForm[i].first_name + " " + clientForm[i].last_name
          )
        }
      }
    } else {
      setContractorName("")
    }
  }, [clientForms])

  const change_statuses = async (e, id) => {
    const data = {
      id: id,
      statuses: e.target.value,
    }
    await axiosApi()
      .put(`api/update-statuses`, data)
      .then(response => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <React.Fragment>
      <Card className="task-box border-radius-8">
        <CardBody
          className={
            "borad-width" +
            (data.statuses == "client action required"
              ? userRole == "ir35pro"
                ? " border-left-green"
                : " border-left-orange"
              : data.statuses == "ir35 pro reviewing"
                ? " border-left-blue"
                : "")
          }
        >
          <Link to={`/contractors-overview/${data.id}`}>
            <div>
              {data.overDue == "true" ? (
                data.statuses == "predefined statuses" ||
                  data.statuses == "" ? (
                  <img
                    src={warningIcon}
                    alt="warning"
                    style={{ marginBottom: "10px" }}
                  />
                ) : data.statuses == "ir35 pro reviewing" ? (
                  <div style={{ marginBottom: "10px" }}>
                    <img src={warningIcon} alt="warning" />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#3F6CFE",
                        marginLeft: "10px",
                      }}
                    >
                      IR35 Pro reviewing
                    </span>
                  </div>
                ) : (
                  <div style={{ marginBottom: "10px" }}>
                    <img src={warningIcon} alt="warning" />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: userRole == "ir35pro" ? "#0FA3B1" : "#FB8500",
                        marginLeft: "10px",
                      }}
                    >
                      Client action required
                    </span>
                  </div>
                )
              ) : data.statuses == "predefined statuses" ||
                data.statuses == "" ? null : data.statuses ==
                "ir35 pro reviewing" ? (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#3F6CFE",
                    marginBottom: "10px",
                  }}
                >
                  IR35 Pro reviewing
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: userRole == "ir35pro" ? "#0FA3B1" : "#FB8500",
                    marginBottom: "10px",
                  }}
                >
                  Client action required
                </div>
              )}
            </div>
          </Link>
          <Link to={`/contractors-overview/${data.id}`}>
            <div style={{ height: "45px" }}>
              <div className="float-end ms-2">
                <h5 className="font-size-15">
                  {
                    companies.filter(
                      item =>
                        item.id.toString() == data.client_company.toString()
                    )[0]?.company_name
                  }
                  <p className="mb-0 text-muted font-size-12">Client company</p>
                </h5>
              </div>
              <div>
                <h5 className="font-size-15">
                  <Link
                    to={`/contractors-overview/${data.id}`}
                    className="text-dark"
                  >
                    {data.engagement_name +
                      (contractorName != ""
                        ? "(" + contractorName + ")"
                        : contractorName)}
                    {/* <p className="mb-0 text-muted font-size-12">Engagement name</p> */}
                  </Link>
                </h5>
              </div>
            </div>
          </Link>
          {data.progress == 3 ? (
            userRole == "ir35pro" ? (
              <div>
                <div className="float-end ms-2">
                  <Button
                    className="btn btn-success"
                    onClick={() => copyFormLink(data.id)}
                  >
                    {copyString}
                  </Button>
                </div>
                <Link to={`/contractors-overview/${data.id}`}>
                  <div style={{ minHeight: "18px" }}>
                    <div className="font-size-15" style={{ color: "#343A40" }}>
                      {(data.hiring_manager_first_name == "undefined"
                        ? ""
                        : data.hiring_manager_first_name) +
                        " " +
                        (data.hiring_manager_last_name == "undefined"
                          ? ""
                          : data.hiring_manager_last_name)}
                    </div>
                    <p className="mb-0 text-muted font-size-12">
                      Hiring manager name
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to={`/contractors-overview/${data.id}`}>
                <div>
                  <div className="float-end ms-2">
                    <div
                      className={classNames(
                        "badge rounded-pill font-size-15",
                        ir35Status[data.ir_status]
                      )}
                    >
                      {data.ir_status}
                    </div>
                    <p
                      className="mb-0 text-muted font-size-12"
                      style={{ textAlign: "right" }}
                    >
                      IR35Pro status
                    </p>
                  </div>
                  <div style={{ minHeight: "18px" }}>
                    <div className="font-size-15" style={{ color: "#343A40" }}>
                      {(data.hiring_manager_first_name == "undefined"
                        ? ""
                        : data.hiring_manager_first_name) +
                        " " +
                        (data.hiring_manager_last_name == "undefined"
                          ? ""
                          : data.hiring_manager_last_name)}
                    </div>
                    <p className="mb-0 text-muted font-size-12">
                      Hiring manager name
                    </p>
                  </div>
                </div>
              </Link>
            )
          ) : (
            <Link to={`/contractors-overview/${data.id}`}>
              <div>
                {data.is_draft == "true" || data.is_draft == true ? (
                  <div className="float-end ms-2">
                    <Link
                      className="btn btn-primary"
                      to={
                        data.tabID > 5
                          ? "/form-survey/" + data.id
                          : "/add-contractor?" + data.id
                      }
                    >
                      Continue Filling
                    </Link>
                  </div>
                ) : (
                  <div className="float-end ms-2">
                    <div
                      className={classNames(
                        "badge rounded-pill font-size-15",
                        ir35Status[data.ir_status]
                      )}
                    >
                      {data.ir_status == "under_assessment"
                        ? "under assessment"
                        : data.ir_status}
                    </div>
                    <p
                      className="mb-0 text-muted font-size-12"
                      style={{ textAlign: "right" }}
                    >
                      IR35Pro status
                    </p>
                  </div>
                )}
                <div style={{ minHeight: "18px" }}>
                  <div className="font-size-15" style={{ color: "#343A40" }}>
                    {(data.hiring_manager_first_name == "undefined"
                      ? ""
                      : data.hiring_manager_first_name) +
                      " " +
                      (data.hiring_manager_last_name == "undefined"
                        ? ""
                        : data.hiring_manager_last_name)}
                  </div>
                  <p className="mb-0 text-muted font-size-12">
                    Hiring manager name
                  </p>
                </div>
              </div>
            </Link>
          )}
          <div
            className={!data.is_draft || data.is_draft == "false" ? "mt-4" : ""}
          >
            {userRole == "ir35pro" &&
              (!data.is_draft || data.is_draft == "false") ? (
              <div className="float-end">
                <select
                  value={
                    data.statuses == "undefined" || data.statuses == ""
                      ? "predefined statuses"
                      : data.statuses
                  }
                  className="form-select"
                  id="filter_ir35status"
                  onChange={e => {
                    change_statuses(e, data.id)
                  }}
                  style={{ marginRight: "10px" }}
                >
                  <option value="predefined statuses">
                    Predefined statuses
                  </option>
                  <option value="ir35 pro reviewing">IR35 Pro reviewing</option>
                  <option value="client action required">
                    Client action required
                  </option>
                </select>
              </div>
            ) : (
              ""
            )}
            {userRole == "ir35pro" &&
              (!data.is_draft || data.is_draft == "false") ? (
              <div>
                <h5 className="font-size-15">
                  {data.assign_users.length == 0 ? (
                    <Link
                      to=""
                      className="text-dark"
                      onClick={e => assignUsers(e)}
                    >
                      <span className="assign-container">
                        <i className="bx bx-user-plus assign-icon"></i>
                        assign IR35Pro users
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to=""
                      className="text-dark"
                      onClick={e => assignUsers(e)}
                    >
                      <span className="assign-container">
                        {map(assignUsersName, (item, index) => {
                          return (
                            <span
                              key={index}
                              className="avatar-title rounded-circle"
                              style={{ width: "30px", height: "30px" }}
                            >
                              {item.charAt(0)}
                            </span>
                          )
                        })}
                      </span>
                    </Link>
                  )}
                </h5>
                <ul
                  id={"pro_user_list_" + data.id}
                  className="pro-users-list d-none"
                >
                  {map(usersList, (user, index) =>
                    user.userrole == "ir35pro" ? (
                      <li key={index}>
                        <Link
                          to=""
                          onClick={e => onClickUser(e, user.id, data.id)}
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ display: "flex", width: "100%" }}>
                            <span
                              className="avatar-title rounded-circle"
                              style={{ maxWidth: "20px", marginRight: "5px" }}
                            >
                              {user.first_name.charAt(0)}
                            </span>
                            <span>
                              {user.first_name + " " + user.last_name}
                            </span>
                          </div>
                          {data.assign_users.includes(user.id) ? (
                            <i className="bx bx-comment-check"></i>
                          ) : (
                            ""
                          )}
                        </Link>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

CardTaskBox.propTypes = {
  data: PropTypes.object,
  dragging: PropTypes.any,
  userList: PropTypes.any,
  companies: PropTypes.any,
  clientForms: PropTypes.any,
}

export default CardTaskBox
