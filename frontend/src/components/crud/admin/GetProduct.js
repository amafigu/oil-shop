import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { getProductByName } from "#utils/utils"
import { useState } from "react"
import styles from "./getProduct.module.scss"

const GetProduct = () => {
  const [productName, setProductName] = useState("")
  const [productData, setProductData] = useState({})
  const [showProduct, setShowProduct] = useState(false)
  const [notification, setNotification] = useState(null)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const getProductAndShow = () => {
    getProductByName(productName, setProductData, setNotification)
    if (productData != {}) {
      console.log(productData)
      setShowProduct(true)
    }
  }

  return (
    <div className={styles.getProductWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.getProductInputAndButton}>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => getProductAndShow()}
            className={styles.formButton}
          >
            GET PRODUCT
          </button>

          {showProduct ? (
            <button
              onClick={() => setShowProduct(false)}
              className={styles.formButton}
            >
              HIDE PRODUCT
            </button>
          ) : (
            <button
              onClick={() => setShowProduct(true)}
              className={styles.formButton}
            >
              SHOW PRODUCT
            </button>
          )}
        </div>

        <input
          type='text'
          value={productName}
          required
          placeholder='Product Name'
          onChange={(e) => setProductName(e.target.value)}
          className={styles.formField}
        />
      </div>
      <div className={styles.availableProductContainer}>
        {showProduct && (
          <div className={styles.availableProduct}>
            {" "}
            <img
              src={productData.image}
              alt={productData.name}
              className={styles.itemImage}
            />
            <div className={styles.availableProductData}>
              <div className={styles.item}>
                {text.forms.commonProperties.name}: {productData.name}
              </div>
              <div className={styles.item}>
                {text.forms.commonProperties.category}:{" "}
                {productData.productCategoryId}
              </div>
              <div className={styles.item}>
                {text.forms.commonProperties.size}: {productData.size}
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button
                className={styles.showHideButtons}
                onClick={() => console.log("edit product")}
              >
                EDIT
              </button>

              <button
                className={styles.showHideButtons}
                onClick={() => console.log("delete product")}
              >
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GetProduct
