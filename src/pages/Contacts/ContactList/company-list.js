import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getCompanies as onGetCompanies,
  addNewCompany as onAddNewCompany,
  updateCompany as onUpdateCompany,
  // deleteCompany as onDeleteCompany,
} from "store/company/actions";

import {
  getUsers as onGetUsers,
} from "store/contacts/actions";

import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import axiosApi from "helpers/api_helper";

const CompanyList = props => {
  const dispatch = useDispatch();

  const { companies, users } = useSelector(state => ({
    companies: state.company.companies,
    users: state.contacts.users
  }));

  const [companiesList, setcompaniesList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [role, setrole] = useState("");
  const [name, setusername] = useState("");

  const [showDelPop, setShowDelPop] = useState(false);
  const [delCompany, setDelCompany] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setrole(obj.userrole)
        setusername(obj.first_name + " " + obj.last_name);
      }
    }
  }, []);

  useEffect(async () => {
    await dispatch(onGetUsers());
    await dispatch(onGetCompanies());
    setIsEdit(false);
  }, []);



  useEffect(() => {
    setcompaniesList(companies);
    setIsEdit(false);
  }, [companies]);

  useEffect(() => {
    if (!isEmpty(companies) && !!isEdit) {
      setcompaniesList(companies);
      setIsEdit(false);
    }
  }, [companies]);

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: size(companies), // replace later with size(users),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  // const selectRow = {
  //   mode: "checkbox",
  // };
  const companyListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: company => <>{company.id}</>,
    },
    {
      text: "Company Name",
      dataField: "company_name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        <h5 className="font-size-14 mb-1">
          {company.company_name}
        </h5>
      ),
    },
    {
      text: "Admin Name",
      dataField: "admin_name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        role == "admin" ? name :
          ((users.filter(item => (item.userrole == "admin") && (item.company.toString() == company.id.toString()))).length == 0 ? "-" : ((users.filter(item => (item.userrole == "admin") && (item.company.toString() == company.id.toString())))[0]?.first_name) + " " +
            ((users.filter(item => (item.userrole == "admin") && (item.company.toString() == company.id.toString())))[0]?.last_name))
      ),
    },
    {
      dataField: "company_phone",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleCompanyClick(company)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteCompany(company)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];



  const toggle = () => {
    setModal(!modal);
  };

  const handleCompanyClick = arg => {
    const company = arg;

    setcompaniesList({
      id: company.id,
      company_name: company.company_name,
      company_phone: company.company_phone,
      company_address: company.company_address,
      company_website: company.company_website,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  const handleDeleteCompany = company => {
    if (company.id !== undefined) {
      // dispatch(onDeleteCompany(company));
      // onPaginationPageChange(1);
      setShowDelPop(true);
      setDelCompany(company);
      document.body.style.overflowY = "hidden"
    }
  };
  const closeDelCompPopup = () => {
    setShowDelPop(false);
    document.body.style.overflowY = "auto";
  }

  const onDelComp = async (e) => {
    e.target.disabled = true
    setLoading(true);
    await axiosApi().put(`api/delete-company`, delCompany)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        throw err
      })
  }

  /**
   * Handling submit user on user form
   */
  const handleValidCompanySubmit = (e, values) => {
    if (isEdit) {
      const updateCompany = {
        id: companiesList.id,
        company_name: values.company_name,
        company_phone: values.company_phone,
        company_address: values.company_address,
        company_website: values.company_website,
      };

      // update company
      dispatch(onUpdateCompany(updateCompany));
      setIsEdit(false);
    } else {
      const newCompany = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        company_name: values["company_name"],
        company_phone: values["company_phone"],
        company_address: values["company_address"],
        company_website: values["company_website"],
        first_name: values["first_name"],
        last_name: values["last_name"],
        company: values["company_name"],
        email: values["email"],
        confirmed: false,
        userrole: "admin",
        password: "password",
        phone_number: values["phone_number"],
        job_title: values["job_title"],
      };
      // save new company
      dispatch(onAddNewCompany(newCompany));
    }
    toggle();
  };

  const handleCompanyClicks = () => {
    setcompaniesList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Companies List | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Companies" breadcrumbItem="Companies List" />
          <Row>
            {showDelPop ?
              <div className="success-container" id="del-comp-pop">
                <div className="success-card">
                  <div className="close-button">
                    <button className="btn" onClick={() => { closeDelCompPopup() }}><i className="mdi mdi-close-thick"></i></button>
                  </div>
                  <div className="success-icon">
                    <i className="mdi mdi-delete-outline" style={{ fontSize: "25px", background: "#F46A6A", color: "#FFF", borderRadius: "50%", padding: "2px 7px" }}></i>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Delete Company</div>
                  <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px", paddingBottom: "20px" }}>
                    Are you sure you want to delete this Company and all of it’s data?
                  </div>
                  <div className="mt-4 go-btn-container">
                    <button onClick={() => { closeDelCompPopup() }} className="btn btn-danger" style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>Cancel</button>
                    <button onClick={(e) => { onDelComp(e) }} className="btn btn-danger" style={{ minWidth: "140px", marginLeft: "10px", position: "relative" }}>
                      Delete
                      {loading ? <Spinner animation="border" style={{ position: "absolute", width: "16px", height: "16px", borderWidth: "1px", right: "5px", top: "10px" }} /> : null}
                    </button>
                  </div>
                </div>
              </div> : null}
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={companyListColumns}
                    data={companies}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={companies}
                          columns={companyListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" style={{ fontSize: "18px", paddingTop: "10px" }} />
                                    </div>
                                  </div>
                                </Col>
                                {role == "ir35pro" ? (
                                  <Col sm="8">
                                    <div className="text-sm-end">
                                      <Button
                                        color="primary"
                                        className="font-16 btn-block btn btn-primary"
                                        onClick={handleCompanyClicks}
                                      >
                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                        Create New Company
                                      </Button>
                                    </div>
                                  </Col>) : ""}
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      // selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit Company" : "Add Company"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <AvForm
                                          onValidSubmit={handleValidCompanySubmit}
                                        >
                                          <Row>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="company_name"
                                                  label="Company name"
                                                  maxLength="30"
                                                  type="text"
                                                  errorMessage="Invalid Company name"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={companiesList.company_name || ""}
                                                />
                                              </div>
                                            </Col>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="company_phone"
                                                  maxLength="16"
                                                  label="Company Phone Number"
                                                  type="text"
                                                  errorMessage="Invalid phone number"
                                                  validate={{
                                                    required: { value: true },
                                                    tel: true,
                                                  }}
                                                  value={companiesList.company_phone || ""}
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="company_address"
                                                  label="Company Address"
                                                  maxLength="60"
                                                  type="text"
                                                  errorMessage="Invalid address"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={companiesList.company_address || ""}
                                                />
                                              </div>
                                            </Col>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="company_website"
                                                  label="Company Website"
                                                  maxLength="30"
                                                  type="text"
                                                  errorMessage="Invalid website"
                                                  validate={{
                                                    required: { value: true },
                                                    pattern: { value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/ }
                                                  }}
                                                  value={companiesList.company_website || ""}
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          {!!isEdit ? "" :
                                            <Row>
                                              <h4>Create Admin User</h4>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="first_name"
                                                    label="First name"
                                                    maxLength="20"
                                                    type="text"
                                                    errorMessage="Invalid first name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="last_name"
                                                    label="Last name"
                                                    maxLength="20"
                                                    type="text"
                                                    errorMessage="Invalid last name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="email"
                                                    label="Email"
                                                    maxLength="40"
                                                    type="email"
                                                    errorMessage="Invalid email"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="phone_number"
                                                    maxLength="16"
                                                    label="Phone number"
                                                    type="text"
                                                    errorMessage="Invalid phone number"
                                                    validate={{
                                                      required: { value: true },
                                                      tel: true,
                                                    }}
                                                  />
                                                </div>
                                              </Col>
                                              <Col>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="job_title"
                                                    label="Job title"
                                                    maxLength="30"
                                                    type="text"
                                                    errorMessage="Invalid job title"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                          }
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
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      );
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CompanyList);