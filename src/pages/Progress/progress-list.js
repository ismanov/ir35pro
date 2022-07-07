import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { isEmpty, map } from "lodash"
import { Link, withRouter } from "react-router-dom"
import classNames from "classnames"
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import { getCompanies as onGetCompanies } from "store/company/actions"

import ReactApexChart from "react-apexcharts"
//Import Images

import {
  getProgresses as onGetProgresses,
  updateContractor as onUpdateContractor,
  deleteContractor as onDeleteContractor,
} from "store/actions"
import {
  options,
  statusClasses,
  progressLisProgressList,
} from "common/data/progress"
import * as moment from "moment"

//redux
import { useSelector, useDispatch } from "react-redux"
import { AvForm, AvField } from "availity-reactstrap-validation"
import "assets/scss/tasks.scss"

const ProgressList = props => {
  const dispatch = useDispatch()

  const progresses = props.progresses
  const companies = props.companies
  const clientForms = props.clientForms

  debugger

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [contractorList, setContractorList] = useState([])

  const [newData, setnewData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [monthlyData, setmonthlyData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])

  const [userRole, setUserRole] = useState("user")

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
    let nTemp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let mTemp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    progresses.forEach(element => {
      if (element.id < 8) {
        element.cards.forEach(progress => {
          const startMonth = new Date(progress.start_date).getMonth()
          nTemp[startMonth]++
        })
      } else {
        element.cards.forEach(progress => {
          const startMonth1 = new Date(progress.start_date).getMonth()
          mTemp[startMonth1]++
        })
      }
    })
    setnewData(nTemp)
    setmonthlyData(mTemp)
  }, [progresses])

  function getContractorName(id) {
    let clientForm = []
    map(clientForms, (item, index) => {
      if (item.contractor == id) {
        clientForm.push(item)
      }
    })
    if (clientForm.length == 1) {
      return (
        "(" + (clientForm[0].first_name + " " + clientForm[0].last_name) + ")"
      )
    } else if (clientForm.length > 1) {
      let todayDate = new Date()
      let firstDate = new Date(clientForm[0].createdAt)
      let minVal = todayDate - firstDate
      let contractorName =
        clientForm[0].first_name + " " + clientForm[0].last_name
      for (let i = 1; i < clientForm.length; i++) {
        let dateTemp = new Date(clientForm[i].createdAt)
        if (minVal > todayDate - dateTemp) {
          minVal = todayDate - dateTemp
          contractorName =
            clientForm[i].first_name + " " + clientForm[i].last_name
        }
      }
      return "(" + contractorName + ")"
    } else {
      return ""
    }
  }

  const toggle = () => {
    setModal(!modal)
  }

  const handleContractorClick = arg => {
    const contractor = arg
    setContractorList({
      id: contractor.id,
      engagement_name: contractor.engagement_name,
      client_company: contractor.client_company,
      hiring_manager_first_name: contractor.hiring_manager_first_name,
      hiring_manager_last_name: contractor.hiring_manager_last_name,
      hiring_manager_email: contractor.hiring_manager_email,
      ir_status: contractor.ir_status,
      progress: contractor.progress,
      hiring_manager_phone: contractor.hiring_manager_phone,
      reason_recruit: contractor.reason_recruit,
      agency_name: contractor.agency_name,
      recruiter_name: contractor.recruiter_name,
      day_rate: contractor.day_rate,
      recruiter_email: contractor.recruiter_email,
      recruiter_phone: contractor.recruiter_phone,
    })

    setIsEdit(true)
    toggle()
  }

  const handleValidDate = date => {
    if (date == null) {
      return "-"
    }
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const handleDeleteContractor = contractor => {
    dispatch(onDeleteContractor(contractor))
  }

  const handleValidContractorSubmit = (e, values) => {
    switch (values.progress) {
      case "contractor ir35 assessment":
        values.progress = 0
        break
      case "ir35 status decision":
        values.progress = 1
        break
      case "confirm contractor":
        values.progress = 2
        break
      case "contractor onboarding":
        values.progress = 3
        break
      case "sow drafting":
        values.progress = 4
        break
      case "sow review":
        values.progress = 5
        break
      case "document approvals":
        values.progress = 6
        break
      case "monthly monitoring":
        values.progress = 7
        break
    }
    if (isEdit) {
      const updateContractor = {
        id: contractorList.id,
        engagement_name: values.engagement_name,
        client_company: values.client_company,
        hiring_manager_first_name: values.hiring_manager_first_name,
        hiring_manager_last_name: values.hiring_manager_last_name,
        hiring_manager_email: values.hiring_manager_email,
        ir_status: values.ir_status,
        progress: values.progress,
        hiring_manager_phone: values.hiring_manager_phone,
        agency_name: values.agency_name,
        recruiter_name: values.recruiter_name,
        reason_recruit: values.reason_recruit,
        day_rate: values.day_rate,
        recruiter_email: values.recruiter_email,
        recruiter_phone: values.recruiter_phone,
      }

      // update contractor
      dispatch(onUpdateContractor(updateContractor))
    }
    toggle()
  }

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={8}>
            {map(progresses, (progress, i) => (
              <Card key={i}>
                <CardBody>
                  <CardTitle className="mb-4">{progress.title}</CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        {map(progress.cards, (item, i) => (
                          <tr key={i}>
                            <td>
                              <h5 className="text-truncate font-size-14 m-0">
                                <Link
                                  to={`/contractors-overview/${item.id}`}
                                  className="text-dark"
                                >
                                  {item.engagement_name +
                                    getContractorName(item.id)}
                                </Link>
                              </h5>
                            </td>
                            <td>
                              <div className="text-center">
                                {
                                  companies.filter(
                                    element =>
                                      element.id.toString() ==
                                      item.client_company.toString()
                                  )[0]?.company_name
                                }
                              </div>
                            </td>
                            <td>
                              <div
                                className="text-center"
                                style={{
                                  textOverflow: "clip",
                                  overflow: "auto",
                                  whiteSpace: "nowrap",
                                  maxWidth: "680px",
                                }}
                              >
                                {item.reason_recruit}
                              </div>
                            </td>
                            <td>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  href="#"
                                  className="card-drop"
                                  tag="i"
                                >
                                  <i className="mdi mdi-dots-horizontal font-size-18" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem
                                    href="#"
                                    onClick={() => handleContractorClick(item)}
                                  >
                                    <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    onClick={() => handleDeleteContractor(item)}
                                  >
                                    <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} tag="h4">
                        Edit Contractor
                      </ModalHeader>
                      <ModalBody>
                        <AvForm onValidSubmit={handleValidContractorSubmit}>
                          <Row>
                            <Col xs={12}>
                              <div className="mb-3">
                                <AvField
                                  name="engagement_name"
                                  label="Engagement name"
                                  type="text"
                                  errorMessage="Invalid engagement name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.engagement_name || ""}
                                />
                              </div>
                              <div className="mb-3">
                                <AvField
                                  name="client_company"
                                  type="text"
                                  value={contractorList.client_company || ""}
                                  hidden
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={6}>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_first_name"
                                  label="Hiring manager first name"
                                  type="text"
                                  errorMessage="Invalid hiring manager first name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    contractorList.hiring_manager_first_name ||
                                    ""
                                  }
                                />
                              </div>
                            </Col>
                            <Col xs={6}>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_last_name"
                                  label="Hiring manager last name"
                                  type="text"
                                  errorMessage="Invalid hiring manager last name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    contractorList.hiring_manager_last_name ||
                                    ""
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={6}>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_email"
                                  label="Hiring manager email"
                                  type="email"
                                  errorMessage="Invalid hiring manager email"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    contractorList.hiring_manager_email || ""
                                  }
                                />
                              </div>
                            </Col>
                            <Col xs={6}>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_phone"
                                  label="Hiring manager phone"
                                  mask="(999) 999-9999"
                                  errorMessage="Invalid hiring manager phone"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={
                                    contractorList.hiring_manager_phone || ""
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={3}>
                              <div className="mb-3">
                                <AvField
                                  name="day_rate"
                                  label="Expected Day Rate"
                                  type="number"
                                  errorMessage="Invalid day rate"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.day_rate || ""}
                                />
                              </div>
                            </Col>
                            <Col xs={9}>
                              <div className="mb-3">
                                <AvField
                                  name="agency_name"
                                  label="Agency Name"
                                  type="text"
                                  errorMessage="Invalid agency name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.agency_name || ""}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4}>
                              <div className="mb-3">
                                <AvField
                                  name="recruiter_name"
                                  label="Recruiter Contact Name"
                                  type="text"
                                  errorMessage="Invalid name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.recruiter_name || ""}
                                />
                              </div>
                            </Col>
                            <Col xs={4}>
                              <div className="mb-3">
                                <AvField
                                  name="recruiter_email"
                                  label="Recruiter Email"
                                  type="email"
                                  errorMessage="Invalid email"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.recruiter_email || ""}
                                />
                              </div>
                            </Col>
                            <Col xs={4}>
                              <div className="mb-3">
                                <AvField
                                  name="recruiter_phone"
                                  label="Recruiter Phone"
                                  type="string"
                                  errorMessage="Invalid phone"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.recruiter_phone || ""}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12}>
                              <div className="mb-3">
                                <AvField
                                  name="reason_recruit"
                                  label="Reason for recruiting"
                                  type="textarea"
                                  errorMessage="Invalid reason for recruiting"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.reason_recruit || ""}
                                />
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="ir_status"
                                  className="form-select"
                                  value={contractorList.ir_status || "inside"}
                                  hidden
                                ></AvField>
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="progress"
                                  className="form-select"
                                  value={
                                    contractorList.progress ||
                                    "contractor ir35 assessment"
                                  }
                                  hidden
                                ></AvField>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="text-end">
                                <button
                                  type="submit"
                                  className="btn btn-success save-user"
                                >
                                  Save
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </AvForm>
                      </ModalBody>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <CardTitle className="mb-3">Contractors </CardTitle>
                <ReactApexChart
                  options={options}
                  series={[
                    {
                      name: "New Contractors",
                      type: "column",
                      data: newData,
                    },
                    {
                      name: " Monthly Monitoring",
                      type: "line",
                      data: monthlyData,
                    },
                  ]}
                  type="line"
                  height={280}
                  className="apex-charts"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

ProgressList.propTypes = {
  progresses: PropTypes.any,
  companies: PropTypes.any,
  clientForms: PropTypes.any,
}

export default ProgressList
