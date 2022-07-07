/* eslint-disable react/prop-types */
import React, { useState } from "react"

import { CloseButtonIcon } from "assets/svg-icons/chat-icons"
import { RadioButtonItemIcon } from "assets/svg-icons/contractors-icons"
import { SwitchIcon } from "assets/svg-icons/common-icons"
import CustomButton from "components/Common/CustomButton"
import CustomCheckButton from "components/Common/CustomCheckButton"
import CustomSelect from "components/Common/CustomSelect"
import DatePicker from "react-datepicker"
import moment from "moment"

import "./styles.scss"
import { addOrDeleteInArray } from "helpers/common_utils"

const MoreFilters = ({
  onClose,
  clearFilter,
  companyFilter,
  assignedUserFilter,
  statusFilter,
  statusesFilter,
  dateFilter,
  overdueFilter,
  archivedFilter,
}) => {
  const [showPicker, setShowPicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()

  const setStatusFilter = (isTrue, value) =>
    statusFilter.onChange(
      addOrDeleteInArray(statusFilter.value || [], value || "")
    )

  const isCheckedStatusFilterField = val => {
    return (
      Array.isArray(statusFilter.value) ? statusFilter.value : []
    ).includes(val)
  }

  const setStatusesFilter = (isTrue, value) =>
    statusesFilter.onChange(
      addOrDeleteInArray(statusesFilter.value || [], value || "")
    )

  const isCheckedStatusesFilterField = val => {
    return (
      Array.isArray(statusesFilter.value) ? statusesFilter.value : []
    ).includes(val)
  }

  return (
    <>
      <div
        className={`${showPicker ? "display-none" : ""} more-filters-container`}
      >
        <div className="space-between mB32">
          <div />
          <div className="s14 w500 cBlackL">More filters</div>
          <div className="pointer" onClick={onClose}>
            <CloseButtonIcon fill="#A0A5B2" />
          </div>
        </div>
        <div className="fg1 scroll-y without-scrollbar">
          <div className="mB32">
            <div className="s18 w500 mB32">Company</div>
            <CustomSelect
              withSearch
              width={275}
              placeholder="Company"
              large
              multiSelect
              value={companyFilter.value}
              onChange={companyFilter.onChange}
              options={companyFilter.options.map(item => ({
                key: item.id,
                name: item.company_name,
              }))}
            />
          </div>

          <div className="mB32">
            <div className="s18 w500 mB24">Date of adding</div>
            <div className="flex s14 w400">
              <div className="flex-column">
                <CustomCheckButton
                  title="This month"
                  className="mB16"
                  checked={dateFilter.value?.type === "1"}
                  onChange={val =>
                    dateFilter?.onChange(!val ? undefined : { type: "1" })
                  }
                />
                <CustomCheckButton
                  title="Last year"
                  checked={dateFilter.value?.type === "3"}
                  onChange={val =>
                    dateFilter?.onChange(!val ? undefined : { type: "3" })
                  }
                />
              </div>

              <div className="flex-column">
                <CustomCheckButton
                  title="This year"
                  className="mB16"
                  checked={dateFilter.value?.type === "2"}
                  onChange={val =>
                    dateFilter?.onChange(!val ? undefined : { type: "2" })
                  }
                />
                <CustomButton
                  link
                  type="primary"
                  autoWidth
                  height={24}
                  onClick={() => setShowPicker(true)}
                >
                  {dateFilter.value?.type === "4"
                    ? `${moment(dateFilter.value?.startDate).format(
                        "DD/MM/YYYY"
                      )} ⇁ ${moment(dateFilter.value?.endDate).format(
                        "DD/MM/YYYY"
                      )}`
                    : "Custom period"}
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="mB32">
            <div className="s18 w500 mB32">Assigned user</div>
            <CustomSelect
              withSearch
              width={275}
              large
              multiSelect
              placeholder="Assigned User"
              value={assignedUserFilter.value}
              onChange={assignedUserFilter.onChange}
              options={assignedUserFilter.options.map(user => ({
                key: user.id,
                name: `${user.first_name || ""} ${user.last_name || ""}`,
              }))}
            />
          </div>

          <div className="mB32">
            <div className="space-between mB24">
              <span className="s18 w500">IR35Pro Status</span>
              {Array.isArray(statusFilter.value) &&
              statusFilter.value.length ? (
                <CustomButton
                  link
                  height={27}
                  autoWidth
                  onClick={() => statusFilter.onChange([])}
                >
                  Clear
                </CustomButton>
              ) : null}
            </div>
            <div className="flex s14 w400">
              <div className="flex-column">
                <CustomCheckButton
                  onChange={val => setStatusFilter(val, "under_assessment")}
                  checked={isCheckedStatusFilterField("under_assessment")}
                  title="Under assessment"
                  className="mB16"
                />
                <CustomCheckButton
                  onChange={val => setStatusFilter(val, "outside")}
                  checked={isCheckedStatusFilterField("outside")}
                  title="Outside"
                />
              </div>

              <div className="flex-column">
                <CustomCheckButton
                  title="Inside"
                  onChange={val => setStatusFilter(val, "inside")}
                  checked={isCheckedStatusFilterField("inside")}
                />
              </div>
            </div>
          </div>

          <div className="mB32">
            <div className="space-between mB24">
              <span className="s18 w500">Statuses</span>
              {Array.isArray(statusesFilter.value) &&
              statusesFilter.value.length ? (
                <CustomButton
                  link
                  height={27}
                  autoWidth
                  onClick={() => statusesFilter.onChange([])}
                >
                  Clear
                </CustomButton>
              ) : null}
            </div>
            <div className="flex s14 w400">
              <div className="flex-column">
                <CustomCheckButton
                  title="Predefined statuses"
                  className="mB16"
                  checked={isCheckedStatusesFilterField("predefined statuses")}
                  onChange={val =>
                    setStatusesFilter(val, "predefined statuses")
                  }
                />
                <CustomCheckButton
                  title="Client action required"
                  checked={isCheckedStatusesFilterField(
                    "client action required"
                  )}
                  onChange={val =>
                    setStatusesFilter(val, "client action required")
                  }
                />
              </div>

              <div className="flex-column">
                <CustomCheckButton
                  title="IR35 Pro reviewing"
                  checked={isCheckedStatusesFilterField("ir35_pro_reviewing")}
                  onChange={val => setStatusesFilter(val, "ir35_pro_reviewing")}
                />
              </div>
            </div>
          </div>

          <div className="mB32">
            <div className="s18 w500 mB24">Filter by overdue</div>
            <div className="flex s14 w400">
              <div
                className="flex ai-center pointer"
                onClick={() => overdueFilter.onChange(true)}
              >
                <RadioButtonItemIcon checked={overdueFilter.value} />
                <span className="mL8">Overdue cards</span>
              </div>

              <div
                className="flex ai-center pointer"
                onClick={() => overdueFilter.onChange(false)}
              >
                <RadioButtonItemIcon checked={!overdueFilter.value} />
                <span className="mL8">Non Overdue</span>
              </div>
            </div>
          </div>

          <div className="mB32">
            <div className="space-between">
              <span className="s16 w400">Show only archived cards</span>

              <div
                className="pointer"
                onClick={() =>
                  archivedFilter.onChange(
                    archivedFilter.value === "archived"
                      ? "unarchived"
                      : "archived"
                  )
                }
              >
                <SwitchIcon checked={archivedFilter.value === "archived"} />
              </div>
            </div>
          </div>
        </div>
        <div className="space-between mT32">
          <CustomButton
            link
            onClick={() => {
              clearFilter()
              onClose()
            }}
          >
            Clear all filters
          </CustomButton>
          <CustomButton
            width={140}
            height={36}
            type="primary"
            onClick={onClose}
          >
            Apply
          </CustomButton>
        </div>
      </div>
      <div
        className={`${!showPicker ? "display-none" : "card-style"}`}
        style={{ transform: "scale(2)" }}
      >
        <DatePicker
          selected={startDate}
          onChange={dates => {
            const [start, end] = dates
            setStartDate(start)
            setEndDate(end)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <div className="mT16 space-between">
          <CustomButton
            type="error"
            autoWidth
            onClick={() => setShowPicker(false)}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={() => {
              dateFilter.onChange({ type: "4", startDate, endDate })
              setShowPicker(false)
            }}
          >
            Done
          </CustomButton>
        </div>
      </div>
    </>
  )
}

export default MoreFilters
