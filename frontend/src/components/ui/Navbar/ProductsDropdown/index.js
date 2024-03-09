import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { navigateToProductAndCloseDropdown } from "#utils/products"
import { titleCase } from "#utils/stringManipulation"
import { React } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./productsDropdown.module.scss"

const ProductsDropdown = ({
  setProductDropdownVisible,
  setSearchText,
  setMatchedProducts,
  matchedProducts,
}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.productsDropdownWrapper}>
      {matchedProducts.map((product) => (
        <div
          className={styles.dropdownListItem}
          key={product.name}
          onClick={() =>
            navigateToProductAndCloseDropdown(
              product.name,
              navigate,
              setProductDropdownVisible,
              setMatchedProducts,
              setSearchText,
            )
          }
        >
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
            />
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>{titleCase(product.name, "_")}</div>
            <div className={styles.dropdownListItemName}>
              {`${product.size} ml`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsDropdown
