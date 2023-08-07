import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { titleCase } from "#utils/utils"
import useCartContext from "#context/cartContext"
import styles from "./productDetails.module.scss"
import useLocaleContext from "#context/localeContext"

const ProductDetails = () => {
  const { productName } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addProduct } = useCartContext()
  const { translate } = useLocaleContext()
  const text = translate.pages.productsDetails

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/products/${productName}`,
        )
        setProduct(response.data)
      } catch (error) {
        console.error("Error fetching product: ", error)
      }
    }

    getProduct()
  }, [productName])

  if (!product) {
    return <div>{text.loading}...</div>
  }

  const { name, image, size, price, description, category, details } = product

  const addToCart = () => {
    addProduct(product, quantity)
  }

  const increaseQuantity = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  return (
    <div className={styles.productPageWrapper}>
      <div className={styles.productPage}>
        <div className={styles.leftContainer}>
          <div className={styles.imagesColumn}>
            <div className={styles.imageContainer}>
              <img
                className={styles.imageSmall}
                src={process.env.PUBLIC_URL + "/assets/" + image}
                alt={name}
              />
            </div>
            <div className={styles.imageContainer}>
              <img
                className={styles.imageSmall}
                src={process.env.PUBLIC_URL + "/assets/" + image}
                alt={name}
              />
            </div>
            <div className={styles.imageContainer}>
              <img
                className={styles.imageSmall}
                src={process.env.PUBLIC_URL + "/assets/" + image}
                alt={name}
              />
            </div>
          </div>
          <div className={styles.middleContainer}>
            <div className={styles.imageMiddleContainer}>
              <img
                className={styles.imageMiddle}
                src={process.env.PUBLIC_URL + "/assets/" + image}
                alt={name}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerDetails}>
            <div className={styles.productInfoCategory}>
              <Link
                className={styles.productInfoCategoryLink}
                to={`/shop?category=${category}`}
              >
                {category}
              </Link>
            </div>
            <div className={styles.productName}>
              {titleCase(name, "_")} {size}ml
            </div>

            <ul className={styles.descriptionPoints}>
              <li className={styles.descriptionPoint}>{details}</li>
              <li className={styles.descriptionPoint}>{description}</li>
            </ul>
          </div>
          <div className={styles.rightContainerPriceDetails}>
            <div className={styles.productSize}>{size} ml</div>
            <div className={styles.productPrice}>${price}</div>
          </div>
          <div className={styles.selectorAndButtonContainer}>
            <div className={styles.quantitySelector}>
              <div className={styles.quantityInputContainer}>
                <input
                  type='text'
                  min='1'
                  max='20'
                  value={quantity}
                  readOnly
                  className={styles.quantityInput}
                />
              </div>
              <div className={styles.quantityButtonsContainer}>
                <div>
                  <span
                    onClick={increaseQuantity}
                    className={`material-symbols-outlined ${styles.buttonIcon}`}
                  >
                    expand_less
                  </span>
                </div>
                <div>
                  <span
                    onClick={decreaseQuantity}
                    className={`material-symbols-outlined ${styles.buttonIcon}`}
                  >
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <button
              className={styles.buttonContained}
              onClick={() => addToCart()}
            >
              {text.addToCartButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
