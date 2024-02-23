import { useTranslation } from "#hooks/useTranslation"
import React, { useState } from "react"
import styles from "./editableImageInput.module.scss"

const EditableImageInput = ({
  label,
  name,
  onChange,
  classCss,
  file,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { translate } = useTranslation()
  const textButtons = translate.components.crud.buttons

  const saveAndSetIsEditing = (e) => {
    onSave(e)
    setIsEditing(false)
  }

  return (
    <div className={styles[classCss]}>
      {isEditing ? (
        <div className={styles.nonUpdatedData}>
          <span className={styles.label}></span>

          <input
            className={styles.fileInput}
            type='file'
            name={name}
            id='fileInput'
            onChange={onChange}
          />
        </div>
      ) : (
        <div className={styles.nonUpdatedData}>
          <span className={styles.property}>{label}: </span>
          <span className={styles.value}>
            {file ? file.name : "No file selected"}
          </span>
        </div>
      )}
      {isEditing ? (
        <div
          aria-label={textButtons.save}
          className={styles.formButton}
          onClick={(e) => saveAndSetIsEditing(e)}
        >
          {textButtons.save}
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

export default EditableImageInput
