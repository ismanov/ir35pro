import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Card, CardBody, Media, Row, Container } from "reactstrap"
import moment from "moment"
//Simple bar
import Breadcrumbs from "components/Common/Breadcrumb";
import { map } from "lodash";
import {
  getNotifications as onGetNotifications,
} from "store/actions";
import { progressList } from "common/data/progress";
import MetaTags from "react-meta-tags";
import axiosApi from "helpers/api_helper";

//Import Images

const Notifications = () => {

  const dispatch = useDispatch()

  const { notifications } = useSelector(state => ({
    notifications: state.Notifications.notifications
  }))

  const [unreadNotification, setUnread] = useState(0)

  useEffect(() => {
    if (notifications && !notifications.length) {
      dispatch(onGetNotifications());
    }
  }, [dispatch, notifications])

  useEffect(() => {
    let unread = 0;
    if (notifications) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].readed == "false") {
          unread++;
        }
      }
      setUnread(unread);
    }
  }, [notifications])

  const handleCreatedDate = date => {
    if (date == "null" || date == "undefined") {
      return "-";
    }
    const diff = new Date() - new Date(date);
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const mins = Math.floor((diff - (hours * 60 * 60 * 1000)) / (60 * 1000));
    let res = "";
    if (hours < 1) {
      res = (mins != 0 ? mins + (mins == 1 ? " minute ago" : " minutes ago") : "just now");
    } else if (hours < 24) {
      res = (hours + (hours == 1 ? " hour " : " hours ") + "ago");
    } else {
      res = moment(new Date(date)).format("hh:mm MMM DD Y");
    }
    return res;
  };

  const clickNotification = async (e, itemdata) => {
    e.preventDefault();
    let readed = false;
    if (itemdata.readed == "true" || itemdata.readed == true) {
      readed == false
    } else {
      readed = true;
    }
    const data = {
      id: itemdata.id,
      readed: readed
    }
    await axiosApi().put(`api/update-notification`, data)
      .then(response => {
        if (readed) {
          setUnread(unreadNotification - 1);
        } else {
          setUnread(unreadNotification + 1);
        }
        window.location.reload();
      })
      .catch(err => {
        throw err
      })
    window.location.reload();
  };

  const renderNotificationMessage = (notification) => {

    switch (notification.message) {
      case 'add_new':
        return "New Contractor[" + notification.contractor_name + "] was created by " + notification.user_name
      case 'updated':
        return notification.contractor_name + " moved to " + progressList[notification.new_progress] + " by " + notification.user_name
      case 'survey':
        return notification.user_name + " submitted a form for IR35 status determination at " + notification.contractor_name
      case 'recruitment':
        return "Contractor[" + notification.contractor_name + "] submitted onboarding form"
      case 'add_comment':
        return "Added comments by " + notification.user_name
      case 'add_comment':
        return "Added comments by " + notification.user_name
      default:
        return notification.messageText || notification.message
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Notifications | IR35Pro</title>
        </MetaTags>
        <Container fluid></Container>
        <Breadcrumbs title="Notifications" breadcrumbItem="All Notifications" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                {map(notifications, (item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "#dbdee1",
                    borderBottomWidth: "1px"
                  }}>
                    <Link
                      to=""
                      className="text-reset notification-item"
                      onClick={(e) => clickNotification(e, item)}>
                      <div className="media">
                        <div className="media-body" style={{ display: "flex" }}>
                          <div className="font-size-12 text-muted" style={{ paddingRight: "20px", width: "200px" }}>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline" />{" "}
                              {handleCreatedDate(item.created_time)}
                            </p>
                          </div>
                          <h6 className="mt-0 mb-1"
                            style={{ fontWeight: (item.readed == "false" ? "800" : "500") }}>
                            {renderNotificationMessage(item)}
                            {item.readed == "false" ? <sup className="text-danger"> new</sup> : ""}
                          </h6>

                        </div>
                      </div>
                    </Link>
                    {item.readed == "false" || item.readed == false ?
                      <Link to="/" className="btn btn-primary" onClick={(e) => clickNotification(e, item)} style={{ height: "36px" }}>Mark as read</Link> :
                      <Link to="/" className="btn btn-outline-light" onClick={(e) => clickNotification(e, item)} style={{ height: "36px" }}>Mark as unread</Link>}
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Notifications
