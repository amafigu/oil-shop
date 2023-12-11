import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { API_SHIPPING_DATA, STYLES } from "#utils/constants"
import {
  getDataAndSetErrorMessage,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  updateDataRequest,
} from "#utils/dataManipulation"
import { ignorePropertiesWithEmptyValue } from "#utils/validation"
import { useEffect, useState } from "react"
import styles from "./shippingData.module.scss"

const ShippingData = ({ userId }) => {
  const [showForm, setShowForm] = useState(false)
  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  }
  const [nonUpdatedShippingData, setNonUpdatedShippingData] = useState({
    ...initialShippingData,
  })

  const [updatedShippingData, setUpdatedShippingData] = useState({
    ...initialShippingData,
  })
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const errorText = translate.errors.requests
  const buttonsText = translate.components.buttons
  const usersWarningText = translate.warningMessages.users

  useEffect(() => {
    async function getOriginalShippingData() {
      if (!userId) return
      const shippingData = await getDataAndSetErrorMessage(
        userId,
        API_SHIPPING_DATA,
        setNotification,
      )
      if (!shippingData) {
        return
      } else {
        setNonUpdatedShippingData(shippingData)
      }
    }
    getOriginalShippingData()
  }, [userId, errorText.user.getShippingData])

  useEffect(() => {
    if (ignorePropertiesWithEmptyValue(nonUpdatedShippingData) && showForm) {
      setNotification(usersWarningText.shippingDataIsEmpty)
      setTimeout(() => setNotification(null), 3000)
    }
  }, [nonUpdatedShippingData, showForm, usersWarningText.shippingDataIsEmpty])

  const updateUserShippingDataAndSetStates = async (e) => {
    updateDataAndSetStates(
      e,
      () => updateDataRequest(userId, updatedShippingData, API_SHIPPING_DATA),
      nonUpdatedShippingData,
      setNonUpdatedShippingData,
      updatedShippingData,
      setUpdatedShippingData,
      setNotification,
    )
  }

  return (
    <>
      <div className={styles.updateUserShippingDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${buttonsText.actions.shipping.hide}`}
          textShow={`${buttonsText.actions.shipping.show}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
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
                  onSave={(e) => updateUserShippingDataAndSetStates(e)}
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
