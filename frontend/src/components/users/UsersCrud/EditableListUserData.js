import EditableImageInput from "#components/ui/EditableImageInput"
import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_USERS_USER,
  DEFAULT_USER_IMAGE,
  SHORT_MESSAGE_TIMEOUT,
  STYLES,
} from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  setDefaultImageByError,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { deleteUserByEmail } from "#utils/users"
import React, { useState } from "react"
import styles from "./editableListUserData.module.scss"

const EditableListUserData = ({ setRefreshAllUsersCounter, user }) => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  }

  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
  })

  const [updatedUserData, setUpdatedUserData] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })

  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const { userEmail } = useUserContext()

  const text = translate.components.crud

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
      nonUpdatedUserData.id,
      API_USERS_USER,
      setNonUpdatedUserData,
      updatedUserDataWithImage,
      setUpdatedUserData,
      setNotification,
    )
    if (!updatedData) {
      return
    }
    setUpdatedUserData(updatedData.data.user)
  }
  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const deleteUserAndUpdateState = async (e, email) => {
    e.preventDefault()
    if (email === userEmail) {
      setNotification(text.deleteUser.cannotDeleteYourself)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      return
    }
    try {
      await deleteUserByEmail(email)
      setNotification(`${email} ${text.deleteUser.deletedByEmail}`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(
        () => setRefreshAllUsersCounter((prevCounter) => prevCounter + 1),
        2300,
      )
    } catch (error) {
      setNotification(`${text.deleteUser.error} ${email}`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      console.error("Can not delete user", error)
    }
  }

  return (
    <>
      <div className={styles.editableListUserDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <div className={styles.formContainer}>
          <div className={styles.imageAndInputContainer}>
            {nonUpdatedUserData !== initialUserData && (
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={
                    !nonUpdatedUserData.image
                      ? DEFAULT_USER_IMAGE
                      : nonUpdatedUserData.image
                  }
                  alt='user'
                  onError={(e) => setDefaultImageByError(e, DEFAULT_USER_IMAGE)}
                />
              </div>
            )}

            <button
              className={styles.formButton}
              onClick={(e) => deleteUserAndUpdateState(e, user.email)}
            >
              {text.deleteUser.button}
            </button>
          </div>
          {Object.keys(initialUserData).map((key) =>
            key !== "image" ? (
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
            ) : (
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
            ),
          )}
        </div>
      </div>
    </>
  )
}

export default EditableListUserData
