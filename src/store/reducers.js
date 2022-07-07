import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//projects
import projects from "./contractors/reducer"

import drafts from "./drafts/reducer"

import clientForms from "./client-forms/reducer"

//contacts
import contacts from "./contacts/reducer"

import company from "./company/reducer"

import chat from "./chat/reducer"

import myTasks from "./my-tasks/reducer"

import Notifications from "./notifications/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  projects,
  contacts,
  company,
  chat,
  myTasks,
  Notifications,
  clientForms,
  drafts,
})

export default rootReducer
