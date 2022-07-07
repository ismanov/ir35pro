/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react"
import { DotsIcon } from "assets/svg-icons/chat-icons"
import { getShortName } from "helpers/common_utils"
import { ModalContext } from "components/Overlays"
import AddMembers from "../AddMembers"
import { useSelector } from "react-redux"
import { getChatStore } from "store"
import ReactLoading from "react-loading"

const ChatHeader = ({ selectedChat }) => {
  if (!selectedChat) return null

  const { loading } = useSelector(getChatStore())

  const { setModalComponent, setModalOption } = useContext(ModalContext)

  useEffect(() => {
    setModalComponent(
      <AddMembers
        onClickCancel={() => setModalOption({ open: false })}
        close={() => setModalOption({ open: false })}
      />
    )
  }, [])

  return (
    <div className="chat-view-header">
      <div className="flex-column fd1">
        <span className="s18 w500 cBlackD mB4">
          {loading.getChat ? (
            <ReactLoading
              width={25}
              height={25}
              type="bubbles"
              color="#C4C4C4"
            />
          ) : (
            selectedChat?.name
          )}
        </span>
        <span
          className="s14 w400 cBlackLOpc pointer flex ai-center"
          onClick={() => {
            document.getElementById("chat-members-modal-view-id")?.focus()
          }}
        >
          {loading.getChat ? (
            <ReactLoading
              width={15}
              height={15}
              type="spinningBubbles"
              color="#C4C4C4"
            />
          ) : (
            selectedChat?.users?.length
          )}
          <span>&nbsp;members</span>
        </span>
      </div>
      <div className="pointer" onClick={() => setModalOption({ open: true })}>
        <DotsIcon />
      </div>
      <input type="text" id="chat-members-modal-view-id" />

      <div className="members-modal">
        {selectedChat?.users?.map((user, index) => (
          <div className="member-row" key={String(user.id) + String(index)}>
            <div className="member-row_avatar">
              <span className="s16 cBlue w500">
                {getShortName(`${user.last_name} ${user.first_name}`)}
              </span>
            </div>
            <div className="flex-column">
              <span className="s14 cBlackL">{`${user.last_name} ${user.first_name}`}</span>
              <span className="s14 w400 cBlackLOpc">{user.userrole}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatHeader
