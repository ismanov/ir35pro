import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import {
  ChatIcon,
  CompaniesIcon,
  ContractorsIcon,
  DashboardIcon,
  MyTasksIcon,
  ProgressIcon,
  ReportIcon,
  SettingsIcon,
} from "assets/svg-icons/sidebar-icons"

const SidebarContent = props => {
  const ref = useRef()
  const userRole = JSON.parse(localStorage.getItem("authUser")).userrole

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title s12 w400">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="">
                <DashboardIcon />
                <span className="mL20">{props.t("Dashboards")}</span>
              </Link>
            </li>
            <li>
              <Link to="/report" className=" ">
                <ReportIcon />
                <span className="mL20">{props.t("Report")}</span>
              </Link>
            </li>
            {userRole && userRole != "user" ? (
              <li>
                <Link to="/progress" className=" ">
                  <ProgressIcon />
                  <span className="mL20">{props.t("Progress")}</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/contractors" className=" ">
                  <ContractorsIcon />
                  <span className="mL20">{props.t("Contractors")}</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/i" className=" ">
                <ChatIcon />
                <span className="mL20">{props.t("Messages")}</span>
              </Link>
            </li>
            <li>
              <Link to="/my-tasks" className=" ">
                <MyTasksIcon />
                <span className="mL20">{props.t("MyTasks")}</span>
              </Link>
            </li>
            {userRole && userRole != "user" ? (
              <li>
                <Link to="/company-list" className=" ">
                  <CompaniesIcon />
                  <span className="mL20">{props.t("Companies")}</span>
                </Link>
              </li>
            ) : null}
            {userRole && userRole != "user" ? (
              <li>
                <Link to="/users-list" className=" ">
                  <SettingsIcon />
                  <span className="mL20">{props.t("Settings")}</span>
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
