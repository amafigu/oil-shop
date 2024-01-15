import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_SHIPPING_DATA,
  SHORT_MESSAGE_TIMEOUT,
  STYLES,
} from "#utils/constants"
import {
  getDataAndSetErrorMessage,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
} from "#utils/dataManipulation"
import { ignorePropertiesWithEmptyValue } from "#utils/validation"
import { useEffect, useState } from "react"
import styles from "./shippingData.module.scss"

const ShippingData = () => {
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
  const { userId, isLoading } = useUserContext()

  const errorText = translate.errors.requests
  const buttonsText = translate.components.buttons
  const usersWarningText = translate.warningMessages.users

  useEffect(() => {
    async function getOriginalShippingData() {
      if (!isLoading) {
        const shippingData = await getDataAndSetErrorMessage(
          userId,
          API_SHIPPING_DATA,
        )
        if (!shippingData) {
          setNotification(
            `there is no shipping data for this user, in order to make purchases please add it`,
          )
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
          return
        }
        if (shippingData.status === 200) {
          setNonUpdatedShippingData(shippingData.data)
        }
      }
    }
    getOriginalShippingData()
  }, [userId, errorText.user.getShippingData, isLoading])

  useEffect(() => {
    if (
      ignorePropertiesWithEmptyValue(nonUpdatedShippingData) == {} &&
      showForm
    ) {
      setNotification(usersWarningText.shippingDataIsEmpty)
      setTimeout(() => setNotification(null), 3000)
    }
  }, [nonUpdatedShippingData, showForm, usersWarningText.shippingDataIsEmpty])

  const updateUserShippingDataAndSetStates = async (e, propertyName) => {
    const updatedData = updateDataAndSetStates(
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
