import { ActionButton } from "#components/ui/ActionButton"
import { EditableItemInput } from "#components/ui/EditableItemInput"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useEffect, useState } from "react"
import styles from "./editableUserForm.module.scss"

export const EditableUserForm = ({
  item,
  renderItemProps,
  onSave,
  onDelete,
}) => {
  const [updatedData, setUpdatedData] = useState({})
  const [file, setFile] = useState(null)
  const { components } = useTranslation()

  const itemInitialAttributes = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  useEffect(() => {
    setUpdatedData(itemInitialAttributes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.wrapper} aria-label='Edit user'>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedData.image || ""}
            alt='user'
          />
        </div>
        {onDelete && (
          <ActionButton
            action={(e) => onDelete(e, item.id)}
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete user"}
          />
        )}
      </div>
      <form className={styles.item}>
        {item &&
          itemInitialAttributes &&
          Object.keys(itemInitialAttributes).map((key) => (
            <EditableItemInput
              label={key}
              name={key}
              updatedPropertyData={updatedData}
              onChange={(e) => {
                if (key === "image") {
                  setFileToUpload(e, setFile)
                } else {
                  setUpdatedData((prevState) => ({
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
                        updatedData,
                        setUpdatedData,
                        file,
                      )
                  : (e) =>
                      onSave(
                        e,
                        key,
                        item.id,
                        itemInitialAttributes,
                        updatedData,
                        setUpdatedData,
                      )
              }
              classCss={STYLES.FORMS.FIELD}
              type={"text"}
              file={file}
              key={key}
            />
          ))}
      </form>
    </article>
  )
}
