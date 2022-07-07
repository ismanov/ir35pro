import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Col, Progress, Row, Spinner } from "reactstrap"
import axiosApi from "helpers/api_helper";

const ContractorStatus = ({ contractor }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [userRole, setUserRole] = useState("user");
  const [changeTO, setChangeTo] = useState("");
  const [loading, setLoading] = useState(false);

  const progressesArray = [
    "Contractor IR35 Assessment",
    "IR35 Status Decision",
    "Confirm Contractor",
    "Contractor Onboarding",
    "SOW Drafting",
    "SOW Review",
    "SOW Review",
    "Document Approvals",
    "Monthly Monitoring"
  ]
  useEffect(() => {
    const initProgressbar = async () => {
      setProgressPercent((contractor.progress) / 7 * 100);
    }
    initProgressbar();
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj.userrole) {
      setUserRole(obj.userrole);
    }
  }

  const onArchive = async (status) => {
    if (userRole != "ir35pro") return;
    if (contractor.ir_status == status) return;
    document.getElementById('status-pop').style.display = 'flex';
    document.body.style.overflowY = "hidden"
    setChangeTo(status);

  };

  const closeStatusPopup = () => {
    let popup = document.getElementById('status-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
  }

  const onChangeStatus = async (e) => {
    e.target.disabled = true
    setLoading(true);
    const data = {
      ir_status: changeTO
    }
    await axiosApi().put(`api/archive-contractor/${contractor.id}`, data)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        throw err
      })
  }

  return (
    <Card>
      <CardBody>
        <div className="success-container" id="status-pop" style={{ display: "none" }}>
          <div className="success-card">
            <div className="close-button">
              <button className="btn" onClick={() => { closeStatusPopup() }}><i className="mdi mdi-close-thick"></i></button>
            </div>
            <div className="success-icon">
              <i className="mdi mdi-alert-circle" style={{ fontSize: "30px" }}></i>
            </div>
            <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Status Change</div>
            <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px", paddingBottom: "20px" }}>
              Do you confirm changing IR35 status for this contractor?
            </div>
            <div className="mt-4 go-btn-container">
              <button onClick={() => { closeStatusPopup() }} className="btn btn-primary" style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>No, Keep It</button>
              <button onClick={(e) => { onChangeStatus(e) }} className="btn btn-primary" style={{ minWidth: "130px", marginLeft: "10px", position: "relative" }}>
                Yes, Change
                {loading ? <Spinner animation="border" style={{ position: "absolute", width: "16px", height: "16px", borderWidth: "1px", right: "5px", top: "10px" }} /> : null}
              </button>
            </div>
          </div>
        </div>
        <Row className="m-4">
          <Col xs="6">
            <div style={{ fontSize: "16px", fontWeight: "500" }}>IR35Pro Status</div>
            <div style={{ display: "flex", justifyContent: "flex-start" }} className="mt-4">
              <button
                className={"btn " + ((contractor.ir_status == "under_assessment" || contractor.ir_status == "under assessment") ? "btn-primary" : "btn-secondary")}
                onClick={() => onArchive("under_assessment")}>
                Under Assessment
              </button>
              <button
                className={"btn " + (contractor.ir_status == "inside" ? "btn-danger" : "btn-secondary")}
                style={{ marginLeft: "2rem", width: "100px" }} onClick={() => onArchive("inside")}>
                Inside
              </button>
              <button
                className={"btn " + (contractor.ir_status == "outside" ? "btn-success" : "btn-secondary")}
                style={{ marginLeft: "2rem", width: "100px" }} onClick={() => onArchive("outside")}>
                Outside
              </button>
            </div>
          </Col>
          <Col xs="6">
            <div style={{ fontSize: "16px", fontWeight: "500" }}>Progress</div>
            <div className="mt-4" style={{ fontSize: "16px", fontWeight: "500", color: "#00AEED", display: "flex", justifyContent: "space-between" }}>
              <div>{progressesArray[contractor.progress]}</div>
              <div>{contractor.progress + 1}/8</div>
            </div>
            <div className="position-relative mt-3" style={{ marginLeft: "5px" }}>
              <Progress
                value={progressPercent}
                color="primary"
                style={{ height: '3px' }}
              ></Progress>
              <button className="position-absolute top-0 start-0 translate-middle btn-primary"
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-10 translate-middle " + (contractor.progress > 0 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-20 translate-middle " + (contractor.progress > 1 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-30 translate-middle " + (contractor.progress > 2 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-60 translate-middle " + (contractor.progress > 3 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-70 translate-middle " + (contractor.progress > 4 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-80 translate-middle " + (contractor.progress > 5 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
              <button
                className={"position-absolute top-0 start-100 translate-middle " + (contractor.progress > 6 ? "btn-primary" : "btn-secondary")}
                style={{ padding: "0", borderRadius: "50%", borderColor: "transparent", width: "11px", height: "11px" }}>
              </button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card >
  )
}

ContractorStatus.propTypes = {
  contractor: PropTypes.object,
}

export default ContractorStatus
