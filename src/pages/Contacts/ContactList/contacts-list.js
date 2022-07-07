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
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions";

import {
  getCompanies as onGetCompanies,
} from "store/company/actions";

import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import axiosApi from "helpers/api_helper";

const ContactsList = props => {
  const dispatch = useDispatch();

  const { users, companies = [] } = useSelector(state => ({
    users: state.contacts.users,
    companies: state.company.companies
  }));
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [role, setrole] = useState("");
  const [userCompany, setcompany] = useState("");

  const [showDelPop, setShowDelPop] = useState(false);
  const [delUser, setDelUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(onGetCompanies());
  }, []);

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: size(users), // replace later with size(users),
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

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: user => <>{user.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      headerStyle: { textAlign: 'center' },
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.first_name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    {
      text: "Name",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            {/*<Link to={`/user-profile/${user.id}`} className="text-dark">
              {user.first_name + " " + user.last_name}
           </Link>*/}
            <span to={`/user-profile/${user.id}`} className="text-dark">
              {user.first_name + " " + user.last_name}
            </span>
          </h5>
        </>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
    },
    {
      text: "Company",
      dataField: "company",
      sort: true,
      formatter: (cellContent, user) => (
        (companies.filter(item => item.id.toString() == user.company.toString()))[0]?.company_name
      ),
    },
    {
      text: "Job Title",
      dataField: "job_title",
      sort: true,
    },
    {
      text: "User Role",
      dataField: "userrole",
      sort: true,
      formatter: (cellContent) => (
        cellContent == "user" ? "IR35 Regular User" : (cellContent == "admin" ? "IR35 Admin User" : "IR35 Super Admin User")
      ),
    },
    {
      text: "Confirmed",
      dataField: "confirmed",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteUser(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setrole(obj.userrole)
        setcompany(obj.company)
      }
    }
  }, []);
  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUserList(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setUserList(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;

    setUserList({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      company: user.company,
      email: user.email,
      confirmed: user.confirmed,
      userrole: user.userrole,
      phone_number: user.phone_number,
      job_title: user.job_title
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

  const handleDeleteUser = user => {
    if (user.id !== undefined) {
      // dispatch(onDeleteUser(user));
      // onPaginationPageChange(1);
      setShowDelPop(true);
      setDelUser(user);
      document.body.style.overflowY = "hidden"
    }
  };
  const closeDelUserPopup = () => {
    setShowDelPop(false);
    document.body.style.overflowY = "auto";
  }

  const onDelUser = async (e) => {
    e.target.disabled = true
    setLoading(true);
    await axiosApi().put(`api/delete-user`, delUser)
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
  const handleValidUserSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        id: userList.id,
        first_name: values.first_name,
        last_name: values.last_name,
        company: values.company,
        confirmed: values.confirmed,
        email: values.email,
        userrole: values.userrole,
        phone_number: values.phone_number,
        job_title: values.job_title,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      setIsEdit(false);
    } else {
      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        first_name: values["first_name"],
        last_name: values["last_name"],
        company: values["company"],
        email: values["email"],
        confirmed: values["confirmed"],
        userrole: values["userrole"],
        password: "password",
        phone_number: values["phone_number"],
        job_title: values["job_title"],
      };
      // save new user
      dispatch(onAddNewUser(newUser));
    }
    toggle();
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>User List | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Settings" breadcrumbItem="User Management" />
          <Row>
            {showDelPop ?
              <div className="success-container" id="del-comp-pop">
                <div className="success-card">
                  <div className="close-button">
                    <button className="btn" onClick={() => { closeDelUserPopup() }}><i className="mdi mdi-close-thick"></i></button>
                  </div>
                  <div className="success-icon">
                    <i className="mdi mdi-delete-outline" style={{ fontSize: "25px", background: "#F46A6A", color: "#FFF", borderRadius: "50%", padding: "2px 7px" }}></i>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Delete User</div>
                  <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px", paddingBottom: "20px" }}>
                    Are you sure you want to delete this User and all of their data?
                  </div>
                  <div className="mt-4 go-btn-container">
                    <button onClick={() => { closeDelUserPopup() }} className="btn btn-danger" style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>Cancel</button>
                    <button onClick={(e) => { onDelUser(e) }} className="btn btn-danger" style={{ minWidth: "140px", marginLeft: "10px", position: "relative" }}>
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
                    columns={contactListColumns}
                    data={role == "admin" ? users.filter(user => user.company.toString() == userCompany) : users}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={role == "admin" ? users.filter(user => user.company.toString() == userCompany) : users}
                          columns={contactListColumns}
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
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New User
                                    </Button>
                                  </div>
                                </Col>
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
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <AvForm
                                          onValidSubmit={handleValidUserSubmit}
                                        >
                                          <Row>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="first_name"
                                                  label="First name"
                                                  type="text"
                                                  maxLength="20"
                                                  errorMessage="Invalid first name"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={userList.first_name || ""}
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
                                                  value={userList.last_name || ""}
                                                />
                                              </div>
                                            </Col>
                                            <div className="mb-3">
                                              <AvField
                                                name="company"
                                                type="hidden"
                                                value={
                                                  userList.company || ""
                                                }
                                              />
                                            </div>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="email"
                                                  label="Email"
                                                  maxLength="40"
                                                  type="email"
                                                  errorMessage="Invalid Email"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={userList.email || ""}
                                                />
                                              </div>
                                            </Col>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="phone_number"
                                                  label="Phone number"
                                                  maxLength="16"
                                                  type="phone"
                                                  errorMessage="Invalid Phone number"
                                                  validate={{
                                                    required: { value: true },
                                                    tel: true,
                                                  }}
                                                  value={userList.phone_number || ""}
                                                />
                                              </div>
                                            </Col>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                <AvField
                                                  name="job_title"
                                                  label="Job Title"
                                                  maxLength="30"
                                                  type="text"
                                                  errorMessage="Invalid Job title"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={userList.job_title || ""}
                                                />
                                              </div>
                                            </Col>
                                            <Col xs={6}>
                                              <div className="mb-3">
                                                {role == "ir35pro" ?
                                                  (<AvField
                                                    type="select"
                                                    name="userrole"
                                                    className="form-select"
                                                    label="User Role"
                                                    multiple={false}
                                                    value={userList.userrole || "user"}
                                                    required
                                                  >
                                                    <option>user</option>
                                                    <option>admin</option>
                                                    <option>ir35pro</option>
                                                  </AvField>) : (role == "admin" ?
                                                    (<AvField
                                                      type="select"
                                                      name="userrole"
                                                      className="form-select"
                                                      label="User Role"
                                                      multiple={false}
                                                      value={userList.userrole || "user"}
                                                      required
                                                    >
                                                      <option>user</option>
                                                    </AvField>) : (
                                                      <AvField
                                                        type="select"
                                                        name="userrole"
                                                        className="form-select"
                                                        label="User Role"
                                                        multiple={false}
                                                        value={userList.userrole || "user"}
                                                        required
                                                      >
                                                        <option>user</option>
                                                      </AvField>
                                                    ))}
                                              </div>
                                              <div className="mb-3">
                                                <AvField
                                                  type="hidden"
                                                  name="confirmed"
                                                  className="form-select"
                                                  value={userList.confirmed || false}
                                                >
                                                </AvField>
                                              </div>
                                              {!!isEdit ? "" : (
                                                <div className="mb-3">
                                                  <AvField
                                                    type="hidden"
                                                    name="password"
                                                    className="form-select"
                                                    value="admin_ir35"
                                                  >
                                                  </AvField>
                                                </div>
                                              )}
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

export default withRouter(ContactsList);