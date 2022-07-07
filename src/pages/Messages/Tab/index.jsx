import React, { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"
import { getChatStore } from "store"
import "./styles.scss"

const Tab = () => {
  const { pathname } = useLocation()
  const selectedChat = useSelector(getChatStore("selectedChat"))

  return (
    <div className="tab-container">
      <div className="flex">
        <NavLink
          to={`/contractors-overview/${selectedChat?.contractorId}`}
          onClick={e => {
            if (!selectedChat) e.preventDefault()
          }}
        >
          <div
            className={`tab-item ${
              pathname.includes("/i/contractor-overview") ? "active-tab" : ""
            }`}
          >
            <span className="s16 w500 cGrey">CONTRACTOR OVERVIEW</span>
          </div>
        </NavLink>
        <NavLink to={"/i/chat"}>
          <div
            className={`tab-item ${
              pathname.includes("/i/chat") ? "active-tab" : ""
            }`}
          >
            <span className="s16 w500 cGrey">MESSAGES</span>
          </div>
        </NavLink>
        <NavLink to={"/my-tasks"}>
          <div
            className={`tab-item ${
              pathname.includes("/i/my-tasks") ? "active-tab" : ""
            }`}
          >
            <span className="s16 w500 cGrey">MY TASKS</span>
          </div>
        </NavLink>
      </div>
      <span className="s13 w400 cBlackL">Messages</span>
    </div>
  )
}

export default Tab
