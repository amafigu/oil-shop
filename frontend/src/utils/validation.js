import { emailPattern, startWithCapitalLetter } from "#constants/regex"
import { isNumber } from "../constants/regex"

export const validateUserAndProductFieldsInDataObject = (
  dataObject,
  setErrorNotification,
) => {
  for (let property in dataObject) {
    const propertyValueLength = dataObject[property].length
    let propertyValue = dataObject[property]

    if (propertyValue === "" || propertyValue === undefined) {
      setErrorNotification("No changes made.")
      setTimeout(() => setErrorNotification(null), 2000)
      return
    }

    if (property === "image") {
      propertyValue = propertyValue.toString().trim()
      dataObject[property] = propertyValue
    }

    if (property === "firstName" || property === "lastName") {
      if (!startWithCapitalLetter.test(propertyValue)) {
        setErrorNotification("Name should start with a capital letter")
        setTimeout(() => setErrorNotification(null), 3000)
      }
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter name")
        setErrorNotification("Please enter a shorter name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
      if (propertyValueLength < 2) {
        console.error("Please enter a longer name")
        setErrorNotification("Please enter a longer name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "email") {
      if (!emailPattern.test(propertyValue)) {
        console.error("Invalid email format.")
        setErrorNotification("Invalid email format.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }

      if (propertyValueLength > 40) {
        console.error("Email can't be longer than 40 characters.")
        setErrorNotification("Email can't be longer than 40 characters.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "details" || property === "street") {
      if (propertyValueLength > 60) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (
      property === "postalCode" ||
      property === "city" ||
      property === "state"
    ) {
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }
  }

  return dataObject
}

export const validateUserShippingDataProperties = (
  dataObject,
  setErrorNotification,
) => {
  for (let property in dataObject) {
    const propertyValueLength = dataObject[property].length
    let propertyValue = dataObject[property]

    if (propertyValue === "" || propertyValue === undefined) {
      setErrorNotification("No changes made.")
      setTimeout(() => setErrorNotification(null), 2000)
      return
    }

    if (property === "image") {
      propertyValue = propertyValue.toString().trim()
      dataObject[property] = propertyValue
    }

    if (property === "firstName" || property === "lastName") {
      if (!startWithCapitalLetter.test(propertyValue)) {
        setErrorNotification("Name should start with a capital letter")
        setTimeout(() => setErrorNotification(null), 3000)
      }
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter name")
        setErrorNotification("Please enter a shorter name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
      if (propertyValueLength < 2) {
        console.error("Please enter a longer name")
        setErrorNotification("Please enter a longer name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "email") {
      if (!emailPattern.test(propertyValue)) {
        console.error("Invalid email format.")
        setErrorNotification("Invalid email format.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }

      if (propertyValueLength > 40) {
        console.error("Email can't be longer than 40 characters.")
        setErrorNotification("Email can't be longer than 40 characters.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "details" || property === "street") {
      if (propertyValueLength > 60) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (
      property === "postalCode" ||
      property === "city" ||
      property === "state"
    ) {
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }
  }

  return dataObject
}

export const validateUserProperties = (dataObject, setErrorNotification) => {
  for (let property in dataObject) {
    const propertyValueLength = dataObject[property].length
    let propertyValue = dataObject[property]

    if (propertyValue === "" || propertyValue === undefined) {
      setErrorNotification("No changes made.")
      setTimeout(() => setErrorNotification(null), 2000)
      return
    }

    if (property === "image") {
      propertyValue = propertyValue.toString().trim()
      dataObject[property] = propertyValue
    }

    if (property === "firstName" || property === "lastName") {
      if (!startWithCapitalLetter.test(propertyValue)) {
        setErrorNotification("Name should start with a capital letter")
        setTimeout(() => setErrorNotification(null), 3000)
      }
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter name")
        setErrorNotification("Please enter a shorter name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
      if (propertyValueLength < 2) {
        console.error("Please enter a longer name")
        setErrorNotification("Please enter a longer name")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "email") {
      if (!emailPattern.test(propertyValue)) {
        console.error("Invalid email format.")
        setErrorNotification("Invalid email format.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }

      if (propertyValueLength > 40) {
        console.error("Email can't be longer than 40 characters.")
        setErrorNotification("Email can't be longer than 40 characters.")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (property === "details" || property === "street") {
      if (propertyValueLength > 60) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }

    if (
      property === "postalCode" ||
      property === "city" ||
      property === "state"
    ) {
      if (propertyValueLength > 30) {
        console.error("Please enter a shorter value")
        setErrorNotification("Please enter a shorter value")
        setTimeout(() => setErrorNotification(null), 3000)
        return
      }
    }
  }

  return dataObject
}

export const validateProductProperty = (dataObject, setErrorNotification) => {
  for (let property in dataObject) {
    const propertyValueLength = dataObject[property].length
    let propertyValue = dataObject[property]

    if (propertyValue === "" || propertyValue === undefined) {
      setErrorNotification("No changes made.")
      setTimeout(() => setErrorNotification(null), 2000)
      return
    }

    if (property === "image") {
      propertyValue = propertyValue.toString().trim()
      dataObject[property] = propertyValue
    }

    if (property === "price") {
      if (!isNumber.test(propertyValue)) {
        setErrorNotification("User only numbers.")
        setTimeout(() => setErrorNotification(null), 3000)
      }
      propertyValue = propertyValue.trim()
      propertyValue = parseInt(propertyValue)

      if (propertyValueLength > 8) {
        setErrorNotification("Max 10 digits.")
        setTimeout(() => setErrorNotification(null), 2000)
        propertyValue = propertyValue.slice(0, 8)
        dataObject[property] = propertyValue
      }
      propertyValue = Number(propertyValue).toFixed(2)
      propertyValue = Number(propertyValue)
      dataObject[property] = propertyValue
    }

    if (property === "size") {
      propertyValue = propertyValue.trim()
      if (!isNumber.test(propertyValue)) {
        setErrorNotification("User only numbers.")
        setTimeout(() => setErrorNotification(null), 3000)
      }
      propertyValue = parseInt(propertyValue)
      if (propertyValueLength > 10) {
        setErrorNotification("Max 10 digits.")
        setTimeout(() => setErrorNotification(null), 2000)
        propertyValue = propertyValue.slice(0, 10)
      }
      dataObject[property] = propertyValue
    }

    if (property === "productCategoryId") {
      propertyValue = propertyValue.toString().trim()
      propertyValue = Number(propertyValue)
      dataObject[property] = propertyValue
    }

    if (property === "name") {
      propertyValue = propertyValue.toString().trim()
      if (propertyValueLength > 40) {
        setErrorNotification("Max 40 charachters.")
        setTimeout(() => setErrorNotification(null), 2000)
        propertyValue = propertyValue.slice(0, 40)
      }
      dataObject[property] = propertyValue
    }

    if (property === "description") {
      propertyValue = propertyValue.toString().trim()
      if (propertyValueLength > 60) {
        setErrorNotification("Max 60 charachters.")
        setTimeout(() => setErrorNotification(null), 2000)
        propertyValue = propertyValue.slice(0, 60)
      }
      dataObject[property] = propertyValue
    }
  }

  return dataObject
}

export const ignoreUnsavedProperties = (dataObject, propertyName) => {
  return { [propertyName]: dataObject[propertyName] }
}
