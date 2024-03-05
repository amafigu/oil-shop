import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_USER_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { useState } from "react"
import { EditableItemInput } from "./EditableItemInput"
import styles from "./editableItem.module.scss"

export const EditableItem = ({
  item,
  renderItemProps,
  itemProps,
  setCounter,
}) => {
  const objectAttribute = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})
  console.log(objectAttribute)
  const [updatedItemData, setUpdatedItemData] = useState({
    ...objectAttribute,
  })
  const [nonUpdatedItemData, setNonUpdatedItemData] = useState({
    ...objectAttribute,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)

  const { translate } = useTranslation()
  const deleteButtonText = translate.components.crud.deleteUser.button

  console.log(updatedItemData)
  return (
    <article className={styles.editableItem}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedItemData.image || DEFAULT_USER_IMAGE}
            alt='user'
          />
        </div>
        <ActionButton
          action={(e) =>
            itemProps.onDelete(e, item.id, setNotification, setCounter)
          }
          text={deleteButtonText}
          className={STYLES.BUTTONS.ACTION}
        />
      </div>
      {
        <form className={""}>
          {Object.keys(renderItemProps).map((key) => (
            <EditableItemInput
              label={key}
              name={key}
              updatedPropertyData={updatedItemData}
              onChange={
                key === "image"
                  ? (e) => setFileToUpload(e, setFile)
                  : (e) =>
                      setUpdatedItemData({
                        ...updatedItemData,
                        [e.target.name]: e.target.value,
                      })
              }
              onSave={
                key === "image"
                  ? (e) =>
                      itemProps.onUpdate(
                        e,
                        key,
                        item.id,
                        updatedItemData,
                        nonUpdatedItemData,
                        setUpdatedItemData,
                        setNonUpdatedItemData,
                        setNotification,
                        file,
                      )
                  : (e) =>
                      itemProps.onUpdate(
                        e,
                        key,
                        item.id,
                        updatedItemData,
                        nonUpdatedItemData,
                        setUpdatedItemData,
                        setNonUpdatedItemData,
                        setNotification,
                      )
              }
              classCss={STYLES.FORMS.FIELD}
              key={key}
              file={file}
            />
          ))}
        </form>
      }
    </article>
  )
}
