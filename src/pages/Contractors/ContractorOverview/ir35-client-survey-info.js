import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { AvField, AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation"
import axiosApi from "helpers/api_helper"

const IRClientSurveyFormInfo = (props) => {

  const surveyFormInfo = props.surveyFormInfo
  const contractorID = props.contractorID

  const defaultValues = {
    client_survey_1: surveyFormInfo.client_survey_1 ? "yes" : "no",
    client_survey_2: surveyFormInfo.client_survey_2 ? "yes" : "no",
    client_survey_3: surveyFormInfo.client_survey_3 ? "yes" : "no",
    client_survey_4: surveyFormInfo.client_survey_4 ? "yes" : "no",
    client_survey_5: surveyFormInfo.client_survey_5 ? "yes" : "no",
    client_survey_6: surveyFormInfo.client_survey_6 ? "yes" : "no",
    client_survey_7: surveyFormInfo.client_survey_7 ? "yes" : "no",
    client_survey_8: surveyFormInfo.client_survey_8 ? "yes" : "no",
    client_survey_9: surveyFormInfo.client_survey_9 ? "yes" : "no",
    client_survey_10: surveyFormInfo.client_survey_10 ? "yes" : "no",
    client_survey_11: surveyFormInfo.client_survey_11,
    client_survey_12: surveyFormInfo.client_survey_12 ? "yes" : "no",
    client_survey_13: surveyFormInfo.client_survey_13 ? "yes" : "no",
  }
  const [editSurvey, setEditSurvey] = useState(false)
  const [showEditSurvey, setShowEditSurvey] = useState(false)
  const [surveyValues, setSurveyValues] = useState(defaultValues)
  const [userRole, setUserRole] = useState("user")
  const [showSurveyPop, setshowSurveyPop] = useState(false)

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole);
    }
  }

  function onExpand(e) {
    e.preventDefault();
    const title = document.getElementById("client-survey-title");
    const ul = document.getElementById("survey-items")
    if (title.classList.contains("mm-active")) {
      title.classList.remove("mm-active");
      ul.classList.remove("mm-show");
      setShowEditSurvey(false)
      setEditSurvey(false)
    } else {
      title.classList.add("mm-active");
      ul.classList.add("mm-show");
      setShowEditSurvey(true)
    }
  }
  function handleChange(value) {
    setSurveyValues(surveyValues => ({
      ...surveyValues,
      ...value
    }));
  }
  const handleValidSubmit = async (values) => {
    const reqdata = {
      id: surveyFormInfo._id,
      contractor_id: contractorID,
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
    await axiosApi().post(`api/submit-survey`, reqdata)
      .then(response => {
        setshowSurveyPop(true)
        document.body.style.overflowY = "hidden"
      })
      .catch(err => {
        throw err
      })
  }

  const closeSurveyFormPopup = () => {
    window.location.reload();
    document.body.style.overflowY = "auto";
  }

  const setEditingSurvey = (val) => {
    setEditSurvey(val)
    if (val == false) {
      handleChange(defaultValues);
    }
  }
  return (
    <Card>
      <CardBody className="contractor-overview m-4">
        {showSurveyPop ?
          <div className="success-container" id="survey-form-pop">
            <div className="success-card">
              <div className="success-icon">
                <i className="mdi mdi-check-circle" style={{ fontSize: "30px" }}></i>
              </div>
              <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
                Changed IR35Pro Survey Data successfully.
              </div>
              <div className="mt-4 go-btn-container">
                <button onClick={() => { closeSurveyFormPopup() }} className="btn btn-primary">Continue</button>
              </div>
            </div>
          </div> : null}
        {
          (userRole == "ir35pro" && showEditSurvey) ? (
            editSurvey ?
              <Link to="#" style={{ color: "#A0A5B2", fontSize: "16px", position: "absolute", top: "45px", right: "80px", zIndex: "99" }} onClick={() => { setEditingSurvey(false) }}><i className="mdi mdi-close-thick" ></i></Link> :
              <Link to="#" style={{ color: "#A0A5B2", fontSize: "16px", position: "absolute", top: "45px", right: "80px", zIndex: "99" }} onClick={() => { setEditingSurvey(true) }}><i className="mdi mdi-square-edit-outline" ></i></Link>
          ) : null
        }
        <Link to="" id="client-survey-title" className="font-size-15 has-arrow " style={{ fontWeight: "600", color: "#495057" }} onClick={e => onExpand(e)}>
          Client IR35Pro Survey Info
        </Link>
        <ul className="form-info list-unstyled text-center mt-4 sub-menu mm-collapse" id="survey-items">
          <AvForm
            id="overview-client-servey"
            model={defaultValues}
            onValidSubmit={(e, v) => {
              handleValidSubmit(v)
            }}
          >
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 1</div>
              <div style={{ padding: "0", width: "60%" }}>Will the assignment involve completing specific deliverables or objectives that could be defined at the commencement of the engagement?
                <AvRadioGroup inline name="client_survey_1" value={surveyValues.client_survey_1} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_1: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 2</div>
              <div style={{ padding: "0", width: "60%" }}>Do you expect the contractor engagement to terminate immediately once these deliverable objectives have been completed?
                <AvRadioGroup inline name="client_survey_2" value={surveyValues.client_survey_2} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_2: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 3</div>
              <div style={{ padding: "0", width: "60%" }}>Will the contractor&apos; s personnel hold a specific role within your Organisational chart or otherwise appear to be part of your structure?
                <AvRadioGroup inline name="client_survey_3" value={surveyValues.client_survey_3} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_3: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 4</div>
              <div style={{ padding: "0", width: "60%" }}>Would you be prepared to accept a suitably qualified, skilled and experienced substitute to deliver the Services if the Contractor had the need to do so?
                <AvRadioGroup inline name="client_survey_4" value={surveyValues.client_survey_4} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_4: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 5</div>
              <div style={{ padding: "0", width: "60%" }}>Do you wish to  have a right of supervision, direction or control over the contractor and its personnel?
                <AvRadioGroup inline name="client_survey_5" value={surveyValues.client_survey_5} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_5: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 6</div>
              <div style={{ padding: "0", width: "60%" }}>Does the contractor and its personnel have discretion to decide how and where the services are to be performed?
                <AvRadioGroup inline name="client_survey_6" value={surveyValues.client_survey_6} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_6: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 7</div>
              <div style={{ padding: "0", width: "60%" }}>Will the contractor and its personnel entitled to employment benefits?
                <AvRadioGroup inline name="client_survey_7" value={surveyValues.client_survey_7} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_7: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 8</div>
              <div style={{ padding: "0", width: "60%" }}>Do you expect to move the contractor and its personnel from task to task without their prior agreement?
                <AvRadioGroup inline name="client_survey_8" value={surveyValues.client_survey_8} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_8: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 9</div>
              <div style={{ padding: "0", width: "60%" }}>Would you be prepared to commence litigation against the contractor if they committed a serious breach of contract?
                <AvRadioGroup inline name="client_survey_9" value={surveyValues.client_survey_9} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_9: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 10</div>
              <div style={{ padding: "0", width: "60%" }}>Is the contractor required to obtain the client&apos; s permission before providing services to other clients where there is no risk of a conflict of interest?
                <AvRadioGroup inline name="client_survey_10" value={surveyValues.client_survey_10} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_10: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 11</div>
              <div style={{ padding: "0", width: "60%" }}>What is the basis of payment? Fixed amount, completion of milestones, hourly daily or monthly/weekly salary?
                <AvField
                  type="select"
                  className="form-select mb-4"
                  id="client_survey_11_0"
                  name="client_survey_11"
                  multiple={false}
                  value={surveyValues.client_survey_11}
                  onChange={(e) => { handleChange({ client_survey_11: e.target.value }) }}
                  disabled={!editSurvey}
                >
                  <option value="fixed">Fixed amount for delivery</option>
                  <option value="hourly">Hourly/Daily rate</option>
                  <option value="weekly">Set weekly/monthly salary</option>
                </AvField>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 12</div>
              <div style={{ padding: "0", width: "60%" }}>Would you expect the Contractor to correct any sub-standard work or defects on their own time/at their own cost?
                <AvRadioGroup inline name="client_survey_12" value={surveyValues.client_survey_12} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_12: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: "left", display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "0", width: "20%", fontSize: "14px", fontWeight: "500" }}>Question 13</div>
              <div style={{ padding: "0", width: "60%" }}>Will the contractor be required to undertake any HR functions (disciplinary, grievance, etc) directly affecting the client&apos; s employees?
                <AvRadioGroup inline name="client_survey_13" value={surveyValues.client_survey_13} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChange({ client_survey_13: e.target.value }) }}>
                  <AvRadio disabled={!editSurvey} label="YES" value="yes" />
                  <AvRadio disabled={!editSurvey} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            {editSurvey ?
              <li className="m-4" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="#" className="btn" onClick={() => { setEditingSurvey(false) }} style={{ width: "140px", marginRight: "20px", border: "solid 1px #00aeef" }}>Cancel</Link>
                <button type="submit" className="btn btn-primary" style={{ width: "140px" }}>Save Changes</button>
              </li> : null}
          </AvForm>
        </ul>
      </CardBody>
    </Card>
  )
}

IRClientSurveyFormInfo.propTypes = {
  surveyFormInfo: PropTypes.object,
  contractorID: PropTypes.string,
}

export default IRClientSurveyFormInfo
