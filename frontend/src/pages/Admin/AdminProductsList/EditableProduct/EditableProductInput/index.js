import { useCountProducts } from "#hooks/useCountProducts"
import { useTranslation } from "#hooks/useTranslation"
import { saveProductDataAndToggleInput } from "#utils/products"
import { cancelWithScape } from "#utils/render"
import { useEffect, useState } from "react"
import styles from "./editableProductInput.module.scss"

export const EditableProductInput = ({
  label,
  name,
  onChange,
  onSave,
  classCss,
  originalPropertyData,
  updatedPropertyData,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { translate } = useTranslation()
  const textButtons = translate.components.crud.buttons
  const textProperties = translate.components.crud.forms.commonProperties
  const { counter } = useCountProducts()
  useEffect(() => {}, [counter])

  return (
    <div className={styles.itemRow}>
      {isEditing ? (
        <input
          aria-label={`${label} input`}
          className={styles[classCss]}
          label={label}
          name={name}
          onChange={onChange}
          onKeyDown={(e) => cancelWithScape(e, setIsEditing)}
          placeholder={textProperties[name]}
          value={
            updatedPropertyData[name] || updatedPropertyData[name] === ""
              ? updatedPropertyData[name]
              : originalPropertyData[name]
          }
        />
      ) : (
        <div className={styles.nonUpdatedData}>
          <span className={styles.property}>{textProperties[name]}: </span>
          <span
            className={styles.value}
          >{`${originalPropertyData[name]}`}</span>
        </div>
      )}
      {isEditing ? (
        <div
          aria-label={textButtons.save}
          className={styles.formButton}
          onClick={(e) =>
            saveProductDataAndToggleInput(e, onSave, setIsEditing)
          }
        >
          {textButtons ? textButtons.save : "Save"}
        </div>
      ) : (
        <div
          aria-label={textButtons.edit}
          className={styles.formButton}
          onClick={() => setIsEditing(true)}
        >
          {textButtons.edit}
        </div>
      )}
    </div>
  )
}
