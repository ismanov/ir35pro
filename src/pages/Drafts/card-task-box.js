import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody } from "reactstrap"
import classNames from 'classnames';
import { ir35Status } from 'common/data/progress';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import warningIcon from "../../assets/images/warning-icon.png"

const CardTaskBox = props => {
  const dispatch = useDispatch()
  const data = props.data
  const companies = props.companies
  const clientForms = props.clientForms

  const [contractorName, setContractorName] = useState("");

  useEffect(() => {
    let clientForm = [];
    map(clientForms, (item, index) => {
      if (item.contractor == data.id) {
        clientForm.push(item);
      }
    })
    if (clientForm.length == 1) {
      setContractorName(clientForm[0].first_name + " " + clientForm[0].last_name);
    } else if (clientForm.length > 1) {
      let todayDate = new Date();
      let firstDate = new Date(clientForm[0].createdAt);
      let minVal = todayDate - firstDate;
      setContractorName(clientForm[0].first_name + " " + clientForm[0].last_name);
      for (let i = 1; i < clientForm.length; i++) {
        let dateTemp = new Date(clientForm[i].createdAt);
        if (minVal > (todayDate - dateTemp)) {
          minVal = todayDate - dateTemp;
          setContractorName(clientForm[i].first_name + " " + clientForm[i].last_name);
        }
      }
    } else {
      setContractorName("");
    }
  }, [clientForms]);

  return (
    <React.Fragment>
      <Card className="task-box border-radius-8">
        <CardBody className={"borad-width" + (data.statuses == "client action required" ? " border-left-orange" : (data.statuses == "ir35 pro reviewing" ? " border-left-blue" : ""))}>
          <Link to={`/contractors-overview/${data.id}`}>
            <div>
              {data.overDue == "true" ?
                (data.statuses == "predefined statuses" || data.statuses == "" ?
                  <img src={warningIcon} alt="warning" style={{ marginBottom: "10px" }} /> :
                  (data.statuses == "ir35 pro reviewing" ?
                    <div style={{ marginBottom: "10px" }}>
                      <img src={warningIcon} alt="warning" />
                      <span style={{ fontSize: "14px", fontWeight: "500", color: "#3F6CFE", marginLeft: "10px" }}>IR35 Pro reviewing</span>
                    </div> :
                    <div style={{ marginBottom: "10px" }}>
                      <img src={warningIcon} alt="warning" />
                      <span style={{ fontSize: "14px", fontWeight: "500", color: "#FB8500", marginLeft: "10px" }}>Client action required</span>
                    </div>)) :
                (data.statuses == "predefined statuses" || data.statuses == "" ? null :
                  ((data.statuses == "ir35 pro reviewing") ?
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#3F6CFE", marginBottom: "10px" }}>IR35 Pro reviewing</div> :
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#FB8500", marginBottom: "10px" }}>Client action required</div>))
              }
            </div>
          </Link>
          <div style={{ height: "45px" }}>
            <Link to={`/contractors-overview/${data.id}`}>
              <div className="float-end ms-2">
                <h5 className="font-size-15">{(companies.filter(item => item.id.toString() == data.client_company.toString()))[0]?.company_name}
                  <p className="mb-0 text-muted font-size-12">Client company</p>
                </h5>
              </div>
            </Link>
            <div>
              <h5 className="font-size-15">
                {data.is_draft == "true" || data.is_draft == true ?
                  <Link className="text-dark" to={"/add-contractor?" + data.id}>{data.engagement_name + (contractorName != "" ? "(" + contractorName + ")" : contractorName)}
                    {/* <p className="mb-0 text-muted font-size-12">Engagement name</p> */}
                  </Link> :
                  <Link to={`/contractors-overview/${data.id}`} className="text-dark">
                    {data.engagement_name + (contractorName != "" ? "(" + contractorName + ")" : contractorName)}
                    {/* <p className="mb-0 text-muted font-size-12">Engagement name</p> */}
                  </Link>
                }

              </h5>
            </div>
          </div>
          <div>
            {data.is_draft == "true" || data.is_draft == true ?
              <div className="float-end ms-2">
                <Link className='btn btn-primary' to={data.tabID > 5 ? "/form-survey/" + data.id : "/add-contractor?" + data.id}>Continue Filling</Link>
              </div> : (
                data.progress == 0 || data.progress == "0" ? null :
                  <Link to={`/contractors-overview/${data.id}`}>
                    <div className="float-end ms-2">
                      <div className={classNames("badge rounded-pill font-size-15", ir35Status[data.ir_status])}>{data.ir_status == "under_assessment" ? "under assessment" : data.ir_status}</div>
                      <p className="mb-0 text-muted font-size-12" style={{ textAlign: "right" }}>IR35Pro status</p>
                    </div>
                  </Link>
              )
            }
            <Link to={`/contractors-overview/${data.id}`}>
              <div style={{ minHeight: "18px" }}>
                <div className="font-size-15" style={{ color: "#343A40" }}>{(data.hiring_manager_first_name == "undefined" ? "" : data.hiring_manager_first_name) + " " + (data.hiring_manager_last_name == "undefined" ? "" : data.hiring_manager_last_name)}</div>
                <p className="mb-0 text-muted font-size-12">Hiring manager name</p>
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

CardTaskBox.propTypes = {
  data: PropTypes.object,
  dragging: PropTypes.any,
  companies: PropTypes.any,
  clientForms: PropTypes.any
}

export default CardTaskBox
