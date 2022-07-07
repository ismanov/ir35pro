/* eslint-disable react/prop-types */
import { SearchIcon } from "assets/svg-icons/chat-icons"
import { UpArrowIcon } from "assets/svg-icons/contractors-icons"
import { getTextInArray } from "helpers/common_utils"
import React, { useState, useRef, useEffect, useMemo } from "react"
import CustomButton from "../CustomButton"
import CustomCheckButton from "../CustomCheckButton"
import "./styles.scss"

const CustomSelect = ({
  options = [],
  value,
  onChange,
  warning,
  error,
  disabled,
  multiSelect,
  inputPlaceholder,
  large,
  withSearch,
  withoutBorder,
  width,
  style,
  placeholder = "",
  className,
}) => {
  const selectContentRef = useRef()
  const inputRef = useRef()
  let isFocus = false
  let mouseDown = false

  const [selectedOptions, setSelectedOptions] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    setSelectedOptions(Array.isArray(value) ? value : [value])
  }, [value])

  const selectedOptionsText = useMemo(
    () =>
      options
        .filter(item =>
          (Array.isArray(value) ? value || [] : [value]).includes(item.key)
        )
        .map(item => item.name),
    [options, value]
  )

  const onChangeHandler = (value, isInclude) => {
    if (multiSelect) {
      setSelectedOptions(prev => {
        if (isInclude) return prev.filter(item => item !== value)
        return [...prev, value]
      })
    } else {
      setSelectedOptions([value])
    }
  }

  return (
    <div
      className={`my-tasks-custom-select ${large ? "" : "small-select-mode"}  ${
        className || ""
      }`}
      style={{ width, ...style }}
    >
      <div
        ref={selectContentRef}
        className={`select-content ${
          !(Array.isArray(value) ? value.length : value)
            ? ""
            : "select-with-value"
        } s13 w400 cBlackL ${warning ? "warning" : ""} 
        ${disabled ? "disabled" : ""}
        ${error ? "error" : ""} ${withoutBorder ? "without-border" : ""}
        `}
        onMouseDown={() => (mouseDown = true)}
        onClick={() => {
          if (!disabled) {
            isFocus = !isFocus
            !isFocus || inputRef.current?.focus()
          }
          mouseDown = false
        }}
      >
        <span className="mH12 text-nowrap s13">
          {selectedOptionsText.length
            ? getTextInArray(
                selectedOptionsText,
                (selectContentRef.current?.clientWidth || 50) - 50,
                "13px Poppins"
              )
            : placeholder}
        </span>
        <div className="arrow-icon">
          <UpArrowIcon />
        </div>
      </div>
      <div className="options-container">
        {withSearch && (
          <div className="pH16 mT16 mB20 flex ai-center">
            <SearchIcon fill="rgba(73, 80, 87, 0.4)" />
            <input
              type="text"
              className="search-input"
              placeholder={inputPlaceholder || "Search"}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}
        <div
          className="option-list custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {options
            .filter(item =>
              (item?.name || "").toUpperCase().includes(search.toUpperCase())
            )
            .map(item => {
              const isInclude = selectedOptions.includes(item.key)
              return (
                <div
                  key={item.key}
                  className="option"
                  onClick={() => onChangeHandler(item.key, isInclude)}
                >
                  <CustomCheckButton checked={isInclude} />
                  <span>{item.name}</span>
                </div>
              )
            })}
        </div>
        <div className="select-footer">
          <CustomButton
            onClick={() => onChange && onChange(multiSelect ? [] : undefined)}
            type="primary"
            link
            autoWidth
          >
            Clear
          </CustomButton>
          <CustomButton
            onClick={() => {
              onChange &&
                onChange(multiSelect ? selectedOptions : selectedOptions[0])
            }}
            type="primary"
            style={{ minWidth: "80px" }}
          >
            Save
          </CustomButton>
        </div>
      </div>
      <input
        type="text"
        ref={inputRef}
        onFocus={() => (isFocus = true)}
        onBlur={() => (isFocus = mouseDown)}
      />
    </div>
  )
}

export default React.memo(CustomSelect)
