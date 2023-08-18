import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./shipping.module.scss"

const Shipping = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
  })

  const navigate = useNavigate()

  const { translate } = useLocaleContext()
  const text = translate.pages.shipping

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("maybe store in global state or localStore", formData)

    navigate("/checkout/payment", {
      state: { shippingData: formData },
    })
  }

  return (
    <div className={styles.shippingPageWrapper}>
      <div className={styles.shippingPage}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.emailFieldContainer}>
            <div>{text.yourEmail}</div>
            <div className={styles.formTitel}>
              <div className={styles.emailRegistrationText}>{text.title}</div>
            </div>
            <label for='email'>{text.inputLabels.email}</label>

            <input
              className={styles.formField}
              name='email'
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label for='firstName'>{text.inputLabels.firstName}</label>

            <input
              className={styles.formField}
              name='firstName'
              onChange={handleChange}
              required
            />
            <label for='lastName'>{text.inputLabels.lastName}</label>

            <input
              className={styles.formField}
              name='lastName'
              onChange={handleChange}
              required
            />

            <label for='phone'>{text.inputLabels.phone}</label>

            <input
              className={styles.formField}
              name='phone'
              onChange={handleChange}
              required
            />
            <label for='country'>{text.inputLabels.country}</label>

            <input
              className={styles.formField}
              name='country'
              onChange={handleChange}
              required
            />
            <label for='state'>{text.inputLabels.state}</label>

            <input
              className={styles.formField}
              name='state'
              onChange={handleChange}
              required
            />
            <label for='city'>{text.inputLabels.city}</label>

            <input
              className={styles.formField}
              name='city'
              onChange={handleChange}
              required
            />
            <label for='address'>{text.inputLabels.address}</label>

            <input
              className={styles.formField}
              name='address'
              onChange={handleChange}
              required
            />
            <label for='postalCode'>{text.inputLabels.postalCode}</label>

            <input
              className={styles.formField}
              name='postalCode'
              onChange={handleChange}
              required
            />
          </div>
        </form>
        <button onClick={handleSubmit}>{text.submitButton}</button>
      </div>
    </div>
  )
}

export default Shipping
