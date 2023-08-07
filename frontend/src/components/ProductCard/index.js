import React from "react"
import { Link } from "react-router-dom"
import { titleCase } from "../../utils/utils"
import useLocaleContext from "../../context/localeContext"
import AddOneProductToCartButton from "./AddOneProductToCartButton"
import styles from "./productCard.module.scss"

const ProductCard = ({ name, image, size, price, description, category }) => {
  const { translate } = useLocaleContext()
  const product = { name, image, size, price, description, category }

  return (
    <div className={styles.productCardWrapper}>
      <Link to={`/products/${name}`}>
        <div className={styles.productCardBody}>
          <img
            className={styles.productCardImage}
            src={process.env.PUBLIC_URL + "/assets/" + image}
            alt={name}
          />
          <div className={styles.productCardName}>{titleCase(name, "_")}</div>
          <div className={styles.productCardSize}>
            {translate.components.products.oil.size}: {size} ml
          </div>
          <div className={styles.productCardPrice}>
            {translate.components.products.oil.price} €{price}
          </div>
          <div className={styles.productCardDescription}>{description}</div>
        </div>
      </Link>
      <AddOneProductToCartButton
        product={product}
        classname={styles.productCardAddToCartButton}
      />
    </div>
  )
}

export default ProductCard
