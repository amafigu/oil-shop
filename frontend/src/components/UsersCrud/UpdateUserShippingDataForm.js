import NotificationCard from "#components/NotificationCard"

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

    console.log("listenInputChange oldShippingData ", oldShippingData)
    console.log("listenInputChange updatedShippingData ", updatedShippingData)
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}
      {showForm ? (
        <button
          onClick={() => setShowForm(false)}
          className={styles.formButton}
          type='button'
        >
          HIDE SHIPPING DATA FORM
        </button>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className={styles.formButton}
          type='button'
        >
          UPDATE SHIPPING DATA
        </button>
      )}
      {showForm && (
        <form
          className={styles.form}
          onSubmit={(e) => updateUserShippingData(e)}
        >
          <label className={styles.label} htmlFor='street'>
            Street
          </label>
          <input
            className={styles.formField}
            type='text'
            name='street'
            onChange={(e) => listenInputChange(e)}
            value={updatedShippingData.street}
            placeholder='street'
          />
          <label className={styles.label} htmlFor='number'>
            Number
          </label>
          <input
            className={styles.formField}
            type='text'
            name='number'
            onChange={(e) => listenInputChange(e)}
            value={updatedShippingData.number}
            placeholder='number'
          />

          <label className={styles.label} htmlFor='details'>
            Details
          </label>
          <input
            onChange={(e) => listenInputChange(e)}
            className={styles.formFieldSelect}
            name='details'
            value={updatedShippingData.details}
            placeholder='details'
          />
          <label className={styles.label} htmlFor='details'>
            Postal Code
          </label>
          <input
            onChange={(e) => listenInputChange(e)}
            className={styles.formFieldSelect}
            name='postal_code'
            value={updatedShippingData.postal_code}
            placeholder='postal code'
          />
          <label className={styles.label} htmlFor='city'>
            City
          </label>
          <input
            onChange={(e) => listenInputChange(e)}
            className={styles.formFieldSelect}
            name='city'
            value={updatedShippingData.city}
            placeholder='city'
          />
          <label className={styles.label} htmlFor='state'>
            State
          </label>
          <input
            onChange={(e) => listenInputChange(e)}
            className={styles.formFieldSelect}
            name='state'
            value={updatedShippingData.state}
            placeholder='state'
          />
          <label className={styles.label} htmlFor='country'>
            Country
          </label>
          <input
            onChange={(e) => listenInputChange(e)}
            className={styles.formFieldSelect}
            name='country'
            value={updatedShippingData.country}
            placeholder='country'
          />

          <button className={styles.formButton} type='submit'>
            submit
          </button>
        </form>
      )}
    </div>
  )
}

export default UpdateUserShippingDataForm
