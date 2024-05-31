import { camelToTitleCase } from "#utils/camelToTitleCase"
import { titleCase } from "#utils/titleCase"
import styles from "./optionsFormInput.module.scss"

export const OptionsFormInput = ({
  itemData,
  setItemData,
  onChange,
  setNotification,
  itemCategories,
  property,
}) => {
  return (
    <>
      <label className={styles.label} htmlFor='name'>
        {property === "category"
          ? camelToTitleCase("productCategory")
          : camelToTitleCase(property)}
      </label>
      <select
        onChange={(e) => onChange(e, itemData, setItemData, setNotification)}
        className={styles.formField}
        name={property}
        value={itemData[property]}
      >
        <option value='' disabled>
          Select a category
        </option>
        {itemCategories
          ? itemCategories.map((itemCategory) => (
              <option
                key={itemCategory.id}
                className={styles.formField}
                value={itemCategory.id}
                name={itemCategory.id}
              >
                {titleCase(itemCategory.name, " ")}
              </option>
            ))
          : ""}
      </select>
    </>
  )
}
