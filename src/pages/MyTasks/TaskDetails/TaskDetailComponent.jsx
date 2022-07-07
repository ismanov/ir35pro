/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"

import { CloseButtonIcon, MessageOptionIcon } from "assets/svg-icons/chat-icons"
import { SurveyRequestFormIcon } from "assets/svg-icons/contractors-icons"
import {
  Point,
  SendIcon,
  ToDoCheckBoxIcon,
} from "assets/svg-icons/my-tasks-icons"
import { useDispatch, useSelector } from "react-redux"
import ReactLoading from "react-loading"

import { getMyTasksStore } from "store"
import CustomButton from "components/Common/CustomButton"
import Status from "components/Common//Status"
import User from "components/Common//User"
import FormContent from "./components/FormContent"
import SendForm from "./components/SendForm"
import Tooltip from "./components/Tooltip"
import moment from "moment"
import "./styles.scss"
import { createMessage, getCompanies } from "store/actions"
import {
  getAllTasksAC,
  sendFormAC,
  setMyTasksSuccessAC,
  updateTaskAC,
} from "store/my-tasks/actions"
import { useNotification } from "helpers/hooks"
import { NavLink } from "react-router-dom"

export const ASK_QUESTION = "ASK_QUESTION"
export const DECLINE = "DECLINE"
export const SEND_FORM = "SEND_FORM"
export const CHANGE_STATUS = "CHANGE_STATUS"

const TaskDetailsComponent = props => {
  const { onClose } = props

  const dispatch = useDispatch()

  const setNotification = useNotification()
  const { setSuccess } = setNotification

  const { currentTask, success, loading } = useSelector(getMyTasksStore())
  const companies = useSelector(state => state.company.companies)

  const isDone = currentTask?.status === "done"

  const [screen, setScreen] = useState(null)

  useEffect(() => {
    if (!(companies || []).length) {
      dispatch(getCompanies())
    }
  }, [])

  useEffect(() => {
    if (success.taskUpdate) {
      dispatch(setMyTasksSuccessAC({ taskUpdate: undefined }))
      setSuccess("Task status updated")
      dispatch(getAllTasksAC())
      onClose()
    }

    if (success.sendForm) {
      dispatch(setMyTasksSuccessAC({ sendForm: undefined }))
      setSuccess("Form sent")
      onClose()
    }
  }, [success])

  if (loading.getTask) return <ReactLoading type="spin" color="#fff" />
  if (!currentTask) return null

  const approve = () => {
    dispatch(
      updateTaskAC({
        id: currentTask._id,
        data: {
          status: "done",
        },
      })
    )
  }

  const modalRightBtnClickHandler = description => {
    switch (screen) {
      case CHANGE_STATUS: {
        dispatch(
          createMessage({
            text: description,
            chatId: currentTask.chat?._id,
          })
        )
        dispatch(
          updateTaskAC({
            id: currentTask._id,
            data: {
              status: "todo",
            },
          })
        )
        break
      }
      case DECLINE: {
        dispatch(
          updateTaskAC({
            id: currentTask._id,
            data: {
              status: "declined",
              declineReason: description,
            },
          })
        )
        break
      }
      case ASK_QUESTION: {
        dispatch(
          createMessage(
            {
              text: description,
              chatId: currentTask.chat?._id,
            },
            () => {
              setNotification("Question sent successfully")
              onClose()
            }
          )
        )
        break
      }
    }
  }

  return (
    <div className="task-detail-container">
      <div className={`big-container ${screen ? "display-none" : ""}`}>
        <div className="task-detail-header">
          <div className="left-content">
            <ToDoCheckBoxIcon />
            <span className="s18 w500 cBlackL mL8">{currentTask.title}</span>
          </div>
          <div className="right-content">
            <div className="option-btn">
              <div
                onClick={e => {
                  document.getElementById("inputForActions")?.focus()
                }}
              >
                <MessageOptionIcon />
              </div>
              <input type="text" id={"inputForActions"} />
              <Tooltip
                onClose={onClose}
                onDecline={() => setScreen(DECLINE)}
                chatId={currentTask.chat?._id}
                contractorId={currentTask.contractor?._id}
              />
            </div>

            <div className="pointer" onClick={onClose}>
              <CloseButtonIcon fill="#A0A5B2" />
            </div>
          </div>
        </div>
        <div className="task-detail-body pT16">
          <div className="task-detail-row">
            <div className="column1">
              <span className="title">Due Date</span>
              <span className="value">{`${moment(currentTask.startDate).format(
                "DD MMM"
              )} - ${moment(currentTask.endDate).format("DD MMM")}`}</span>
            </div>
            <div className="column1">
              <span className="title">Contractor</span>
              <div className="flex ai-center">
                <div>
                  <Point />
                </div>
                <span className="value mL8 text-nowrap">
                  {currentTask.contractor?.engagement_name}
                </span>
              </div>
            </div>
          </div>

          <div className="task-detail-row">
            <div className="column1">
              <span className="title">IR35Pro status</span>
              <div>
                <Status
                  status={
                    (currentTask.contractor?.ir_status || "").toLowerCase() ===
                    "inside"
                      ? "success"
                      : "error"
                  }
                >
                  {currentTask.contractor?.ir_status}
                </Status>
              </div>
            </div>
            <div className="column1">
              <span className="title">Hiring manager</span>
              <span className="value text-nowrap">
                {currentTask.contractor?.hiring_manager_first_name || ""}&nbsp;
                {currentTask.contractor?.hiring_manager_last_name || ""}
              </span>
            </div>
          </div>

          <div className="task-detail-row">
            <div className="column1">
              <span className="title">Company</span>
              <span className="value">
                {
                  (companies || []).find(
                    item => item.id === currentTask.contractor?.client_company
                  )?.company_name
                }
              </span>
            </div>
            <div className="column2">
              <span className="title">Assigned user</span>
              <div className="flex flex-wrap">
                {currentTask.contractor?.assignUsersList?.map(user => (
                  <User
                    fullName={`${user.first_name || ""} ${
                      user.last_name || ""
                    }`}
                    key={user._id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-column mT16">
            <span className="title">Description</span>
            <div className="value">{currentTask.description}</div>
          </div>

          <NavLink
            to={`/form-client/${currentTask.contractor?._id}`}
            className="flex ai-center mT32 pointer fit-content"
          >
            <SurveyRequestFormIcon fill={"#00CB8D"} />
            <span className="s14 w500 cBlackL mL12">
              Survey Request Form Link
            </span>
          </NavLink>

          <div
            className="flex ai-center mT32 pointer fit-content"
            onClick={() => setScreen(SEND_FORM)}
          >
            <SendIcon fill="#00CB8D" large />
            <span className="s14 w500 cBlackL mL12">Send Form</span>
          </div>

          <div
            className="flex ai-center mT32 pointer fit-content"
            onClick={() => setScreen(ASK_QUESTION)}
          >
            <div className="ask-question">
              <span>?</span>
            </div>
            <span className="s14 w500 cBlackL mL12">Ask Question</span>
          </div>
        </div>
        <div className="flex ai-center jc-end mT40">
          <CustomButton
            type={isDone ? "warning" : "success"}
            onClick={() => {
              if (loading.taskUpdate) return
              isDone ? setScreen(CHANGE_STATUS) : approve()
            }}
          >
            {loading.taskUpdate ? (
              <ReactLoading width={27} height={27} type="bars" color="#fff" />
            ) : isDone ? (
              "Change and Send to Chat"
            ) : (
              "Approve"
            )}
          </CustomButton>
        </div>
      </div>

      {[DECLINE, CHANGE_STATUS, ASK_QUESTION].includes(screen) && (
        <div className={`big-container`}>
          <FormContent
            screen={screen}
            onCancel={() => setScreen(null)}
            loading={loading.taskUpdate}
            onSend={modalRightBtnClickHandler}
            onClose={onClose}
          />
        </div>
      )}

      {screen === SEND_FORM && (
        <div className="small-container">
          <SendForm
            onCancel={() => setScreen(null)}
            onSend={email => {
              dispatch(
                sendFormAC({
                  email,
                  contractorId: currentTask.contractor?._id,
                })
              )
            }}
            loading={loading.sendForm}
          />
        </div>
      )}
    </div>
  )
}

export default TaskDetailsComponent
