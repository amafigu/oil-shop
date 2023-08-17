import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import { productImageUrl, titleCase } from "#utils/utils"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./productDetails.module.scss"

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
          `${process.env.REACT_APP_API_URL}/products/${productName}`,
        )
        setProduct(response.data)
        console.log("getProduct ", response.data)
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
        <div className={styles.imageContainerWrapper}>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={productImageUrl(image)}
              alt={name}
            />
          </div>
        </div>
        <div className={styles.productInfoWrapper}>
          <div className={styles.productInfo}>
            <div className={styles.rightContainerDetails}>
              <div className={styles.productInfoCategory}>
                <Link
                  className={styles.productInfoCategoryLink}
                  to={`/shop?category=${category.name}`}
                >
                  {titleCase(category.name, "_")}
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
                <div className={styles.quantityContainer}>
                  <div>{quantity}</div>
                </div>
                <div className={styles.quantityButtonsContainer}>
                  <span
                    onClick={increaseQuantity}
                    className={`material-symbols-outlined ${styles.buttonIcon}`}
                  >
                    expand_less
                  </span>

                  <span
                    onClick={decreaseQuantity}
                    className={`material-symbols-outlined ${styles.buttonIcon}`}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={() => addToCart()}
              >
                {text.addToCartButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
