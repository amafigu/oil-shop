import { camelToTitleCase } from "#utils/camelToTitleCase"
import { titleCase } from "#utils/titleCase"
import styles from "./categoryOptions.module.scss"

export const CategoryOptions = ({ data, setData, onChange, options }) => {
  return (
    <>
      <label className={styles.label} htmlFor='name'>
        {camelToTitleCase("category")}
      </label>
      <select
        onChange={(e) => onChange(e, data, setData)}
        className={styles.formField}
        name='categoryId'
        value={data.categoryId}
      >
        {options &&
          options.map((option) => (
            <option
              key={option.id}
              className={styles.formField}
              value={option.id}
              name={option.id}
            >
              {titleCase(option.name, " ")}
            </option>
          ))}
      </select>
    </>
  )
}
