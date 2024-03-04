import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_USER_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { initialUserData } from "#constants/users"
import { useCountUsers } from "#hooks/useCountUsers"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { onDeleteUser, onUpdateUser } from "#utils/users"

import { useEffect, useState } from "react"
import { EditableUserInput } from "./EditableUserInput"
import styles from "./editableUser.module.scss"

export const EditableUser = ({ user }) => {
  const userProperties = {
    firstName: user.name,
    lastName: user.description,
    email: user.price,
    image: user.image,
  }
  const [updatedUserData, setUpdatedUserData] = useState({
    ...userProperties,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { setCounter } = useCountUsers()
  const { translate } = useTranslation()
  const deleteButtonText = translate.components.crud.deleteProduct.button

  useEffect(() => {}, [updatedUserData])

  return (
    <article className={styles.editableItem}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={
              updatedUserData.image.image
                ? DEFAULT_USER_IMAGE
                : updatedUserData.image
            }
            alt='product'
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
              key !== "image"
                ? (e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      [e.target.name]: e.target.value,
                    })
                : (e) => setFileToUpload(e, setFile)
            }
            onSave={
              key === "image"
                ? (e) =>
                    onUpdateUser(
                      e,
                      key,
                      user.id,
                      updatedUserData,
                      setUpdatedUserData,
                      setNotification,
                      file,
                    )
                : (e) =>
                    onUpdateUser(
                      e,
                      key,
                      user.id,
                      updatedUserData,
                      setUpdatedUserData,
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
