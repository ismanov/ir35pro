import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import axiosApi from 'helpers/api_helper'

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"


const ConfirmMail = () => {
  const [confirming, setConfirming] = useState(false);
  const {token} = useParams();
  useEffect(() => {
    const verifyEmail = async () => {
      setConfirming(true)
      try {
        const {data} = await axiosApi().get(`api/auth/emailconfirmation/${token}`)
        setConfirming(true);
      } catch (err) {
        console.log(err)
        setConfirming(false);
      }
    }
    verifyEmail();
  }, []);
  return (
    <React.Fragment>
      <MetaTags>
        <title>Confirm Mail | IR35Pro</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">

        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img
                    src={logodark}
                    alt=""
                    height="20"
                    className="auth-logo-dark mx-auto"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="F20"
                    className="auth-logo-light mx-auto"
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bx-mail-send h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      {confirming
                        ? <div className="p-2 mt-4">
                          <h4>Success !</h4>
                          <p className="text-muted">
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et
                          </p>
                          <div className="mt-4">
                            <Link to="/" className="btn btn-success">
                              Back to Home
                            </Link>
                          </div>
                        </div>
                        : <div>Failed</div>
                      }
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
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

export default ConfirmMail
