import { useTranslation } from "@/hooks/useTranslation"
import { CommonButtons, CommonProperties } from "@/types/Locale"
import { ChangeEvent, FC } from "react"
import styles from "./itemFormInput.module.scss"

interface ItemFormInputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedPropertyData: { [key: string]: any }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type: string
}

export const ItemFormInput: FC<ItemFormInputProps> = ({
  name,
  updatedPropertyData,
  onChange,
  type,
}) => {
  const { commonProperties } = useTranslation() as {
    commonButtons: CommonButtons
    commonProperties: CommonProperties
  }

  return (
    <div className={styles.item}>
      <div className={styles.inputContainer}>
        <label htmlFor={name} className={styles.label}>
          {commonProperties[name]}
        </label>
        {type === "file" ? (
          <input
            name={name}
            className={styles.input}
            onChange={onChange}
            type={type}
          />
        ) : (
          <input
            name={name}
            className={styles.input}
            onChange={onChange}
            placeholder={commonProperties[name]}
            value={updatedPropertyData[name] || ""}
            type={type}
          />
        )}
      </div>
    </div>
  )
}
