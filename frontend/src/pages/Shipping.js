import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { useEffectScrollTop } from "#utils/utils"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
    postal_code: "",
  })

  const navigate = useNavigate()

  const { translate } = useLocaleContext()
  const { cart } = useCartContext()
  const { user, isLoggedIn, isLoading } = useUserContext()

  const text = translate.pages.shipping

  useEffect(() => {
    if (!isLoading) {
      console.log("isLoggedIn", isLoggedIn)
      console.log("User", user)
      if (cart.length <= 0) {
        navigate("/cart")
      } else if (isLoggedIn) {
        navigate("/checkout/payment")
      }
    }
  }, [cart, navigate, isLoggedIn, isLoading, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    if (cart.length > 0) {
      e.preventDefault()
      updateUserShippingData(e)
      navigate("/checkout/payment", {
        state: { shippingData: formData },
      })
    } else {
      e.preventDefault()
      navigate("/cart")
    }
  }

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
        // `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
        //  updatedShippingData,
        { withCredentials: true },
      )
      setOldShippingData(updatedShippingData)
      setUserShippingDataInUser((prevData) => ({
        ...prevData,
        ...nonEmptyUpdates,
      }))
      // setUpdatedShippingData(initialShippingData)
      setNotification("update shipping data")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      console.error("Can not edit shipping data ", error)
    }
  }

  useEffectScrollTop()

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.customerInfo}>
            <div className={styles.infoColumn}>
              <div className={styles.containerTitle}>{text.yourInfo}</div>
              {FORM_FIELDS_GUEST_USER_DATA.map((field) => (
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
