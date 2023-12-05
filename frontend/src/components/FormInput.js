import styles from "./formInput.module.scss"

const FormInput = ({
  classCss,
  name,
  value,
  onChangeListener,
  placeholder,
  label,
  type,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles[classCss]}
        type={type}
        name={name}
        onChange={onChangeListener}
        value={value}
        placeholder={placeholder}
        id={name}
        required
      />
    </div>
  )
}

export default FormInput
