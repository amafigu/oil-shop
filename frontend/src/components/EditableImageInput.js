import useLocaleContext from "#context/localeContext"
import { useState } from "react"
import styles from "./editableInput.module.scss"

const EditableImageInput = ({ label, name, onChange, classCss, file }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { translate } = useLocaleContext()
  const textButtons = translate.components.crud.buttons

  return (
    <div className={styles.itemRow}>
      {isEditing ? (
        <div className={styles.inputContainer}>
          <div className={styles.labelAndInputContainer}>
            <span className={styles.label}>
              {file ? "Selected file: " : "Select a file"}
            </span>
            <label className={styles.labelForFile} htmlFor='fileInput'>
              {file ? file.name : "Search on device"}
            </label>

            <input type='file' name={name} id='fileInput' onChange={onChange} />
          </div>
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
          onClick={() => setIsEditing(false)}
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
