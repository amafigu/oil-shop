import { useState } from "react"
import styles from "./editableInputField.module.scss"
// (e) => listenInputChange(e)
// updateUserShippingDataAndSetEditForm(e, setEditCountryForm)

const EditableInput = ({
  label,
  name,
  value,
  onChange,
  onSave,
  classCss,
  originalPropertyData,
  updatedPropertyData,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className={styles.itemRow}>
      {isEditing ? (
        <input
          label={label}
          name={name}
          className={styles[classCss]}
          value={
            updatedPropertyData[name]
              ? updatedPropertyData[name]
              : originalPropertyData[name]
          }
          placeholder={originalPropertyData[name]}
          onChange={onChange}
        />
      ) : (
        <div className={styles.nonUpdatedData}>
          <span className={styles.property}>{name}:</span>
          <span
            className={styles.value}
          >{`${originalPropertyData[name]}`}</span>
        </div>
      )}
      {isEditing ? (
        <div
          className={styles.formButton}
          onMouseDown={onSave}
          onClick={() => setIsEditing(false)}
        >
          Save
        </div>
      ) : (
        <div className={styles.formButton} onClick={() => setIsEditing(true)}>
          Edit
        </div>
      )}
    </div>
  )
}
export default EditableInput
