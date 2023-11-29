import EditableInput from "#components/EditableInputField"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { getUserShippingData } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateUserShippingDataForm.module.scss"

const UpdateUserShipping = ({ userId }) => {
  const [showForm, setShowForm] = useState(false)
  const [editStreetForm, setEditStreetForm] = useState(false)
  const [editCountryForm, setEditCountryForm] = useState(false)

  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  }
  const [oldShippingData, setOldShippingData] = useState({
    ...initialShippingData,
  })

  const [updatedShippingData, setUpdatedShippingData] = useState({
    ...initialShippingData,
  })
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const text = translate.errors.requests

  useEffect(() => {
    async function getOriginalShippingData() {
      try {
        if (!userId) return
        const shippingData = await getUserShippingData(userId)
        if (!shippingData) {
          setNotification(`${text.getShippingData} `)
          setTimeout(() => setNotification(null), 3000)
          return
        }
        setOldShippingData(shippingData)
      } catch (error) {
        setNotification(`${error}`)
        setTimeout(() => setNotification(null), 3000)
        console.error(error)
      }
    }

    getOriginalShippingData()
  }, [userId])

  const updateUserShippingData = async (e) => {
    e.preventDefault()

    try {
      console.log("editUser user ")

      setUpdatedShippingData((prevData) => ({
        ...prevData,
        ...oldShippingData,
      }))
      if (
        JSON.stringify(oldShippingData) === JSON.stringify(updatedShippingData)
      ) {
        setNotification("No changes made.")
        setTimeout(() => setNotification(null), 1300)
        return
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
        updatedShippingData,
        { withCredentials: true },
      )
      setOldShippingData((prevData) => ({
        ...prevData,
        ...nonEmptyUpdates,
      }))
      setUpdatedShippingData(initialShippingData)
      setNotification("update shipping data")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      alert("Could not update user: " + error)
    }
  }

  const nonEmptyUpdates = Object.keys(updatedShippingData)

    .filter((key) => updatedShippingData[key] !== "")
    .reduce((obj, key) => {
      obj[key] = updatedShippingData[key]
      return obj
    }, {})

  const listenInputChange = (e) => {
    setUpdatedShippingData({
      ...updatedShippingData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className={styles.updateUserShippingDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={"HIDE SHIPPING DATA FORM"}
          textShow={"UPDATE SHIPPING DATA"}
          classCss={"userOptionsButton"}
        />
        {showForm && (
          <div>
            <div className={styles.inputContainer}>
              <EditableInput
                label={"country"}
                name={"country"}
                value={updatedShippingData.country}
                onChange={(e) => listenInputChange(e)}
                onSave={(e) => updateUserShippingData(e)}
                classCss={"formField"}
                originalPropertyData={oldShippingData}
                updatedPropertyData={updatedShippingData}
              />
            </div>
            <div className={styles.inputContainer}>
              <EditableInput
                label={"street"}
                name={"street"}
                value={updatedShippingData.street}
                onChange={(e) => listenInputChange(e)}
                onSave={(e) => updateUserShippingData(e)}
                classCss={"formField"}
                originalPropertyData={oldShippingData}
                updatedPropertyData={updatedShippingData}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UpdateUserShipping
