/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react"
import { CheckedIcon, SearchIcon } from "assets/svg-icons/chat-icons"
import ReactLoading from "react-loading"
import { useDispatch, useSelector } from "react-redux"
import {
  addMemberAC,
  getChatById,
  getUsers,
  setChatLoadingAC,
} from "store/actions"
import { getShortName } from "helpers/common_utils"

import "./styles.scss"

const AddMembers = ({ onClickCancel, close }) => {
  const users = useSelector(state => state.contacts.users)
  const {
    selectedChat: currentChat,
    loading,
    success,
  } = useSelector(state => state.chat)
  const dispatch = useDispatch()

  const members = useMemo(
    () => currentChat?.users?.map(item => item._id) || [],
    [currentChat]
  )

  const [selectedUsers, setSelectedUsers] = useState([])

  const sortedList = useMemo(
    () => users.sort(item => (members.includes(item.id) ? -1 : 1)),
    [users]
  )

  useEffect(() => {
    if (!(users || []).length) {
      dispatch(setChatLoadingAC({ fetchUsers: true }))
      dispatch(
        getUsers(() => dispatch(setChatLoadingAC({ fetchUsers: false })))
      )
    }
  }, [])

  useEffect(() => {
    if (success.addMember) {
      dispatch(getChatById(currentChat.id))
      close && close()
    }
  }, [success])

  const onAddHandler = async () => {
    if (!selectedUsers.length || loading.addMember) return
    dispatch(
      addMemberAC({ id: currentChat.id, data: { userIds: selectedUsers } })
    )
  }
  return (
    <div className="add-members-container">
      <div className="add-members-header">
        <span className="s16 w500 cBlackL mB18">Add Members</span>
        <div className="search-container">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="add-members-body flex-column">
        {loading.fetchUsers && (
          <div className="flex jc-center">
            <ReactLoading type="bubbles" color="#C4C4C4" />
          </div>
        )}
        {sortedList.map(user => {
          const isMember = members.includes(user.id)
          const isSelected = selectedUsers.includes(user.id)

          const className = isMember
            ? "light-grey-border"
            : isSelected
            ? "blue-border"
            : ""
          return (
            <div
              className={`user-item space-between  fsh0 ${
                isMember ? "disabled" : "pointer"
              }`}
              key={user.id}
              onClick={() => {
                if (isMember) return
                if (isSelected)
                  setSelectedUsers(prev =>
                    prev.filter(item => item !== user.id)
                  )
                else setSelectedUsers(prev => [...prev, user.id])
              }}
            >
              <div className={`avatar center ${className}`}>
                <span className="s16 w500 cWhite">
                  {getShortName(`${user.first_name} ${user.last_name}`)}
                </span>
              </div>
              <div className="flex-column fg1  mH16">
                <span className="s14 w500 cBlackL">
                  {`${user.first_name} ${user.last_name}`}
                </span>
                <span className="s14 w400 cBlackLOpc">
                  {user.job_title || " "}
                </span>
              </div>
              <div className="check-box center">
                {(isMember || isSelected) && (
                  <CheckedIcon disabled={isMember} />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="add-members-footer">
        <div className="footer-button cancel-button" onClick={onClickCancel}>
          <span className="s14 w400 cBlackL">Cancel</span>
        </div>
        <div
          className={`footer-button add-button ${
            selectedUsers.length ? "" : "disabled-button"
          }`}
          onClick={onAddHandler}
        >
          <span className="s14 w400 cWhite">
            {loading.addMember ? (
              <ReactLoading width={27} height={27} type="bars" color="#fff" />
            ) : (
              "Add"
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AddMembers
