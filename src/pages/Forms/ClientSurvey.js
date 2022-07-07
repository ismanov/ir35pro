import { AvRadio, AvRadioGroup } from "availity-reactstrap-validation"
import AvField from "availity-reactstrap-validation/lib/AvField"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import axiosApi from "helpers/api_helper"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { useParams } from "react-router"
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Container,
  CardTitle,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import {
  getContractorDetail as onGetContractorDetail,
} from "store/actions"
import classnames from "classnames"
import { Link } from "react-router-dom"

const FormClientSurvey = () => {
  const dispatch = useDispatch()

  const { contractorDetail } = useSelector(state => ({
    contractorDetail: state.projects.contractorDetail,
  }), shallowEqual)

  const endDate = new Date(contractorDetail?.end_date)
  const startDate = new Date(contractorDetail?.start_date)
  const duedays = (endDate - startDate) / (1000 * 3600 * 24)
  const dueMonth = (Math.floor(duedays / 30))
  const dueDay = (duedays - 30 * dueMonth)
  const { id } = useParams();

  const [error, setStatusError] = useState(null)
  const [userRole, setuserRole] = useState("user")
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setuserRole(obj.userrole)
    }
  }, [])

  const [activeTabVartical, setoggleTabVertical] = useState(1)
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])
  const [defaultValues, setdefaultValues] = useState({
    client_survey_1: "",
    client_survey_2: "",
    client_survey_3: "",
    client_survey_4: "",
    client_survey_5: "",
    client_survey_6: "",
    client_survey_7: "",
    client_survey_8: "",
    client_survey_9: "",
    client_survey_10: "",
    client_survey_11: "fixed",
    client_survey_12: "",
    client_survey_13: "",
  })
  const [aclient_survey_1, setclient_survey_1] = useState("")
  const [aclient_survey_2, setclient_survey_2] = useState("")
  const [aclient_survey_3, setclient_survey_3] = useState("")
  const [aclient_survey_4, setclient_survey_4] = useState("")
  const [aclient_survey_5, setclient_survey_5] = useState("")
  const [aclient_survey_6, setclient_survey_6] = useState("")
  const [aclient_survey_7, setclient_survey_7] = useState("")
  const [aclient_survey_8, setclient_survey_8] = useState("")
  const [aclient_survey_9, setclient_survey_9] = useState("")
  const [aclient_survey_10, setclient_survey_10] = useState("")
  const [aclient_survey_11, setclient_survey_11] = useState("fixed")
  const [aclient_survey_12, setclient_survey_12] = useState("")
  const [aclient_survey_13, setclient_survey_13] = useState("")
  const [surveyID, setSurveyID] = useState(0)

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab === 8) {
        var element = document.getElementsByClassName("steps-container");
        element[0].scrollTop = element[0].scrollHeight;
      }

      if (tab >= 1 && tab <= 13) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  useEffect(async () => {
    dispatch(onGetContractorDetail(id))
  }, [])

  async function saveAssessmentForm(tab) {
    let reqData = {
      tabID: tab,
      contractor_id: id,
      _id: surveyID,
      client_survey_11: aclient_survey_11,
      is_draft: true
    }
    if (aclient_survey_1 != "") {
      reqData = {
        ...reqData,
        client_survey_1: aclient_survey_1,
      }
    }
    if (aclient_survey_2 != "") {
      reqData = {
        ...reqData,
        client_survey_2: aclient_survey_2,
      }
    }
    if (aclient_survey_3 != "") {
      reqData = {
        ...reqData,
        client_survey_3: aclient_survey_3,
      }
    }
    if (aclient_survey_4 != "") {
      reqData = {
        ...reqData,
        client_survey_4: aclient_survey_4,
      }
    }
    if (aclient_survey_5 != "") {
      reqData = {
        ...reqData,
        client_survey_5: aclient_survey_5,
      }
    }
    if (aclient_survey_6 != "") {
      reqData = {
        ...reqData,
        client_survey_6: aclient_survey_6,
      }
    }
    if (aclient_survey_7 != "") {
      reqData = {
        ...reqData,
        client_survey_7: aclient_survey_7,
      }
    }
    if (aclient_survey_8 != "") {
      reqData = {
        ...reqData,
        client_survey_8: aclient_survey_8,
      }
    }
    if (aclient_survey_9 != "") {
      reqData = {
        ...reqData,
        client_survey_9: aclient_survey_9,
      }
    }
    if (aclient_survey_10 != "") {
      reqData = {
        ...reqData,
        client_survey_10: aclient_survey_10,
      }
    }
    if (aclient_survey_12 != "") {
      reqData = {
        ...reqData,
        client_survey_12: aclient_survey_12,
      }
    }
    if (aclient_survey_13 != "") {
      reqData = {
        ...reqData,
        client_survey_13: aclient_survey_13,
      }
    }

    await axiosApi().post(`api/submit-survey`, reqData)
      .then(response => {
        let popup = document.getElementById('saved-pop');
        popup.style.display = 'flex';
        document.body.style.overflowY = "hidden"
      })
      .catch(err => {
        throw err
      })

  }

  useEffect(async () => {
    await axiosApi().get(`api/get-survey/${id}`)
      .then(response => {
        const surveyData = response.data.surveyform;
        if (surveyData != null) {
          if (surveyData.client_survey_1 != null)
            setclient_survey_1(surveyData.client_survey_1 ? "yes" : "no");
          if (surveyData.client_survey_2 != null)
            setclient_survey_2(surveyData.client_survey_2 ? "yes" : "no");
          if (surveyData.client_survey_3 != null)
            setclient_survey_3(surveyData.client_survey_3 ? "yes" : "no");
          if (surveyData.client_survey_4 != null)
            setclient_survey_4(surveyData.client_survey_4 ? "yes" : "no");
          if (surveyData.client_survey_5 != null)
            setclient_survey_5(surveyData.client_survey_5 ? "yes" : "no");
          if (surveyData.client_survey_6 != null)
            setclient_survey_6(surveyData.client_survey_6 ? "yes" : "no");
          if (surveyData.client_survey_7 != null)
            setclient_survey_7(surveyData.client_survey_7 ? "yes" : "no");
          if (surveyData.client_survey_8 != null)
            setclient_survey_8(surveyData.client_survey_8 ? "yes" : "no");
          if (surveyData.client_survey_9 != null)
            setclient_survey_9(surveyData.client_survey_9 ? "yes" : "no");
          if (surveyData.client_survey_10 != null)
            setclient_survey_10(surveyData.client_survey_10 ? "yes" : "no");
          if (surveyData.client_survey_11 != null)
            setclient_survey_11(surveyData.client_survey_11 ? surveyData.client_survey_11 : "fixed");
          if (surveyData.client_survey_12 != null)
            setclient_survey_12(surveyData.client_survey_12 ? "yes" : "no");
          if (surveyData.client_survey_13 != null)
            setclient_survey_13(surveyData.client_survey_13 ? "yes" : "no");

          if (surveyData.client_survey_1 != null)
            defaultValues.client_survey_1 = surveyData.client_survey_1 ? "yes" : "no"
          if (surveyData.client_survey_2 != null)
            defaultValues.client_survey_2 = surveyData.client_survey_2 ? "yes" : "no"
          if (surveyData.client_survey_3 != null)
            defaultValues.client_survey_3 = surveyData.client_survey_3 ? "yes" : "no"
          if (surveyData.client_survey_4 != null)
            defaultValues.client_survey_4 = surveyData.client_survey_4 ? "yes" : "no"
          if (surveyData.client_survey_5 != null)
            defaultValues.client_survey_5 = surveyData.client_survey_5 ? "yes" : "no"
          if (surveyData.client_survey_6 != null)
            defaultValues.client_survey_6 = surveyData.client_survey_6 ? "yes" : "no"
          if (surveyData.client_survey_7 != null)
            defaultValues.client_survey_7 = surveyData.client_survey_7 ? "yes" : "no"
          if (surveyData.client_survey_8 != null)
            defaultValues.client_survey_8 = surveyData.client_survey_8 ? "yes" : "no"
          if (surveyData.client_survey_9 != null)
            defaultValues.client_survey_9 = surveyData.client_survey_9 ? "yes" : "no"
          if (surveyData.client_survey_10 != null)
            defaultValues.client_survey_10 = surveyData.client_survey_10 ? "yes" : "no"
          if (surveyData.client_survey_11 != null)
            defaultValues.client_survey_11 = surveyData.client_survey_11 ? surveyData.client_survey_11 : "fixed"
          if (surveyData.client_survey_12 != null)
            defaultValues.client_survey_12 = surveyData.client_survey_12 ? "yes" : "no"
          if (surveyData.client_survey_13 != null)
            defaultValues.client_survey_13 = surveyData.client_survey_13 ? "yes" : "no"
          setdefaultValues(defaultValues)
          setSurveyID(surveyData._id)
          let passedTabs = []
          if (surveyData.tabID > 1) {
            for (let i = 1; i <= surveyData.tabID; i++) {
              passedTabs = [...passedTabs, i]
            }
          } else {
            passedTabs = [1]
          }
          setoggleTabVertical(surveyData.tabID)
          setPassedStepsVertical(passedTabs)
        }
      })
      .catch(err => {
        throw err
      })

  }, []);

  function closeSavePopup() {
    let popup = document.getElementById('saved-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
  }
  // handleValidSubmit
  const handleValidSubmit = async (values) => {
    try {
      const body = {
        id: id,
        is_draft: false,
        contractor_id: id,
        _id: surveyID,
        client_survey_1: values.client_survey_1,
        client_survey_2: values.client_survey_2,
        client_survey_3: values.client_survey_3,
        client_survey_4: values.client_survey_4,
        client_survey_5: values.client_survey_5,
        client_survey_6: values.client_survey_6,
        client_survey_7: values.client_survey_7,
        client_survey_8: values.client_survey_8,
        client_survey_9: values.client_survey_9,
        client_survey_10: values.client_survey_10,
        client_survey_11: values.client_survey_11,
        client_survey_12: values.client_survey_12,
        client_survey_13: values.client_survey_13
      };
      const { data } = await axiosApi().post(`api/submit-survey`, body);

      if (data.success == "success") {
        const contractorData = {
          _id: id,
          is_draft: false
        }
        await axiosApi().put(`api/update-contractor`, contractorData)
          .then(response => {
            let popup = document.getElementById('success-pop');
            popup.style.display = 'flex';
            document.body.style.overflowY = "hidden"
          })
          .catch(err => {
            setStatusError(err)
            message = err[1]
            throw message
          })
      }
    } catch (err) {
      setStatusError(err)
      console.log(err)
    }
  }

  function handleChange(value, id) {
    let element = document.getElementById("sq-" + id);
    if (id == 11) {
      setclient_survey_11(value)
      if (value == "weekly") {
        element.style.display = "block"
      } else {
        element.style.display = "none"
      }
    }
    // if (value == "no") {
    //   element.style.display = "block"
    // }
    // if (value == "yes") {
    //   element.style.display = "none"
    // }
    switch (id) {
      case 1:
        setclient_survey_1(value)
        break;
      case 2:
        setclient_survey_2(value)
        break;
      case 3:
        setclient_survey_3(value)
        break;
      case 4:
        setclient_survey_4(value)
        break;
      case 5:
        setclient_survey_5(value)
        break;
      case 6:
        setclient_survey_6(value)
        break;
      case 7:
        setclient_survey_7(value)
        break;
      case 8:
        setclient_survey_8(value)
        break;
      case 9:
        setclient_survey_9(value)
        break;
      case 10:
        setclient_survey_10(value)
        break;
      case 12:
        setclient_survey_12(value)
        break;
      case 13:
        setclient_survey_13(value)
        break;
    }
  }
  function closePopup() {
    document.body.style.overflowY = "auto"
    window.location.href = userRole == "user" ? "/contractors" : "/progress";
  }

  return (
    <React.Fragment>
      <div className="success-container" id="saved-pop" style={{ display: "none" }}>
        <div className="success-card">
          <div className="close-button">
            <button className="btn" onClick={() => { closeSavePopup() }}><i className="mdi mdi-close-thick"></i></button>
          </div>
          <div className="success-icon">
            <i className="mdi mdi-check-circle"></i>
          </div>
          <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
            Contractor IR35 assessment form data saved
          </div>
          <div className="mt-4 go-btn-container">
            <button onClick={() => { closeSavePopup() }} className="btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
      <div className="success-container" id="success-pop" style={{ display: "none" }}>
        <div className="success-card">
          <div className="close-button">
            <button className="btn" onClick={() => { closePopup() }}><i className="mdi mdi-close-thick"></i></button>
          </div>
          <div className="success-icon">
            <i className="mdi mdi-check-circle"></i>
          </div>
          <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
            Request Submitted
          </div>
          <div className="mt-4">Lorem ipsum dolor sit armet, consecteur odipisicing edit.</div>
          <div className="mt-4 go-btn-container">
            <Link to="#" onClick={() => { closePopup() }} className="btn btn-primary">View Contractors</Link>
          </div>

        </div>
      </div>
      <div className="page-content">
        <MetaTags>
          <title>
            Client Survey | IR35Pro
          </title>
        </MetaTags>
        <Container fluid={true} style={{ minHeight: "1300px" }}>
          <Breadcrumbs title="Contractors" breadcrumbItem="Create New" />
          <Row>
            <div className="position-relative" style={{ width: "75%", margin: "4rem auto", marginBottom: "7rem", display: "flex" }}>
              <div style={{ background: "#00aeef", width: "100%", height: "1px" }}></div>
              <div style={{ background: "#CACCCF", width: "100%", height: "1px" }}></div>
              <button className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style={{ width: "2rem", height: "2rem" }}>
                <span className="comp-contractor" style={{ color: "#00aeef" }}>1</span>
              </button>
              <button className="position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill">
                <div className={"c100 center p" + (activeTabVartical * 13 - 4)}>
                  <span>2</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
              </button>

              <button className="position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill" style={{ background: "#f8f8fb", color: "#CACCCF", border: "solid 1px #CACCCF", width: "2rem", height: "2rem" }}>
                3
              </button>
              <div className="position-absolute" style={{ left: "-80px", bottom: "-50px", color: "#00aeef" }}>New Contractor Requests</div>
              <div className="position-absolute" style={{ left: "calc(50% - 80px)", bottom: "-50px" }}>Contractor IR35 Assessment</div>
              <div className="position-absolute" style={{ right: "-60px", bottom: "-50px" }}>Request Submitted</div>
            </div>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardTitle className="form-card-title">

                </CardTitle>
                <CardBody>
                  <AvForm
                    id="client_survey_form"
                    model={defaultValues}
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(v)
                    }}
                  >
                    <div className="vertical-wizard wizard clearfix vertical">
                      <div className="steps clearfix scroll-step">
                        <ul className="steps-container">
                          <NavItem
                            className={classnames({ current: activeTabVartical === 1 })}
                          >
                            <NavLink
                              className={classnames({ current: activeTabVartical === 1, passed: activeTabVartical > 1 })}
                              onClick={() => {
                                toggleTabVertical(1)
                              }}
                              disabled={!(passedStepsVertical || []).includes(1)}
                            >
                              <span className="number"></span> Question 1/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 2 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 2, passed: activeTabVartical > 2 })}
                              onClick={() => {
                                toggleTabVertical(2)
                              }}
                              disabled={!(passedStepsVertical || []).includes(2)}
                            >
                              <span className="number"></span> Question 2/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 3 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 3, passed: activeTabVartical > 3 })}
                              onClick={() => {
                                toggleTabVertical(3)
                              }}
                              disabled={!(passedStepsVertical || []).includes(3)}
                            >
                              <span className="number"></span> Question 3/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 4 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 4, passed: activeTabVartical > 4 })}
                              onClick={() => {
                                toggleTabVertical(4)
                              }}
                              disabled={!(passedStepsVertical || []).includes(4)}
                            >
                              <span className="number"></span> Question 4/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 5 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 5, passed: activeTabVartical > 5 })}
                              onClick={() => {
                                toggleTabVertical(5)
                              }}
                              disabled={!(passedStepsVertical || []).includes(5)}
                            >
                              <span className="number"></span> Question 5/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 6 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 6, passed: activeTabVartical > 6 })}
                              onClick={() => {
                                toggleTabVertical(6)
                              }}
                              disabled={!(passedStepsVertical || []).includes(6)}
                            >
                              <span className="number"></span> Question 6/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 7 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 7, passed: activeTabVartical > 7 })}
                              onClick={() => {
                                toggleTabVertical(7)
                              }}
                              disabled={!(passedStepsVertical || []).includes(7)}
                            >
                              <span className="number"></span> Question 7/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 8 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 8, passed: activeTabVartical > 8 })}
                              onClick={() => {
                                toggleTabVertical(8)
                              }}
                              disabled={!(passedStepsVertical || []).includes(8)}
                            >
                              <span className="number"></span> Question 8/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 9 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 9, passed: activeTabVartical > 9 })}
                              onClick={() => {
                                toggleTabVertical(9)
                              }}
                              disabled={!(passedStepsVertical || []).includes(9)}
                            >
                              <span className="number"></span> Question 9/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 10 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 10, passed: activeTabVartical > 10 })}
                              onClick={() => {
                                toggleTabVertical(10)
                              }}
                              disabled={!(passedStepsVertical || []).includes(10)}
                            >
                              <span className="number"></span> Question 10/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 11 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 11, passed: activeTabVartical > 11 })}
                              onClick={() => {
                                toggleTabVertical(11)
                              }}
                              disabled={!(passedStepsVertical || []).includes(11)}
                            >
                              <span className="number"></span> Question 11/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 12 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 12, passed: activeTabVartical > 12 })}
                              onClick={() => {
                                toggleTabVertical(12)
                              }}
                              disabled={!(passedStepsVertical || []).includes(12)}
                            >
                              <span className="number"></span> Question 12/13
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 13 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 13, passed: activeTabVartical > 13 })}
                              onClick={() => {
                                toggleTabVertical(13)
                              }}
                              disabled={!(passedStepsVertical || []).includes(13)}
                            >
                              <span className="number"></span> Question 13/13
                            </NavLink>
                          </NavItem>
                        </ul>
                      </div>
                      <div className="content clearfix" style={{ minHeight: "800px" }}>
                        <div className="contractor-detail-container">
                          <Row>
                            <Col lg={6}>
                              <div>
                                Engagement Name:
                                <span style={{ paddingLeft: "10px", color: "#00aeef" }}>{contractorDetail?.engagement_name}</span>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                Expected duration:
                                <span style={{ paddingLeft: "10px", color: "#00aeef" }}>
                                  {dueMonth > 0 ? dueMonth + (dueMonth == 1 ? " month" : " months") : (dueDay > 0 ? dueDay + (dueDay == 1 ? " day" : " days") : "-")}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col lg={6}>
                              <div>
                                Budget day rate:
                                <span style={{ paddingLeft: "10px", color: "#00aeef" }}>£{contractorDetail?.day_rate}</span>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                <span style={{ fontWeight: "bold" }}>Potential Cost Saving Outside IR35:</span>
                                <span style={{ paddingLeft: "10px", color: "#00aeef" }}>
                                  £{contractorDetail?.day_rate * 19 * dueMonth * 0.3}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col lg={6}>
                              <div>
                                Engagement ID:
                                <span style={{ paddingLeft: "10px", color: "#00aeef" }}>{contractorDetail?.contractor_id}</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <TabContent activeTab={activeTabVartical} className="body mt-4">
                          <TabPane tabId={1}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 1/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Will the assignment involve completing specific deliverables or objectives that could be defined at the commencement of the engagement?
                              </Label>
                              <AvRadioGroup inline name="client_survey_1" value={defaultValues.client_survey_1} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 1) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, it’s important the Client details the specific project and/or deliverables the Contractor is working on. They are providing a service, not performing a role in the organisation. Any changes to these deliverables would need to be mutually agreed, we would update the documentation accordingly.</p>
                                <p>This deliverable based approach can vary by specialism. E.g.</p>
                                <ul>
                                  <li>An I.T Contractor may be working on an App delivery or Cyber Security Project.</li>
                                  <li>A Procurement Contractor may be asked to deliver specific RFP’s or identified and delivery against a savings objective</li>
                                  <li>A Marketing Contractor could be asked to deliver specific campaigns that are agreed at the outset</li>
                                </ul>
                              </div>
                              <div id="sq-1" style={{ padding: "0" }} className={aclient_survey_1 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 2/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Do you expect the contractor engagement to terminate immediately once these deliverable objectives have been completed?
                              </Label>
                              <AvRadioGroup inline name="client_survey_2" value={defaultValues.client_survey_2} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 2) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, it’s important the Client does not have an ongoing obligation to pay the Contractor once the agreed deliverables have been achieved.</p>
                                <p>Notice periods should ideally be kept to a minimum (e.g. 1 day) to remove the risk</p>
                              </div>
                              <div id="sq-2" style={{ padding: "0" }} className={aclient_survey_2 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={3}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 3/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Will the contractor&apos;s personnel hold a specific role within your Organisational chart or otherwise appear to be part of your structure?
                              </Label>
                              <AvRadioGroup inline name="client_survey_3" value={defaultValues.client_survey_3} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 3) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, it’s important the Contractor is not directly part of the Client’s organisation chart. It should also be made clear that they are a Contractor on any Company emails they are required to use to engage internally. Typically brackets are used as per below</p>
                                <p>e.g. Caroline Smith (Contractor)</p>
                              </div>
                              <div id="sq-3" style={{ padding: "0" }} className={aclient_survey_3 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={4}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 4/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Would you be prepared to accept a suitably qualified, skilled and experienced substitute to deliver the Services if the Contractor had the need to do so?
                              </Label>
                              <AvRadioGroup inline name="client_survey_4" value={defaultValues.client_survey_4} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 4) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, it is critical a Client allows the Contractor the legal right to send a suitably qualified and skilled substitute if the need arose. The Contractors Ltd Company are engaged to deliver a Service, not the supply of a specific individual.</p>
                                <p>In our experience, this is a very rare event. Furthermore, the Client has protection with termination rights in the Contract that provide the option to exit the Contract if the delivery was negatively impacted.</p>
                              </div>
                              <div id="sq-4" style={{ padding: "0" }} className={aclient_survey_4 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={5}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 5/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Do you wish to  have a right of supervision, direction or control over the contractor and its personnel?
                              </Label>
                              <AvRadioGroup inline name="client_survey_5" value={defaultValues.client_survey_5} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 5) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, a Client cannot treat a Contractor in the same manner as that of direct reporting employees. Contractors cannot be subject to any HR process, appraisals and it should be discouraged that they attend any ‘Team’ meetings that involve discussion on employee HR issues.</p>
                                <p>However, the Client IS allowed to schedule regular meetings and discussions with the Contractor to monitor their progress against the deliverables, as you would expect to do if engaging a Consultancy.</p>
                              </div>
                              <div id="sq-5" style={{ padding: "0" }} className={aclient_survey_5 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={6}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 6/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Does the contractor and its personnel have discretion to decide how and where the services are to be performed?
                              </Label>
                              <AvRadioGroup inline name="client_survey_6" value={defaultValues.client_survey_6} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 6) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, a Contractor must be given discretion as to how and where the services are to be performed.</p>
                                <p>This isn’t something that should provide any real concern for a Client. In reality, most Contractors require access to people or systems that necessitate working during standard hours to deliver the services. Additionally, some Clients will have I.T security access restrictions that require onsite office based presence.</p>
                                <p>The impact of covid has demonstrated the productivity of remote working, a Client should ensure this discretion is offered to the Contractor.</p>
                              </div>
                              <div id="sq-6" style={{ padding: "0" }} className={aclient_survey_6 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={7}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 7/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Will the contractor and its personnel entitled to employment benefits?
                              </Label>
                              <AvRadioGroup inline name="client_survey_7" value={defaultValues.client_survey_7} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 7) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35 the Contractor has to behave in a manner consistent with self-employment.</p>
                                <p>To ensure this is maintained, the Client should not allow the Contractor to benefit from subsidised canteens, onsite Gyms, discounted product. They should be treated in accordance with that of a Supplier, not an Employee.</p>
                              </div>
                              <div id="sq-7" style={{ padding: "0" }} className={aclient_survey_7 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={8}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 8/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Do you expect to move the contractor and its personnel from task to task without their prior agreement?
                              </Label>
                              <AvRadioGroup inline name="client_survey_8" value={defaultValues.client_survey_8} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 8) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, the Client and Contractor must mutually agree the scope of work and deliverables, documented in a signed schedule or work. The Client is not allowed to move the Contractor to new tasks at will, any scope changes need to be mutually agreed and documented before they are commenced.</p>
                              </div>
                              <div id="sq-8" style={{ padding: "0" }} className={aclient_survey_8 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={9}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 9/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Would you be prepared to commence litigation against the contractor if they committed a serious breach of contract?
                              </Label>
                              <AvRadioGroup inline name="client_survey_9" value={defaultValues.client_survey_9} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 9) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, the Contractor must be treated in the same manner as a Supplier. If they breach the Contract, the same remedies that a Client would consider for a Supplier must also be considered for a Contractor outside IR35.</p>
                                <p>In reality, litigation is the last resort, both with Contractors and any other Suppliers. The first port of call is for the Contractor to remedy and correct any Service failures at their own cost.</p>
                              </div>
                              <div id="sq-9" style={{ padding: "0" }} className={aclient_survey_9 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={10}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 10/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Is the contractor required to obtain the client&apos;s permission before providing services to other clients where there is no risk of a conflict of interest?
                              </Label>
                              <AvRadioGroup inline name="client_survey_10" value={defaultValues.client_survey_10} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 10) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, a Client cannot restrict a Contractor’s Ltd company from providing services to other Clients at the same time. However, a Contractor can only do so if it does not impact on the delivery of the Services to the Client.</p>
                                <p>A Client can only require the Contractor to seek permission in the event they are proposing to provide services to competitors of the Client.</p>
                              </div>
                              <div id="sq-10" style={{ padding: "0" }} className={aclient_survey_10 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={11}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 11/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Is the contractor required to obtain the client&apos;s permission before providing services to other clients where there is no risk of a conflict of interest?
                              </Label>
                              <AvField
                                type="select"
                                className="form-select"
                                id="client_survey_11_0"
                                name="client_survey_11"
                                multiple={false}
                                value={defaultValues.client_survey_11}
                                onChange={(e, v) => { handleChange(v, 11) }}
                              >
                                <option value="fixed">Fixed amount for delivery</option>
                                <option value="hourly">Hourly/Daily rate</option>
                                <option value="weekly">Set weekly/monthly salary</option>
                              </AvField>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, it is perfectly allowable for the Contractor to be on a hourly or daily rate, as this will fluctuate depending on time worked.<br />Similarly, a fixed price is also acceptable, though in practical reality it can prove challenging.</p>
                                <p>A fixed Salary however is viewed as evidence of employment and would likely push the engagement inside IR35.</p>
                              </div>
                              <div id="sq-11" style={{ padding: "0" }} className={aclient_survey_11 !== "weekly" ? "d-none" : ""}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={12}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 12/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Would you expect the Contractor to correct any sub-standard work or defects on their own time/at their own cost?
                              </Label>
                              <AvRadioGroup inline name="client_survey_12" value={defaultValues.client_survey_12} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 12) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, there should be an element of financial risk to the Contractor. They should be expected to correct any sub-standard or defective work at their own cost.</p>
                              </div>
                              <div id="sq-12" style={{ padding: "0" }} className={aclient_survey_12 == "no" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                          <TabPane tabId={13}>
                            <Row>
                              <Col lg="12" className="mt-4">
                                <div style={{ fontWeight: "bold" }}>Question 13/13</div>
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Label className="d-block mb-3">
                                Will the contractor be required to undertake any HR functions (disciplinary, grievance, etc) directly affecting the client&apos;s employees?
                              </Label>
                              <AvRadioGroup inline name="client_survey_13" value={defaultValues.client_survey_13} className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 13) }}>
                                <AvRadio label="Yes" value="yes" />
                                <AvRadio label="No" value="no" />
                              </AvRadioGroup>
                              <div className="question-info-container mt-4">
                                <p>To fall outside IR35, a Client treat a Contractor in the same manner as an employee, they must be treated as a Supplier.</p>
                                <p>The Contractor can be expected to complete health & safety or similar compliance modules to ensure safe working onside<br />The Contractor cannot be subject to any HR procedures, namely appraisals, grievance procedures or likewise.</p>
                              </div>
                              <div id="sq-13" style={{ padding: "0" }} className={aclient_survey_13 == "yes" ? "" : "d-none"}>
                                <div className="mt-4 warning-message">
                                  <p><i className="bx bx-error-circle"></i></p>
                                  <p>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</p>
                                </div>
                              </div>
                            </Row>
                          </TabPane>
                        </TabContent>
                      </div>
                      <div className="actions clearfix">
                        <ul style={{ textAlign: "left" }}>
                          <li
                            className={
                              activeTabVartical === 1
                                ? "previous back disabled"
                                : "previous back"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                toggleTabVertical(activeTabVartical - 1)
                              }}
                            >
                              Back
                            </Link>
                          </li>
                        </ul>
                        <ul>
                          <li
                            className="previous save-continue"
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                saveAssessmentForm(activeTabVartical)
                              }}
                            >
                              Save and Continue Later
                            </Link>
                          </li>
                          <li
                            className={
                              activeTabVartical === 13 ? "next" : "next"
                            }
                          >
                            {activeTabVartical === 13 ?
                              <button
                                type="submit"
                              >
                                Submit
                              </button> :
                              <Link
                                to="#"
                                onClick={() => {
                                  toggleTabVertical(activeTabVartical + 1)
                                }}
                              >
                                Next
                              </Link>}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  )
}

export default FormClientSurvey
