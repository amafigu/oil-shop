import { useTranslation } from "#hooks/useTranslation"
import React, { useState } from "react"
import { ActionButton } from "./ActionButton"
import styles from "./editableImageInput.module.scss"

const EditableImageInput = ({ onChange, classCss, file, onSave }) => {
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
          <label htmlFor='image' className={styles.label}>
            image
          </label>
          <input
            className={styles.fileInput}
            type='file'
            name='image'
            id='fileInput'
            onChange={onChange}
          />
        </div>
      ) : (
        <div className={styles.nonUpdatedData}>
          <span className={styles.property}>image: </span>
          <span className={styles.value}>
            {file ? file.name : "No file selected"}
          </span>
        </div>
      )}
      {isEditing ? (
        <ActionButton
          text={textButtons.save}
          action={(e) => saveAndSetIsEditing(e)}
          className={styles.formButton}
        />
      ) : (
        <ActionButton
          text={textButtons.edit}
          action={() => setIsEditing(true)}
          className={styles.formButton}
        />
      )}
    </div>
  )
}

export default EditableImageInput
