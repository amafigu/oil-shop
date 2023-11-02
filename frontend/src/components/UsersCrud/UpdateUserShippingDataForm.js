import FormInput from "#components/FormInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import { FORM_FIELDS_SHIPPING_DATA } from "#utils/constants"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateUserShippingDataForm.module.scss"

const UpdateUserShippingDataForm = ({ userId, setUserShippingDataInUser }) => {
  const [notification, setNotification] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  }
  const [updatedShippingData, setUpdatedShippingData] = useState({
    ...initialShippingData,
  })
  const [oldShippingData, setOldShippingData] = useState({
    ...initialShippingData,
  })

  useEffect(() => {
    async function getOriginalShippingData() {
      console.log(userId)
      try {
        if (!userId) return
        const originalShippingData = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
          { withCredentials: true },
        )
        setOldShippingData(originalShippingData.data)
      } catch (error) {
        console.error(error)
      }
    }

    getOriginalShippingData()
  }, [userId])

  const updateUserShippingData = async (e) => {
    e.preventDefault()

    try {
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
      setOldShippingData(updatedShippingData)
      setUserShippingDataInUser((prevData) => ({
        ...prevData,
        ...nonEmptyUpdates,
      }))
      setUpdatedShippingData(initialShippingData)
      setNotification("update shipping data")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      console.error("Can not edit shipping data ", error)
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
    <div>
      {notification && <NotificationCard message={notification} />}
      <ToggleButton
        show={showForm}
        setToggle={setShowForm}
        textHide={"HIDE SHIPPING DATA FORM"}
        textShow={"UPDATE SHIPPING DATA"}
        classCss={"userOptionsButton"}
      />

      {showForm && (
        <form
          className={styles.form}
          onSubmit={(e) => updateUserShippingData(e)}
        >
          {FORM_FIELDS_SHIPPING_DATA.map((field) => (
            <FormInput
              classCss={field.classCss}
              key={field.name}
              label={field.label}
              name={field.name}
              onChangeListener={(e) => listenInputChange(e)}
              placeholder={field.placeholder}
              value={updatedShippingData[field.name]}
            />
          ))}

          <button className={styles.formButton} type='submit'>
            submit
          </button>
        </form>
      )}
    </div>
  )
}

export default UpdateUserShippingDataForm
