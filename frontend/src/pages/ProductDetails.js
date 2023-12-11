import AddProductToCartButton from "#components/AddProductToCartButton"
import ProductQuantity from "#components/ProductQuantity"
import useLocaleContext from "#context/localeContext"
import { DEFAULT_PRODUCT_IMAGE } from "#utils/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./productDetails.module.scss"

const ProductDetails = () => {
  const { productName } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

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
        <div className={styles.detailsAndButtonContainerWrapper}>
          <div className={styles.detailsAndButtonContainer}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={image}
                alt={name}
                onError={(e) =>
                  setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                }
              />
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
                  <li className={styles.descriptionPoint}>{description}</li>
                  <li className={styles.descriptionPoint}>{details}</li>
                </ul>
              </div>
              <div className={styles.rightContainerPriceDetails}>
                <div className={styles.productSize}>{size} ml</div>
                <div className={styles.productPrice}>${price}</div>
              </div>
              <div className={styles.selectorAndButtonContainerDesktop}>
                <ProductQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <AddProductToCartButton
                  product={product}
                  classname={styles.addProductToCartButton}
                  quantity={quantity}
                />
              </div>
            </div>
          </div>
          <div className={styles.selectorAndButtonContainerMobile}>
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

export default ProductDetails
