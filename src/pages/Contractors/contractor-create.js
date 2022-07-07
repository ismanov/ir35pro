import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Container,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import { Link } from "react-router-dom"
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation"
import "react-datepicker/dist/react-datepicker.css"
import ReactTooltip from 'react-tooltip';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  updateContractor as onUpdateContractor,
} from "store/actions";
import PropTypes from "prop-types"
import {
  getCompanies as onGetCompanies,
} from "store/company/actions";
import axiosApi from "helpers/api_helper";
import { map, update } from "lodash";
const ContractorsCreate = props => {
  const dispatch = useDispatch()
  const { companies = [], error } = useSelector(state => ({
    companies: state.company.companies,
    error: state.projects.error,
  }));

  const [activeTabVartical, setoggleTabVertical] = useState(1)
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])
  const [engagement_name, setengagement_name] = useState("")
  const [requester_name, setrequester_name] = useState("")
  const [requester_email, setrequester_email] = useState("")
  const [requester_phone, setrequester_phone] = useState("")
  const [hiring_manager_first_name, sethiring_manager_first_name] = useState("")
  const [hiring_manager_last_name, sethiring_manager_last_name] = useState("")
  const [hiring_manager_email, sethiring_manager_email] = useState("")
  const [hiring_manager_phone, sethiring_manager_phone] = useState("")
  const [day_rate, setday_rate] = useState("")
  const [agency_name, setagency_name] = useState("")
  const [recruiter_name, setrecruiter_name] = useState("")
  const [recruiter_email, setrecruiter_email] = useState("")
  const [recruiter_phone, setrecruiter_phone] = useState("")
  const [reason_recruit, setreason_recruit] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [ltd_company_name, setltd_company_name] = useState("")
  const [ltd_company_number, setltd_company_number] = useState("")
  const [con_website, setcon_website] = useState("")
  const [startDate, setstartDate] = useState(null)
  const [endDate, setendDate] = useState(null)
  const [company, setcompany] = useState("")
  const [bHiring, setHiring] = useState(false)
  const [bIdentiied, setIdentified] = useState(false)
  const [bRecruiter, setRecruiter] = useState(false)
  const [username, setUserName] = useState("")
  const [userrole, setUserRole] = useState("")
  const [userfirstname, setUserFirstName] = useState("")
  const [userlastname, setUserLastName] = useState("")
  const [useremail, setUserEmail] = useState("")
  const [userphone, setUserPhone] = useState("")
  const [chooseCompany, setchooseCompany] = useState(false)
  const [defaultValues, setdefaultValues] = useState({
    is_hiring: "no",
    is_identified: "no",
    is_recruiter: "no",
    clientCompany: "",
    requester_name: "",
    requester_email: "",
    requester_phone: ""
  })
  const [draftID, setDraftID] = useState("-1");
  const [continueID, setContinueID] = useState("-1")
  const [clientCompany, setClientCompany] = useState("")

  const [disableButton, setdisableButton] = useState(true)

  const checkValidFirstStep = () => {
    const engElement = document.getElementById("engagement_name")
    const compElement = document.getElementById("client_company")
    const reqNameElement = document.getElementById("requester_name")
    const reqEmailElement = document.getElementById("requester_email")
    const reqPhoneElement = document.getElementById("requester_phone")
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (engElement.value !== "" &&
      compElement.value !== "" &&
      reqNameElement.value !== "" &&
      regEmail.test(reqEmailElement.value) &&
      regPhone.test(reqPhoneElement.value)) {
      setdisableButton(false);
      // console.log("4")
    } else {
      setdisableButton(true);
    }
  }

  const engagement_nameChange = (event) => {
    setengagement_name(event.target.value);
    checkValidFirstStep();
  }
  const client_companyChange = (event) => {
    setClientCompany(event.target.value);
    checkValidFirstStep();
  }
  const requester_nameChange = (event) => {
    setrequester_name(event.target.value);
    checkValidFirstStep();
  }
  const requester_emailChange = (event) => {
    setrequester_email(event.target.value);
    checkValidFirstStep();
  }
  const requester_phoneChange = (event) => {
    setrequester_phone(event.target.value);
    checkValidFirstStep();
  }

  const checkValidSecondStep = () => {
    if (bHiring == "false" || bHiring == false) {
      setdisableButton(false);
      return true;
    }
    const firstElement = document.getElementById("hiring_manager_first_name")
    const lastElement = document.getElementById("hiring_manager_last_name")
    const emailElement = document.getElementById("hiring_manager_email")
    const phoneElement = document.getElementById("hiring_manager_phone")
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (firstElement.value !== "" && firstElement.value.trim() !== "" &&
      lastElement.value !== "" && lastElement.value.trim() !== "" &&
      regEmail.test(emailElement.value) &&
      regPhone.test(phoneElement.value)) {
      setdisableButton(false);
      return true;
    } else {
      setdisableButton(true);
      return false;
    }
  }
  const hiring_manager_first_nameChange = (event) => {
    sethiring_manager_first_name(event.target.value);
    checkValidSecondStep()
  }
  const hiring_manager_last_nameChange = (event) => {
    sethiring_manager_last_name(event.target.value);
    checkValidSecondStep()
  }
  const hiring_manager_emailChange = (event) => {
    sethiring_manager_email(event.target.value);
    checkValidSecondStep()
  }
  const hiring_manager_phoneChange = (event) => {
    sethiring_manager_phone(event.target.value);
    checkValidSecondStep()
  }

  const checkValidThirdStep = () => {
    const startElement = document.getElementById("start_date")
    const endElement = document.getElementById("end_date")
    const budElement = document.getElementById("day_rate")
    if (startElement.value !== "" &&
      endElement.value !== "" &&
      compStartandEnd() &&
      budElement.value !== "" && parseInt(budElement.value) > 0) {
      setdisableButton(false);
    } else {
      setdisableButton(true);
    }
  }

  const startDateChange = (event) => {
    setstartDate(event.target.value)
    checkValidThirdStep()
  }

  const endDateChange = (event) => {
    setendDate(event.target.value)
    checkValidThirdStep()
  }

  const compStartandEnd = () => {
    if (!document.getElementById("start_date") || document.getElementById("start_date").value == "") {
      return false;
    } else {
      const sdate = new Date(document.getElementById("start_date").value);
      const edate = new Date(document.getElementById("end_date").value);
      if (edate.getTime() > sdate.getTime()) {
        return true;
      } else {
        return false;
      }
    }
  }

  const day_rateChange = (event) => {
    setday_rate(event.target.value);
    checkValidThirdStep()
  }

  const checkValidFourthStep = () => {
    const reasonElement = document.getElementById("reason_recruit")
    if (!bRecruiter) {
      if (reasonElement.value !== "" && reasonElement.value.trim() !== "") {
        setdisableButton(false);
        return true;
      } else {
        setdisableButton(true);
        return false;
      }
    }
    const ageElement = document.getElementById("agency_name")
    const recElement = document.getElementById("recruiter_name")
    const emailElement = document.getElementById("recruiter_email")
    const phoneElement = document.getElementById("recruiter_phone")
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (reasonElement.value !== "" && reasonElement.value.trim() !== "" &&
      ageElement.value !== "" && ageElement.value.trim() !== "" &&
      recElement.value !== "" && recElement.value.trim() !== "" &&
      regEmail.test(emailElement.value) &&
      regPhone.test(phoneElement.value)) {
      setdisableButton(false);
      return true;
    } else {
      setdisableButton(true);
      return false;
    }
  }
  const agency_nameChange = (event) => {
    setagency_name(event.target.value);
    checkValidFourthStep()
  }
  const recruiter_nameChange = (event) => {
    setrecruiter_name(event.target.value);
    checkValidFourthStep()
  }
  const recruiter_emailChange = (event) => {
    setrecruiter_email(event.target.value);
    checkValidFourthStep()
  }
  const recruiter_phoneChange = (event) => {
    setrecruiter_phone(event.target.value);
    checkValidFourthStep()
  }
  const reason_recruitChange = (event) => {
    setreason_recruit(event.target.value);
    checkValidFourthStep()
  }

  const checkValidLastStep = () => {
    if (!bIdentiied) {
      setdisableButton(false);
      return true;
    }
    const firstElement = document.getElementById("first_name")
    const lastElement = document.getElementById("last_name")
    const compElement = document.getElementById("ltd_company_name")
    const emailElement = document.getElementById("email")
    const phoneElement = document.getElementById("ltd_company_number")
    const webElement = document.getElementById("con_website")
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const regWeb = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    if (firstElement.value !== "" && firstElement.value.trim() !== "" &&
      lastElement.value !== "" && lastElement.value.trim() !== "" &&
      compElement.value !== "" && compElement.value.trim() !== "" &&
      regEmail.test(emailElement.value) &&
      regWeb.test(webElement.value) &&
      regPhone.test(phoneElement.value)) {
      setdisableButton(false);
      return true;
    } else {
      setdisableButton(true);
      return false;
    }
  }
  const first_nameChange = (event) => {
    setfirst_name(event.target.value);
    checkValidLastStep()
  }
  const last_nameChange = (event) => {
    setlast_name(event.target.value);
    checkValidLastStep()
  }
  const emailChange = (event) => {
    setemail(event.target.value);
    checkValidLastStep()
  }
  const ltd_company_nameChange = (event) => {
    setltd_company_name(event.target.value);
    checkValidLastStep()
  }
  const ltd_company_numberChange = (event) => {
    setltd_company_number(event.target.value);
    checkValidLastStep()
  }
  const con_websiteChange = (event) => {
    setcon_website(event.target.value);
    checkValidLastStep()
  }



  function toggleTabVertical(tab) {
    if (tab == 2) {
      checkValidFirstStep()
    }
    if (tab == 3) {
      if (!checkValidSecondStep()) return;
    }
    if (tab == 4) {
      checkValidThirdStep()
    }
    if (tab == 5) {
      if (!checkValidFourthStep()) return;
    }
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]
      if (tab >= 1 && tab <= 5) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  async function saveContractorForm(tab) {
    if (userrole == "ir35pro" && clientCompany == "") {
      setchooseCompany(true);
      document.body.style.overflowY = "hidden"
      return;
    }

    if (draftID == -1) {
      let reqData = {
        tabID: tab,
        engagement_name: engagement_name,
        client_company: clientCompany,
        requester_name: requester_name,
        requester_email: requester_email,
        requester_phone: requester_phone,
        day_rate: day_rate,
        agency_name: agency_name,
        recruiter_name: recruiter_name,
        recruiter_email: recruiter_email,
        recruiter_phone: recruiter_phone,
        reason_recruit: reason_recruit,
        first_name: first_name,
        last_name: last_name,
        email: email,
        ltd_company_name: ltd_company_name,
        ltd_company_number: ltd_company_number,
        con_website: con_website,
        bHiring: bHiring,
        bIdentiied: bIdentiied,
        bRecruiter: bRecruiter,
        start_date: startDate,
        end_date: endDate,
        is_draft: true
      }
      if (bHiring) {
        reqData = {
          ...reqData,
          hiring_manager_first_name: hiring_manager_first_name,
          hiring_manager_last_name: hiring_manager_last_name,
          hiring_manager_email: hiring_manager_email,
          hiring_manager_phone: hiring_manager_phone,
        }
      }
      await axiosApi().post(`api/add-contractor`, reqData)
        .then(response => {
          let popup = document.getElementById('saved-pop');
          popup.style.display = 'flex';
          document.body.style.overflowY = "hidden"
        })
        .catch(err => {
          throw err
        })
    } else {
      let updateReqData = {
        id: draftID,
        tabID: tab,
        engagement_name: engagement_name,
        client_company: clientCompany,
        requester_name: requester_name,
        requester_email: requester_email,
        requester_phone: requester_phone,
        day_rate: day_rate,
        agency_name: agency_name,
        recruiter_name: recruiter_name,
        recruiter_email: recruiter_email,
        recruiter_phone: recruiter_phone,
        reason_recruit: reason_recruit,
        first_name: first_name,
        last_name: last_name,
        email: email,
        ltd_company_name: ltd_company_name,
        ltd_company_number: ltd_company_number,
        con_website: con_website,
        bHiring: bHiring,
        bIdentiied: bIdentiied,
        bRecruiter: bRecruiter,
        start_date: startDate,
        end_date: endDate,
        is_draft: true
      }
      if (bHiring) {
        updateReqData = {
          ...updateReqData,
          hiring_manager_first_name: hiring_manager_first_name,
          hiring_manager_last_name: hiring_manager_last_name,
          hiring_manager_email: hiring_manager_email,
          hiring_manager_phone: hiring_manager_phone,
        }
      }
      dispatch(onUpdateContractor(updateReqData));
      let popup = document.getElementById('saved-pop');
      popup.style.display = 'flex';
      document.body.style.overflowY = "hidden"
    }
  }

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setcompany(obj.company);
        setUserEmail(obj.email);
        setUserPhone(obj.phone_number);
        setUserName(obj.first_name + " " + obj.last_name);
        setUserRole(obj.userrole);
        setUserFirstName(obj.first_name);
        setUserLastName(obj.last_name);
        sethiring_manager_email(obj.email);
        sethiring_manager_first_name(obj.first_name);
        sethiring_manager_last_name(obj.last_name);
        sethiring_manager_phone(obj.phone_number);
      }
    }
  }, [])

  useEffect(async () => {
    const urlPath = window.location.href;
    const posMark = urlPath.indexOf('?');
    if (posMark != -1) {
      const draftID = urlPath.substring(posMark + 1);
      setDraftID(draftID);
      await axiosApi().get(`api/contractor/${draftID}`)
        .then(response => {
          const draftData = response.data;
          setengagement_name(draftData.engagement_name);
          setClientCompany(draftData.client_company);
          setrequester_name(draftData.requester_name ? draftData.requester_name : "");
          setrequester_email(draftData.requester_email ? draftData.requester_email : "");
          setrequester_phone(draftData.requester_phone ? draftData.requester_phone : "");
          sethiring_manager_first_name(draftData.hiring_manager_first_name);
          sethiring_manager_last_name(draftData.hiring_manager_last_name);
          sethiring_manager_email(draftData.hiring_manager_email);
          sethiring_manager_phone(draftData.hiring_manager_phone);
          setday_rate(draftData.day_rate == null ? 0 : draftData.day_rate);
          setagency_name(draftData.agency_name);
          setrecruiter_name(draftData.recruiter_name);
          setrecruiter_email(draftData.recruiter_email);
          setrecruiter_phone(draftData.recruiter_phone);
          setreason_recruit(draftData.reason_recruit);
          setfirst_name(draftData.first_name);
          setlast_name(draftData.last_name);
          setemail(draftData.email);
          setltd_company_name(draftData.ltd_company_name);
          setltd_company_number(draftData.ltd_company_number);
          setcon_website(draftData.con_website);
          setstartDate(formatDate(draftData.start_date));
          setendDate(formatDate(draftData.end_date));
          setHiring(draftData.bHiring);
          setIdentified(draftData.bIdentiied);
          setRecruiter(draftData.bRecruiter);
          setoggleTabVertical(draftData.tab)
          defaultValues.is_hiring = draftData.bHiring ? "yes" : "no"
          defaultValues.is_identified = draftData.bIdentiied ? "yes" : "no"
          defaultValues.is_recruiter = draftData.bRecruiter ? "yes" : "no"
          defaultValues.clientCompany = draftData.client_company
          defaultValues.requester_name = draftData.requester_name
          defaultValues.requester_email = draftData.requester_email
          defaultValues.requester_phone = draftData.requester_phone
          setdefaultValues(defaultValues)
          let passedTabs = []
          if (draftData.tabID > 1) {
            for (let i = 1; i <= draftData.tabID; i++) {
              passedTabs = [...passedTabs, i]
            }
          } else {
            passedTabs = [1]
          }
          setPassedStepsVertical(passedTabs)
          setoggleTabVertical(draftData.tabID)

          switch (draftData.tabID) {
            case 1:
              checkValidFirstStep()
              break;
            case 2:
              checkValidSecondStep()
              break;
            case 3:
              checkValidThirdStep()
              break;
            case 4:
              checkValidFourthStep()
              break;
            case 5:
              checkValidLastStep();
              break;
          }
        })
        .catch(err => {
          throw err
        })
    }
  }, []);

  function formatDate(date) {
    if (date == null || date == "") {
      return null;
    }
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    dispatch(onGetCompanies());
  }, []);

  // handleValidSubmit
  const handleValidSubmit = async () => {
    if (!checkValidLastStep()) return;
    if (draftID == -1) {
      let reqData = {
        tabID: 6,
        engagement_name: engagement_name,
        client_company: clientCompany,
        requester_name: requester_name,
        requester_email: requester_email,
        requester_phone: requester_phone,
        day_rate: day_rate,
        agency_name: agency_name,
        recruiter_name: recruiter_name,
        recruiter_email: recruiter_email,
        recruiter_phone: recruiter_phone,
        reason_recruit: reason_recruit,
        first_name: first_name,
        last_name: last_name,
        email: email,
        ltd_company_name: ltd_company_name,
        ltd_company_number: ltd_company_number,
        con_website: con_website,
        bHiring: bHiring,
        bIdentiied: bIdentiied,
        bRecruiter: bRecruiter,
        start_date: startDate,
        end_date: endDate,
        is_draft: true
      }
      if (bHiring) {
        reqData = {
          ...reqData,
          hiring_manager_first_name: hiring_manager_first_name,
          hiring_manager_last_name: hiring_manager_last_name,
          hiring_manager_email: hiring_manager_email,
          hiring_manager_phone: hiring_manager_phone,
        }
      }
      await axiosApi().post(`api/add-contractor`, reqData)
        .then(response => {
          setContinueID(response.data.contractor._id)
          let popup = document.getElementById('continue-pop');
          popup.style.display = 'flex';
          document.body.style.overflowY = "hidden"
        })
        .catch(err => {
          throw err
        })
    } else {
      let updateReqData = {
        id: draftID,
        tabID: 6,
        engagement_name: engagement_name,
        client_company: clientCompany,
        requester_name: requester_name,
        requester_email: requester_email,
        requester_phone: requester_phone,
        day_rate: day_rate,
        agency_name: agency_name,
        recruiter_name: recruiter_name,
        recruiter_email: recruiter_email,
        recruiter_phone: recruiter_phone,
        reason_recruit: reason_recruit,
        first_name: first_name,
        last_name: last_name,
        email: email,
        ltd_company_name: ltd_company_name,
        ltd_company_number: ltd_company_number,
        con_website: con_website,
        bHiring: bHiring,
        bIdentiied: bIdentiied,
        bRecruiter: bRecruiter,
        start_date: startDate,
        end_date: endDate,
        is_draft: true
      }
      if (bHiring) {
        updateReqData = {
          ...updateReqData,
          hiring_manager_first_name: hiring_manager_first_name,
          hiring_manager_last_name: hiring_manager_last_name,
          hiring_manager_email: hiring_manager_email,
          hiring_manager_phone: hiring_manager_phone,
        }
      }
      await axiosApi().put(`api/update-contractor`, updateReqData)
        .then(response => {
          setContinueID(draftID);
          let popup = document.getElementById('continue-pop');
          popup.style.display = 'flex';
          document.body.style.overflowY = "hidden"
        })
        .catch(err => {
          throw err
        })
    }
  }
  function continuePopup() {
    window.location.href = "/form-survey/" + continueID
    let popup = document.getElementById('continue-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
  }

  const handleChangeH = e => {
    if (e.target.value === "yes") {
      setHiring(true);
      checkValidSecondStep();
    } else {
      setHiring(false);
      setdisableButton(false);
    }
  }
  const handleChangeId = e => {
    if (e.target.value == "yes") {
      setIdentified(true);
      checkValidLastStep();
    } else {
      setIdentified(false);
      setdisableButton(false);
    }
  }
  const handleChangeRe = e => {
    if (e.target.value == "yes") {
      setRecruiter(true);
    } else {
      setRecruiter(false);
    }
    checkValidFourthStep()
  }
  function closePopup() {
    let popup = document.getElementById('saved-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
  }
  function closeChooseCompany() {
    document.body.style.overflowY = "auto";
    setchooseCompany(false)
  }
  return (
    <React.Fragment>
      <div className="success-container" id="saved-pop" style={{ display: "none" }}>
        <div className="success-card">
          <div className="close-button">
            <button className="btn" onClick={() => { closePopup() }}><i className="mdi mdi-close-thick"></i></button>
          </div>
          <div className="success-icon">
            <i className="mdi mdi-check-circle"></i>
          </div>
          <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
            Contractor form data saved
          </div>
          <div className="mt-4 go-btn-container">
            <button onClick={() => { closePopup() }} className="btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
      {chooseCompany ? <div className="success-container" id="choose-company-pop">
        <div className="success-card">
          <div className="close-button">
            <button className="btn" onClick={() => { closeChooseCompany() }}><i className="mdi mdi-close-thick"></i></button>
          </div>
          <div className="success-icon">
            <i className="mdi mdi-alert-circle"></i>
          </div>
          <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
            Please select a company name from the companies list.
          </div>
          <div className="mt-4 go-btn-container">
            <button onClick={() => { closeChooseCompany() }} className="btn btn-primary">Continue</button>
          </div>
        </div>
      </div> : null}
      <div className="success-container" id="continue-pop" style={{ display: "none" }}>
        <div className="success-card">
          <div className="success-icon">
            <i className="mdi mdi-check-circle"></i>
          </div>
          <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
            The data you entered was saved. You can now leave and continue later. Next you need to answer 13 questions about the working practices for this engagement.
          </div>
          <div className="mt-4 go-btn-container">
            <button onClick={() => { continuePopup() }} className="btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
      <div className="page-content">
        <MetaTags>
          <title>Create New Contractors | IR35Pro</title>
        </MetaTags>
        <Container fluid style={{ minHeight: "900px" }}>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contractors" breadcrumbItem="Create New" />
          <Row>
            <div className="position-relative" style={{ width: "75%", margin: "4rem auto", marginBottom: "7rem" }}>
              <div style={{ background: "#CACCCF", width: "100%", height: "1px" }}></div>
              <button className="position-absolute top-0 start-0 translate-middle btn btn-sm rounded-pill">
                <div className={"c100 center p" + activeTabVartical * 20}>
                  <span>1</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
              </button>
              <button className="position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill" style={{ background: "#f8f8fb", color: "#CACCCF", border: "solid 1px #CACCCF", width: "2rem", height: "2rem" }}>
                2
              </button>
              <button className="position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill" style={{ background: "#f8f8fb", color: "#CACCCF", border: "solid 1px #CACCCF", width: "2rem", height: "2rem" }}>
                3
              </button>
              <div className="position-absolute" style={{ left: "-80px", bottom: "-50px" }}>New Contractor Requests</div>
              <div className="position-absolute" style={{ left: "calc(50% - 80px)", bottom: "-50px" }}>Contractor IR35 Assessment</div>
              <div className="position-absolute" style={{ right: "-60px", bottom: "-50px" }}>Request Submitted</div>
            </div>
          </Row>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody style={{ padding: "3rem" }}>
                  <AvForm
                    id="contractor_create_form"
                    model={defaultValues}
                  >
                    <div className="vertical-wizard wizard clearfix vertical">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 1 })}
                          >
                            <NavLink
                              className={classnames({ current: activeTabVartical === 1, passed: activeTabVartical > 1 })}
                              onClick={() => {
                                toggleTabVertical(1)
                              }}
                              disabled={!(passedStepsVertical || []).includes(1)}
                            >
                              <span className="number">1</span> General info
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 2 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 2, passed: activeTabVartical > 2 })}
                              onClick={() => {
                                toggleTabVertical(2)
                              }}
                              disabled={!(passedStepsVertical || []).includes(2)}
                            >
                              <span className="number">2</span> Hiring manager info
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 3 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 3, passed: activeTabVartical > 3 })}
                              onClick={() => {
                                toggleTabVertical(3)
                              }}
                              disabled={!(passedStepsVertical || []).includes(3)}
                            >
                              <span className="number">3</span> Terms
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 4 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 4, passed: activeTabVartical > 4 })}
                              onClick={() => {
                                toggleTabVertical(4)
                              }}
                              disabled={!(passedStepsVertical || []).includes(4)}
                            >
                              <span className="number">4</span> Recruiter info
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTabVartical === 5 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTabVartical === 5, passed: activeTabVartical > 5 })}
                              onClick={() => {
                                toggleTabVertical(5)
                              }}
                              disabled={!(passedStepsVertical || []).includes(5)}
                            >
                              <span className="number">5</span> Contractor info
                            </NavLink>
                          </NavItem>
                        </ul>
                      </div>
                      <div className="content clearfix">
                        <TabContent activeTab={activeTabVartical} className="body">
                          <TabPane tabId={1}>
                            <Row>
                              <Col lg="12">
                                <div style={{ fontWeight: "bold" }}>General info</div>
                              </Col>
                              <Col lg="12" className="mt-4">
                                <Label className="d-block mb-2">Engagement name or reference
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="Please provide your own chosen name or reference for the <br/>new engagement to ensure you can track it's progression.<br/>e.g:IT python developer for retail App"
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                <AvField
                                  name="engagement_name"
                                  value={engagement_name}
                                  onChange={(e) => { engagement_nameChange(e) }}
                                  type="text"
                                  required
                                  placeholder="Engagement name or reference"
                                />
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Col lg="12">
                                <Label className="d-block mb-2">Client company name
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="Please provide your Company name"
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                {userrole == "ir35pro" ?
                                  <AvField
                                    type="select"
                                    className="form-select"
                                    name="client_company"
                                    multiple={false}
                                    value={defaultValues.clientCompany}
                                    onChange={(e) => { client_companyChange(e) }}
                                    required
                                  >
                                    <option value="" disabled>Select company name</option>
                                    {map(companies, (item, index) => {
                                      return <option key={index} value={item.id}>{item.company_name}</option>
                                    })}
                                  </AvField> :
                                  <AvField
                                    name="client_company"
                                    type="text"
                                    required
                                    disabled
                                    value={(companies.filter(item => item.id.toString() == company.toString()))[0]?.company_name}
                                  />
                                }
                              </Col>
                            </Row>

                            <Row className="mt-4">
                              <Col lg="12">
                                <Label className="d-block mb-2">Requester name
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="Please provide requester full name"
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                <AvField
                                  name="requester_name"
                                  type="text"
                                  required
                                  placeholder="Enter requester name"
                                  onChange={(e) => { requester_nameChange(e) }}
                                  value={defaultValues.requester_name || username || ""}
                                />
                              </Col>
                            </Row>
                            <Row className="mt-4">
                              <Col lg="6">
                                <Label className="d-block mb-2">Requester email
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="please provide requester email"
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                <AvField
                                  name="requester_email"
                                  type="email"
                                  required
                                  placeholder="Enter requester email"
                                  onChange={(e) => { requester_emailChange(e) }}
                                  value={defaultValues.requester_email || useremail || ""}
                                />
                              </Col>
                              <Col lg="6">
                                <Label className="d-block mb-2">Requester phone
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="Please provide requester phone number"
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                <AvField
                                  validate={{
                                    required: { value: true },
                                    pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ },
                                  }}
                                  name="requester_phone"
                                  className="form-control input-color"
                                  placeholder="Enter requester phone number"
                                  onChange={(e) => { requester_phoneChange(e) }}
                                  value={defaultValues.requester_phone || userphone || ""}
                                >
                                </AvField>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId={2}>
                            <div>
                              <Row>
                                <div style={{ fontWeight: "bold" }}>Hiring manager info</div>
                              </Row>
                              <Row className="mt-4">
                                <Col lg="12">
                                  <div className="hiring-container">
                                    <Label className="d-block" style={{ marginRight: "1rem" }}> Are you a hiring manager?</Label>
                                    <AvRadioGroup inline name="is_hiring" onChange={(e) => { handleChangeH(e) }} className="ans-group" required errorMessage="Pick one!" value={defaultValues.is_hiring}>
                                      <AvRadio label="Yes" value="yes" />
                                      <AvRadio label="No" value="no" />
                                    </AvRadioGroup>
                                  </div>
                                </Col>
                              </Row>
                              {bHiring ?
                                <Row className="mt-4">
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Hiring manager first name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide your hiring manager first name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="hiring_manager_first_name"
                                      type="text"
                                      required
                                      onChange={(e) => { hiring_manager_first_nameChange(e) }}
                                      placeholder="Enter hiring manager first name"
                                      value={hiring_manager_first_name || userfirstname || ""}
                                    />
                                  </Col>
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Hiring manager last name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide your hiring manager last name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="hiring_manager_last_name"
                                      type="text"
                                      required
                                      onChange={(e) => { hiring_manager_last_nameChange(e) }}
                                      placeholder="Enter hiring manager last name"
                                      value={hiring_manager_last_name || userlastname || ""}
                                    />
                                  </Col>
                                </Row> : null}
                              {bHiring ?
                                <Row className="mt-4">
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Hiring manager email
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide your hiring manager email"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="hiring_manager_email"
                                      type="text"
                                      required
                                      onChange={(e) => { hiring_manager_emailChange(e) }}
                                      placeholder="Enter hiring manager first name"
                                      value={hiring_manager_email || useremail || ""}
                                    />
                                  </Col>
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Hiring manager phone
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide your hiring manager phone"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="hiring_manager_phone"
                                      type="text"
                                      validate={{
                                        required: { value: true },
                                        pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ },
                                      }}
                                      onChange={(e) => { hiring_manager_phoneChange(e) }}
                                      placeholder="Enter hiring manager phone number"
                                      value={hiring_manager_phone || userphone || ""}
                                    />
                                  </Col>
                                </Row> : null}
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div>
                              <Row>
                                <div style={{ fontWeight: "bold" }}>Terms</div>
                              </Row>
                              <Row className="mt-4">
                                <Col lg="6">
                                  <Label className="d-block mb-2">Target Contractor Start Date
                                    <span
                                      className="form-tooltip"
                                      data-multiline="true"
                                      data-tip="Please provide an indicative start date for the engagement"
                                    >!<ReactTooltip />
                                    </span>
                                  </Label>
                                  <AvField
                                    id="start_date"
                                    name="start_date"
                                    required
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => { startDateChange(e) }}
                                  />
                                </Col>
                                <Col lg="6">
                                  <Label className="d-block mb-2">Forecasted Contractor End Date
                                    <span
                                      className="form-tooltip"
                                      data-multiline="true"
                                      data-tip="Please provide an initial expectation of the length of engagement. (This can be changed or extended)"

                                    >!<ReactTooltip />
                                    </span>
                                  </Label>
                                  <AvField
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    validate={{
                                      myValidation: compStartandEnd
                                    }}
                                    value={endDate}
                                    onChange={(e) => { endDateChange(e) }}
                                    errorMessage="The End Date must be after the target Contractor Start Date."
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-4">
                                <Col lg="6">
                                  <Label className="d-block mb-2">Contractor Budgeted Daily Rate
                                    <span
                                      className="form-tooltip"
                                      data-multiline="true"
                                      data-tip="This is the rate the contractor will receive"
                                    >!<ReactTooltip />
                                    </span>
                                  </Label>
                                  <AvField
                                    name="day_rate"
                                    type="number"
                                    value={day_rate}
                                    onChange={(e) => { day_rateChange(e) }}
                                    required
                                    min={1}
                                  />
                                  <div style={{
                                    position: "absolute",
                                    top: "27px",
                                    right: "-35px",
                                    fontSize: "20px",
                                    borderRadius: "3px",
                                    // background: "#ced4d9",
                                    // opacity: "0.5",
                                    width: "36px",
                                    height: "36px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex"
                                  }}>GBP</div>
                                </Col>

                              </Row>
                            </div>
                          </TabPane>
                          <TabPane tabId={4}>
                            <div>
                              <Row>
                                <div style={{ fontWeight: "bold" }}>Recruiter info</div>
                              </Row>
                              <Row className="mt-4">
                                <Col lg="12">
                                  <div className="hiring-container using-recruiter">
                                    <Label className="d-block" style={{ marginRight: "1rem" }}> Are you using a recruiter?</Label>
                                    <AvRadioGroup inline name="is_recruiter" className="ans-group" onChange={(e) => { handleChangeRe(e) }} required errorMessage="Pick one!" value={defaultValues.is_recruiter}>
                                      <AvRadio label="Yes" value="yes" />
                                      <AvRadio label="No" value="no" />
                                    </AvRadioGroup>
                                  </div>
                                </Col>
                              </Row>
                              {bRecruiter ?
                                <Row className="mt-4">
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Recruitment Agency or Consultancy Name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide the Recruitment Agency or Consultancy that will be used to source the Contractor (If known)"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="agency_name"
                                      type="text"
                                      required
                                      value={agency_name}
                                      onChange={(e) => { agency_nameChange(e) }}
                                      placeholder="Enter recruitment agency or consultancy name"
                                    />
                                  </Col>
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Recruiter Contact Name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide the Recruiter contact name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="recruiter_name"
                                      type="text"
                                      required
                                      value={recruiter_name}
                                      onChange={(e) => { recruiter_nameChange(e) }}
                                      placeholder="Enter recruiter name"
                                    />
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Recruiter Email
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide your email"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="recruiter_email"
                                      type="email"
                                      required
                                      placeholder="Enter recruiter email"
                                      value={recruiter_email}
                                      onChange={(e) => { recruiter_emailChange(e) }}
                                    />
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Recruiter Phone
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide recruiter phone number"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="recruiter_phone"
                                      type="string"
                                      validate={{
                                        required: { value: true },
                                        pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ },
                                      }}
                                      value={recruiter_phone}
                                      onChange={(e) => { recruiter_phoneChange(e) }}
                                      placeholder="Enter recruiter phone number"
                                    />
                                  </Col>
                                </Row> : null}
                              <Row className="mt-4">
                                <Label className="d-block mb-2">Reason for recruiting
                                  <span
                                    className="form-tooltip"
                                    data-multiline="true"
                                    data-tip="Please provide a simple summary explanation for the reason you require the Contractor "
                                  >!<ReactTooltip />
                                  </span>
                                </Label>
                                <Col lg="12">
                                  <AvField
                                    name="reason_recruit"
                                    type="textarea"
                                    rows="5"
                                    value={reason_recruit}
                                    onChange={(e) => { reason_recruitChange(e) }}
                                    required
                                    placeholder="Enter reason..."
                                  />
                                </Col>
                              </Row>
                            </div>
                          </TabPane>
                          <TabPane tabId={5}>
                            <div>
                              <Row>
                                <div style={{ fontWeight: "bold" }}>Contractor info</div>
                              </Row>
                              <Row className="mt-4">
                                <Col lg="12">
                                  <div className="hiring-container contractor-identified">
                                    <Label className="d-block" style={{ marginRight: "1rem" }}> Is contractor identified already?</Label>
                                    <AvRadioGroup inline name="is_identified" className="ans-group" onChange={(e) => { handleChangeId(e) }} required errorMessage="Pick one!" value={defaultValues.is_identified}>
                                      <AvRadio label="Yes" value="yes" />
                                      <AvRadio label="No" value="no" />
                                    </AvRadioGroup>
                                  </div>
                                </Col>
                              </Row>
                              {bIdentiied ?
                                <Row className="mt-4">
                                  <Col lg="6">
                                    <Label className="d-block mb-2">First name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide contractor first name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="first_name"
                                      type="text"
                                      required
                                      value={first_name}
                                      onChange={(e) => { first_nameChange(e) }}
                                      placeholder="Enter contractor first name"
                                    />
                                  </Col>
                                  <Col lg="6">
                                    <Label className="d-block mb-2">Last name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide contractor Last name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="last_name"
                                      type="text"
                                      required
                                      placeholder="Enter contractor last name"
                                      value={last_name}
                                      onChange={(e) => { last_nameChange(e) }}
                                    />
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Email
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="please provide contractor email"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      name="email"
                                      type="email"
                                      required
                                      placeholder="Enter contractor email"
                                      value={email}
                                      onChange={(e) => { emailChange(e) }}
                                    />
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Contractor Website
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide contractor website"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      validate={{
                                        pattern: { value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/ }
                                      }}
                                      name="con_website"
                                      className="form-control input-color"
                                      placeholder="Enter contractor website"
                                      value={con_website}
                                      onChange={(e) => { con_websiteChange(e) }}
                                    >
                                    </AvField>
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Ltd Company Name
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide ltd company name"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      required
                                      name="ltd_company_name"
                                      className="form-control input-color"
                                      placeholder="Enter ltd company name"
                                      value={ltd_company_name}
                                      onChange={(e) => { ltd_company_nameChange(e) }}
                                    >
                                    </AvField>
                                  </Col>
                                  <Col lg="6" className="mt-4">
                                    <Label className="d-block mb-2">Main Contact Number
                                      <span
                                        className="form-tooltip"
                                        data-multiline="true"
                                        data-tip="Please provide main contact number"
                                      >!<ReactTooltip />
                                      </span>
                                    </Label>
                                    <AvField
                                      validate={{
                                        required: { value: true },
                                        pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ },
                                      }}
                                      name="ltd_company_number"
                                      className="form-control input-color"
                                      placeholder="Enter main contact number"
                                      value={ltd_company_number}
                                      onChange={(e) => { ltd_company_numberChange(e) }}
                                    >
                                    </AvField>
                                  </Col>
                                </Row> : null}
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                      <div className="actions clearfix">
                        <ul style={{ textAlign: "left" }}>
                          <li
                            className={
                              activeTabVartical === 1
                                ? "previous back disabled"
                                : "previous back"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                toggleTabVertical(activeTabVartical - 1)
                              }}
                            >
                              Back
                            </Link>
                          </li>
                        </ul>
                        <ul>
                          <li
                            className="previous save-continue"
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                saveContractorForm(activeTabVartical)
                              }}
                            >
                              Save and Continue Later
                            </Link>
                          </li>
                          <li
                            className={
                              activeTabVartical === 5 ? "next submit" : "next"
                            }
                          >
                            {activeTabVartical === 5 ?
                              <button
                                onClick={() => handleValidSubmit()}
                                disabled={disableButton}
                              >
                                Next
                              </button> :
                              <button
                                disabled={disableButton}
                                onClick={() => {
                                  toggleTabVertical(activeTabVartical + 1)
                                }}
                              >
                                Next
                              </button>}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContractorsCreate.propTypes = {
  history: PropTypes.object,
}

export default ContractorsCreate
