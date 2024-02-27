import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import { API_SHIPPING_DATA } from "#constants/api"
import { initialShippingData } from "#constants/shippingData"
import { STYLES } from "#constants/styles"
import { useGetOriginalShippingData } from "#hooks/useGetOriginalShippingData"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
} from "#utils/dataManipulation"
import { useState } from "react"
import styles from "./shippingData.module.scss"

export const ShippingData = () => {
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState(null)
  const [updatedShippingData, setUpdatedShippingData] = useState({
    ...initialShippingData,
  })
  const { translate } = useTranslation()
  const buttonsText = translate.components.buttons
  const { nonUpdatedShippingData, setNonUpdatedShippingData, userId } =
    useGetOriginalShippingData()

  const updateUserShippingDataAndSetStates = async (e, propertyName) => {
    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      userId,
      API_SHIPPING_DATA,
      setNonUpdatedShippingData,
      updatedShippingData,
      setUpdatedShippingData,
      setNotification,
    )
    if (!updatedData) {
      return
    }
  }

  return (
    <section aria-label='User shipping data'>
      {notification && <NotificationCard message={notification} />}
      <h3 className={styles.title}>Shipping Data</h3>
      <ToggleButton
        show={showForm}
        setToggle={setShowForm}
        textHide={`${buttonsText.actions.shipping.hide.toUpperCase()}`}
        textShow={`${buttonsText.actions.shipping.show.toUpperCase()}`}
        classCss={STYLES.BUTTONS.USER_OPTIONS}
      />
      {showForm && nonUpdatedShippingData !== initialShippingData && (
        <form aria-label='shipping data form'>
          <ul>
            {Object.keys(initialShippingData).map((item) => (
              <li className={styles.inputContainer} key={item}>
                <EditableInput
                  label={item}
                  name={item}
                  value={updatedShippingData[item]}
                  onChange={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      updatedShippingData,
                      setUpdatedShippingData,
                      setNotification,
                    )
                  }
                  onSave={(e) => updateUserShippingDataAndSetStates(e, item)}
                  classCss={STYLES.FORMS.FIELD}
                  originalPropertyData={nonUpdatedShippingData}
                  updatedPropertyData={updatedShippingData}
                />
              </li>
            ))}
          </ul>
        </form>
      )}
    </section>
  )
}
