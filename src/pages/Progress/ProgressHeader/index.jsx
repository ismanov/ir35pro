/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { SearchIcon } from "assets/svg-icons/chat-icons"
import { BoardIcon, ListIcon } from "assets/svg-icons/my-tasks-icons"
import { NavLink, useLocation } from "react-router-dom"
import "./styles.scss"
import CustomSelect from "components/Common/CustomSelect"
import { useDispatch, useSelector } from "react-redux"
import CustomButton from "components/Common/CustomButton"
import { ModalContext } from "components/Overlays"
import MoreFilters from "./MoreFilters"
import CustomModal from "components/Common/CustomModal"

const ProgressHeader = props => {
  const {
    showBoard,
    onClickList,
    onClickBoard,
    handleSearch,
    roleFilter,
    managerFilter,
    assignedUserFilter,
    companyFilter,
    statusFilter,
  } = props
  const dispatch = useDispatch()
  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <div className="progress-header-container">
      <CustomModal
        onClose={() => {
          setVisibleModal(false)
        }}
        visible={visibleModal}
      >
        <MoreFilters
          {...props}
          onClose={() => {
            setVisibleModal(false)
          }}
        />
      </CustomModal>
      <div className="s16 w500 cBlackL mB24 uCase">CONTRACTORS PROGRESS</div>
      <div className="tabs-panel">
        <div className="tabs">
          <div
            className={`tab pointer ${!showBoard ? "active-tab" : ""}`}
            onClick={onClickList}
          >
            <ListIcon />
            <span className="s16 w500 mL8">List</span>
          </div>
          <div
            className={`tab pointer ${showBoard ? "active-tab" : ""}`}
            onClick={onClickBoard}
          >
            <BoardIcon />
            <span className="s16 w500 mL8">Board</span>
          </div>
        </div>
        <div className="flex fit-content">
          <div className="input-container mR30">
            <SearchIcon fill="rgba(73, 80, 87, 0.4)" />
            <input
              type="text"
              placeholder="Enter Contractor ID"
              onChange={handleSearch}
            />
          </div>
          <NavLink to="/add-contractor">
            <CustomButton type="primary" width={160} height={36}>
              Add Contractor
            </CustomButton>
          </NavLink>
        </div>
      </div>
      <div className="filters-container">
        <CustomSelect
          className="mR20 flex1"
          placeholder="Role"
          multiSelect
          value={roleFilter.value}
          onChange={roleFilter.onChange}
          options={roleFilter.options.map(item => ({ key: item, name: item }))}
        />
        <CustomSelect
          className="mR20 flex1"
          placeholder="Hiring Manager"
          multiSelect
          value={managerFilter.value}
          onChange={managerFilter.onChange}
          options={managerFilter.options.map(item => ({
            key: item,
            name: item,
          }))}
        />
        <CustomSelect
          className="mR20 flex1 "
          placeholder="IR35Pro Status"
          multiSelect
          value={statusFilter.value}
          onChange={statusFilter.onChange}
          options={statusFilter.options}
        />
        <CustomSelect
          className="mR20 mB16 flex1"
          placeholder="Company"
          multiSelect
          value={companyFilter.value}
          onChange={companyFilter.onChange}
          options={companyFilter.options.map(item => ({
            key: item.id,
            name: item.company_name,
          }))}
        />
        <CustomSelect
          className="flex1 mR20"
          value={assignedUserFilter.value}
          multiSelect
          onChange={assignedUserFilter.onChange}
          placeholder="Assigned User"
          options={assignedUserFilter.options.map(user => ({
            key: user.id,
            name: `${user.first_name || ""} ${user.last_name || ""}`,
          }))}
        />
        <CustomButton
          className="flex1"
          type="primary"
          outline
          width={160}
          height={36}
          onClick={() => setVisibleModal(true)}
        >
          More Filters
        </CustomButton>
      </div>
    </div>
  )
}

export default ProgressHeader
