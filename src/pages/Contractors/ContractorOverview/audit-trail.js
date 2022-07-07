import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import { yesNoColor } from "common/data/progress"
import { map } from "lodash"
import moment from "moment"

const AuditTrail = ({ auditTrail }) => {

  function onExpand(e) {
    e.preventDefault();
    const title = document.getElementById("audit-trail");
    const ul = document.getElementById("audit-items")
    if (title.classList.contains("mm-active")) {
      title.classList.remove("mm-active");
      ul.classList.remove("mm-show");
    } else {
      title.classList.add("mm-active");
      ul.classList.add("mm-show");
    }
  }

  const handleValidDate = date => {
    if (date == null) {
      return "-";
    }
    const date1 = moment(new Date(date)).format("hh:mm MMM DD Y");
    return date1;
  };
  return (
    <Card>
      <CardBody className="contractor-overview m-4">
        <Link to="" id="audit-trail" className="font-size-15 has-arrow " style={{ fontWeight: "600", color: "#495057" }} onClick={e => onExpand(e)}>
          Audit Trail
        </Link>
        <ul className="list-unstyled text-center mt-4 sub-menu mm-collapse" id="audit-items">
          {map(auditTrail, (audit, index) => (
            <li style={{ textAlign: 'left' }} key={index}>
              <Row>
                <Col xs={2}>
                  <p className="font-size-13">
                    {handleValidDate(audit.created_time)}
                  </p>
                </Col>
                <Col xs={10}>
                  <p className="font-size-15">{audit.message}</p>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}

AuditTrail.propTypes = {
  auditTrail: PropTypes.object,
}

export default AuditTrail
