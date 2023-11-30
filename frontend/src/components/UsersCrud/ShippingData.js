import EditableInput from "#components/EditableInputField"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { CSS_CLASSES } from "#utils/constants"
import {
  getUserShippingData,
  ignorePropertiesWithEmptyValue,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  updateUserShippingData,
} from "#utils/utils"
import { useEffect, useState } from "react"
import styles from "./shippingData.module.scss"

const ShippingData = ({ userId }) => {
  const [showForm, setShowForm] = useState(false)
  const initialShippingData = {
    street: "",
    number: "",
    details: "",
    postal_code: "",
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

  useEffect(() => {
    async function getOriginalShippingData() {
      try {
        if (!userId) return
        const shippingData = await getUserShippingData(userId)
        if (!shippingData) {
          setNotification(`${errorText.getShippingData} `)
          setTimeout(() => setNotification(null), 3000)
          return
        }
        setNonUpdatedShippingData(shippingData)
      } catch (error) {
        setNotification(`${errorText.getShippingData}`)
        setTimeout(() => setNotification(null), 3000)
        console.error(error)
      }
    }

    getOriginalShippingData()
  }, [userId, errorText.getShippingData])

  const updateUserShippingDataAndSetStates = async (e) => {
    updateDataAndSetStates(
      e,
      updateUserShippingData(userId, updatedShippingData),
      nonUpdatedShippingData,
      setNonUpdatedShippingData,
      updatedShippingData,
      setUpdatedShippingData,
      setNotification,
      ignorePropertiesWithEmptyValue,
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
          classCss={CSS_CLASSES.BUTTONS.USER_OPTIONS}
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
                    )
                  }
                  onSave={(e) => updateUserShippingDataAndSetStates(e)}
                  classCss={"formField"}
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
