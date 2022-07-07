import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from 'react-redux'
import {
  getContractors as onGetContractors,
} from "store/actions";
import { isEmpty } from "lodash"

const MiniWidget = () => {
  const dispatch = useDispatch()
  const { contractors } = useSelector(state => ({
    contractors: state.projects.contractors,
  }))
  useEffect(() => {
    // if (isEmpty(contractors)) {
    dispatch(onGetContractors());
    // }
  }, []);

  const [savedLastMonth, setLastMonth] = useState(0);
  const [savedThisYear, setThisYear] = useState(0);

  useEffect(() => {
    onload()
  }, [contractors])

  function onload() {
    let sumMonth = 0;
    let sumYear = 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (!contractors) {
      return;
    }
    for (let i = 0; i < contractors.length; i++) {
      if (contractors[i].ir_status != "archived" && contractors[i].progress == "8") {
        const contractorMonth = new Date(contractors[i].first_monthly_date).getMonth();
        const contractorYear = new Date(contractors[i].first_monthly_date).getFullYear();
        if (contractorYear < currentYear) {
          sumMonth += parseInt(contractors[i].day_rate) * 21 * 30 / 100
        } else {
          if (contractorMonth < currentMonth) {
            sumMonth += parseInt(contractors[i].day_rate) * 21 * 30 / 100
          }
        }
      }
    }
    setLastMonth(sumMonth);

    for (let j = 0; j < currentMonth; j++) {
      for (let k = 0; k < contractors.length; k++) {
        if (contractors[k].ir_status != "archived" && contractors[k].progress == "8") {
          const contractorMonth = new Date(contractors[k].first_monthly_date).getMonth();
          const contractorYear = new Date(contractors[k].first_monthly_date).getFullYear();
          if (contractorMonth <= j) {
            sumYear += parseInt(contractors[k].day_rate) * 21 * 30 / 100
          } else {
            if (contractorYear < currentYear) {
              sumYear += parseInt(contractors[k].day_rate) * 21 * 30 / 100
            }
          }
        }
      }
    }
    setThisYear(sumYear);

  }

  return (
    <React.Fragment>
      <Col sm="6">
        <Card>
          <CardBody>
            <h4 className="text-muted mb-4">
              Total £ Saved Last Month
            </h4>
            <h1 style={{ textAlign: "center" }}>£ {savedLastMonth}</h1>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6">
        <Card>
          <CardBody>
            <h4 className="text-muted mb-4">
              Total £ Saved This Year To Date
            </h4>
            <h1 style={{ textAlign: "center" }}>£ {savedThisYear}</h1>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default MiniWidget