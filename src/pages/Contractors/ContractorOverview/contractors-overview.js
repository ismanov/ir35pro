import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap"

import {
  getContractorDetail as onGetContractorDetail,
  getDocsList as onGetDocsList,
} from "store/actions"
import { getCompanies as onGetCompanies } from "store/company/actions"

import ContractorDetail from "./contractorDetail"
import ContractorStatus from "./contractor-status"
import IRClientSurveyForm from "./ir35-client-survey"

//redux
import { useSelector, useDispatch } from "react-redux"
import axiosApi from "helpers/api_helper"
import IRClientSurveyFormInfo from "./ir35-client-survey-info"
import IRClientClientFormInfo from "./ir35-client-form-info"
import IRDocList from "./ir35-doc-list"
import AuditTrail from "./audit-trail"
import moment from "moment"
import Comments from "./comments"

import iconArchive from "assets/images/archive.png"
import iconExport from "assets/images/export.png"
import ContractorDetailTop from "./contractorDetailTop"

const ContractorsOverview = props => {
  const dispatch = useDispatch()

  const { contractorDetail, docList, companies } = useSelector(state => ({
    contractorDetail: state.projects.contractorDetail,
    docList: state.projects.docslist,
    companies: state.company.companies,
  }))

  const [surveyForm, setSurveyForm] = useState(null)
  const [clientForm, setClientForm] = useState(null)
  const [auditTrail, setAuditTrail] = useState(null)
  const [comments, setComments] = useState(null)
  const [userRole, setUserRole] = useState("user")

  const [showArchivePop, setShowArchivePop] = useState(false)
  const [changeArchive, setChangeArchive] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    match: { params },
  } = props

  useEffect(() => {
    dispatch(onGetCompanies())
  }, [])

  useEffect(async () => {
    if (params && params.id) {
      dispatch(onGetContractorDetail(params.id))
      dispatch(onGetDocsList(params.id))
    } else {
      dispatch(onGetContractorDetail(0))
      dispatch(onGetDocsList(0))
    }
  }, [params, onGetContractorDetail, onGetDocsList])

  useEffect(async () => {
    await axiosApi()
      .get(`api/get-survey/${params.id}`)
      .then(response => {
        setSurveyForm(response.data.surveyform)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(async () => {
    await axiosApi()
      .get(`api/get-client-form/${params.id}`)
      .then(response => {
        setClientForm(response.data.clientform)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(async () => {
    await axiosApi()
      .get(`api/get-audit/${params.id}`)
      .then(response => {
        setAuditTrail(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(async () => {
    await axiosApi()
      .get(`api/get-comments/${params.id}`)
      .then(response => {
        setComments(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    onLoad()
  }, [])

  function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole)
    }
  }

  const handleValidDate = date => {
    if (date == null) {
      return "-"
    }
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }
  const handleValidMessageDate = date => {
    if (date == null) {
      return "-"
    }
    const date1 = moment(new Date(date)).format("hh:mm MMM DD Y")
    return date1
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement("a")
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportContractor = () => {
    let csvContent = ""
    let lineArray = []

    lineArray.push(
      contractorDetail
        ? "Engagement name," + contractorDetail.engagement_name
        : ""
    )
    lineArray.push(
      contractorDetail ? "ID," + contractorDetail.contractor_id : ""
    )
    lineArray.push(
      clientForm
        ? "Fullname," + clientForm.first_name + " " + clientForm.last_name
        : ""
    )
    lineArray.push(clientForm ? "Email," + clientForm.email : "")
    lineArray.push(clientForm ? "Phone," + clientForm.phone_number : "")
    lineArray.push(
      clientForm ? "Ltd company name," + clientForm.ltd_company_name : ""
    )
    lineArray.push(
      clientForm ? "Main Contact Number," + clientForm.ltd_company_number : ""
    )
    lineArray.push(
      contractorDetail
        ? "Hiring manager name," +
        contractorDetail.hiring_manager_first_name +
        " " +
        contractorDetail.hiring_manager_last_name
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Hiring manager email," + contractorDetail.hiring_manager_email
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Hiring manager number," + contractorDetail.hiring_manager_phone
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Client company," +
        companies.filter(
          item =>
            item.id.toString() == contractorDetail.client_company.toString()
        )[0]?.company_name
        : ""
    )
    lineArray.push(
      contractorDetail ? "Agency name," + contractorDetail.agency_name : ""
    )
    lineArray.push(
      contractorDetail
        ? "Recruiter Contact Name," + contractorDetail.recruiter_name
        : ""
    )
    lineArray.push(
      contractorDetail ? "Day rate," + contractorDetail.day_rate : ""
    )
    lineArray.push(
      contractorDetail
        ? "Start date," + handleValidDate(contractorDetail.start_date)
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Expected Duration," + handleValidDate(contractorDetail.end_date)
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Recruiter Email," + contractorDetail.recruiter_email
        : ""
    )
    lineArray.push(
      contractorDetail
        ? "Recruiter Phone," + contractorDetail.recruiter_phone
        : ""
    )
    lineArray.push("Contractor Survey Info")
    lineArray.push(
      clientForm
        ? "Are you an office holder of the end Client?," +
        clientForm.recruitment_1
        : ""
    )
    lineArray.push(
      clientForm
        ? "Will you be hiring any of your own employees to help complete the work?," +
        clientForm.recruitment_2
        : ""
    )
    lineArray.push(
      clientForm
        ? "Did the Client interview you?," + clientForm.recruitment_3
        : ""
    )
    lineArray.push(
      clientForm
        ? "Will you be working onsite at the Client' s premises?," +
        clientForm.recruitment_4
        : ""
    )
    lineArray.push(
      clientForm
        ? "If so, is this due to data or security issues?," +
        clientForm.recruitment_5
        : ""
    )
    lineArray.push(
      clientForm
        ? "Will you be using your own laptop or the Client' s laptop?," +
        clientForm.recruitment_6
        : ""
    )
    lineArray.push(
      clientForm
        ? "Do you hold professional indemnity insurance?," +
        clientForm.recruitment_7
        : ""
    )
    lineArray.push(
      clientForm
        ? "Does your business have it' s own website?," +
        clientForm.recruitment_8
        : ""
    )
    lineArray.push(
      clientForm
        ? "Will you be carrying out work for other Clients at the same time?," +
        clientForm.recruitment_9
        : ""
    )
    lineArray.push("Client IR35Pro Survey Info")
    lineArray.push(
      surveyForm
        ? "Will the assignment involve completing specific deliverables or objectives that could be defined at the commencement of the engagement?," +
        (surveyForm.client_survey_1 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Do you expect th)e contractor engagement to terminate immediately once these deliverable objectives have been completed?," +
        (surveyForm.client_survey_2 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Will the contractor' s personnel hold a specific role within your Organisational chart or otherwise appear to be part of your structure?," +
        (surveyForm.client_survey_3 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Would you be prepared to accept a suitably qualified, skilled and experienced substitute to deliver the Services if the Contractor had the need to do so?," +
        (surveyForm.client_survey_4 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Do you wish to have a right of supervision, direction or control over the contractor and its personnel?," +
        (surveyForm.client_survey_5 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Does the contractor and its personnel have discretion to decide how and where the services are to be performed?," +
        (surveyForm.client_survey_6 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Will the contractor and its personnel entitled to employment benefits?," +
        (surveyForm.client_survey_7 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Do you expect to move the contractor and its personnel from task to task without their prior agreement?," +
        (surveyForm.client_survey_8 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Would you be prepared to commence litigation against the contractor if they committed a serious breach of contract?," +
        (surveyForm.client_survey_9 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Is the contractor required to obtain the client' s permission before providing services to other clients where there is no risk of a conflict of interest?," +
        (surveyForm.client_survey_10 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "What is the basis of payment? Fixed amount, completion of milestones, hourly daily or monthly/weekly salary?," +
        (surveyForm.client_survey_11 == "fixed"
          ? "Fixed amount for delivery"
          : surveyForm.client_survey_11 == "hourly"
            ? "Hourly/Daily rate"
            : "Set weekly/monthly salary")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Would you expect the Contractor to correct any sub-standard work or defects on their own time/at their own cost?," +
        (surveyForm.client_survey_12 ? "Yes" : "No")
        : ""
    )
    lineArray.push(
      surveyForm
        ? "Will the contractor be required to undertake any HR functions (disciplinary, grievance, etc) directly affecting the client' s employees?," +
        (surveyForm.client_survey_13 ? "Yes" : "No")
        : ""
    )
    lineArray.push("Comments")
    comments
      ? map(comments, (comment, index) =>
        lineArray.push(
          handleValidMessageDate(comment.created_time) +
          "," +
          comment.comments +
          "," +
          comment.author
        )
      )
      : ""
    lineArray.push("Audit Trail")
    auditTrail
      ? map(auditTrail, (audit, index) =>
        lineArray.push(
          handleValidMessageDate(audit.created_time) + "," + audit.message
        )
      )
      : ""
    csvContent = lineArray.join("\n")
    downloadFile({
      data: csvContent,
      fileName: "contractor_info.csv",
      fileType: "text/csv",
    })
  }

  const onArchive = async status => {
    setShowArchivePop(true)
    if (status == "under_assessment") {
      setChangeArchive("unarchived")
    } else {
      setChangeArchive(status)
    }
    document.body.style.overflowY = "hidden"
  }

  const closeArchivePopup = () => {
    setShowArchivePop(false)
    document.body.style.overflowY = "auto"
  }

  const closeFileErrorPopup = () => {
    document.getElementById("file-error-pop").style.display = "none"
    document.body.style.overflowY = "auto"
  }

  const onChangeArchive = async e => {
    e.target.disabled = true
    setLoading(true)
    const data = {
      ir_status:
        changeArchive == "unarchived" ? "under_assessment" : changeArchive,
    }
    await axiosApi()
      .put(`api/archive-contractor/${params.id}`, data)
      .then(response => {
        window.location.reload()
      })
      .catch(err => {
        throw err
      })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1, string.length - 1)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Contractor Overview | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <div
            className="breadcrumb"
            style={{ justifyContent: "space-between" }}
          >
            <div className="title-container">
              <Link
                to="#"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  borderBottom: "solid 2px #00aeef",
                  marginRight: "24px",
                }}
              >
                CONTRACTOR OVERVIEW
              </Link>
              <Link
                to="/i/chat"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#A0A5B2",
                  marginRight: "24px",
                }}
              >
                MESSAGE
              </Link>
              <Link
                to={`/my-tasks?contractorId=${contractorDetail?.id || ""}`}
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#A0A5B2",
                  marginRight: "24px",
                }}
              >
                MY TASKS
              </Link>
            </div>
            <div className="breadcrumbs">Contractors / Contractor Overview</div>
          </div>

          {!isEmpty(contractorDetail) && (
            <>
              <Row>
                <Col lg="12">
                  <ContractorDetailTop clientform={clientForm} />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <ContractorDetail
                    contractor={contractorDetail}
                    contractorID={params.id}
                  />
                </Col>
              </Row>
              <Row>
                {userRole == "ir35pro" ? (
                  <Col xs="4">
                    <IRClientSurveyForm contractorId={params.id} />
                  </Col>
                ) : null}
                <Col xs="4">
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: "center" }}>
                        <button
                          onClick={() => exportContractor()}
                          style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            background: "transparent",
                            border: "none",
                          }}
                        >
                          <img
                            src={iconExport}
                            alt="export"
                            style={{ marginRight: "1rem" }}
                          />
                          Export Info to CSV
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="4">
                  <Card>
                    <CardBody>
                      <div style={{ textAlign: "center" }}>
                        {contractorDetail.ir_status !== "archived" ? (
                          <button
                            onClick={() => onArchive("archived")}
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              background: "transparent",
                              border: "none",
                            }}
                          >
                            <img
                              src={iconArchive}
                              alt="archive"
                              style={{ marginRight: "1rem" }}
                            />
                            Archive Contractor
                          </button>
                        ) : (
                          <button
                            onClick={() => onArchive("under_assessment")}
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              background: "transparent",
                              border: "none",
                            }}
                          >
                            <img
                              src={iconArchive}
                              alt="unarchive"
                              style={{ marginRight: "1rem" }}
                            />
                            Unarchive Contractor
                          </button>
                        )}
                      </div>
                      <div
                        className="success-container"
                        id="file-error-pop"
                        style={{ display: "none" }}
                      >
                        <div className="success-card">
                          <div className="close-button">
                            <button
                              className="btn"
                              onClick={() => {
                                closeFileErrorPopup()
                              }}
                            >
                              <i className="mdi mdi-close-thick"></i>
                            </button>
                          </div>
                          <div className="success-icon">
                            <i
                              className="mdi mdi-alert-circle"
                              style={{ fontSize: "30px" }}
                            ></i>
                          </div>
                          <div
                            className="mt-2"
                            style={{ fontWeight: "500", fontSize: "14px" }}
                          >
                            The file size is too large.
                            <br />
                            Choose a file that is less than 5 MB.
                          </div>
                        </div>
                      </div>
                      {showArchivePop ? (
                        <div className="success-container" id="archive-pop">
                          <div className="success-card">
                            <div className="close-button">
                              <button
                                className="btn"
                                onClick={() => {
                                  closeArchivePopup()
                                }}
                              >
                                <i className="mdi mdi-close-thick"></i>
                              </button>
                            </div>
                            <div className="success-icon">
                              <i
                                className="mdi mdi-alert-circle"
                                style={{ fontSize: "30px" }}
                              ></i>
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                padding: "10px 0 20px 0",
                              }}
                            >
                              {capitalizeFirstLetter(changeArchive)} Contractor
                            </div>
                            <div
                              className="mt-2"
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                paddingBottom: "20px",
                              }}
                            >
                              Do you really want to complete this action? This
                              contractor will be{" "}
                              {changeArchive == "unarchived"
                                ? "under assessment"
                                : changeArchive}
                              .
                            </div>
                            <div className="mt-4 go-btn-container">
                              <button
                                onClick={() => {
                                  closeArchivePopup()
                                }}
                                className="btn btn-primary"
                                style={{
                                  color: "#495057",
                                  background: "transparent",
                                  width: "130px",
                                  marginRight: "10px",
                                }}
                              >
                                No, Keep It
                              </button>
                              <button
                                onClick={e => {
                                  onChangeArchive(e)
                                }}
                                className="btn btn-primary"
                                style={{
                                  minWidth: "140px",
                                  marginLeft: "10px",
                                  position: "relative",
                                }}
                              >
                                Yes, {capitalizeFirstLetter(changeArchive)}
                                {loading ? (
                                  <Spinner
                                    animation="border"
                                    style={{
                                      position: "absolute",
                                      width: "16px",
                                      height: "16px",
                                      borderWidth: "1px",
                                      right: "5px",
                                      top: "10px",
                                    }}
                                  />
                                ) : null}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <ContractorStatus contractor={contractorDetail} />
                </Col>
              </Row>
              {surveyForm != null ? (
                <Row>
                  <Col lg="12">
                    <IRClientSurveyFormInfo
                      surveyFormInfo={surveyForm}
                      contractorID={params.id}
                    />
                  </Col>
                </Row>
              ) : (
                ""
              )}

              {clientForm != null ? (
                <Row>
                  <Col lg="12">
                    <IRClientClientFormInfo
                      clientFormInfo={clientForm}
                      contractorID={params.id}
                    />
                  </Col>
                </Row>
              ) : (
                ""
              )}

              <Row>
                <Col lg="12">
                  <IRDocList docList={docList} id={params.id} />
                </Col>
              </Row>
              {userRole == "ir35pro" ?
                <Row>
                  <Col lg="12">
                    <Comments comments={comments} id={params.id} />
                  </Col>
                </Row> : null}

              <Row>
                <Col lg="12">
                  <AuditTrail auditTrail={auditTrail} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ContractorsOverview.propTypes = {
  match: PropTypes.object,
}

export default withRouter(ContractorsOverview)
