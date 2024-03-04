import { camelCaseToTitleCase } from "#utils/stringManipulation"
import React from "react"
import styles from "./formInput.module.scss"

export const FormInput = ({
  classCss,
  name,
  value,
  onChangeListener,
  placeholder,
  label,
  type,
}) => {
  return (
    <div className={styles.inputContainer} aria-label={`${name} input`}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles[classCss]}
        type={type}
        name={name}
        onChange={onChangeListener}
        value={value}
        placeholder={camelCaseToTitleCase(placeholder)}
        required
        autoComplete='true'
      />
    </div>
  )
}
