import { Category } from "@/types/Product"
import { camelToTitleCase } from "@/utils/camelToTitleCase"
import { titleCase } from "@/utils/titleCase"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import styles from "./categoryOptions.module.scss"

interface CategoryOptionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>
  onChange: (
    event: ChangeEvent<HTMLSelectElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData: Dispatch<SetStateAction<{ [key: string]: any }>>,
  ) => void
  options: Category[]
}

export const CategoryOptions: FC<CategoryOptionsProps> = ({
  data,
  setData,
  onChange,
  options,
}) => {
  return (
    <>
      <label className={styles.label} htmlFor='categoryId'>
        {camelToTitleCase("category")}
      </label>
      <select
        onChange={(e) => onChange(e, data, setData)}
        className={styles.formField}
        name='categoryId'
        id='categoryId'
        value={data.categoryId}
      >
        {options &&
          options.map((option) => (
            <option
              key={option.id}
              className={styles.formField}
              value={option.id}
              id={option.id.toString()}
            >
              {titleCase(option.name, " ")}
            </option>
          ))}
      </select>
    </>
  )
}
