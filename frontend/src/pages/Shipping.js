import FormInput from "#components/FormInput"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  FORM_FIELDS_GUEST_USER_DATA,
  FORM_FIELDS_SHIPPING_DATA,
} from "#utils/constants"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./shipping.module.scss"

const Shipping = () => {
  const [formData, setFormData] = useState({
    street: "",
    number: "",
    details: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  })

  const navigate = useNavigate()

  const { translate } = useLocaleContext()
  const { cart } = useCartContext()
  const { user, isLoggedIn, isLoading } = useUserContext()

  const text = translate.pages.shipping

  useEffect(() => {
    if (!isLoading) {
      if (cart.length <= 0) {
        navigate("/cart")
      } else if (isLoggedIn) {
        navigate("/checkout/payment")
      }
    }
  }, [cart, navigate, isLoggedIn, isLoading, user])

  const listenFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitGuestUserWithOrders = async (e) => {
    if (cart.length > 0) {
      e.preventDefault()
      if (cart.length > 0) {
        if (!isLoggedIn) {
          navigate("/checkout/payment", {
            state: { formData: formData },
          })
        }
      } else {
        navigate("/cart")
      }
    }
  }
  return (
    <div className={styles.shippingPageWrapper}>
      <div className={styles.shippingPage}>
        <div className={styles.emailRegistrationText}>
          {"Please"}{" "}
          <span className={styles.linkLogin}>
            <Link to='/sign-up'>sign up</Link>
          </span>{" "}
          {text.titleSubSentence}
        </div>

        <form className={styles.form} onSubmit={submitGuestUserWithOrders}>
          <div className={styles.customerInfo}>
            <div className={styles.infoColumn}>
              <div className={styles.containerTitle}>{text.yourInfo}</div>
              {FORM_FIELDS_GUEST_USER_DATA.map((field) => (
                <FormInput
                  classCss={field.classCss}
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  onChangeListener={(e) => listenFormDataChange(e)}
                  placeholder={field.placeholder}
                  value={setFormData[field.name]}
                />
              ))}
              {FORM_FIELDS_SHIPPING_DATA.map((field) => (
                <FormInput
                  classCss={field.classCss}
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  onChangeListener={(e) => listenFormDataChange(e)}
                  placeholder={field.placeholder}
                  value={setFormData[field.name]}
                />
              ))}
            </div>
          </div>
          <div className={styles.actionButtons}>
            <Link className={styles.formButton} to='/cart'>
              {text.backToCart}
            </Link>

            <button className={styles.formButton} type='submit'>
              {text.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Shipping
