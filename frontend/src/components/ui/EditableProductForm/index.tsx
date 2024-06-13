import { ActionButton } from "#components/ui/ActionButton"
import { EditableItemInput } from "#components/ui/EditableItemInput"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useEffect, useState } from "react"
import styles from "./editableProductForm.module.scss"

export const EditableProductForm = ({
  item,
  renderItemProps,
  onSave,
  onDelete,
}) => {
  const [updatedData, setUpdatedData] = useState({})
  const [file, setFile] = useState(null)
  const { components } = useTranslation()
  const initialData = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  useEffect(() => {
    setUpdatedData(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.wrapper} aria-label='Edit product'>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedData.image || ""}
            alt='product'
          />
        </div>
        {onDelete && (
          <ActionButton
            action={(e) => onDelete(e, item.id)}
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete product"}
          />
        )}
      </div>
      <form className={styles.item}>
        {item &&
          initialData &&
          Object.keys(initialData).map((key) => (
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
                  ? () =>
                      onSave({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                        file,
                      })
                  : () =>
                      onSave({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                      })
              }
              classCss={STYLES.FORMS.FIELD}
              type='text'
              file={file}
              key={key}
            />
          ))}
      </form>
    </article>
  )
}
