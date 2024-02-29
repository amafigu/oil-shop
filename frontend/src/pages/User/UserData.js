import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateDataAndSetStates } from "#api/generics/updateDataAndSetStates"
import EditableImageInput from "#components/ui/EditableImageInput"
import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import { API_USERS_USER } from "#constants/api"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { useUserData } from "#hooks/useUserData"
import { listenInputChangeAndSetDataObject } from "#utils/dataManipulation"
import { useState } from "react"
import styles from "./userData.module.scss"

export const UserData = () => {
  const [showForm, setShowForm] = useState(false)
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  }
  const [file, setFile] = useState(null)

  const [updatedUserData, setUpdatedUserData] = useState({
    ...initialUserData,
  })
  const { translate } = useTranslation()
  const buttonsText = translate.components.buttons

  const {
    notification,
    nonUpdatedUserData,
    setNonUpdatedUserData,
    setNotification,
    setUser,
    userId,
  } = useUserData()

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
