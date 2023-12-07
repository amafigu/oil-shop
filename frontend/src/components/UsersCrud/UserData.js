import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { API_USER_CUSTOMER, DEFAULT_USER_IMAGE, STYLES } from "#utils/constants"
import {
  getDataAndSetErrorMessage,
  ignorePropertiesWithEmptyValue,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  updateDataRequest,
  uploadToS3,
} from "#utils/utils"
import { useEffect, useState } from "react"
import styles from "./userData.module.scss"

const UserData = ({ userId }) => {
  const [showForm, setShowForm] = useState(false)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
  }
  const [file, setFile] = useState(null)

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

  const updateUserDataAndSetStates = async (e) => {
    let image = await uploadToS3(file)
    if (!image) {
      console.error("user image not selected. ")
      image = DEFAULT_USER_IMAGE
    }

    const updatedUserDataWithImage = { ...updatedUserData, image }
    setUpdatedUserData(updatedUserDataWithImage) // Set the updated user data with the image

    updateDataAndSetStates(
      e,
      () =>
        updateDataRequest(userId, updatedUserDataWithImage, API_USER_CUSTOMER),
      nonUpdatedUserData,
      setNonUpdatedUserData,
      updatedUserDataWithImage,
      setUpdatedUserData,
      setNotification,
      ignorePropertiesWithEmptyValue,
    )
  }
  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  console.log(Object.keys(initialUserData))

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
            <div className={styles.inputContainer}>
              <EditableImageInput
                label={"image"}
                name={"image"}
                onChange={(e) => {
                  setFileToUpload(e)
                  listenInputChangeAndSetDataObject(
                    e,
                    updatedUserData,
                    setUpdatedUserData,
                    setNotification,
                  )
                }}
                classCss={STYLES.FORMS.FIELD}
                file={file}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserData
