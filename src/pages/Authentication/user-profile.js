import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
  FormGroup,
  Spinner,
} from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

// actions
import { resetProfileFlag, apiError } from "../../store/actions";

import {
  getCompanies as onGetCompanies,
} from "store/company/actions";
import axiosApi from "helpers/api_helper";
const UserProfile = props => {
  const dispatch = useDispatch();

  const { companies = [], error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
    companies: state.company.companies
  }));

  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [company, setcompany] = useState("");
  const [role, setrole] = useState("");
  const [phone, setphone] = useState("");
  const [job, setjob] = useState("");

  const [showPop, setShowPop] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updatedUserData, setUpdatedUserData] = useState([])
  const [changePwd, setChangePwd] = useState(false)
  const [submitText, setsubmitText] = useState("User Profile")
  const [wrongPwd, setwrongPwd] = useState(false)


  useEffect(() => {
    dispatch(onGetCompanies());
  }, []);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setfirstname(obj.first_name);
        setlastname(obj.last_name);
        setemail(obj.email);
        setcompany(obj.company);
        setrole(obj.userrole)
        setphone(obj.phone_number)
        setjob(obj.job_title)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);


  const handleUpdateProfile = values => {
    // dispatch(editProfile(values));
    setUpdatedUserData(values)
    setShowPop(true)
    document.body.style.overflowY = "hidden"
  }

  const closePopup = () => {
    setShowPop(false);
    document.body.style.overflowY = "auto";
  }

  const updateUserProfile = async e => {
    e.target.disabled = true
    setLoading(true);

    let data = {
      company: updatedUserData.company,
      email: updatedUserData.email,
      first_name: updatedUserData.first_name,
      last_name: updatedUserData.last_name,
      job_title: updatedUserData.job_title,
      phone_number: updatedUserData.phone_number
    }
    if (changePwd) {
      data = {
        ...data,
        oldPass: updatedUserData.oldPass,
        newPass: updatedUserData.newPass,
        changePwd: true
      }

    }
    await axiosApi().post(`api/update-user`, data)
      .then(response => {
        if (response.status == 200) {
          if (response.data.message == "The Profile has been updated") {
            localStorage.setItem("authUser", JSON.stringify(response.data));
            window.location.reload();
          } else if (response.data.message == "Wrong password. Please enter the correct password.") {
            setShowPop(false);
            setLoading(false);
            document.body.style.overflowY = "auto";
            setwrongPwd(true)
          } else {
            window.location.reload();
          }
        }
      })
      .catch(err => {
        throw err
      })
  }
  const handleChange = e => {
    if (e.target.checked) {
      setsubmitText("Password")
    } else {
      setsubmitText("User Profile")
    }
    setChangePwd(e.target.checked)
  }
  useEffect(() => {
    dispatch(apiError(""))
  }, [])
  const closeWarning = () => {
    setwrongPwd(false)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Settings" breadcrumbItem="Account Profile" />

          {showPop ?
            <div className="success-container" id="user-profile-pop">
              <div className="success-card" style={{ padding: "4rem 7rem" }}>
                <div className="close-button">
                  <button className="btn" onClick={() => { closePopup() }}><i className="mdi mdi-close-thick"></i></button>
                </div>
                <div className="success-icon">
                  <i className="mdi mdi-alert-circle" style={{ fontSize: "30px" }}></i>
                </div>
                <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Change {changePwd ? "Password" : "Information"}</div>
                <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px", paddingBottom: "20px" }}>
                  Are you sure you want to change {changePwd ? "your password" : "this field"}?
                </div>
                <div className="mt-4 go-btn-container">
                  <button onClick={() => { closePopup() }} className="btn btn-primary" style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>Cancel</button>
                  <button onClick={(e) => { updateUserProfile(e) }} className="btn btn-primary" style={{ minWidth: "140px", marginLeft: "10px", position: "relative" }}>
                    Save Changes
                    {loading ? <Spinner animation="border" style={{ position: "absolute", width: "16px", height: "16px", borderWidth: "1px", right: "5px", top: "10px" }} /> : null}
                  </button>
                </div>
              </div>
            </div> : null}
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Media>
                    <Media body className="align-self-center">
                      <div className="text-muted">
                        <h5>User Name: {firstname + " " + lastname}</h5>
                        <p className="mb-1">Email Address: {email}</p>
                        {role !== "ir35pro" ?
                          <p className="mb-0">Company: {
                            (companies.filter(item => item.id.toString() == company.toString()))[0]?.company_name
                          }</p> : null}
                        <p className="mb-1">Phone number: {phone}</p>
                        <p className="mb-1">Job title: {job}</p>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Profile</h4>
          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleUpdateProfile(v)
                }}
              >
                {success && success ? (
                  <Alert color="success">
                    Update User Successfully
                  </Alert>
                ) : null}

                {error && error ? (
                  <Alert color="danger">{error}</Alert>
                ) : null}

                <FormGroup className="mb-4" row>
                  <Col lg="6">
                    <AvField
                      name="first_name"
                      label="First name"
                      value={firstname}
                      className="form-control"
                      placeholder="Enter first name"
                      type="text"
                      maxLength="20"
                      required
                    />
                  </Col>
                  <Col lg="6">
                    <AvField
                      name="last_name"
                      label="Last name"
                      value={lastname}
                      className="form-control"
                      placeholder="Enter last name"
                      maxLength="20"
                      type="text"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup className="mb-4" row>
                  <Col lg="4">
                    <AvField
                      name="email"
                      label="Email"
                      value={email}
                      maxLength="40"
                      className="form-control"
                      placeholder="Enter Email"
                      type="email"
                      required
                    />
                  </Col>
                  <Col lg="4">
                    <AvField
                      name="phone_number"
                      label="Phone Number"
                      value={phone}
                      maxLength="16"
                      className="form-control"
                      placeholder="Enter phone number"
                      type="text"
                      required
                    />
                  </Col>
                  <Col lg="4">
                    <AvField
                      name="job_title"
                      label="Job Title"
                      value={job}
                      maxLength="30"
                      className="form-control"
                      placeholder="Enter job title"
                      type="text"
                      required
                    />
                  </Col>
                </FormGroup>
                {role == "admin" ?
                  (<FormGroup className="mb-4" row>
                    <Col lg="12">
                      <AvField
                        name="company"
                        label="Company"
                        value={
                          (companies.filter(item => item.id.toString() == company.toString()))[0]?.company_name
                        }
                        className="form-control"
                        placeholder="Enter Company Name"
                        type="text"
                        required
                      />
                    </Col>
                  </FormGroup>) :
                  (<FormGroup row>
                    <Col lg="12">
                      <AvField
                        name="company"
                        value={(companies.filter(item => item.id.toString() == company.toString()))[0]?.company_name}
                        className="form-control"
                        type="hidden"
                      />
                    </Col>
                  </FormGroup>)
                }
                <AvCheckboxGroup className="mb-4" name="change-pwd" label="" onClick={e => handleChange(e)}>
                  <AvCheckbox label="Change password" />
                </AvCheckboxGroup>
                {changePwd ?
                  <FormGroup className="mb-4" row>
                    <Col lg="12">
                      <AvField
                        name="oldPass"
                        label="Current Password"
                        className="form-control"
                        placeholder="Enter Current Password"
                        type="password"
                        required
                      />
                    </Col>
                  </FormGroup> : null}
                {changePwd ?
                  <FormGroup className="mb-4" row>
                    <Col lg="12">
                      <AvField
                        name="newPass"
                        label="New Password"
                        className="form-control"
                        placeholder="Enter New Password"
                        type="password"
                        required
                      />
                    </Col>
                  </FormGroup>
                  : null
                }
                <FormGroup className="mb-4" row>
                  <Col lg="12">
                    <Button type="submit" color="danger">
                      Update {submitText}
                    </Button>
                  </Col>
                </FormGroup>
              </AvForm>
            </CardBody>
          </Card>
          {wrongPwd ?
            <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", background: "#FFF", boxShadow: "0 0 14px rgb(73 80 87 / 66%)", borderRadius: "5px", position: "fixed", bottom: "70px", borderLeft: "solid 6px #f46a6a" }}>
              <i className="mdi mdi-close-circle" style={{ color: "#f46a6a", fontSize: "24px" }}></i>
              <div style={{ padding: "0 20px" }}>
                <div style={{ fontSize: "16px", fontWeight: "500" }}>Wrong Password</div>
                <div style={{ fontSize: "14px", opacity: "0.4" }}>You provided wrong data</div>
              </div>
              <button className="btn" onClick={() => { closeWarning() }} style={{ fontSize: "20px" }}><i className="mdi mdi-close-thick"></i></button>
            </div> :
            null
          }
        </Container>

      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
