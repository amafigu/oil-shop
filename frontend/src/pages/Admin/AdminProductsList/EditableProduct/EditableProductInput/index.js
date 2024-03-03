import { ActionButton } from "#components/ui/ActionButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { cancelWithScape } from "#utils/render"
import { useState } from "react"
import styles from "./editableProductInput.module.scss"

export const EditableProductInput = ({
  label,
  name,
  updatedPropertyData,
  onChange,
  onSave,
  classCss,
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
        )
      ) : isEditing ? (
        <input
          aria-label={`${label} input`}
          className={styles[classCss]}
          label={label}
          name={name}
          onChange={onChange}
          onKeyDown={(e) => cancelWithScape(e, setIsEditing)}
          placeholder={commonProperties[name]}
          value={updatedPropertyData[name]}
        />
      ) : (
        <div className={styles.data}>
          <span className={styles.property}>{commonProperties[name]}: </span>
          <span className={styles.value}>{`${updatedPropertyData[name]}`}</span>
        </div>
      )}
      {isEditing ? (
        <ActionButton
          action={(e) => saveEdition(e)}
          text={commonButtons.save}
          className={STYLES.BUTTONS.ACTION}
        />
      ) : (
        <ActionButton
          action={() => setIsEditing(true)}
          text={commonButtons.edit}
          className={STYLES.BUTTONS.ACTION}
        />
      )}
    </div>
  )
}
