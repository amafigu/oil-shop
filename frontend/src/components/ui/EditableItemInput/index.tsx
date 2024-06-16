import { ActionButton } from "@/components/ui/ActionButton"
import { STYLES } from "@/constants/styles"
import { useTranslation } from "@/hooks/useTranslation"
import { CommonButtons, CommonProperties } from "@/types/Locale"
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react"
import styles from "./editableItemInput.module.scss"

interface EditableItemInputProps {
  label?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedPropertyData: { [key: string]: any }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSave: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => void
  classCss: string
  type: string
  file?: File | null | undefined
}

export const EditableItemInput: FC<EditableItemInputProps> = ({
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
  const { commonProperties, commonButtons } = useTranslation() as {
    commonButtons: CommonButtons
    commonProperties: CommonProperties
  }

  const saveEdition = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
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
          action={(e) => saveEdition(e as MouseEvent<HTMLButtonElement>)}
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
