import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_USER_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { initialUserData } from "#constants/users"
import { useCountUsers } from "#hooks/useCountUsers"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { onDeleteUser, onUpdateUser } from "#utils/users"
import { useState } from "react"
import { EditableUserInput } from "./EditableUserInput"
import styles from "./editableUser.module.scss"

export const EditableUser = ({ user }) => {
  const userProperties = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
  }
  const [updatedUserData, setUpdatedUserData] = useState({
    ...userProperties,
  })
  const [nonUpdatedUserData, setNonUpdatedUserData] = useState({
    ...userProperties,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)

  const { setCounter } = useCountUsers()
  const { translate } = useTranslation()
  const deleteButtonText = translate.components.crud.deleteUser.button

  return (
    <article className={styles.editableItem}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedUserData.image || DEFAULT_USER_IMAGE}
            alt='user'
          />
        </div>
        <ActionButton
          action={(e) => onDeleteUser(e, user.id, setNotification, setCounter)}
          text={deleteButtonText}
          className={STYLES.BUTTONS.ACTION}
        />
      </div>
      <form className={styles.form}>
        {Object.keys(initialUserData).map((key) => (
          <EditableUserInput
            label={key}
            name={key}
            updatedPropertyData={updatedUserData}
            onChange={
              key === "image"
                ? (e) => setFileToUpload(e, setFile)
                : (e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      [e.target.name]: e.target.value,
                    })
            }
            onSave={
              key === "image"
                ? (e) =>
                    onUpdateUser(
                      e,
                      key,
                      user.id,
                      updatedUserData,
                      nonUpdatedUserData,
                      setUpdatedUserData,
                      setNonUpdatedUserData,
                      setNotification,
                      file,
                    )
                : (e) =>
                    onUpdateUser(
                      e,
                      key,
                      user.id,
                      updatedUserData,
                      nonUpdatedUserData,
                      setUpdatedUserData,
                      setNonUpdatedUserData,
                      setNotification,
                    )
            }
            classCss={STYLES.FORMS.FIELD}
            key={key}
            file={file}
          />
        ))}
      </form>
    </article>
  )
}
