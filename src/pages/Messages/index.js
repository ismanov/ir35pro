/* eslint-disable react/prop-types */
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Chat from "./Chat"
import Tab from "./Tab"

import "./styles.scss"

const Messages = props => {
  const { match } = props
  return (
    <div className="messages-screen-container">
      <div className="messages-screen-tab">
        <Tab />
      </div>
      <div className="messages-screen-body">
        <Switch>
          <Route path={`${match?.path}/chat`} component={Chat} />
          <Route
            path={`${match?.path}/contractor-overview`}
            component={() => <div />}
          />
          <Route
            path={`${match?.path}`}
            component={() => <Redirect to={`${match?.path}/chat`} />}
          />
        </Switch>
      </div>
    </div>
  )
}

export default Messages
