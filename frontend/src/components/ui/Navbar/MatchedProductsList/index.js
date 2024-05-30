import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { navigateToProductAndCloseDropdown } from "#utils/navigateToProductAndCloseDropdown"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
import { useNavigate } from "react-router-dom"
import styles from "./matchedProductsList.module.scss"

export const MatchedProductsList = ({
  matchedProducts,
  setMatchedProducts,
  setShowMatchedProductsList,
  setSearchProductText,
}) => {
  const navigate = useNavigate()
  const { setShowProductsSearchBar } = useMenuOptions()

  return (
    <ul className={styles.list} aria-label={"Searched products list"}>
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
              setShowProductsSearchBar(false),
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigateToProductAndCloseDropdown(
                product.name,
                navigate,
                setMatchedProducts,
                setShowMatchedProductsList,
                setSearchProductText,
                setShowProductsSearchBar(false),
              )
            }
          }}
          tabIndex={0}
        >
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
            />
          </div>
          <div>
            <span className={styles.content}>
              {product.name ? titleCase(product.name, "_") : ""}
            </span>
            <span className={styles.content}>{`${product.size} ml`}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
