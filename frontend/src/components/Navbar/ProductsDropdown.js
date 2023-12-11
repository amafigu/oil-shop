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
    <>
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
          <div className={styles.dropdownListItemImage}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.listItemImage}
            />
          </div>

          <div className={styles.dropdownListItemName}>
            {titleCase(product.name, "_")}
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductsDropdown
