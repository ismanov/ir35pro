import React, { useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody } from "reactstrap"
import iconSurvey from "assets/images/survey.png"

const IRClientSurveyForm = ({ contractorId }) => {

  const [copyString, setCopyString] = useState("Request Form");

  const copyFormLink = id => {
    var textField = document.createElement('textarea')
    textField.innerText = window.location.protocol + "://" + window.location.hostname + "/form-client/" + id
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopyString("Copied Link!");
    setInterval(() => {
      setCopyString("Request Form");
    }, 3000);
  };
  return (
    <Card>
      <CardBody>
        <div className="text-center">
          <button onClick={() => copyFormLink(contractorId)}
            style={{ fontSize: "16px", fontWeight: "500", background: "transparent", border: "none" }}>
            <img
              src={iconSurvey}
              alt="survey"
              style={{ marginRight: "1rem" }}
            />
            {copyString}
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

IRClientSurveyForm.propTypes = {
  contractorId: PropTypes.string,
}

export default IRClientSurveyForm
