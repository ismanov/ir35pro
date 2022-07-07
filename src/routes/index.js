import React from "react"
import { Redirect } from "react-router-dom"

import UserProfile from "../pages/Authentication/user-profile"
// import ProgressList from "../pages/Progress/progress-list"
import ProgressKanban from "../pages/Progress/progress-kanban"
import DraftsKanban from "../pages/Drafts/progress-kanban"
import ContractorsList from "../pages/Contractors/contractors-list"
import ContractorsOverview from "../pages/Contractors/ContractorOverview/contractors-overview"
import ContractorsCreate from "../pages/Contractors/contractor-create"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"
import DashboardSaas from "../pages/Dashboard-saas/index"
import DashboardCrypto from "../pages/Dashboard-crypto/index"
import IrCleintForm from "../pages/Forms/ClientForm"
import FormClientSurvey from "../pages/Forms/ClientSurvey"
import PagesPricing from "../pages/Utility/pages-pricing"
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"
import companyList from "pages/Contacts/ContactList/company-list"
import Notifications from "../pages/Dashboard-crypto/notifications"
import Messages from "pages/Messages"
import MyTasks from "pages/MyTasks"

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardSaas },
  { path: "/report", component: DashboardCrypto },
  { path: "/profile", component: UserProfile },
  // Contacts
  { path: "/users-list", component: ContactsList },
  { path: "/company-list", component: companyList },
  { path: "/user-profile/:id", component: ContactsProfile },
  { path: "/pricing", component: PagesPricing },
  { path: "/i", component: Messages, exact: false },
  { path: "/my-tasks", component: MyTasks, exact: false },
  // { path: "/contractors", component: ProgressList },
  { path: "/progress", component: ProgressKanban },
  { path: "/contractors", component: DraftsKanban },
  { path: "/contractors-list", component: ContractorsList },
  { path: "/contractors-overview/:id", component: ContractorsOverview },
  { path: "/add-contractor", component: ContractorsCreate },
  { path: "/form-survey/:id", component: FormClientSurvey },
  { path: "/notifications", component: Notifications },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/auth/emailconfirmation/:token", component: ConfirmMail },
  { path: "/form-client/:id", component: IrCleintForm },

  // { path: "/pages-maintenance", component: PagesMaintenance },
  // { path: "/pages-comingsoon", component: PagesComingsoon },
  // { path: "/pages-404", component: Pages404 },
  // { path: "/pages-500", component: Pages500 },
  // { path: "/crypto-ico-landing", component: CryptoIcoLanding },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/auth/resetpassword/:token", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-recoverpw-2", component: ForgetPwd2 },

  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
]

export { authProtectedRoutes, publicRoutes }
