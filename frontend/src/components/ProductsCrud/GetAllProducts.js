import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import axios from "axios"
import { useEffect, useState } from "react"
import EditableListProductData from "./EditableListProductData"
import styles from "./getAllProducts.module.scss"

const GetAllProducts = ({
  refreshAllProductsCounter,
  setRefreshAllProductsCounter,
}) => {
  const [notification, setNotification] = useState()
  const [showProducts, setShowProducts] = useState(false)
  const [productsData, setProductsData] = useState([])

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/`,
        { withCredentials: true },
      )

      const productObjects = response.data.map((product) => ({
        ...product,
        updated: false,
      }))
      setProductsData(productObjects)
    } catch (error) {
      setNotification("Can not get all products")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [refreshAllProductsCounter])

  const showProductsListAndGetData = (bool) => {
    setShowProducts(bool)
  }

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.showHideButtonsContainer}>
        <ToggleButton
          show={showProducts}
          setToggle={showProductsListAndGetData}
          textHide='HIDE ALL PRODCUTS'
          textShow='GET ALL PRODUCT'
          classCss='showHideButtons'
        />
      </div>
      {
        <div className={showProducts ? `${styles.show}` : `${styles.hide}`}>
          {productsData &&
            productsData.map((product) => (
              <div className={styles.itemRow} key={product.id}>
                <div className={styles.editableInputsContainer}>
                  <div className={styles.atributesContainer}>
                    <EditableListProductData
                      setRefreshAllProductsCounter={
                        setRefreshAllProductsCounter
                      }
                      product={product}
                    />
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
