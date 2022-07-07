import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Board, { moveCard } from "@lourenci/react-kanban"
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  UncontrolledAlert,
} from "reactstrap"
import CardTaskBox from "./card-task-box"
import RenderCardTitle from "./render-card-title"
import {
  AvField,
  AvForm,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation"
import proicon from "../../assets/images/Icon_IR35Pro.svg"
import axiosApi from "helpers/api_helper"

const UncontrolledBoard = props => {
  const content = props.board

  const [modalSurvey, setModalSurvey] = useState(false)
  const [contractorId, setContractorID] = useState(0)
  const [progress, setProgress] = useState(0)
  const [userRole, setUserRole] = useState("user")
  const [updateBoard, setBoard] = useState(content)
  const [dueMonth, setDueMonth] = useState(0)
  const [dueDay, setDueDay] = useState(0)
  const [contractorDetail, setContractor] = useState(null)
  const toggleSurvey = () => {
    setModalSurvey(!modalSurvey)
  }

  const [error, setStatusError] = useState(null)

  useEffect(() => {
    onLoad()
  }, [])

  useEffect(() => {
    setBoard(content)
  }, [content])

  async function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole)
      if (obj.userrole == "user") {
        let elements = document.getElementsByClassName("react-kanban-column")
        for (let i = 0; i < elements.length; i++) {
          if (
            elements[i].attributes["data-rbd-draggable-id"].value !==
            "column-draggable-1"
          ) {
            if (
              elements[i].attributes["data-rbd-draggable-id"].value !==
              "column-draggable-2"
            ) {
              elements[i].style.display = "none"
            } else {
              elements[i].style.display = "inline-block"
            }
          } else {
            elements[i].style.display = "inline-block"
          }
        }
      }
    }
  }
  // handleValidSubmit
  const handleValidSubmit = async values => {
    try {
      const body = {
        id: contractorId,
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
        client_survey_13: values.client_survey_13,
      }
      const { data } = await axiosApi().post(`api/submit-survey`, body)

      if (data.success == "success") {
        const reqData = {
          id: contractorId,
          progress: progress - 1,
          survey_questions: true,
        }
        await axiosApi()
          .put(`api/update-progress`, reqData)
          .then(response => {
            setStatusError("success")
            setInterval(() => {
              window.location.href = "/progress"
            }, 3000)
          })
          .catch(err => {
            setStatusError(err)
            message = err[1]
            throw message
          })
      }
      toggleSurvey()
    } catch (err) {
      setStatusError(err)
      console.log(err)
    }
  }

  async function updateContractorProgress(id, newProg) {
    const reqData = {
      id: id,
      progress: newProg - 1,
    }
    await axiosApi()
      .put(`api/update-progress`, reqData)
      .then(response => {
        location.reload()
      })
      .catch(err => {
        message = err[1]
        throw message
      })
  }
  const calSurveyForm = contractor => {
    const endDate = new Date(contractor?.end_date)
    const startDate = new Date(contractor?.start_date)
    const duedays = (endDate - startDate) / (1000 * 3600 * 24)
    setDueMonth(Math.floor(duedays / 30))
    setDueDay(duedays - 30 * dueMonth)
  }

  const onCardDragEndEvent = (_card, source, destination) => {
    if (
      ((source.fromColumnId == 0 && destination.toColumnId == 1) ||
        (source.fromColumnId == 1 && destination.toColumnId == 0)) &&
      userRole != "ir35pro"
    ) {
      const updatedBoard = moveCard(updateBoard, source, destination)
      setBoard(updatedBoard)
      setContractorID(_card.id)
      setProgress(destination.toColumnId)
      setContractor(_card)
      calSurveyForm(_card)
      setModalSurvey(true)
    }
    if (destination.toColumnId != 1 && userRole == "ir35pro") {
      const updatedBoard = moveCard(updateBoard, source, destination)
      setBoard(updatedBoard)
      updateContractorProgress(_card.id, destination.toColumnId)
    }
  }
  const defaultValues = {
    client_survey_1: "yes",
    client_survey_2: "yes",
    client_survey_3: "yes",
    client_survey_4: "yes",
    client_survey_5: "yes",
    client_survey_6: "yes",
    client_survey_7: "yes",
    client_survey_8: "yes",
    client_survey_9: "yes",
    client_survey_10: "yes",
    client_survey_11: "fixed",
    client_survey_12: "yes",
    client_survey_13: "yes",
  }

  function handleChange(value, id) {
    let element = document.getElementById("sq-" + id)
    if (value == "no") {
      element.style.display = "block"
    }
    if (value == "yes") {
      element.style.display = "none"
    }
  }
  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
          <Board
            disableColumnDrag
            onCardDragEnd={onCardDragEndEvent}
            renderColumnHeader={({ title, icon }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <RenderCardTitle title={title} />
                <img src={icon.clienticon || icon.proicon} alt="" />
              </div>
            )}
            renderCard={(data, { dragging }) => {
              return (
                <CardTaskBox
                  data={data}
                  dragging={dragging}
                  userList={props.usersList}
                  companies={props.companies}
                  clientForms={props.clientForms}
                ></CardTaskBox>
              )
            }}
          >
            {updateBoard}
          </Board>
        </Col>
      </Row>
      {/* <Modal isOpen={modalSurvey} toggle={toggleSurvey} size="lg"
        style={{ maxWidth: '800px', width: '100%' }}>
        <ModalHeader toggle={toggleSurvey} tag="h4" style={{ width: "100%" }} className="survey-modal">
          <Row >
            <Col lg={2}>
              <img src={proicon} alt="" width="80" />
            </Col>
            <Col>
              <div style={{ textAlign: "center" }}>Client IR35Pro Survey Questions</div>
            </Col>
          </Row>
        </ModalHeader>
        <div className="status-message-container">
          {error != "success" && error != null ? <UncontrolledAlert
            color="danger"
            className="alert-dismissible fade show"
            role="alert"
            id="err-status-msg"
          >
            <i className="mdi mdi-check-all me-2"></i>Failed to submit survey questions
          </UncontrolledAlert> : null}
          {error == "success" ?
            <UncontrolledAlert
              color="success"
              className="alert-dismissible fade show"
              role="alert"
              id="suc-status-msg"
            >
              <i className="mdi mdi-check-all me-2"></i>Successed to submit survey questions
            </UncontrolledAlert> : null
          }
        </div>
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #eff2f7" }}>
          <Row >
            <Col lg={7}>
              <div style={{ fontSize: "16px" }}>
                Engagement Name:&nbsp;
                <span style={{ color: "#00aeef" }}>{contractorDetail?.engagement_name}</span>
              </div>
              <div style={{ fontSize: "16px" }}>
                Budget day rate:&nbsp;
                <span style={{ color: "#00aeef" }}>£{contractorDetail?.day_rate}</span>
              </div>
              <div style={{ fontSize: "16px" }}>
                Engagement ID:&nbsp;
                <span style={{ color: "#00aeef" }}>{contractorDetail?.contractor_id}</span>
              </div>
            </Col>
            <Col lg={5}>
              <div style={{ fontSize: "16px" }}>
                Expected duration:&nbsp;
                <span style={{ color: "#00aeef" }}>
                  {dueMonth > 0 ? dueMonth + (dueMonth == 1 ? " month" : " months") : (dueDay > 0 ? dueDay + (dueDay == 1 ? " day" : " days") : "-")}
                </span>
              </div>
              <div style={{ fontSize: "16px" }}>
                Potential Cost Saving Outside IR35:&nbsp;
                <span style={{ color: "#05aa30" }}>
                  £{contractorDetail?.day_rate * 19 * dueMonth * 0.3}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <ModalBody>
          <AvForm
            id="client_survey_form"
            model={defaultValues}
            onValidSubmit={(e, v) => {
              handleValidSubmit(v)
            }}
          >
            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                1. Will the assignment involve completing specific deliverables or objectives that could be defined at the commencement of the engagement?
                <div className="question-info-container">
                  To fall outside IR35, it’s important the Client details the specific project and/or deliverables the Contractor is working on. They are providing a service, not performing a role in the organisation. Any changes to these deliverables would need to be mutually agreed, we would update the documentation accordingly.
                  This deliverable based approach can vary by specialism. E.g.
                  <ul>
                    <li>An I.T Contractor may be working on an App delivery or Cyber Security Project.</li>
                    <li>A Procurement Contractor may be asked to deliver specific RFP’s or identified and delivery against a savings objective</li>
                    <li>A Marketing Contractor could be asked to deliver specific campaigns that are agreed at the outset</li>
                  </ul>
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_1" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 1) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-1" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                2. Do you expect the contractor engagement to terminate immediately once these deliverable objectives have been completed?
                <div className="question-info-container">
                  To fall outside IR35, it’s important the Client does not have an ongoing obligation to pay the Contractor once the agreed deliverables have been achieved.
                  <br /><br />Notice periods should ideally be kept to a minimum (e.g. 1 day) to remove the risk
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_2" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 2) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-2" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                3. Will the contractor&apos;s personnel hold a specific role within your Organisational chart or otherwise appear to be part of your structure?
                <div className="question-info-container">
                  To fall outside IR35, it’s important the Contractor is not directly part of the Client’s organisation chart. It should also be made clear that they are a Contractor on any Company emails they are required to use to engage internally. Typically brackets are used as per below
                  <br /><br />e.g. Caroline Smith (Contractor)
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_3" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 3) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-3" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                4. Would you be prepared to accept a suitably qualified, skilled and experienced substitute to deliver the Services if the Contractor had the need to do so?
                <div className="question-info-container">
                  To fall outside IR35, it is critical a Client allows the Contractor the legal right to send a suitably qualified and skilled substitute if the need arose. The Contractors Ltd Company are engaged to deliver a Service, not the supply of a specific individual.
                  <br /><br />In our experience, this is a very rare event. Furthermore, the Client has protection with termination rights in the Contract that provide the option to exit the Contract if the delivery was negatively impacted.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_4" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 4) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-4" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                5. Do you wish to  have a right of supervision, direction or control over the contractor and its personnel?
                <div className="question-info-container">
                  To fall outside IR35, a Client cannot treat a Contractor in the same manner as that of direct reporting employees. Contractors cannot be subject to any HR process, appraisals and it should be discouraged that they attend any ‘Team’ meetings that involve discussion on employee HR issues.
                  <br /><br />However, the Client IS allowed to schedule regular meetings and discussions with the Contractor to monitor their progress against the deliverables, as you would expect to do if engaging a Consultancy.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_5" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 5) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-5" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                6. Does the contractor and its personnel have discretion to decide how and where the services are to be performed?
                <div className="question-info-container">
                  To fall outside IR35, a Contractor must be given discretion as to how and where the services are to be performed.
                  <br /><br />This isn’t something that should provide any real concern for a Client. In reality, most Contractors require access to people or systems that necessitate working during standard hours to deliver the services. Additionally, some Clients will have I.T security access restrictions that require onsite office based presence.
                  <br /><br />The impact of covid has demonstrated the productivity of remote working, a Client should ensure this discretion is offered to the Contractor.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_6" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 6) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-6" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                7. Will the contractor and its personnel entitled to employment benefits?
                <div className="question-info-container">
                  To fall outside IR35 the Contractor has to behave in a manner consistent with self-employment.
                  <br /><br />To ensure this is maintained, the Client should not allow the Contractor to benefit from subsidised canteens, onsite Gyms, discounted product. They should be treated in accordance with that of a Supplier, not an Employee.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_7" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 7) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-7" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                8. Do you expect to move the contractor and its personnel from task to task without their prior agreement?
                <div className="question-info-container">
                  To fall outside IR35, the Client and Contractor must mutually agree the scope of work and deliverables, documented in a signed schedule or work.
                  The Client is not allowed to move the Contractor to new tasks at will, any scope changes need to be mutually agreed and documented before they are commenced.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_8" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 8) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-8" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                9. Would you be prepared to commence litigation against the contractor if they committed a serious breach of contract?
                <div className="question-info-container">
                  To fall outside IR35, the Contractor must be treated in the same manner as a Supplier. If they breach the Contract, the same remedies that a Client would consider for a Supplier must also be considered for a Contractor outside IR35.
                  <br /><br />In reality, litigation is the last resort, both with Contractors and any other Suppliers. The first port of call is for the Contractor to remedy and correct any Service failures at their own cost.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_9" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 9) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-9" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                10. Is the contractor required to obtain the client&apos;s permission before providing services to other clients where there is no risk of a conflict of interest?
                <div className="question-info-container">
                  To fall outside IR35, a Client cannot restrict a Contractor’s Ltd company from providing services to other Clients at the same time. However, a Contractor can only do so if it does not impact on the delivery of the Services to the Client.
                  <br /><br />A Client can only require the Contractor to seek permission in the event they are proposing to provide services to competitors of the Client.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_10" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 10) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-10" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                11. What is the basis of payment? Fixed amount, completion of milestones, hourly daily or monthly/weekly salary?
                <div className="question-info-container">
                  To fall outside IR35, it is perfectly allowable for the Contractor to be on a hourly or daily rate, as this will fluctuate depending on time worked.
                  <br />Similarly, a fixed price is also acceptable, though in practical reality it can prove challenging.
                  <br /><br />A fixed Salary however is viewed as evidence of employment and would likely push the engagement inside IR35.
                </div>
              </Label>
              <AvField
                type="select"
                className="form-select"
                id="client_survey_11_0"
                name="client_survey_11"
                multiple={false}
              >
                <option value="fixed">Fixed amount for delivery</option>
                <option value="hourly">Hourly/Daily rate</option>
                <option value="weekly">Set weekly/monthly salary</option>
              </AvField>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                12. Would you expect the Contractor to correct any sub-standard work or defects on their own time/at their own cost?
                <div className="question-info-container">
                  To fall outside IR35, there should be an element of financial risk to the Contractor. They should be expected to correct any sub-standard or defective work at their own cost.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_12" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 12) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-12" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <div className="survey-questions" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Label className="d-block mb-3">
                13. Will the contractor be required to undertake any HR functions (disciplinary, grievance, etc) directly affecting the client&apos;s employees?
                <div className="question-info-container">
                  To fall outside IR35, a Client treat a Contractor in the same manner as an employee, they must be treated as a Supplier.
                  <br /><br />The Contractor can be expected to complete health & safety or similar compliance modules to ensure safe working onside
                  <br />The Contractor cannot be subject to any HR procedures, namely appraisals, grievance procedures or likewise.
                </div>
              </Label>
              <AvRadioGroup inline name="client_survey_13" className="ans-group" required errorMessage="Pick one!" onChange={(e, v) => { handleChange(v, 13) }}>
                <AvRadio label="Yes" value="yes" />
                <AvRadio label="No" value="no" />
              </AvRadioGroup>
              <div id="sq-13" style={{ display: "none", position: "absolute", bottom: "-10px", lineHeight: "1", fontSize: "13px", color: "orange" }}>Are you sure? Answering negatively to this question will result in falling inside IR35 for this contractor. Please consider changing your working practices and answering positively to increase your savings.</div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </AvForm>
        </ModalBody>
      </Modal> */}
    </React.Fragment>
  )
}

UncontrolledBoard.propTypes = {
  board: PropTypes.any,
  usersList: PropTypes.any,
  companies: PropTypes.any,
  clientForms: PropTypes.any,
}

export default UncontrolledBoard
