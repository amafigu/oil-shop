import { Category, CreateProduct } from "@/types/Product"
import { camelToTitleCase } from "@/utils/camelToTitleCase"
import { titleCase } from "@/utils/titleCase"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import styles from "./categoryOptions.module.scss"

interface CategoryOptionsProps {
  data: CreateProduct
  setData: Dispatch<SetStateAction<CreateProduct>>
  onChange: (
    event: ChangeEvent<HTMLSelectElement>,
    data: CreateProduct,
    setData: Dispatch<SetStateAction<CreateProduct>>,
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
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor='categoryId'>
        {camelToTitleCase("category")}
      </label>
      <select
        onChange={(e) => onChange(e, data, setData)}
        className={styles.input}
        name='categoryId'
        id='categoryId'
        value={data.categoryId}
      >
        {options &&
          options.map((option) => (
            <option
              key={option.id}
              className={styles.input}
              value={option.id}
              id={option.id.toString()}
            >
              {titleCase(option.name, " ")}
            </option>
          ))}
      </select>
    </div>
  )
}
