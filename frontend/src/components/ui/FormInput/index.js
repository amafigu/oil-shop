import { camelToTitleCase } from "#utils/camelToTitleCase"
import React from "react"
import styles from "./formInput.module.scss"

export const FormInput = ({
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
          <label chtmlFor='fileInput'>
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
          <label className={styles.label} htmlFor={name}>
            {camelToTitleCase(label)}
          </label>
          <input
            className={styles[classCss]}
            type={type}
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
