import EditableImageInput from "#components/EditableImageInput"
import EditableAndDeletableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { API_USERS_USER, STYLES } from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { getUserByEmail } from "#utils/users"
import React, { useState } from "react"
import styles from "./editableUserData.module.scss"

const EditableUserData = () => {
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
  const [email, setEmail] = useState("")
  const { translate } = useLocaleContext()
  const buttonsText = translate.components.buttons

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

  const searchUser = async () => {
    console.log(email)
    const user = await getUserByEmail(email)
    console.log("USEWUUSUEDAUSDUQWUDUQWDASD", user)
    if (!user) {
      setNotification("User not found")
      setTimeout(() => setNotification(null), 2000)
      return
    }
    console.log("USERUSERUSER", user)
    setNonUpdatedUserData(user)
  }

  return (
    <>
      <div>
        {notification && <NotificationCard message={notification} />}
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${buttonsText?.actions.user.hide}`}
          textShow={`${buttonsText?.actions.user.show}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
          <div>
            <div className={styles.imageAndInputContainer}>
              {nonUpdatedUserData !== initialUserData && (
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={nonUpdatedUserData.image}
                    alt='user'
                  />
                </div>
              )}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='text'
              ></input>
              <button onClick={() => searchUser()}>Search User</button>
            </div>

            {Object.keys(initialUserData).map((key) => (
              <div className={styles.inputContainer} key={key}>
                <EditableAndDeletableInput
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

export default EditableUserData
