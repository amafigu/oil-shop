import { camelToTitleCase } from "@/utils/camelToTitleCase"
import { ChangeEvent, FC } from "react"
import styles from "./formInput.module.scss"

interface FormInputProps {
  classCss: string
  name: string
  value: string
  onChangeListener: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  label: string
  type?: string
  file?: File
}

export const FormInput: FC<FormInputProps> = ({
  classCss,
  name,
  value,
  onChangeListener,
  placeholder,
  label,
  type = "text",
  file,
}) => {
  return (
    <div aria-label={`${name} input`}>
      {name === "image" ? (
        <>
          <span className={styles.label}>
            {file ? "Selected file: " : "Select a file"}
          </span>
          <label htmlFor='fileInput'>
            {file ? file.name : "Search on device"}
          </label>
          <input
            type='file'
            name='image'
            id='fileInput'
            onChange={onChangeListener}
            required
          />
        </>
      ) : (
        <>
          <label className={styles.label} htmlFor={`${name}-input`}>
            {camelToTitleCase(label)}
          </label>
          <input
            className={styles[classCss]}
            type={type}
            id={`${name}-input`}
            name={name}
            onChange={onChangeListener}
            value={value}
            placeholder={camelToTitleCase(placeholder)}
            required
            autoComplete='true'
          />
        </>
      )}
    </div>
  )
}
