import { ActionButton } from "#components/ui/ActionButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { useState } from "react"
import styles from "./editableItemInput.module.scss"

export const EditableItemInput = ({
  label,
  name,
  updatedPropertyData,
  onChange,
  onSave,
  classCss,
  type,
  file,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { commonProperties, commonButtons } = useTranslation()

  const saveEdition = (e) => {
    onSave(e)
    setIsEditing(false)
  }

  return (
    <div className={styles.item}>
      {name === "image" ? (
        isEditing ? (
          <>
            <label htmlFor={"imageInput"} className={styles.hideForSemantic}>
              {commonProperties[name]}
            </label>
            <input
              className={styles[classCss]}
              type='file'
              name='image'
              id='imageInput'
              onChange={onChange}
            />
          </>
        ) : (
          <div className={styles.data}>
            <span className={styles.property}>
              {`${commonProperties[name]}:`}{" "}
            </span>
            <span className={styles.value}>
              {file ? file.name : "No file selected"}
            </span>
          </div>
        )
      ) : isEditing ? (
        <>
          <label htmlFor={name} className={styles.hideForSemantic}>
            {commonProperties[name]}
          </label>
          <input
            aria-label={`${label} input`}
            className={styles[classCss]}
            label={label}
            name={name}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsEditing(false)
              }
              if (e.key === "Enter") {
                saveEdition(e)
              }
            }}
            placeholder={commonProperties[name]}
            value={updatedPropertyData[name]}
            type={type}
          />
        </>
      ) : (
        <div className={styles.data}>
          <span
            className={styles.property}
          >{`${commonProperties[name]}:`}</span>
          <span className={styles.value}>
            {name === "price"
              ? Number(updatedPropertyData[name]).toFixed(2)
              : updatedPropertyData[name]}
          </span>
        </div>
      )}
      {isEditing ? (
        <ActionButton
          action={(e) => saveEdition(e)}
          text={commonButtons.save}
          className={STYLES.BUTTONS.ACTION}
          ariaLabel={"save edition"}
        />
      ) : (
        <ActionButton
          action={() => setIsEditing(true)}
          text={commonButtons.edit}
          className={STYLES.BUTTONS.ACTION}
          ariaLabel={"edit item"}
        />
      )}
    </div>
  )
}
