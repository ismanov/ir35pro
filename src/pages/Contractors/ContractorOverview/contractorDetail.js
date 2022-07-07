import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Media, Row } from "reactstrap"
import * as moment from "moment"
import { getCompanies as onGetCompanies } from "store/company/actions"
import { useDispatch, useSelector } from "react-redux"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { map } from "lodash"
import { Link } from "react-router-dom"
import axiosApi from "helpers/api_helper"
// import { setEditingMessage } from "store/actions";

const ContractorDetail = props => {
  const dispatch = useDispatch()

  const contractor = props.contractor
  const clientform = props.clientform
  const contractorID = props.contractorID

  const { companies = [] } = useSelector(state => ({
    companies: state.company.companies,
  }))

  const [editDetails, setEdit] = useState(false)
  const [userRole, setUserRole] = useState("user")
  const [showDetailsPop, setshowDetailsPop] = useState(false)

  useEffect(() => {
    onLoad()
  }, [])

  function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole)
    }
  }

  useEffect(() => {
    dispatch(onGetCompanies())
  }, [])

  const defaultValues = {
    recruiter_email: contractor.recruiter_email,
    recruiter_phone: contractor.recruiter_phone,
    engagement_name: contractor.engagement_name,
    reason_recruit: contractor.reason_recruit,
    hiring_manager_first_name: contractor.hiring_manager_first_name,
    hiring_manager_last_name: contractor.hiring_manager_last_name,
    hiring_manager_phone: contractor.hiring_manager_phone,
    hiring_manager_email: contractor.hiring_manager_email,
    agency_name: contractor.agency_name,
    start_date: contractor.start_date,
    end_date: contractor.end_date,
    client_company: contractor.client_company,
  }

  const [detailValues, setDetailValues] = useState(defaultValues)

  const handleValidDate = date => {
    if (date == null) {
      return "-"
    }
    const date1 = moment(new Date(date)).format("yyyy-MM-DD")
    return date1
  }

  const setEditDetails = val => {
    setEdit(val)
    if (val == false) {
      changeValue(defaultValues)
    }
  }

  const changeValue = value => {
    setDetailValues(detailValues => ({
      ...detailValues,
      ...value,
    }))
  }

  const closeDetailsPopup = () => {
    document.body.style.overflowY = "auto"
    window.location.reload()
  }

  const handleValidSubmit = async values => {
    try {
      const updateReqData = {
        id: contractorID,
        recruiter_email: values.recruiter_email,
        recruiter_phone: values.recruiter_phone,
        engagement_name: values.engagement_name,
        reason_recruit: values.reason_recruit,
        hiring_manager_first_name: values.hiring_manager_first_name,
        hiring_manager_last_name: values.hiring_manager_last_name,
        hiring_manager_phone: values.hiring_manager_phone,
        hiring_manager_email: values.hiring_manager_email,
        agency_name: values.agency_name,
        start_date: values.start_date,
        end_date: values.end_date,
        client_company: values.client_company,
      }
      await axiosApi()
        .put(`api/update-contractor`, updateReqData)
        .then(response => {
          setshowDetailsPop(true)
          document.body.style.overflowY = "hidden"
        })
        .catch(err => {
          throw err
        })
    } catch (err) {
      throw err
    }
  }

  const copyContractorID = id => {
    var textField = document.createElement('textarea')
    textField.innerText = id
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  };

  return (
    <Card>
      <CardBody>
        {showDetailsPop ? (
          <div className="success-container" id="details-pop">
            <div className="success-card">
              <div className="success-icon">
                <i
                  className="mdi mdi-check-circle"
                  style={{ fontSize: "30px" }}
                ></i>
              </div>
              <div
                className="mt-2"
                style={{ fontWeight: "500", fontSize: "14px" }}
              >
                Changed Contractor Details Data scucessfully.
              </div>
              <div className="mt-4 go-btn-container">
                <button
                  onClick={() => {
                    closeDetailsPopup()
                  }}
                  className="btn btn-primary"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <Media className="overflow-hidden" body>
          {userRole == "ir35pro" ? (
            editDetails ? (
              <Link
                to="#"
                style={{
                  color: "#A0A5B2",
                  fontSize: "16px",
                  position: "absolute",
                  top: "40px",
                  right: "40px",
                  zIndex: "99",
                }}
                onClick={() => {
                  setEditDetails(false)
                }}
              >
                <i className="mdi mdi-close-thick"></i>
              </Link>
            ) : (
              <Link
                to="#"
                style={{
                  color: "#A0A5B2",
                  fontSize: "16px",
                  position: "absolute",
                  top: "40px",
                  right: "40px",
                  zIndex: "99",
                }}
                onClick={() => {
                  setEditDetails(true)
                }}
              >
                <i className="mdi mdi-square-edit-outline"></i>
              </Link>
            )
          ) : null}
          <AvForm
            id="overview-details"
            model={defaultValues}
            onValidSubmit={(e, v) => {
              handleValidSubmit(v)
            }}
          >
            <Row className="mx-4">
              <h5 className="font-size-15 mt-4" style={{ fontWeight: "600" }}>
                Assignment Details
              </h5>
            </Row>
            {clientform ? (
              <Row className="mx-4">
                <Col sm="4" xs="6">
                  <div className="mt-2">
                    <div
                      className="font-size-12"
                      style={{ color: "#495057", opacity: "0.4" }}
                    >
                      FULL NAME
                    </div>
                    <div
                      className="font-size-14 mb-0"
                      style={{ color: "#495057" }}
                    >
                      {clientform.first_name + " " + clientform.last_name}
                    </div>
                  </div>
                </Col>

                <Col sm="4" xs="6">
                  <div className="mt-2">
                    <div
                      className="font-size-12"
                      style={{ color: "#495057", opacity: "0.4" }}
                    >
                      NUMBER
                    </div>
                    <div
                      className="font-size-14 mb-0"
                      style={{ color: "#495057" }}
                    >
                      {clientform.phone_number}
                    </div>
                  </div>
                </Col>

                <Col sm="4" xs="6">
                  <div className="mt-2">
                    <div
                      className="font-size-12"
                      style={{ color: "#495057", opacity: "0.4" }}
                    >
                      EMAIL
                    </div>
                    <div
                      className="font-size-14 mb-0"
                      style={{ color: "#495057" }}
                    >
                      {clientform.email}
                    </div>
                  </div>
                </Col>
              </Row>
            ) : null}
            <Row className="m-4">
              <Col xs="6" className="mb-2">
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Contractor ID
                </div>
                <div
                  style={{
                    color: "#F1564A",
                    background: "#F1564A30",
                    display: "inline-block",
                    padding: "8px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {contractor.contractor_id}
                </div>
                <Link
                  to="#"
                  style={{
                    color: "#A0A5B2",
                    fontSize: "16px",
                    marginLeft: "10px",
                  }}
                  onClick={() => copyContractorID(contractor.contractor_id)}
                >
                  {" "}
                  <i className="mdi mdi-content-copy"></i>{" "}
                </Link>
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Client Company
                </div>
                <AvField
                  type="select"
                  className="form-select"
                  name="client_company"
                  multiple={false}
                  value={detailValues.client_company}
                  onChange={e => {
                    changeValue({ client_company: e.target.value })
                  }}
                  required
                  disabled={!editDetails}
                >
                  {map(companies, (item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.company_name}
                      </option>
                    )
                  })}
                </AvField>
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Recruiter Email
                </div>
                <AvField
                  name="recruiter_email"
                  type="email"
                  required
                  value={detailValues.recruiter_email}
                  onChange={e => {
                    changeValue({ recruiter_email: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Recruiter Number
                </div>
                <AvField
                  name="recruiter_phone"
                  type="text"
                  required
                  value={detailValues.recruiter_phone}
                  onChange={e => {
                    changeValue({ recruiter_phone: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Engagement Name
                </div>
                <AvField
                  name="engagement_name"
                  type="text"
                  required
                  value={detailValues.engagement_name}
                  onChange={e => {
                    changeValue({ engagement_name: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Reason for recruitment
                </div>
                <AvField
                  name="reason_recruit"
                  type="text"
                  required
                  value={detailValues.reason_recruit}
                  onChange={e => {
                    changeValue({ reason_recruit: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
            </Row>
            <Row className="mx-4 mb-4">
              <div style={{ fontSize: "15px", fontWeight: "600" }}>
                Hiring Manager Details
              </div>
            </Row>
            <Row className="mx-4">
              <Col xs="6" className="mb-2">
                {/* <div style={{ fontSize: "14px", fontWeight: "500" }}>Name</div> */}
                <div className="hiring-manager-name-container">
                  <AvField
                    name="hiring_manager_first_name"
                    type="text"
                    label="First Name"
                    required
                    value={detailValues.hiring_manager_first_name}
                    onChange={e => {
                      changeValue({ hiring_manager_first_name: e.target.value })
                    }}
                    disabled={!editDetails}
                  />
                  <AvField
                    name="hiring_manager_last_name"
                    type="text"
                    label="Last Name"
                    required
                    value={detailValues.hiring_manager_last_name}
                    onChange={e => {
                      changeValue({ hiring_manager_last_name: e.target.value })
                    }}
                    disabled={!editDetails}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Number
                </div>
                <AvField
                  name="hiring_manager_phone"
                  type="text"
                  required
                  value={detailValues.hiring_manager_phone}
                  onChange={e => {
                    changeValue({ hiring_manager_phone: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Email Address
                </div>
                <AvField
                  name="hiring_manager_email"
                  type="email"
                  required
                  value={detailValues.hiring_manager_email}
                  onChange={e => {
                    changeValue({ hiring_manager_email: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Agency Name
                </div>
                <AvField
                  name="agency_name"
                  type="text"
                  required
                  value={detailValues.agency_name}
                  onChange={e => {
                    changeValue({ agency_name: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Start Date
                </div>
                <AvField
                  name="start_date"
                  type="date"
                  required
                  value={handleValidDate(detailValues.start_date)}
                  onChange={e => {
                    changeValue({ start_date: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  Expected Duration
                </div>
                <AvField
                  name="end_date"
                  type="date"
                  required
                  value={handleValidDate(detailValues.end_date)}
                  onChange={e => {
                    changeValue({ end_date: e.target.value })
                  }}
                  disabled={!editDetails}
                />
              </Col>
            </Row>
            {editDetails ? (
              <Row className="m-4" style={{ justifyContent: "flex-end" }}>
                <Link
                  to="#"
                  className="btn"
                  onClick={() => {
                    setEditDetails(false)
                  }}
                  style={{
                    maxWidth: "140px",
                    marginRight: "20px",
                    border: "solid 1px #00aeef",
                  }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ maxWidth: "140px" }}
                >
                  Save Changes
                </button>
              </Row>
            ) : null}
          </AvForm>
        </Media>
      </CardBody>
    </Card>
  )
}

ContractorDetail.propTypes = {
  contractor: PropTypes.any,
  clientform: PropTypes.any,
  contractorID: PropTypes.any,
}

export default ContractorDetail
