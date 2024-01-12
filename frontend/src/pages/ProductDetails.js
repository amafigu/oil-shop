import AddProductToCartButton from "#components/AddProductToCartButton"
import NotificationCard from "#components/NotificationCard"
import ProductQuantity from "#components/ProductQuantity"
import useLocaleContext from "#context/localeContext"
import {
  DEFAULT_PRODUCT_IMAGE,
  ROUTES_SHOP,
  ROUTES_SHOP_QUERY_CATEGORY_PREFIX,
  SHORT_MESSAGE_TIMEOUT,
} from "#utils/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { getProductByName } from "#utils/products"
import { titleCase } from "#utils/stringManipulation"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./productDetails.module.scss"

const ProductDetails = () => {
  const { productName } = useParams()
  const [notification, setNotification] = useState(null)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { translate } = useLocaleContext()
  const text = translate.pages.productsDetails
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const getProduct = async () => {
      try {
        const getProductResponse = await getProductByName(productName)
        if (getProductResponse.status === 200) {
          setProduct(getProductResponse.data)
        }
      } catch (error) {
        console.error(error)
        setNotification(text.errorByGettingProduct)
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
    getProduct()
  }, [productName])

  if (!product) {
    {
      setTimeout(() => navigate(ROUTES_SHOP), SHORT_MESSAGE_TIMEOUT)
    }
    return (
      <div>{notification && <NotificationCard message={notification} />}</div>
    )
  }

  return (
    <div className={styles.productDetailsPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.productDetailsPage}>
        {product && (
          <div className={styles.detailsAndButtonContainerWrapper}>
            <div className={styles.detailsAndButtonContainer}>
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
                    <li className={styles.descriptionPoint}>
                      {product.description}
                    </li>
                    <li className={styles.descriptionPoint}>
                      {product.details}
                    </li>
                  </ul>
                </div>
                <div className={styles.rightContainerPriceDetails}>
                  <div className={styles.productSize}>{product.size} ml</div>
                  <div className={styles.productPrice}>${product.price}</div>
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
        )}
      </div>
    </div>
  )
}

export default ProductDetails
