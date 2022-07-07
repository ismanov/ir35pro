import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = props => {
  const dispatch = useDispatch()

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = values => {
    dispatch(registerUser(values))
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | IR35Pro</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free IR35Pro account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(v)
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          id="email"
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          maxLength="40"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="first_name"
                          label="First name"
                          type="text"
                          required
                          maxLength="20"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="last_name"
                          label="Last name"
                          maxLength="20"
                          type="text"
                          required
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="company"
                          label="Company"
                          type="text"
                          placeholder="Enter company name"
                        />
                      </div>

                      <AvField
                        name="userrole"
                        type="hidden"
                        required
                        value="user"
                      />

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the IR35pro{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  IR35pro. Copyright © {new Date().getFullYear()}. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
