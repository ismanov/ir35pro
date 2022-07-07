import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, withRouter } from "react-router-dom";
import { map } from "lodash";
import { isEmpty } from "lodash";
import * as moment from "moment";
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
  CardBody
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getContractors as onGetContractors,
  updateContractor as onUpdateContractor,
  deleteContractor as onDeleteContractor,
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { statusClasses, progressList, ir35Status } from "common/data/progress"

const ContractorsList = props => {
  const dispatch = useDispatch();

  const { contractors } = useSelector(state => ({
    contractors: state.projects.contractors,
  }));
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contractorList, setContractorList] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleContractorClick = arg => {
    const contractor = arg;
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
      start_date: contractor.start_date,
      reason_recruit: contractor.reason_recruit,
      day_rate: contractor.day_rate,
      agency_name: contractor.agency_name,
    });

    setIsEdit(true);

    toggle();
  };

  const handleDeleteContractor = contractor => {
    dispatch(onDeleteContractor(contractor));
  };

  /**
   * Handling submit contractor on contractor form
   */
  const handleValidContractorSubmit = (e, values) => {
    switch (values.progress) {
      case "contractor ir35 assessment":
        values.progress = 0;
        break;
      case "ir35 status decision":
        values.progress = 1;
        break;
      case "confirm contractor":
        values.progress = 2;
        break;
      case "contractor onboarding":
        values.progress = 3;
        break;
      case "sow drafting":
        values.progress = 4;
        break;
      case "sow review":
        values.progress = 5;
        break;
      case "document approvals":
        values.progress = 6;
        break;
      case "monthly monitoring":
        values.progress = 7;
        break;
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
        start_date: values.start_date,
        hiring_manager_phone: values.hiring_manager_phone,
        agency_name: values.agency_name,
        day_rate: values.day_rate,
        reason_recruit: values.reason_recruit
      };

      // update contractor
      dispatch(onUpdateContractor(updateContractor));
    }
    toggle();
  };

  useEffect(() => {
    dispatch(onGetContractors());
  }, [dispatch]);

  useEffect(() => {
    setContractorList(contractors);
  }, [contractors]);

  useEffect(() => {
    if (!isEmpty(contractors)) {
      setContractorList(contractors);
    }
  }, [contractors]);

  const handleValidDate = date => {
    if (date == "null") {
      return "-";
    }
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Contractors List | IR35Pro
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contractors" breadcrumbItem="Contractors List" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="mb-3" style={{ textAlign: 'right' }}>
                    <Link
                      to="/add-contractor"
                      className="btn btn-primary"
                    >Add New Contractor</Link>
                  </div>
                  <div className="table-responsive">
                    <Table className="contractor-list-table table-nowrap align-middle table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Engagement Name</th>
                          <th scope="col">Company Name</th>
                          <th scope="col">Hiring Manager Name</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">Agency Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Progress</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(contractors, (contractor, index) => (
                          <tr key={index}>
                            <td>
                              <h5 className="text-truncate font-size-14">
                                <Link
                                  to={`/contractors-overview/${contractor.id}`}
                                  className="text-dark"
                                >
                                  {contractor.engagement_name}
                                </Link>
                              </h5>
                              <p className="text-muted mb-0">
                                {contractor.reason_recruit}
                              </p>
                            </td>
                            <td>{contractor.client_company}</td>
                            <td>{contractor.hiring_manager_first_name + " " + contractor.hiring_manager_last_name}</td>
                            <td>{handleValidDate(contractor.start_date)}</td>
                            <td>{contractor.agency_name}</td>
                            <td>
                              <span
                                className={classNames(
                                  "badge rounded-pill font-size-11",
                                  ir35Status[contractor.ir_status]
                                )}
                              >{contractor.ir_status}
                              </span>
                            </td>
                            <td>
                              <span
                                className={classNames(
                                  "badge rounded-pill font-size-11",
                                  statusClasses[contractor.progress]
                                )}
                              >
                                {progressList[contractor.progress]}
                              </span>
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
                                    onClick={() => handleContractorClick(contractor)}
                                  >
                                    <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    onClick={() => handleDeleteContractor(contractor)}
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
                        {!!isEdit ? "Edit Contractor" : "Add Contractor"}
                      </ModalHeader>
                      <ModalBody>
                        <AvForm onValidSubmit={handleValidContractorSubmit}>
                          <Row form>
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
                                  label="Client company"
                                  type="text"
                                  errorMessage="Invalid client company"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.client_company || ""}
                                />
                              </div>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_first_name"
                                  label="Hiring manager first name"
                                  type="text"
                                  errorMessage="Invalid hiring manager first name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.hiring_manager_first_name || ""}
                                />
                              </div>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_last_name"
                                  label="Hiring manager last name"
                                  type="text"
                                  errorMessage="Invalid hiring manager last name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.hiring_manager_last_name || ""}
                                />
                              </div>
                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_email"
                                  label="Hiring manager email"
                                  type="email"
                                  errorMessage="Invalid hiring manager email"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.hiring_manager_email || ""}
                                />
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="hiring_manager_phone"
                                  label="Hiring manager phone"
                                  mask="(999) 999-9999"
                                  errorMessage="Invalid hiring manager phone"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.hiring_manager_phone || ""}
                                />
                              </div>

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
                                  name="start_date"
                                  label="Start Date"
                                  type="date"
                                  errorMessage="Invalid start date"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={contractorList.start_date || ""}
                                />
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="ir_status"
                                  type="hidden"
                                  value={contractorList.ir_status || "inside"}
                                >
                                </AvField>
                              </div>

                              <div className="mb-3">
                                <AvField
                                  name="progress"
                                  type="hidden"
                                  value={contractorList.progress || "contractor ir35 assessment"}
                                >
                                </AvField>
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
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContractorsList);
