import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"


const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")
  const [userRole, setuserRole] = useState("user")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.first_name + " " + obj.last_name)
        setuserRole(obj.userrole)
      }
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <div className="avatar-xs d-xl-inline-block">
            <span className="avatar-title rounded-circle">
              {username.charAt(0)}
            </span>
          </div>
          <span className="d-none d-xl-inline-block ms-2 me-1">{userRole == "user" ? "IR35 Regular User" : (userRole == "admin" ? "IR35 Admin User" : "IR35 Super Admin User")}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/pricing">
            <i className="bx bx-dollar font-size-16 align-middle me-1"/>
            {props.t("Pricing")}
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
