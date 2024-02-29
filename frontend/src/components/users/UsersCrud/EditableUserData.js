import { deleteUserByEmail } from "#api/users/deleteUserByEmail"
import { getUserByEmail } from "#api/users/getUserByEmail"
import EditableImageInput from "#components/ui/EditableImageInput"
import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import { API_USERS_USER } from "#constants/api"
import { DEFAULT_USER_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  setDefaultImageByError,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import React, { useState } from "react"
import styles from "./editableUserData.module.scss"

const EditableUserData = ({ setRefreshAllUsersCounter }) => {
  const [showForm, setShowForm] = useState(false)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  }

  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    ...initialUserData,
  })

  const [updatedUserData, setUpdatedUserData] = useState({
    ...initialUserData,
  })

  const [showUserForm, setShowUserForm] = useState(false)
  const [email, setEmail] = useState("")
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useTranslation()
  const { userEmail } = useUserContext()

  const buttonsText = translate.components
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

  const searchUser = async (email) => {
    const user = await getUserByEmail(email.trim())

    if (!user) {
      setNotification("User not found")
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      return
    }
    setNonUpdatedUserData(user)
    setShowUserForm(true)
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
      setNotification(`${text.deleteUser.deletedByEmail}`)
      setNonUpdatedUserData({ ...initialUserData })
      setEmail("")
      setShowUserForm(false)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(
        () => setRefreshAllUsersCounter((prevCounter) => prevCounter + 1),
        SHORT_MESSAGE_TIMEOUT,
      )
    } catch (error) {
      setNotification(`${text.deleteUser.deleteError}`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      console.error("Can not delete user", error)
    }
  }

  return (
    <>
      <div className={styles.editableUserDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${buttonsText?.buttons.actions.userByEmail.hide}`}
          textShow={`${buttonsText?.buttons.actions.userByEmail.show}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
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
                    onError={(e) =>
                      setDefaultImageByError(e, DEFAULT_USER_IMAGE)
                    }
                  />
                </div>
              )}
              <div className={styles.inputAndSearchButtonContainer}>
                <input
                  className={styles[STYLES.FORMS.FIELD_SEARCH_INPUT]}
                  onChange={(e) => setEmail(e.target.value)}
                  type='text'
                ></input>
                <button
                  className={styles.formButton}
                  onClick={() => searchUser(email)}
                >
                  {buttonsText.crud.getUser.getByEmail}
                </button>
              </div>

              <button
                className={styles.formButton}
                onClick={(e) => deleteUserAndUpdateState(e, email)}
              >
                {buttonsText.crud.deleteUser.button}
              </button>
            </div>
            {showUserForm &&
              Object.keys(initialUserData).map((key) =>
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
        )}
      </div>
    </>
  )
}

export default EditableUserData
