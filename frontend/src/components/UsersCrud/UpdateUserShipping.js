import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateUserShippingDataForm.module.scss"
const UpdateUserShipping = ({ userId, setUserShippingDataInUser }) => {
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

  useEffect(() => {
    async function getOriginalShippingData() {
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

  console.log(editStreetForm)
  console.log(editCountryForm)
  const updateUserShippingDataAndSetEditForm = async (e, setEditForm) => {
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

      console.log(updatedShippingData)

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
      setEditForm(false)
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
            <div className={styles.itemRow}>
              {editCountryForm ? (
                <input
                  label='country'
                  name='country'
                  className={styles.formField}
                  value={
                    updatedShippingData.country
                      ? updatedShippingData.country
                      : oldShippingData.country
                  }
                  placeholder={oldShippingData.country}
                  onChange={(e) => listenInputChange(e)}
                />
              ) : (
                <div className={styles.nonUpdatedData}>
                  <span className={styles.property}>Country:</span>
                  <span
                    className={styles.value}
                  >{`${oldShippingData.country}`}</span>
                </div>
              )}
              {editCountryForm ? (
                <div
                  className={styles.formButton}
                  onMouseDown={(e) =>
                    updateUserShippingDataAndSetEditForm(e, setEditCountryForm)
                  }
                >
                  Save
                </div>
              ) : (
                <div
                  className={styles.formButton}
                  onClick={() => setEditCountryForm(true)}
                >
                  Edit
                </div>
              )}
            </div>
            <div className={styles.itemRow}>
              {editStreetForm ? (
                <input
                  label='street'
                  name='street'
                  className={styles.formField}
                  value={
                    updatedShippingData.street
                      ? updatedShippingData.street
                      : oldShippingData.street
                  }
                  placeholder={oldShippingData.street}
                  onChange={(e) => listenInputChange(e)}
                />
              ) : (
                <div className={styles.nonUpdatedData}>
                  <span className={styles.property}>Street:</span>
                  <span
                    className={styles.value}
                  >{`${oldShippingData.street}`}</span>
                </div>
              )}
              {editStreetForm ? (
                <div
                  className={styles.formButton}
                  onClick={(e) =>
                    updateUserShippingDataAndSetEditForm(e, setEditStreetForm)
                  }
                >
                  Save
                </div>
              ) : (
                <div
                  className={styles.formButton}
                  onClick={() => setEditStreetForm(true)}
                >
                  Edit
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UpdateUserShipping
