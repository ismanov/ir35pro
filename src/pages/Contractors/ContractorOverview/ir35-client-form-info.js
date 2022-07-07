import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import { AvField, AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation"
import axiosApi from "helpers/api_helper"

const IRClientClientFormInfo = ({ clientFormInfo, contractorID }) => {

  const defaultValues = {
    first_name: clientFormInfo.first_name,
    last_name: clientFormInfo.last_name,
    ltd_company_name: clientFormInfo.ltd_company_name,
    ltd_company_number: clientFormInfo.ltd_company_number,
    email: clientFormInfo.email,
    phone_number: clientFormInfo.phone_number,
    job_ticket: clientFormInfo.job_ticket,
    recruitment_1: clientFormInfo.recruitment_1,
    recruitment_2: clientFormInfo.recruitment_2,
    recruitment_3: clientFormInfo.recruitment_3,
    recruitment_4: clientFormInfo.recruitment_4,
    recruitment_5: clientFormInfo.recruitment_5,
    recruitment_6: clientFormInfo.recruitment_6,
    recruitment_7: clientFormInfo.recruitment_7,
    recruitment_8: clientFormInfo.recruitment_8,
    recruitment_9: clientFormInfo.recruitment_9
  }

  const [editClientFrom, setEditClientFrom] = useState(false)
  const [showEditClientFrom, setShowEditClientFrom] = useState(false)
  const [clientFormValues, setClientFromValues] = useState(defaultValues)

  const [userRole, setUserRole] = useState("user")
  const [showClientFormPop, setshowClientFormPop] = useState(false)

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
    const title = document.getElementById("client-form-title");
    const ul = document.getElementById("form-items")
    if (title.classList.contains("mm-active")) {
      title.classList.remove("mm-active");
      ul.classList.remove("mm-show");
      setShowEditClientFrom(false)
      setEditClientFrom(false)
    } else {
      title.classList.add("mm-active");
      ul.classList.add("mm-show");
      setShowEditClientFrom(true)
    }
  }

  const closeCleintFormPopup = () => {
    window.location.reload();
    document.body.style.overflowY = "auto";
  }
  const handleValidSubmit = async values => {
    try {
      const reqData = {
        id: contractorID,
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
      await axiosApi().post(`api/submit-form`, reqData)
        .then(response => {
          setshowClientFormPop(true)
          document.body.style.overflowY = "hidden"
        })
        .catch(err => {
          throw err
        })
    } catch (err) {
      throw (err)
    }
  }

  function handleChangeForm(value) {
    setClientFromValues(clientFormValues => ({
      ...clientFormValues,
      ...value
    }));
  }

  const setEditingClientForm = (val) => {
    setEditClientFrom(val)
    if (val == false) {
      handleChangeForm(defaultValues);
    }
  }
  return (
    <Card>
      <CardBody className="contractor-overview m-4">
        {showClientFormPop ?
          <div className="success-container" id="client-form-pop">
            <div className="success-card">
              <div className="success-icon">
                <i className="mdi mdi-check-circle" style={{ fontSize: "30px" }}></i>
              </div>
              <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
                Changed IR35Pro Contractor Onboarding Form Data successfully.
              </div>
              <div className="mt-4 go-btn-container">
                <button onClick={() => { closeCleintFormPopup() }} className="btn btn-primary">Continue</button>
              </div>
            </div>
          </div> : null}
        {
          (userRole == "ir35pro" && showEditClientFrom) ? (
            editClientFrom ?
              <Link to="#" style={{ color: "#A0A5B2", fontSize: "16px", position: "absolute", top: "45px", right: "80px", zIndex: "99" }} onClick={() => { setEditingClientForm(false) }}><i className="mdi mdi-close-thick" ></i></Link> :
              <Link to="#" style={{ color: "#A0A5B2", fontSize: "16px", position: "absolute", top: "45px", right: "80px", zIndex: "99" }} onClick={() => { setEditingClientForm(true) }}><i className="mdi mdi-square-edit-outline" ></i></Link>
          ) : null
        }
        <Link to="" id="client-form-title" className="font-size-15 has-arrow " style={{ fontWeight: "600", color: "#495057" }} onClick={e => onExpand(e)}>
          IR35Pro Contractor Onboarding Form
        </Link>
        <ul className="form-info list-unstyled text-center mt-4 sub-menu mm-collapse" id="form-items">
          <AvForm
            id="overview-onboarding"
            model={defaultValues}
            onValidSubmit={(e, v) => {
              handleValidSubmit(v)
            }}
          >
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>First Name</div>
                <AvField
                  name="first_name"
                  type="text"
                  required
                  value={clientFormValues.first_name}
                  onChange={(e) => { handleChangeForm({ first_name: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Last Name</div>
                <AvField
                  name="last_name"
                  type="text"
                  required
                  value={clientFormValues.last_name}
                  onChange={(e) => { handleChangeForm({ last_name: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Ltd Company Name</div>
                <AvField
                  name="ltd_company_name"
                  type="text"
                  required
                  value={clientFormValues.ltd_company_name}
                  onChange={(e) => { handleChangeForm({ ltd_company_name: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Ltd Company Number</div>
                <AvField
                  name="ltd_company_number"
                  type="text"
                  required
                  value={clientFormValues.ltd_company_number}
                  onChange={(e) => { handleChangeForm({ ltd_company_number: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Email Address</div>
                <AvField
                  name="email"
                  type="email"
                  required
                  value={clientFormValues.email}
                  onChange={(e) => { handleChangeForm({ email: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Phone Number</div>
                <AvField
                  name="phone_number"
                  type="text"
                  required
                  value={clientFormValues.phone_number}
                  onChange={(e) => { handleChangeForm({ phone_number: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Job Ticket Reference</div>
                <AvField
                  name="job_ticket"
                  type="text"
                  required
                  value={clientFormValues.job_ticket}
                  onChange={(e) => { handleChangeForm({ job_ticket: e.target.value }) }}
                  disabled={!editClientFrom}
                />
              </div>
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Are you an office holder of the end Client?</div>
                <AvRadioGroup inline name="recruitment_1" value={clientFormValues.recruitment_1} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_1: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Will you be hiring any of your own employees to help complete the work?</div>
                <AvRadioGroup inline name="recruitment_2" value={clientFormValues.recruitment_2} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_2: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Did the Client interview you?</div>
                <AvRadioGroup inline name="recruitment_3" value={clientFormValues.recruitment_3} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_3: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Will you be working onsite at the Client&apos; s premises?</div>
                <AvRadioGroup inline name="recruitment_4" value={clientFormValues.recruitment_4} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_4: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Do you hold professional indemnity insurance?</div>
                <AvRadioGroup inline name="recruitment_7" value={clientFormValues.recruitment_7} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_7: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Will you be using your own laptop or the Client&apos; s laptop?</div>
                <AvField
                  type="select"
                  className="form-select mb-4"
                  id="recruitment_6_0"
                  name="recruitment_6"
                  multiple={false}
                  value={clientFormValues.recruitment_6}
                  onChange={(e) => { handleChangeForm({ recruitment_6: e.target.value }) }}
                  disabled={!editClientFrom}
                >
                  <option value="own">Own</option>
                  <option value="client">Client&apos; s</option>
                </AvField>
              </div>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>If so, is this due to data or security issues?</div>
                <AvField
                  type="select"
                  className="form-select mb-4"
                  id="recruitment_5_0"
                  name="recruitment_5"
                  multiple={false}
                  value={clientFormValues.recruitment_5}
                  onChange={(e) => { handleChangeForm({ recruitment_5: e.target.value }) }}
                  disabled={!editClientFrom}
                >
                  <option value="data">Data</option>
                  <option value="security">Security</option>
                </AvField>
              </div>
            </li>
            <li style={{ textAlign: 'left', display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Does your business have it&apos; s own website?</div>
                <AvRadioGroup inline name="recruitment_8" value={clientFormValues.recruitment_8} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_8: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
              <div style={{ width: "100%", padding: "0" }}>
                <div style={{ padding: "0", fontSize: "14px", fontWeight: "500" }}>Will you be carrying out work for other Clients at the same time?</div>
                <AvRadioGroup inline name="recruitment_9" value={clientFormValues.recruitment_9} className="ans-group" required errorMessage="Pick one!"
                  onChange={(e) => { handleChangeForm({ recruitment_9: e.target.value }) }}>
                  <AvRadio disabled={!editClientFrom} label="YES" value="yes" />
                  <AvRadio disabled={!editClientFrom} label="NO" value="no" />
                </AvRadioGroup>
              </div>
            </li>
            {editClientFrom ?
              <li className="m-4" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="#" className="btn" onClick={() => { setEditingClientForm(false) }} style={{ width: "140px", marginRight: "20px", border: "solid 1px #00aeef" }}>Cancel</Link>
                <button type="submit" className="btn btn-primary" style={{ width: "140px" }}>Save Changes</button>
              </li> : null}
          </AvForm>
        </ul>
      </CardBody>
    </Card>
  )
}

IRClientClientFormInfo.propTypes = {
  clientFormInfo: PropTypes.object,
  contractorID: PropTypes.string,
}

export default IRClientClientFormInfo
