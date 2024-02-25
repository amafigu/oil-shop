import NotificationCard from "#components/ui/NotificationCard"
import ToggleButton from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
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
  const { translate } = useTranslation()
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
