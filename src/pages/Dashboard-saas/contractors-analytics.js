import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux"
import { element } from "prop-types"

const ContractorsAnalytics = props => {
  const dispatch = useDispatch();

  const { contractors } = useSelector(state => ({
    contractors: state.projects.contractors,
  }));

  // const series = [56, 38, 26]
  const options = {
    labels: [
      "contractor ir35 assessment",
      "ir35 status decision",
      "confirm contractor",
      "contractor onboarding",
      "sow drafting",
      "sow review",
      "document approvals",
      "monthly monitoring"
    ],
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2,
      colors: ["transparent"],
    },
    legend: { show: !1 },
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: !1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "20%",
        endingShape: "rounded",
      },
    },
  }

  const [checkPending, setcheckPending] = useState(0);
  const [checkComplete, setcheckComplete] = useState(0);
  const [recIssued, setrecIssued] = useState(0);
  const [recComplete, setrecComplete] = useState(0);
  const [docPending, setdocPending] = useState(0);
  const [signPending, setsignPending] = useState(0);
  const [docUploaded, setdocUploaded] = useState(0);
  const [monthlyContractors, setMonthlyContractors] = useState(0);
  const [series, setseries] = useState([]);

  useEffect(() => {
    let checkpCon = 0, reciCon = 0, signCon = 0, monCon = 0;
    let checkcCon = 0, docpCon = 0, reccCon = 0, docuCon = 0;
    if (!contractors) {
      return;
    }
    for (let i = 0; i < contractors.length; i++) {
      switch (parseInt(contractors[i].progress)) {
        case 1:
          checkpCon++;
          break;
        case 2:
          checkcCon++;
          break;
        case 3:
          reciCon++;
          break;
        case 4:
          reccCon++;
          break;
        case 5:
          docpCon++;
          break;
        case 6:
          signCon++;
          break;
        case 7:
          docuCon++;
          break;
        case 8:
          monCon++;
          break;
      }
    }

    setcheckPending(checkpCon);
    setcheckComplete(checkcCon);
    setrecIssued(reciCon);
    setrecComplete(reccCon);
    setdocPending(docpCon);
    setsignPending(signCon);
    setdocUploaded(docuCon);
    setMonthlyContractors(monCon);
    let sum = contractors.length;
    let temp = [{
      name: "Contractor Analytics",
      data: [checkpCon, checkcCon, reciCon, reccCon, docpCon, signCon, docuCon, monCon]
    }]
    setseries(temp);
  }, [contractors]);


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Contractors Analytics</h4>
          <div id="donut-chart">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={300}
              className="apex-charts"
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ContractorsAnalytics
