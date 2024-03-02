import { AddProductToCartButton } from "#components/products/AddProductToCartButton"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { Link } from "react-router-dom"
import styles from "./productCard.module.scss"

export const ProductCard = ({ product }) => {
  const { translate } = useTranslation()

  return (
    <div className={styles.productCardWrapper}>
      {product ? (
        <div className={styles.productCardBodyWrapper}>
          <Link to={`/products/${product.name}`}>
            <div className={styles.productCardBody}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={product.image}
                  alt={product.name}
                  onError={(e) =>
                    setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                  }
                />
              </div>
              <div className={styles.productCardName}>
                {titleCase(product.name, "_")}
              </div>
              <div className={styles.productCardSize}>
                {translate.components.products.oil.size}: {product.size} ml
              </div>
              <div className={styles.productCardPrice}>
                {translate.components.products.oil.price} €{product.price}
              </div>
            </div>
          </Link>
          <div className={styles.addButtonContainer}>
            <AddProductToCartButton
              product={product}
              classname={styles.addButton}
              quantity={1}
            />
          </div>
        </div>
      ) : (
        <div>Loading Product</div>
      )}
    </div>
  )
}
