import { ActionButton } from "#components/ui/ActionButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { cancelWithScape } from "#utils/render"
import { useState } from "react"
import styles from "./editableUserInput.module.scss"

export const EditableUserInput = ({
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
          <>
            <label htmlFor={name} className={styles.hideForSemantic}>
              {commonProperties[name]}
            </label>
            <input
              className={styles[classCss]}
              type='file'
              name='image'
              id='fileInput'
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
            onKeyDown={(e) => cancelWithScape(e, setIsEditing)}
            placeholder={commonProperties[name]}
            value={
              name === "size" || name === "price"
                ? Number(updatedPropertyData[name])
                : updatedPropertyData[name]
            }
            type={name === "size" || name === "price" ? "number" : "text"}
          />
        </>
      ) : (
        <div className={styles.data}>
          <span
            className={styles.property}
          >{`${commonProperties[name]}:`}</span>
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
