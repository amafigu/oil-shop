import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { API_USER_CUSTOMER, STYLES } from "#utils/constants"
import {
  checkIfAllObjectsValuesAreEmptyStrings,
  getDataAndSetErrorMessage,
  ignorePropertiesWithEmptyValue,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  updateDataRequest,
} from "#utils/utils"
import { useEffect, useState } from "react"
import styles from "./shippingData.module.scss"

const UserData = ({ userId }) => {
  const [showForm, setShowForm] = useState(false)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
  }

  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    ...initialUserData,
  })

  const [updatedUserData, setUpdatedUserData] = useState({
    ...initialUserData,
  })
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const errorText = translate.errors.requests
  const buttonsText = translate.components.buttons
  const usersWarningText = translate.warningMessages.users

  useEffect(() => {
    async function getOriginalUserData() {
      try {
        if (!userId) return
        const userData = await getDataAndSetErrorMessage(
          userId,
          API_USER_CUSTOMER,
          setNotification,
        )

        console.log("userData", userData)
        if (!userData) {
          return
        } else {
          setNonUpdatedUserData(userData)
        }
      } catch (error) {
        setNotification(`${errorText.user.getUserData}`)
        setTimeout(() => setNotification(null), 3000)
        console.error(error)
      }
    }

    getOriginalUserData()
  }, [userId, errorText.user.getUserData])

  useEffect(() => {
    if (
      checkIfAllObjectsValuesAreEmptyStrings(nonUpdatedUserData) &&
      showForm
    ) {
      setNotification(usersWarningText.shippingDataIsEmpty)
      setTimeout(() => setNotification(null), 3000)
    }
  }, [nonUpdatedUserData, showForm, usersWarningText.shippingDataIsEmpty])

  const updateUserDataAndSetStates = async (e) => {
    updateDataAndSetStates(
      e,
      () => updateDataRequest(userId, updatedUserData, API_USER_CUSTOMER),
      nonUpdatedUserData,
      setNonUpdatedUserData,
      updatedUserData,
      setUpdatedUserData,
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
          textHide={`${buttonsText.actions.user.hide}`}
          textShow={`${buttonsText.actions.user.show}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
          <div>
            {Object.keys(initialUserData).map((key) => (
              <div className={styles.inputContainer} key={key}>
                <EditableInput
                  label={key}
                  name={key}
                  value={updatedUserData[key]}
                  onChange={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      updatedUserData,
                      setUpdatedUserData,
                      setNotification,
                    )
                  }
                  onSave={(e) => updateUserDataAndSetStates(e)}
                  classCss={STYLES.FORMS.FIELD}
                  originalPropertyData={nonUpdatedUserData}
                  updatedPropertyData={updatedUserData}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default UserData
