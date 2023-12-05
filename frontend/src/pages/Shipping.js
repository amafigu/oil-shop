import FormInput from "#components/FormInput"
import NotificationCard from "#components/NotificationCard"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { STYLES } from "#utils/constants"
import { listenInputChangeAndSetDataObject } from "#utils/utils"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./shipping.module.scss"

const Shipping = () => {
  const [notification, setNotification] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  console.log(formData)

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
      {notification && <NotificationCard message={notification} />}
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
              {Object.keys(formData).map((field) => (
                <FormInput
                  classCss={STYLES.FORMS.FIELD}
                  key={field}
                  name={field}
                  onChangeListener={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      formData,
                      setFormData,
                      setNotification,
                    )
                  }
                  placeholder={field}
                  value={formData[field]}
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
