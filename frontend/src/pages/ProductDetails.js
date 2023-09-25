import AddProductToCartButton from "#components/AddProductToCartButton"
import ProductQuantity from "#components/ProductQuantity"
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
    window.scrollTo(0, 0)

    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${productName}`,
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

  return (
    <div className={styles.productDetailsPageWrapper}>
      <div className={styles.productDetailsPage}>
        <div className={styles.detailsContainerForMobile}>
          <div className={styles.detailsAndButtonContainer}>
            <div className={styles.imageContainerWrapper}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={productImageUrl(image)}
                  alt={name}
                />
              </div>
            </div>
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
                <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <AddProductToCartButton
                  product={product}
                  classname={styles.addProductToCartButton}
                  addProductsToCart={addProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
