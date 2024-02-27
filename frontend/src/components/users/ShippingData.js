import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import { API_SHIPPING_DATA } from "#constants/api"
import { STYLES } from "#constants/styles"
import { useGetOriginalShippingData } from "#hooks/useGetOriginalShippingData"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
} from "#utils/dataManipulation"
import { ignorePropertiesWithEmptyValue } from "#utils/validation"
import { useEffect, useState } from "react"
import styles from "./shippingData.module.scss"

const ShippingData = () => {
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState(null)
  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  }

  const [updatedShippingData, setUpdatedShippingData] = useState({
    ...initialShippingData,
  })
  const { translate } = useTranslation()
  const buttonsText = translate.components.buttons
  const usersWarningText = translate.warningMessages.users
  const { nonUpdatedShippingData, setNonUpdatedShippingData, userId } =
    useGetOriginalShippingData()

  useEffect(() => {
    let timeoutId
    if (
      Object.keys(ignorePropertiesWithEmptyValue(nonUpdatedShippingData))
        .length === 0 &&
      showForm
    ) {
      setNotification(usersWarningText.shippingDataIsEmpty)
      timeoutId = setTimeout(() => setNotification(null), 3000)
    }

    return () => clearTimeout(timeoutId)
  }, [nonUpdatedShippingData, showForm, usersWarningText.shippingDataIsEmpty])

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
    <>
      <div className={styles.updateUserShippingDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <h1 className={styles.title}>Shipping Data</h1>
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${buttonsText.actions.shipping.hide.toUpperCase()}`}
          textShow={`${buttonsText.actions.shipping.show.toUpperCase()}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && nonUpdatedShippingData !== initialShippingData && (
          <div>
            {Object.keys(initialShippingData).map((key) => (
              <div className={styles.inputContainer} key={key}>
                <EditableInput
                  label={key}
                  name={key}
                  value={updatedShippingData[key]}
                  onChange={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      updatedShippingData,
                      setUpdatedShippingData,
                      setNotification,
                    )
                  }
                  onSave={(e) => updateUserShippingDataAndSetStates(e, key)}
                  classCss={STYLES.FORMS.FIELD}
                  originalPropertyData={nonUpdatedShippingData}
                  updatedPropertyData={updatedShippingData}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ShippingData
