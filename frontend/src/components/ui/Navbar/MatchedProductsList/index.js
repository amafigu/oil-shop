import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { navigateToProductAndCloseDropdown } from "#utils/products"
import { titleCase } from "#utils/stringManipulation"
import { React } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./matchedProductsList.module.scss"

export const MatchedProductsList = ({
  matchedProducts,
  setMatchedProducts,
  setShowMatchedProductsList,
  setSearchProductText,
}) => {
  const navigate = useNavigate()

  return (
    <ul
      className={styles.matchedProductsList}
      aria-label={"Searched products list"}
    >
      {matchedProducts.map((product) => (
        <li
          className={styles.item}
          aria-label={`Searched item: ${product.name}`}
          key={product.name}
          onClick={() =>
            navigateToProductAndCloseDropdown(
              product.name,
              navigate,
              setMatchedProducts,
              setShowMatchedProductsList,
              setSearchProductText,
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
          <div className={styles.data}>
            <span className={styles.dataItem}>
              {product.name ? titleCase(product.name, "_") : ""}
            </span>
            <span className={styles.dataItem}>{`${product.size} ml`}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
