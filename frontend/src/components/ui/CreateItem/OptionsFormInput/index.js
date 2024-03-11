import { camelCaseToTitleCase } from "#utils/camelCaseToTitleCase"
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
    <div className={styles.labelAndInputContainer}>
      <label className={styles.label} htmlFor='name'>
        {property === "productCategoryId"
          ? camelCaseToTitleCase("productCategory")
          : camelCaseToTitleCase(property)}
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
          ? itemCategories
              .filter((itemCategory) => itemCategory.name !== "all")
              .map((itemCategory) => (
                <option
                  key={itemCategory.id}
                  className={styles.formField}
                  value={itemCategory.id}
                  name={itemCategory.id}
                >
                  {titleCase(itemCategory.name, "_")}
                </option>
              ))
          : ""}
      </select>
    </div>
  )
}
