import axios from "axios"
import axiosApi, { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"
import clienticon from "../assets/images/Icon_Client_1.svg"
import proicon from "../assets/images/Icon_IR35Pro.svg"
// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Edit profile
const postJwtProfile = data => {
  return post(url.POST_EDIT_JWT_PROFILE, data)
    .then(response => {
      return response;
    })
    .catch(err => {
      message = err[1]
      throw message
    })
}

// Register Method
const postJwtRegister = (url, data) => {
  return post(url, data)
    .then(response => {
      return response
    })
    .catch(err => {
      var message
      if (err && err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => put(url.POST_JWT_PASSWORD_FORGET, data)

// get contractor by MarcoB
export const getDocsList = id => {
  return get(`${url.GET_DOCSLIST}/${id}`, { params: { id } })
    .then(response => {
      let docslist = [];
      for (const [key, value] of Object.entries(response)) {
        let userName = `${value.user}` != "undefined" ? `${value.user.first_name}` + " " + `${value.user.last_name}` : "TEST TEST";
        let doc = {
          id: `${key}`,
          title: `${value.doc_title}`,
          path: `${value.doc_path}`,
          user: userName,
          createdAt: `${value.createdAt}`,
        }
        docslist.push(doc);
      }
      return docslist;
    })
    .catch(err => {
      console.log(err);
    });
}

export const getContractors = contractors => {
  return get(url.GET_CONTRACTORS)
    .then(response => {
      contractors = [];
      for (const [key, value] of Object.entries(response)) {
        let contractor = {
          id: `${key}`,
          engagement_name: `${value.engagement_name}`,
          client_company: `${value.client_company}`,
          hiring_manager_first_name: `${value.hiring_manager_first_name}`,
          hiring_manager_last_name: `${value.hiring_manager_last_name}`,
          hiring_manager_email: `${value.hiring_manager_email}`,
          hiring_manager_phone: `${value.hiring_manager_phone}`,
          start_date: `${value.start_date}`,
          end_date: `${value.end_date}`,
          ir_status: `${value.ir_status}`,
          progress: `${value.progress}`,
          update_progress: `${value.update_progress}`,
          overDue: `${value.overDue}`,
          agency_name: `${value.agency_name}`,
          recruiter_name: `${value.recruiter_name}`,
          reason_recruit: `${value.reason_recruit}`,
          day_rate: `${value.day_rate}`,
          survey_questions: `${value.survey_questions}`,
          form_questions: `${value.form_questions}`,
          assign_users: `${value.assign_users}`,
          statuses: `${value.statuses}`,
          monthly_date: `${value.monthly_date}`,
          first_monthly_date: `${value.first_monthly_date}`,
          recruiter_email: `${value.recruiter_email}`,
          recruiter_phone: `${value.recruiter_phone}`,
          contractor_id: `${value.contractor_id}`,
          con_website: `${value.con_website}`
        }
        contractors.push(contractor);
      }
      return contractors;
    })
    .catch(err => {
      console.log(err);
    });
}
// get contractor details by MarcoB
export const getContractorsDetails = id => {
  return get(`${url.GET_CONTRACTOR_DETAIL}/${id}`, { params: { id } })
    .then(response => {
      const contractorDetail = {
        id: response.id,
        engagement_name: response.engagement_name,
        client_company: response.client_company,
        hiring_manager_first_name: response.hiring_manager_first_name,
        hiring_manager_last_name: response.hiring_manager_last_name,
        hiring_manager_email: response.hiring_manager_email,
        hiring_manager_phone: response.hiring_manager_phone,
        end_date: response.end_date,
        start_date: response.start_date,
        ir_status: response.ir_status,
        progress: response.progress,
        update_progress: response.update_progress,
        overDue: response.overDue,
        agency_name: response.agency_name,
        recruiter_name: response.recruiter_name,
        reason_recruit: response.reason_recruit,
        day_rate: response.day_rate,
        survey_questions: response.survey_questions,
        form_questions: response.form_questions,
        assign_users: response.assign_users,
        statuses: response.statuses,
        recruiter_email: response.recruiter_email,
        recruiter_phone: response.recruiter_phone,
        contractor_id: response.contractor_id,
        con_website: response.con_website
      }
      return contractorDetail;
    })
    .catch(err => {
      console.log(err);
    })
}

// get progress
export const getProgresses = progresses => {
  return get(url.GET_CONTRACTORS)
    .then(response => {
      progresses = [
        {
          id: 0,
          title: "Drafts",
          icon: { clienticon },
          progresses: [],
        },
        {
          id: 1,
          title: "Contractor IR35 Assessment",
          icon: { clienticon },
          progresses: [],
        },
        {
          id: 2,
          title: "IR35 Status Decision",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 3,
          title: "Confirm Contractor",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 4,
          title: "Contractor Onboarding",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 5,
          title: "SOW Drafting",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 6,
          title: "SOW Review",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 7,
          title: "Document Approvals",
          icon: { proicon },
          progresses: [],
        },
        {
          id: 8,
          title: "Monthly Monitoring",
          icon: { proicon },
          progresses: [],
        },
      ];
      for (const [key, value] of Object.entries(response)) {
        let progress = {
          id: `${key}`,
          engagement_name: `${value.engagement_name}`,
          client_company: `${value.client_company}`,
          hiring_manager_first_name: `${value.hiring_manager_first_name}`,
          hiring_manager_last_name: `${value.hiring_manager_last_name}`,
          hiring_manager_email: `${value.hiring_manager_email}`,
          hiring_manager_phone: `${value.hiring_manager_phone}`,
          start_date: `${value.start_date}`,
          end_date: `${value.end_date}`,
          ir_status: `${value.ir_status}`,
          progress: `${value.progress}`,
          update_progress: `${value.update_progress}`,
          overDue: `${value.overDue}`,
          agency_name: `${value.agency_name}`,
          recruiter_name: `${value.recruiter_name}`,
          reason_recruit: `${value.reason_recruit}`,
          day_rate: `${value.day_rate}`,
          survey_questions: `${value.survey_questions}`,
          form_questions: `${value.form_questions}`,
          assign_users: `${value.assign_users}`,
          statuses: `${value.statuses}`,
          recruiter_email: `${value.recruiter_email}`,
          recruiter_phone: `${value.recruiter_phone}`,
          contractor_id: `${value.contractor_id}`,
          requester_name: `${value.requester_name}`,
          requester_phone: `${value.requester_phone}`,
          requester_email: `${value.requester_email}`,
          con_website: `${value.con_website}`,
          is_draft: `${value.is_draft}`,
          tabID: `${value.tabID}`,
          bHiring: `${value.bHiring}`,
          bIdentiied: `${value.bIdentiied}`,
          bRecruiter: `${value.bRecruiter}`,
        }
        if (`${value.is_draft}` == false || `${value.is_draft}` == "false") {
          switch (`${value.progress}`) {
            case "0":
              progresses[1].progresses.push(progress);
              break;
            case "1":
              progresses[2].progresses.push(progress);
              break;
            case "2":
              progresses[3].progresses.push(progress);
              break;
            case "3":
              progresses[4].progresses.push(progress);
              break;
            case "4":
              progresses[5].progresses.push(progress);
              break;
            case "5":
              progresses[6].progresses.push(progress);
              break;
            case "6":
              progresses[7].progresses.push(progress);
              break;
            case "7":
              progresses[8].progresses.push(progress);
              break;
          }
        } else {
          progresses[0].progresses.push(progress);
        }
      }
      return progresses;
    })
    .catch(err => {
      console.log(err);
    });
}

export const getDrafts = drafts => {
  return get(url.GET_DRAFTS)
    .then(response => {
      drafts = [
        {
          id: 1,
          title: "Drafts",
          contractors: [],
        },
        {
          id: 2,
          title: "Under Review",
          contractors: [],
        },
        {
          id: 3,
          title: "Active Contractors",
          contractors: [],
        },
        {
          id: 4,
          title: "Monthly Monitoring",
          contractors: [],
        }
      ];
      for (const [key, value] of Object.entries(response)) {
        let contractor = {
          id: `${key}`,
          engagement_name: `${value.engagement_name}`,
          client_company: `${value.client_company}`,
          hiring_manager_first_name: `${value.hiring_manager_first_name}`,
          hiring_manager_last_name: `${value.hiring_manager_last_name}`,
          hiring_manager_email: `${value.hiring_manager_email}`,
          hiring_manager_phone: `${value.hiring_manager_phone}`,
          start_date: `${value.start_date}`,
          end_date: `${value.end_date}`,
          ir_status: `${value.ir_status}`,
          progress: `${value.progress}`,
          update_progress: `${value.update_progress}`,
          overDue: `${value.overDue}`,
          agency_name: `${value.agency_name}`,
          recruiter_name: `${value.recruiter_name}`,
          reason_recruit: `${value.reason_recruit}`,
          day_rate: `${value.day_rate}`,
          survey_questions: `${value.survey_questions}`,
          form_questions: `${value.form_questions}`,
          assign_users: `${value.assign_users}`,
          statuses: `${value.statuses}`,
          recruiter_email: `${value.recruiter_email}`,
          recruiter_phone: `${value.recruiter_phone}`,
          contractor_id: `${value.contractor_id}`,
          requester_name: `${value.requester_name}`,
          requester_phone: `${value.requester_phone}`,
          requester_email: `${value.requester_email}`,
          con_website: `${value.con_website}`,
          is_draft: `${value.is_draft}`,
          tabID: `${value.tabID}`,
          bHiring: `${value.bHiring}`,
          bIdentiied: `${value.bIdentiied}`,
          bRecruiter: `${value.bRecruiter}`,
        }
        if (`${value.is_draft}` == true || `${value.is_draft}` == "true") {
          drafts[0].contractors.push(contractor);
        } else {
          if (`${value.ir_status}` != "archived") {
            switch (`${value.progress}`) {
              case "0":
                drafts[1].contractors.push(contractor);
                break;
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
                drafts[2].contractors.push(contractor);
                break;
              case "7":
                drafts[3].contractors.push(contractor);
                break;
            }
          }
        }

      }
      return drafts;
    })
    .catch(err => {
      console.log(err);
    });
}

// get users list
export const getUsers = users => {
  return get(url.GET_USERS)
    .then(response => {
      users = [];
      for (const [key, value] of Object.entries(response)) {
        let user = {
          id: `${key}`,
          first_name: `${value.first_name}`,
          last_name: `${value.last_name}`,
          email: `${value.email}`,
          company: `${value.company}`,
          userrole: `${value.userrole}`,
          confirmed: `${value.confirmed}`,
          phone_number: `${value.phone_number}`,
          job_title: `${value.job_title}`,
        }
        users.push(user);
      }
      return users;
    })
    .catch(err => {
      console.log(err)
    });
}

export const getCompanies = companies => {
  return get(url.GET_COMPANIES)
    .then(response => {
      companies = [];
      for (const [key, value] of Object.entries(response)) {
        let company = {
          id: `${key}`,
          company_name: `${value.company_name}`,
          company_phone: `${value.company_phone}`,
          company_address: `${value.company_address}`,
          company_website: `${value.company_website}`,
        }
        companies.push(company);
      }
      return companies;
    })
    .catch(err => {
      console.log(err)
    });
}

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

export const addNewCompany = company => post(url.ADD_NEW_COMPANY, company)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

export const updateCompany = company => put(url.UPDATE_COMPANY, company)

// delete user
export const deleteUser = user => put(url.DELETE_USER, user)

export const deleteCompany = company => put(url.DELETE_COMPANY, company)

/** CONTRACTOR by MarcoB */
// add contractor
export const addNewContractor = contractor => post(url.ADD_NEW_CONTRACTOR, contractor)

// update contractor
export const updateContractor = contractor => put(url.UPDATE_CONTRACTOR, contractor)

// delete contractor
export const deleteContractor = contractor => put(url.DELETE_CONTRACTOR, contractor)

export const getNotifications = notifications => {
  return get(url.GET_NOTIFICATIONS)
    .then(response => {
      notifications = [];
      for (const [key, value] of Object.entries(response)) {
        let notification = {
          id: `${key}`,
          contractor_name: `${value.contractor_name}`,
          user_name: `${value.user_name}`,
          new_progress: `${value.new_progress}`,
          readed: `${value.readed}`,
          message: `${value.message}`,
          created_time: `${value.created_time}`,
          messageText: `${value.messageText}`,
        }
        notifications.push(notification);
      }
      return notifications;
    })
    .catch(err => {
      console.log(err);
    });
}

export const addNotification = notification => post(url.ADD_NOTIFICATION, notification)

export const updateNotification = notification => put(url.UPDATE_NOTIFICATION, notification)

// get user profile by marco b
export const getUserProfile = id => {
  return get(`${url.GET_USER_PROFILE}/${id}`, { params: { id } })
    .then(response => {

    })
    .catch(err => {
      console.log(err);
    })
}

export const getClientForms = clientForms => {
  return get(url.GET_CLIENT_FORMS)
    .then(response => {
      clientForms = [];
      for (const [key, value] of Object.entries(response)) {
        let clientForm = {
          id: `${key}`,
          contractor: `${value.contractor}`,
          first_name: `${value.first_name}`,
          last_name: `${value.last_name}`,
          createdAt: `${value.createdAt}`,
        }
        clientForms.push(clientForm);
      }
      return clientForms;
    })
    .catch(err => {
      console.log(err);
    });
}

export const getTasks = tasks => {
  //get(url.GET_TASKS)
  return tasks = [
    {
      id: 1,
      title: "Started",
      tasks: [
        {
          id: 11,
          description: "Create a IR35Pro Dashboard UI",
          members: [
            {
              username: "",
              userImg: "avatar2",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Waiting",
          budget: "$145",
        },
        {
          id: 12,
          description: "Create a New Landing UI",
          members: [
            {
              username: "",
              userImg: "avatar4",
            },
            {
              username: "",
              userImg: "avatar5",
            },
            { username: "" },
            { username: "" },
            { username: "" },
          ],
          status: "Approved",
          budget: "$225",
        },
        {
          id: 13,
          description: "Create a IR35Pro Logo",
          members: [
            {
              username: "Fransis",
            },
          ],
          status: "Waiting",
          budget: "$105",
        },
      ],
    },
    {
      id: 2,
      title: "Contractor IR35 Assessment",
      tasks: [
        {
          id: 21,
          description: "Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$198",
        },
        {
          id: 22,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Pending",
          budget: "$125",
        },
      ],
    },
    {
      id: 3,
      title: "IR35 status decision",
      tasks: [
        {
          id: 31,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar6",
            },
            {
              username: "Fransis",
            },
          ],
          status: "Complete",
          budget: "$175",
        },
        {
          id: 32,
          description: "Multipurpose Landing",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$135",
        },
        {
          id: 33,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "",
              userImg: "avatar4",
            },
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar2",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 4,
      title: "Confirm Contractor",
      tasks: [
        {
          id: 31,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar6",
            },
            {
              username: "Fransis",
            },
          ],
          status: "Complete",
          budget: "$175",
        },
        {
          id: 32,
          description: "Multipurpose Landing",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$135",
        },
        {
          id: 33,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "",
              userImg: "avatar4",
            },
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar2",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 5,
      title: "Contractor onboarding",
      tasks: [
        {
          id: 41,
          description: " Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$100",
        },
        {
          id: 42,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Complete",
          budget: "$75",
        },
        {
          id: 43,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
            {
              username: "",
              userImg: "avatar4",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 6,
      title: "SOW Drafting",
      tasks: [
        {
          id: 41,
          description: " Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$100",
        },
        {
          id: 42,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Complete",
          budget: "$75",
        },
        {
          id: 43,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
            {
              username: "",
              userImg: "avatar4",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 7,
      title: "SOW review",
      tasks: [
        {
          id: 41,
          description: " Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$100",
        },
        {
          id: 42,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Complete",
          budget: "$75",
        },
        {
          id: 43,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
            {
              username: "",
              userImg: "avatar4",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 8,
      title: "Document approvals",
      tasks: [
        {
          id: 41,
          description: " Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$100",
        },
        {
          id: 42,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Complete",
          budget: "$75",
        },
        {
          id: 43,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
            {
              username: "",
              userImg: "avatar4",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
    {
      id: 9,
      title: "Monthly Monitoring",
      tasks: [
        {
          id: 41,
          description: " Brand logo design",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
          ],
          status: "Complete",
          budget: "$100",
        },
        {
          id: 42,
          description: "Create a Blog Template UI",
          members: [
            {
              username: "Stephen",
            },
            {
              username: "",
              userImg: "avatar8",
            },
            {
              username: "",
              userImg: "avatar1",
            },
          ],
          status: "Complete",
          budget: "$75",
        },
        {
          id: 43,
          description: "Redesign - Landing page",
          members: [
            {
              username: "",
              userImg: "avatar7",
            },
            {
              username: "",
              userImg: "avatar4",
            },
          ],
          status: "Complete",
          budget: "$95",
        },
      ],
    },
  ]
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
}
