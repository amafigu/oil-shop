import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
            <div className={styles.containerTitle}>{text.yourEmail}</div>
            <div className={styles.emailFormTitel}>
              <div className={styles.emailRegistrationText}>{text.title}</div>
            </div>
            <label className={styles.label} htmlFor='email'>
              {text.inputLabels.email}
            </label>

            <input
              className={styles.formField}
              name='email'
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.customerInfo}>
            <div className={styles.infoColumn}>
              <div className={styles.containerTitle}>{text.yourInfo}</div>
              <div className={styles.infoRow}>
                <div className={styles.infoRowCellLeft}>
                  <label className={styles.label} htmlFor='firstName'>
                    {text.inputLabels.firstName}
                  </label>
                  <input
                    className={styles.formField}
                    name='firstName'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.infoRowCellRight}>
                  <label className={styles.label} htmlFor='lastName'>
                    {text.inputLabels.lastName}
                  </label>

                  <input
                    className={styles.formField}
                    name='lastName'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoRowCellLeft}>
                  <label className={styles.label} htmlFor='phone'>
                    {text.inputLabels.phone}
                  </label>

                  <input
                    className={styles.formField}
                    name='phone'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.infoRowCellRight}>
                  <label className={styles.label} htmlFor='country'>
                    {text.inputLabels.country}
                  </label>

                  <input
                    className={styles.formField}
                    name='country'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoRowCellLeft}>
                  <label className={styles.label} htmlFor='state'>
                    {text.inputLabels.state}
                  </label>

                  <input
                    className={styles.formField}
                    name='state'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.infoRowCellRight}>
                  <label className={styles.label} htmlFor='city'>
                    {text.inputLabels.city}
                  </label>

                  <input
                    className={styles.formField}
                    name='city'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoRowCellLeft}>
                  <label className={styles.label} htmlFor='postalCode'>
                    {text.inputLabels.postalCode}
                  </label>
                  <input
                    className={styles.formField}
                    name='postalCode'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.infoRowCellRight}>
                  <label className={styles.label} htmlFor='address'>
                    {text.inputLabels.address}
                  </label>

                  <input
                    className={styles.formField}
                    name='address'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <Link className={styles.formButton} to='/cart'>
              Back to cart
            </Link>

            <span
              tabIndex='0'
              className={styles.formButton}
              onClick={handleSubmit}
            >
              {text.submitButton}
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Shipping
