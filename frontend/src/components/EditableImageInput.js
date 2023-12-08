import useLocaleContext from "#context/localeContext"
import { useState } from "react"
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
  const { translate } = useLocaleContext()
  const textButtons = translate.components.crud.buttons

  const saveAndSetIsEditing = (e) => {
    onSave(e)
    setIsEditing(false)
  }

  return (
    <div className={styles[classCss]}>
      {isEditing ? (
        <div className={styles.nonUpdatedData}>
          <div className={styles.labelAndInputContainer}>
            <span className={styles.label}>
              {file ? "Selected file: " : "Select a file "}
            </span>

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
