import ToggleButton from "#components/ToggleButton"
import useUserContaext from "#context/userContext"
import axios from "axios"
import React, { useState } from "react"
import styles from "./getShippingData.module.scss"

const GetShippingData = () => {
  const [userShippingData, setUserShippingData] = useState({})
  const [showShippingData, setShowShippingData] = useState(false)
  const { userId } = useUserContaext()

  const getAndShowShippingData = async (bool) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
        { withCredentials: true },
      )
      setUserShippingData(response.data)
      setShowShippingData(bool)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.getShippingDataWrapper}>
      <h2 className={styles.title}>Shipping Data</h2>
      <ToggleButton
        show={showShippingData}
        setToggle={getAndShowShippingData}
        textHide='HIDE SHIPPING DATA'
        textShow='SHOW SHIPPING DATA'
        classCss='toggleButtons'
      />
      {showShippingData && userShippingData && (
        <div className={styles.shippingData}>
          <div className={styles.cell}>
            <span className={styles.property}>Street:</span>{" "}
            <span className={styles.value}>{userShippingData.street}</span>
          </div>
          <div>
            <span className={styles.property}>Number:</span>{" "}
            <span className={styles.value}> {userShippingData.number}</span>
          </div>
          <div>
            <span className={styles.property}>Details:</span>{" "}
            <span className={styles.value}> {userShippingData.details}</span>
          </div>
          <div>
            <span className={styles.property}>Postal Code:</span>{" "}
            <span className={styles.value}>
              {" "}
              {userShippingData.postal_code}
            </span>
          </div>
          <div>
            <span className={styles.property}>City:</span>{" "}
            <span className={styles.value}> {userShippingData.city}</span>
          </div>
          <div>
            <span className={styles.property}>State:</span>{" "}
            <span className={styles.value}> {userShippingData.state}</span>
          </div>
          <div>
            <span className={styles.property}>Country:</span>{" "}
            <span className={styles.value}> {userShippingData.country}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetShippingData
