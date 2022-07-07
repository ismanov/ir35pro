/* eslint-disable react/prop-types */

import { WarningIcon } from "assets/svg-icons/common-icons"
import CustomButton from "components/Common/CustomButton"
import CustomSelect from "components/Common/CustomSelect"
import Status from "components/Common/Status"
import moment from "moment"
import React from "react"
import { NavLink } from "react-router-dom"
import AssignedUsers from "../AssignedUsers"

const DraftRow = ({
  row,
  type,
  index,
  userRole,
  usersList,
  getCompanyName,
}) => {
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case "under_assessment":
        return "primary"
      case "inside":
        return "success"
      case "outside":
        return "error"

      default:
        return "primary"
    }
  }
  return (
    <div className="flex full-width ai-center">
      <div
        className={`statuses-color mR8 ${
          row.statuses == "client action required"
            ? userRole == "ir35pro"
              ? "bgc-green"
              : "bgc-orange"
            : row.statuses == "ir35 pro reviewing"
            ? "bgc-blue"
            : ""
        }`}
      />
      <div
        className={`list-table-row full-width fg1 ${
          index > 0 ? "" : "border-top"
        } border-bottom s14 w400`}
      >
        <div className="name-column flex ai-center border-right">
          <div className="icon-space">
            {row.overDue == "true" && <WarningIcon />}
          </div>
          <NavLink to={`/contractors-overview/${row.id}`}>
            <span className="cBlackL pointer">{row.engagement_name}</span>
          </NavLink>
        </div>

        <div className="h-manager-column flex ai-center border-right">
          <span className="mL16">{`${row.hiring_manager_first_name || ""} ${
            row.hiring_manager_last_name || ""
          }`}</span>
        </div>

        <div className="client-company-column flex ai-center border-right">
          <span className="mL16">{getCompanyName(row.client_company)}</span>
        </div>

        {type === "0" ? (
          <div className="flex jc-center pH12 fg1">
            <NavLink
              to={
                row.tabID > 5
                  ? "/form-survey/" + row.id
                  : "/add-contractor?" + row.id
              }
            >
              <CustomButton type="primary" width={140}>
                Continue Filling
              </CustomButton>
            </NavLink>
          </div>
        ) : (
          <>
            <div className="ir35pro-status-column flex ai-center jc-center border-top  border-right">
              <div className="">
                <Status className="" status={getStatusColor(row.ir_status)}>
                  {row.ir_status?.capitalizeFirstLetter().splitByUnderline()}
                </Status>
              </div>
            </div>
            <div className="statuses-column pH16 flex ai-center border-top border-right">
              <CustomSelect
                withoutBorder
                width={"100%"}
                options={[
                  {
                    key: "predefined statuses",
                    name: "Predefined statuses",
                  },
                  {
                    key: "ir35 pro reviewing",
                    name: "IR35 Pro reviewing",
                  },
                  {
                    key: "client action required",
                    name: "Client action required",
                  },
                ]}
                value={
                  row.statuses == "undefined" || row.statuses == ""
                    ? "predefined statuses"
                    : row.statuses
                }
              />
            </div>
            <div className="assigned-user-column border-top fit-content pL32">
              <AssignedUsers
                usersList={usersList}
                assignedUsersIds={row.assign_users?.split(",")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(DraftRow)
