import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import Overlays from "components/Overlays"
import SocketWrapper from "SocketWrapper"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
// fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.                      ,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {
  // useEffect(() => {
  //   onLoad();
  // }, []);

  // function onLoad() {
  //   const obj = JSON.parse(localStorage.getItem("authUser"))
  //   if (!obj.confirmed) {
  //     alert("Please check the confirmation email in your mailbox");
  //     window.location.reload();
  //   }
  // }

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <SocketWrapper>
        <Overlays>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              layout={NonAuthLayout}
              key={idx}
              isAuthProtected={false}
              exact
              {...route}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              layout={Layout}
              key={idx}
              isAuthProtected={true}
              exact
              {...route}
            />
          ))}
        </Overlays>
      </SocketWrapper>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
  userRole: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
    userRole: state.userRole,
  }
}

export default connect(mapStateToProps, null)(App)
