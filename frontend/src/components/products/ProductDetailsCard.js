import {
  DEFAULT_PRODUCT_IMAGE,
  ROUTES_SHOP_QUERY_CATEGORY_PREFIX,
} from "#constants/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { Link } from "react-router-dom"
import AddProductToCartButton from "./AddProductToCartButton"
import ProductQuantity from "./ProductQuantity"
import styles from "./productDetailsCard.module.scss"

export const ProductDetailsCard = ({ product, quantity, setQuantity }) => {
  return (
    <div className={styles.detailsAndButtonContainerWrapper}>
      <div className={styles.detailsAndButtonContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.rightContainerDetails}>
            <div className={styles.productInfoCategory}>
              <Link
                className={styles.productInfoCategoryLink}
                to={`${ROUTES_SHOP_QUERY_CATEGORY_PREFIX}${product.category.name}`}
              >
                {titleCase(product.category.name, "_")}
              </Link>
            </div>
            <div className={styles.productName}>
              {titleCase(product.name, "_")} {product.size}ml
            </div>
            <ul className={styles.descriptionPoints}>
              <li className={styles.descriptionPoint}>{product.description}</li>
              <li className={styles.descriptionPoint}>{product.details}</li>
            </ul>
          </div>
          <div className={styles.rightContainerPriceDetails}>
            <div className={styles.productSize}>{product.size} ml</div>
            <div className={styles.productPrice}>${product.price}</div>
          </div>
          <div className={styles.selectorAndButtonContainerDesktop}>
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <AddProductToCartButton
              product={product}
              classname={styles.addProductToCartButton}
              quantity={quantity}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
