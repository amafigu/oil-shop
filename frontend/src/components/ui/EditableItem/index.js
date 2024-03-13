import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useState } from "react"
import { EditableItemInput } from "./EditableItemInput"
import styles from "./editableItem.module.scss"

export const EditableItem = ({
  item,
  renderItemProps,
  setCounter,
  onSave,
  onDelete,
}) => {
  const itemInitialAttributes = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  const [updatedItemData, setUpdatedItemData] = useState({
    ...itemInitialAttributes,
  })
  const [nonUpdatedItemData, setNonUpdatedItemData] = useState({
    ...itemInitialAttributes,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { components } = useTranslation()

  return (
    <article className={styles.editableItem} aria-label='editable item'>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {item && item.hasOwnProperty("image") && (
            <img
              className={styles.image}
              src={updatedItemData.image || ""}
              alt='element'
            />
          )}
        </div>
        {onDelete && (
          <ActionButton
            action={(e) => onDelete(e, item.id, setNotification, setCounter)}
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete item"}
          />
        )}
      </div>
      {
        <form className={styles.form}>
          {item &&
            Object.keys(itemInitialAttributes).map((key) => (
              <EditableItemInput
                label={key}
                name={key}
                updatedPropertyData={updatedItemData}
                onChange={(e) => {
                  if (key === "image") {
                    setFileToUpload(e, setFile)
                  } else {
                    setUpdatedItemData((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                }}
                onSave={
                  key === "image"
                    ? (e) =>
                        onSave(
                          e,
                          key,
                          item.id,
                          updatedItemData,
                          nonUpdatedItemData,
                          setUpdatedItemData,
                          setNonUpdatedItemData,
                          setNotification,
                          setCounter,
                          file,
                        )
                    : (e) =>
                        onSave(
                          e,
                          key,
                          item.id,
                          updatedItemData,
                          nonUpdatedItemData,
                          setUpdatedItemData,
                          setNonUpdatedItemData,
                          setNotification,
                          setCounter,
                        )
                }
                classCss={STYLES.FORMS.FIELD}
                type={"text"}
                file={file}
                key={key}
              />
            ))}
        </form>
      }
    </article>
  )
}
