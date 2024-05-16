import { FormInput } from "#components/ui/FormInput"
import { ROUTES_CART } from "#constants/routes"
import { initialShippingFormData } from "#constants/shippingData"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/listenInputChangeAndSetDataObject"
import { onCreateGuestUserWithShippingData } from "#utils/onCreateGuestUserWithShippingData"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./shippingForm.module.scss"

export const ShippingForm = ({ setNotification }) => {
  const { translate } = useTranslation()
  const text = translate.pages.shipping
  const [formData, setFormData] = useState(initialShippingFormData)
  const navigate = useNavigate()

  return (
    <form
      aria-label='insert your shipping data'
      className={styles.form}
      onSubmit={(e) =>
        onCreateGuestUserWithShippingData(
          e,
          setNotification,
          formData,
          navigate,
        )
      }
    >
      <div className={styles.customerInfo}>
        <fieldset className={styles.infoColumn}>
          <legend className={styles.containerTitle}>{text.yourInfo}</legend>
          {Object.keys(formData).map((field) => (
            <div key={field}>
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
            </div>
          ))}
        </fieldset>
      </div>
      <div className={styles.actionButtons} aria-label='Navigation buttons'>
        <Link
          className={styles.formButton}
          to={ROUTES_CART}
          aria-label='Back to cart'
        >
          {text.backToCart}
        </Link>
        <button
          className={styles.formButton}
          type='submit'
          aria-label='Submit data button'
        >
          {text.submitButton}
        </button>
      </div>
    </form>
  )
}
