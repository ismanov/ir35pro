import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Media, Row } from "reactstrap"

const ContractorDetailTop = ({ clientform }) => {

  return (
    <Card>
      <CardBody>
        <Media className="overflow-hidden" body>
          <Row className="mx-4">
            <h5 className="font-size-15 mt-4" style={{ fontWeight: "600" }}>Contractor Details</h5>
          </Row>
          <Row className="mx-4 mb-4">
            <Col sm="4" xs="6">
              <div className="mt-2">
                <div className="font-size-12" style={{ color: "#495057", opacity: "0.4" }}>
                  FULL NAME
                </div>
                <div className="font-size-14 mb-0" style={{ color: "#495057" }}>{clientform ? clientform.first_name + " " + clientform.last_name : "-"}</div>
              </div>
            </Col>

            <Col sm="4" xs="6">
              <div className="mt-2">
                <div className="font-size-12" style={{ color: "#495057", opacity: "0.4" }}>
                  PHONE NUMBER
                </div>
                <div className="font-size-14 mb-0" style={{ color: "#495057" }}>{clientform ? clientform.phone_number : "-"}</div>
              </div>
            </Col>

            <Col sm="4" xs="6">
              <div className="mt-2">
                <div className="font-size-12" style={{ color: "#495057", opacity: "0.4" }}>
                  EMAIL
                </div>
                <div className="font-size-14 mb-0" style={{ color: "#495057" }}>{clientform ? clientform.email : "-"}</div>
              </div>
            </Col>
          </Row>
        </Media>
      </CardBody >
    </Card >
  )
}

ContractorDetailTop.propTypes = {
  clientform: PropTypes.any,
}

export default ContractorDetailTop
