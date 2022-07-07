import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Row } from "reactstrap"
import {
  getUsers as onGetUsers,
} from "store/contacts/actions";

const MiniWidget = props => {
  const dispatch = useDispatch();
  const { contractors } = useSelector(state => ({
    contractors: state.projects.contractors,
  }));

  const [overContractors, setoverContractors] = useState(0);

  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }));

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
    }
  }, [dispatch, users]);

  useEffect(() => {
    let overTasks = 0;
    if (!contractors) {
      return;
    }
    for (let i = 0; i < contractors.length; i++) {
      if (contractors[i].overDue == "true" || contractors[i].overDue == true) {
        overTasks++;
      }
    }
    setoverContractors(overTasks);
  }, [contractors]);

  return (
    <React.Fragment>
      <Row>
        <Col sm="3">
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                    <i className="bx bx-user" />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">Users</h5>
              </div>
              <div className="text-muted mt-4">
                <h4>
                  <span className="font-size-12">Total Count: </span>{users && users.length ? users.length : 0}
                  <i className="mdi mdi-chevron-up ms-1 text-success" />
                </h4>
                <div className="d-flex">
                  <span
                    className="badge badge-soft-success font-size-12"
                  >+ 0.2%
                  </span>{" "}
                  <span className="ms-2 text-truncate">From previous period</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                    <i className="bx bx-grid-alt" />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">Contractors</h5>
              </div>
              <div className="text-muted mt-4">
                <h4>
                  <span className="font-size-12">Total Count: </span>{contractors && contractors.length ? contractors.length : 0}
                  <i className="mdi mdi-chevron-up ms-1 text-success" />
                </h4>
                <div className="d-flex">
                  <span
                    className="badge badge-soft-success font-size-12"
                  >+ 20%
                  </span>{" "}
                  <span className="ms-2 text-truncate">From previous period</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                    <i className="mdi mdi-alert-outline" />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">Overdue</h5>
              </div>
              <div className="text-muted mt-4">
                <h4>
                  <span className="font-size-12">Total Count: </span>{overContractors}
                  <i className="mdi mdi-chevron-up ms-1 text-danger" />
                </h4>
                <div className="d-flex">
                  <span
                    className="badge badge-soft-danger font-size-12"
                  >+ 20%
                  </span>{" "}
                  <span className="ms-2 text-truncate">From previous period</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card style={{ height: "146px" }}>
            <CardBody>
              <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <Link
                  to="/add-contractor"
                  className="btn btn-primary"
                >Add New Contractor</Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default MiniWidget
