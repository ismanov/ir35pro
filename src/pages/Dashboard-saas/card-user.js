import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { element, object } from "prop-types"
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
} from "reactstrap"
import {
  getCompanies as onGetCompanies,
} from "store/company/actions";

const CardUser = props => {
  const dispatch = useDispatch();

  const { contractors, companies = [] } = useSelector(state => ({
    contractors: state.projects.contractors,
    companies: state.company.companies
  }));

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [avatar, setavatar] = useState("");
  const [newContractors, setNewContractors] = useState(0);
  const [monthlyContractors, setMonthlyContractors] = useState(0);

  useEffect(() => {
    dispatch(onGetCompanies());
  }, []);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setname(obj.first_name + " " + obj.last_name);
      setemail(obj.email);
      setcompany(obj.company);
      setavatar(obj.img);
    }
  }, []);
  useEffect(() => {
    let newCon = 0, monCon = 0;
    if (!contractors) {
      return;
    }
    for (let i = 0; i < contractors.length; i++) {
      if (parseInt(contractors[i].progress) < 8) {
        newCon++;
      } else {
        if (parseInt(contractors[i].progress) > 0) {
          monCon++;
        }
      }
    }
    setNewContractors(newCon);
    setMonthlyContractors(monCon);
  }, [contractors]);

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <Media>
                    <div className="me-3">
                      {!avatar ? (
                        <div className="avatar-md">
                          <span className="avatar-title rounded-circle">
                            {name.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <img
                            className="rounded-circle avatar-xs"
                            src={avatar}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <Media className="align-self-center" body>
                      <div className="text-muted">
                        <p className="mb-2">Welcome to IR35Pro Dashboard</p>
                        <h5 className="mb-1">{name}</h5>
                        <p className="mb-0">{(companies.filter(item => item.id.toString() == company.toString()))[0]?.company_name}</p>
                      </div>
                    </Media>
                  </Media>
                </Col>

                <Col lg="8" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="4">
                        <div>
                          <p className="text-muted mb-2" style={{ minHeight: "39px" }}>
                            Total number of new Contractors
                          </p>
                          <h5 className="mb-0">{newContractors}</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted mb-2" style={{ minHeight: "39px" }}>
                            Total number in monthly monitoring
                          </p>
                          <h5 className="mb-0">{monthlyContractors}</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2" style={{ minHeight: "39px" }}>
                            Total Contractors
                          </p>
                          <h5 className="mb-0">{newContractors + monthlyContractors}</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
