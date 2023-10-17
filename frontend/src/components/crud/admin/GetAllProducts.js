import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./getAllProducts.module.scss"

const GetAllProducts = ({ refreshAllProductsCounter }) => {
  const [notification, setNotification] = useState()
  const [avaliableProducts, setAvaliableProducts] = useState([])
  const [showProducts, setShowProducts] = useState(false)

  const { translate } = useLocaleContext()
  const text = translate.components.crud

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/`,
        { withCredentials: true },
      )
      setAvaliableProducts(response.data)
    } catch (error) {
      setNotification("Can not get all products")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [refreshAllProductsCounter])

  const hideUserList = () => {
    setShowProducts(false)
  }

  const showProductsListAndGetData = () => {
    getAllProducts()
    setShowProducts(true)
  }

  return (
    <div className={styles.getAllProductsWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.showHideButtonsContainer}>
        {showProducts ? (
          <button
            className={styles.showHideButtons}
            onClick={() => hideUserList()}
          >
            {text.getAllProducts.hideButton}
          </button>
        ) : (
          <button
            className={styles.showHideButtons}
            onClick={() => showProductsListAndGetData()}
          >
            {text.getAllProducts.showButton}
          </button>
        )}
      </div>
      {
        <div
          className={
            showProducts
              ? `${styles.avaliableProductsContainer} ${styles.show}`
              : `${styles.hide}`
          }
        >
          {avaliableProducts &&
            avaliableProducts.map((availableProduct) => (
              <div
                className={styles.availableProductContainer}
                key={`${availableProduct.name}-${availableProduct.productCategoryId}-${availableProduct.size}`}
              >
                <div className={styles.availableProduct}>
                  {" "}
                  <img
                    src={availableProduct.image}
                    alt={availableProduct.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.availableProductData}>
                    <div className={styles.item}>
                      {text.forms.commonProperties.name}:{" "}
                      {availableProduct.name}
                    </div>
                    <div className={styles.item}>
                      {text.forms.commonProperties.category}:{" "}
                      {availableProduct.productCategoryId}
                    </div>
                    <div className={styles.item}>
                      {text.forms.commonProperties.size}:{" "}
                      {availableProduct.size}
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
                    <button
                      className={styles.showHideButtons}
                      onClick={() => hideUserList()}
                    >
                      {text.getAllProducts.hideButton}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </div>
  )
}

export default GetAllProducts
