import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { API_USERS_USER, DEFAULT_USER_IMAGE, STYLES } from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import axios from "axios"
import React, { useState } from "react"
import styles from "./editableListUserData.module.scss"

const EditableListUserData = ({ user }) => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
  }
  const [file, setFile] = useState(null)

  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
  })

  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })

  console.log(user)

  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
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

  const deleteUser = async (userEmail) => {
    console.log(userEmail)
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/user/${userEmail}`,
        {
          withCredentials: true,
        },
      )
      setNotification(`${userEmail} ${text.deleteUser.deletedByEmail}`)
      setTimeout(() => setNotification(null), 2000)
      //  setRefreshAllUsersCounter((prevCounter) => prevCounter + 1)
    } catch (error) {
      setNotification(`${userEmail} ${text.deleteUser.error}`)
      setTimeout(() => setNotification(null), 3000)
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
                />
              </div>
            )}

            <button
              className={styles.formButton}
              onClick={(e) => deleteUser(user.email)}
            >
              Delete User
            </button>
          </div>

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
      </div>
    </>
  )
}

export default EditableListUserData
