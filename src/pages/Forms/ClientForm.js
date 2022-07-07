import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { Alert, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Row } from "reactstrap"
import { AvForm, AvField, AvRadio, AvRadioGroup } from "availity-reactstrap-validation"
import "react-datepicker/dist/react-datepicker.css"

import ReactTooltip from 'react-tooltip';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { checkPropTypes } from "prop-types";
import logo from "../../assets/images/logo.svg"
import logoLight from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"
import axiosApi from "helpers/api_helper";
import { Link } from "react-router-dom";
import Footer from "components/VerticalLayout/Footer";

const IrCleintForm = props => {
  // handleValidSubmit
  const {
    match: { params },
  } = props

  const [successForm, setForm] = useState(false);
  const [errorForm, setError] = useState(false);
  const handleValidSubmit = async values => {
    try {
      const body = {
        id: params.id,
        first_name: values.first_name,
        last_name: values.last_name,
        ltd_company_name: values.ltd_company_name,
        ltd_company_number: values.ltd_company_number,
        email: values.email,
        phone_number: values.phone_number,
        job_ticket: values.job_ticket,
        recruitment_1: values.recruitment_1,
        recruitment_2: values.recruitment_2,
        recruitment_3: values.recruitment_3,
        recruitment_4: values.recruitment_4,
        recruitment_5: values.recruitment_5,
        recruitment_6: values.recruitment_6,
        recruitment_7: values.recruitment_7,
        recruitment_8: values.recruitment_8,
        recruitment_9: values.recruitment_9,
      };
      const { data } = await axiosApi().post(`api/submit-form`, body);
      if (data.success == "success") {
        setForm(true);
      }
    } catch (err) {
      setError(true);
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <header style={{ backgroundColor: "#FFF" }}>
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLight} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="19" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="page-content">
        <MetaTags>
          <title>IR35Pro Client Form | IR35Pro</title>
        </MetaTags>
        <h1 style={{ textAlign: "center", paddingBottom: "12px" }}>IR35Pro Contractor Onboarding Form</h1>
        <Container fluid>
          <Row>
            <Col lg="1"></Col>
            <Col lg="10">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Contractor Details</CardTitle>
                  <AvForm
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(v)
                    }}
                  >
                    {successForm ? <Alert color="success">Form submitted successfully</Alert> : null}
                    {errorForm ? <Alert color="danger">Failed</Alert> : null}
                    <FormGroup className="mb-4" row>
                      <Col lg="6">
                        <AvField
                          name="first_name"
                          type="text"
                          label="First name"
                          required
                          placeholder="Enter first name"
                        />
                      </Col>
                      <Col lg="6">
                        <AvField
                          name="last_name"
                          label="Last name"
                          type="text"
                          required
                          placeholder="Enter last name"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="6">
                        <AvField
                          name="ltd_company_name"
                          label="Ltd company name"
                          type="text"
                          required
                          placeholder="Enter company Name"
                        />
                      </Col>
                      <Col lg="6">
                        <Label className="d-block mb-2">Main Contact Number</Label>
                        <AvField
                          name="ltd_company_number"
                          mask="(999) 999-9999"
                          required
                          placeholder="Enter main contact number"
                          className="form-control input-color"
                        ></AvField>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="6">
                        <AvField
                          name="email"
                          label="Email Address"
                          type="email"
                          required
                          placeholder="Enter email address"
                        />
                      </Col>
                      <Col lg="6">
                        <Label className="d-block mb-2">Phone Number</Label>
                        <AvField
                          mask="(999) 999-9999"
                          name="phone_number"
                          required
                          className="form-control input-color"
                          placeholder="Enter phone number"
                        >
                        </AvField>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="d-block mb-2">Job Ticket Reference
                        <span
                          className="form-tooltip"
                          data-tip="This is our unique job reference number, found in the email we sent you"
                        >!<ReactTooltip />
                        </span>
                      </Label>
                      <Col lg="12">
                        <AvField
                          name="job_ticket"
                          type="text"
                          required
                          placeholder="Enter recruitment agency or consultancy name"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Are you an office holder of the end Client?
                          <span
                            className="form-tooltip"
                            data-tip="This question is simply whether you are an existing board member, treasurer, trustee, director, secretary of the end Client"
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_1" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Will you be hiring any of your own employees to help complete the work?
                          <span
                            className="form-tooltip"
                            data-tip="If you envisage sub-contracting any of the work out to either employees or fellow Contractors, please answer accordingly."
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_2" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Did the Client interview you?</Label>
                        <AvRadioGroup inline name="recruitment_3" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Will you be working onsite at the Client&apos;s premises?
                          <span
                            className="form-tooltip"
                            data-tip="The reality is that it is often necessary to work onsite to have access to key stakeholders."
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_4" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">If so, is this due to data or security issues?
                          <span
                            className="form-tooltip"
                            data-tip="If the reason for working onsite is for data or security , please confirm this."
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_5" required errorMessage="Pick one!">
                          <AvRadio label="Data" value="data" />
                          <AvRadio label="Security" value="security" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Will you be using your own laptop or the Client&apos;s laptop?</Label>
                        <AvRadioGroup inline name="recruitment_6" required errorMessage="Pick one!">
                          <AvRadio label="Own" value="own" />
                          <AvRadio label="Client's" value="client" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Do you hold professional indemnity insurance?</Label>
                        <AvRadioGroup inline name="recruitment_7" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Does your business have it&apos;s own website?
                          <span
                            className="form-tooltip"
                            data-tip="If your Business has it's own brand, website, linkedin profile or similar to distinguish itself, please answer accordingly."
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_8" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="12">
                        <Label className="d-block mb-2">Will you be carrying out work for other Clients at the same time?
                          <span
                            className="form-tooltip"
                            data-tip="If you are working for multiple Clients at the same time, even for a small % of your time, please answer Yes."
                          >!<ReactTooltip />
                          </span>
                        </Label>
                        <AvRadioGroup inline name="recruitment_9" required errorMessage="Pick one!">
                          <AvRadio label="Yes" value="yes" />
                          <AvRadio label="No" value="no" />
                        </AvRadioGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Col lg="10">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          disabled={successForm}
                        >
                          {successForm ? "Submitted" : "Submit"}
                        </button>
                      </Col>
                    </FormGroup>
                  </AvForm>

                </CardBody>
              </Card>
            </Col>
            <Col lg="1"></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

IrCleintForm.propTypes = {
  match: PropTypes.object,
}

export default IrCleintForm
