import EditableImageInput from "#components/ui/EditableImageInput"
import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import {
  API_USERS_CURRENT_USER,
  API_USERS_USER,
  SHORT_MESSAGE_TIMEOUT,
  STYLES,
} from "#constants/constants"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  getDataAndSetErrorMessage,
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import React, { useEffect, useState } from "react"
import styles from "./userData.module.scss"

const UserData = () => {
  const [showForm, setShowForm] = useState(false)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
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
            API_USERS_CURRENT_USER,
            setNotification,
          )
          if (!userData) {
            const errorMessage =
              errorText.user && errorText.user.getUserData
                ? `${errorText.user.getUserData}`
                : "Error getting user data"
            setNotification(errorMessage)
            setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
            return
          }
          if (userData.status === 200) {
            setUser(userData.data)
            setNonUpdatedUserData(userData.data)
          }
        } catch (error) {
          setNotification("Error by getting user data")
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
          console.error(error)
        }
      }
    }

    getOriginalUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isLoading])

  const updateUserDataAndSetStates = async (e, propertyName) => {
    let image = ""
    if (file) {
      image = await uploadToS3(file)
    }

    let updatedUserDataWithImage = { ...updatedUserData, image }
    setUpdatedUserData(updatedUserDataWithImage)

    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      userId,
      API_USERS_USER,
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
      <div className={styles.userDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <h1 className={styles.title}>User Data</h1>

        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${buttonsText?.actions.user.hide}`}
          textShow={`${buttonsText?.actions.user.show}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
          <div>
            {Object.keys(initialUserData).map((key) =>
              key === "image" ? (
                <div className={styles.inputContainer} key={key}>
                  <EditableImageInput
                    label={key}
                    name={key}
                    onChange={(e) => {
                      setFileToUpload(e)
                    }}
                    classCss={STYLES.FORMS.ITEM_ROW}
                    file={file}
                    onSave={(e) => updateUserDataAndSetStates(e, key)}
                  />
                </div>
              ) : (
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
              ),
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default UserData
