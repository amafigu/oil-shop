import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useEffect, useState } from "react"
import { EditableItemInput } from "./EditableItemInput"
import styles from "./editableItem.module.scss"

export const EditableItem = ({ item, renderItemProps, onSave, onDelete }) => {
  const [updatedItemData, setUpdatedItemData] = useState({})
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { components } = useTranslation()

  const itemInitialAttributes = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  useEffect(() => {
    setUpdatedItemData(itemInitialAttributes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.editableItem} aria-label='editable item'>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {item && Object.prototype.hasOwnProperty.call(item, "image") && (
            <img
              className={styles.image}
              src={updatedItemData.image || ""}
              alt='element'
            />
          )}
        </div>
        {onDelete && (
          <ActionButton
            action={(e) => onDelete(e, item.id, setNotification)}
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete item"}
          />
        )}
      </div>
      {
        <form className={styles.form}>
          {item &&
            itemInitialAttributes &&
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
                          itemInitialAttributes,
                          updatedItemData,
                          setUpdatedItemData,
                          setNotification,
                          file,
                        )
                    : (e) =>
                        onSave(
                          e,
                          key,
                          item.id,
                          itemInitialAttributes,
                          updatedItemData,
                          setUpdatedItemData,
                          setNotification,
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
