import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col, Button } from "reactstrap"
import SimpleBar from "simplebar-react"

//i18n
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty, map } from "lodash"
import moment from "moment"

import {
  getNotifications as onGetNotifications,
} from "store/actions";

import { notificationLinks, progressList } from "common/data/progress"
import axiosApi from "helpers/api_helper"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  const [unreadNotification, setUnread] = useState(0)
  const { notifications } = useSelector(state => ({
    notifications: state.Notifications.notifications
  }))

  useEffect(() => {
    if (notifications && !notifications.length) {
      dispatch(onGetNotifications());
    }
  }, [])

  useEffect(() => {
    let unread = null;
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

  const clickNotification = async (e, data) => {
    e.preventDefault();
    if (data.readed == "true") {
      return;
    }
    const url = data.new_progress == 3 ?
      notificationLinks[data.new_progress] + data.contractor :
      notificationLinks[data.new_progress]
    data.readed = true;
    await axiosApi().put(`api/update-notification`, data)
      .then(response => {
        setUnread(unreadNotification - 1);
      })
      .catch(err => {
        throw err
      })
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
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">{unreadNotification}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="/notifications" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {map(notifications, (item, i) => (
              <Link
                to=""
                className="text-reset notification-item" key={i}
                onClick={(e) => clickNotification(e, item)}>
                <div className="media">
                  <div className="media-body">
                    <h6 className="mt-0 mb-1"
                      style={{ fontWeight: (item.readed == "false" ? "800" : "500") }}>
                      {renderNotificationMessage(item)}
                      {item.readed == "false" ? <sup className="text-danger"> new</sup> : ""}
                    </h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />{" "}
                        {handleCreatedDate(item.created_time)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/notifications"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}