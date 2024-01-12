import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { SHORT_MESSAGE_TIMEOUT, STYLES } from "#utils/constants"
import { getAllProductsList } from "#utils/products"
import { useCallback, useEffect, useState } from "react"
import EditableListProductData from "./EditableListProductData"
import styles from "./getAllProducts.module.scss"
const GetAllProducts = ({
  refreshAllProductsCounter,
  setRefreshAllProductsCounter,
}) => {
  const [notification, setNotification] = useState()
  const [showProducts, setShowProducts] = useState(false)
  const [productsData, setProductsData] = useState([])
  const { translate } = useLocaleContext()
  const text = translate.components.crud.getAllProducts

  const getProductsList = useCallback(async () => {
    try {
      const listResponse = await getAllProductsList()
      if (listResponse) {
        setProductsData(listResponse)
      }
    } catch (error) {
      setNotification(text.error)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }, [text.error, setProductsData, setNotification])

  useEffect(() => {
    getProductsList()
  }, [refreshAllProductsCounter, getProductsList])

  const showProductsListAndGetData = (bool) => {
    setShowProducts(bool)
  }

  console.log(refreshAllProductsCounter)

  return (
    <div className={styles.getAllUsersWrapper}>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.showHideButtonsContainer}>
        <ToggleButton
          show={showProducts}
          setToggle={showProductsListAndGetData}
          textHide={text.hideButton.toUpperCase()}
          textShow={text.showButton.toUpperCase()}
          classCss={STYLES.BUTTONS.SHOW_HIDE}
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
                      refreshAllProductsCounter={refreshAllProductsCounter}
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
