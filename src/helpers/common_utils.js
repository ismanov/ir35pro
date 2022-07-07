export const parseByte = byte => {
  if (byte < 1000) return `${byte} byte`
  if (byte < 1000000) return `${(byte / 1000).toFixed(2)} KB`
  if (byte < 1000000000) return `${(byte / 1000000).toFixed(2)} MB`
  else return `${(byte / 1000000000).toFixed(2)} GB`
}

export const reduceText = (text = "", maxLength, endLength) => {
  let textLength = text.length
  if (textLength <= maxLength) return text
  let text1 = text.slice(0, maxLength - endLength - 6)
  let text2 = text.slice(textLength - endLength)
  return `${text1}...${text2}`
}

export const getShortName = fullName => {
  const split = fullName?.split(" ") || [" ", " "]
  if (split.length < 2) return (split[0] || "")[0].toUpperCase()
  return ((split[0] || "")[0] + (split[1] || "")[0]).toUpperCase()
}

export const generateUid = () => {
  const date = new Date()

  return `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
}

export const arrayItemUpdater = (currentArray = [], newItem, key = "_id") => {
  let newArray = []
  for (let i = 0; i < currentArray.length; i++) {
    if (newItem[key] === currentArray[i][key]) {
      newArray = [...newArr, newItem, ...currentArray.slice(i + 1)]
      break
    } else {
      newArray.push(currentArray[i])
    }
  }

  return newArray
}

export const arrayItemRemover = (currentArray = [], itemId, key = "_id") => {
  let newArray = []
  for (let i = 0; i < currentArray.length; i++) {
    if (itemId === currentArray[i][key]) {
      newArray = [...newArr, ...currentArray.slice(i + 1)]
      break
    } else {
      newArray.push(currentArray[i])
    }
  }

  return newArray
}

export const isTimeExpired = (date1 = new Date(), extraTime = 0) => {
  const d1value = new Date(date1).valueOf()
  const d2value = new Date().valueOf()

  return d1value + extraTime < d2value
}

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const getTextInArray = (txArray, width, fontSize) => {
  const arrLen = txArray.length
  let freeWidth = width - 10
  const joinedText = txArray.join(", ")
  let res = ""
  let count = 0
  const allTextWidth = getTextWidth(joinedText, fontSize)

  for (let i = 0; i < arrLen; i++) {
    const textWidth = getTextWidth(txArray[i] + ", ", fontSize)

    if (textWidth > freeWidth) {
      count++
      break
    }

    freeWidth -= textWidth
    count++
  }
  res += joinedText.slice(
    0,
    Math.floor(joinedText.length * (width / allTextWidth))
  )
  if (count < arrLen) {
    res = res.slice(0, -2) + `...+${arrLen - count}`
  } else if (joinedText.length > res.length) {
    res = res.slice(0, -2) + `...`
  }

  return res
}

export const getTextWidth = (text, font) => {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"))
  const context = canvas.getContext("2d")
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export const addOrDeleteInArray = (array, element, getValue) => {
  const filteredArray = array.filter(item => {
    if (getValue) {
      return getValue(item) !== getValue(element)
    }
    return item !== element
  })

  if (filteredArray.length === array.length) {
    return [...filteredArray, element]
  }
  return filteredArray
}

export const getArray = array => (Array.isArray(array) ? [...array] : [])
