import PropTypes from "prop-types"
import React from "react"
import MetaTags from 'react-meta-tags'
import { Link, useParams } from "react-router-dom"
import { AvForm, AvField } from "availity-reactstrap-validation"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo-dark.png"
import axiosApi from "helpers/api_helper"

const Recoverpw = props => {
  const { token } = useParams();
  async function handleValidSubmit(event, values) {
    await axiosApi().put(`api/user-password/${token}`, values)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <MetaTags>
          <title>Reset Password | IR35Pro</title>
        </MetaTags>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Re-Password with Ir35pro.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img
                        src={profile}
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="dashboard">
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src={logo}
                          alt=""
                          height="34"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    > Enter your new password! </div>

                    <AvForm className="form-horizontal"
                      onValidSubmit={(e, v) => handleValidSubmit(e, v)}>
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="New Password"
                          className="form-control"
                          placeholder="password"
                          type="password"
                          required
                        />
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-primary w-md "
                          type="submit"
                        >
                          Reset
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link
                    to="/"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Sign In here
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
Recoverpw.propTypes = {
  history: PropTypes.object,
}
export default Recoverpw
