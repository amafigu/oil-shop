import useLocaleContext from "#context/localeContext"
import { saveDataAndToggleInput } from "#utils/dataManipulation"
import { cancelWithScape } from "#utils/render"
import { useState } from "react"
import styles from "./editableInput.module.scss"

const EditableInput = ({
  label,
  name,
  onChange,
  onSave,
  classCss,
  originalPropertyData,
  updatedPropertyData,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { translate } = useLocaleContext()
  const textButtons = translate.components.crud.buttons
  const textProperties = translate.components.crud.forms.commonProperties
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
          onClick={(e) => saveDataAndToggleInput(e, onSave, setIsEditing)}
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
export default EditableInput
