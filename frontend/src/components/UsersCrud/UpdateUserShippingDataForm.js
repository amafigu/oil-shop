import FormInput from "#components/FormInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import { FORM_FIELDS_SHIPPING_DATA } from "#utils/constants"
import axios from "axios"
import { useState } from "react"
import styles from "./updateUserShippingDataForm.module.scss"

const UpdateUserShippingDataForm = ({ userId }) => {
  const [notification, setNotification] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [updatedShippingData, setUpdatedShippingData] = useState({
    street: "",
    number: "",
    details: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  })
  const [oldShippingData, setOldShippingData] = useState({
    street: "",
    number: "",
    details: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  })

  const updateUserShippingData = async (e) => {
    e.preventDefault()

    try {
      const shippingData = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
        { withCredentials: true },
      )

      setOldShippingData(shippingData.data)
      setUpdatedShippingData((prevData) => ({
        ...prevData,
        ...shippingData.data,
      }))
      if (
        JSON.stringify(shippingData) === JSON.stringify(updatedShippingData)
      ) {
        setNotification("No changes made.")
        setTimeout(() => setNotification(null), 1300)
        return
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
        updatedShippingData,
        { withCredentials: true },
      )
      setUpdatedShippingData({
        street: "",
        number: "",
        details: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
      })
      setOldShippingData(updatedShippingData)
      console.log("response ", response)
      console.log("updatedShippingData ", updatedShippingData)

      setNotification("update shipping data")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      console.error("Can not edit shipping data ", error)
    }
  }

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
              onChange={(e) => listenInputChange(e)}
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
