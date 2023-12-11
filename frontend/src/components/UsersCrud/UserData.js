import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { API_USER_CUSTOMER, STYLES } from "#utils/constants"
import {
  getDataAndSetErrorMessage,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { useEffect, useState } from "react"
import styles from "./userData.module.scss"

const UserData = () => {
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
  const { setUser, userId, isLoading } = useUserContext()

  useEffect(() => {
    async function getOriginalUserData() {
      if (!isLoading) {
        try {
          const userData = await getDataAndSetErrorMessage(
            userId,
            API_USER_CUSTOMER,
            setNotification,
          )

          if (!userData) {
            setNotification(`${errorText.user.getUserData}`)
            setTimeout(() => setNotification(null), 2000)
            return
          }

          if (userData.status === 200) {
            setUser(userData.data)
            setNonUpdatedUserData(userData.data)
          }
        } catch (error) {
          setTimeout(() => setNotification(null), 3000)
          console.error(error)
        }
      }
    }

    getOriginalUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, errorText.user.getUserData, isLoading])

  const updateUserDataAndSetStates = async (e, propertyName) => {
    let image = ""
    if (file) {
      image = await uploadToS3(file)
    }

    let updatedUserDataWithImage = { ...updatedUserData, image }
    setUpdatedUserData(updatedUserDataWithImage) // Set the updated user data with the image

    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      userId,
      API_USER_CUSTOMER,
      setNonUpdatedUserData,
      updatedUserDataWithImage,
      setUpdatedUserData,
      setNotification,
    )
    if (!updatedData) {
      return
    }
    setUser(updatedData.data.user)
  }
  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
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
                  onSave={(e) => updateUserDataAndSetStates(e, key)}
                  classCss={STYLES.FORMS.FIELD}
                  originalPropertyData={nonUpdatedUserData}
                  updatedPropertyData={updatedUserData}
                />
              </div>
            ))}
            <div className={styles.inputContainer}>
              <EditableImageInput
                label={"Image"}
                name={"image"}
                onChange={(e) => {
                  setFileToUpload(e)
                }}
                classCss={STYLES.FORMS.ITEM_ROW}
                file={file}
                onSave={(e) => updateUserDataAndSetStates(e, "image")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserData
