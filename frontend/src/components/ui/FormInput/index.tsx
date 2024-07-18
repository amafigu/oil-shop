import { camelToTitleCase } from "@/utils/camelToTitleCase"
import { ChangeEvent, FC } from "react"
import styles from "./formInput.module.scss"

interface FormInputProps {
  name: string
  value: string
  onChangeListener: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label: string
  type?: string
  file?: File
}

export const FormInput: FC<FormInputProps> = ({
  name,
  value,
  onChangeListener,
  label,
  type = "text",
}) => {
  return (
    <>
      {name === "image" ? (
        <div className={styles.inputContainer}>
          <label htmlFor='fileInput'></label>
          <input
            type='file'
            name='image'
            id='fileInput'
            onChange={onChangeListener}
            required
          />
        </div>
      ) : (
        <div className={styles.item}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={`${name}-input`}>
              {camelToTitleCase(label)}
            </label>
            <input
              className={styles.input}
              type={type}
              id={`${name}-input`}
              name={name}
              onChange={onChangeListener}
              value={value}
              required
              autoComplete='true'
            />
          </div>
        </div>
      )}
    </>
  )
}
