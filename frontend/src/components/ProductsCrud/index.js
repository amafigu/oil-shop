import ToggleButton from "#components/ToggleButton"
import styles from "#pages/Admin/admin.module.scss"
import { useState } from "react"
import CreateProductForm from "./CreateProductForm"
import EditableProductData from "./EditableProductData"
import GetAllProducts from "./GetAllProducts"

const ProductsCrud = () => {
  const [showProductsSection, setShowProductsSection] = useState(false)
  const [showCreateProductForm, setShowCreateProductForm] = useState(false)
  const [refreshAllProductsCounter, setRefreshAllProductsCounter] = useState(0)

  return (
    <div className={styles.productsCrudContainer}>
      <ToggleButton
        show={showProductsSection}
        setToggle={setShowProductsSection}
        textHide={"HIDE PRODUCTS ACTIONS"}
        textShow={"SHOW PRODUCTS ACTIONS"}
        classCss='showHideButtons'
      />
      {showProductsSection && (
        <div className={styles.formsContainerWrapper}>
          <div className={styles.formsContainer}>
            <div className={styles.crudContainer}>
              <GetAllProducts
                refreshAllProductsCounter={refreshAllProductsCounter}
                setRefreshAllProductsCounter={setRefreshAllProductsCounter}
              />
            </div>
            <div className={styles.crudContainer}>
              <EditableProductData
                refreshAllProductsCounter={refreshAllProductsCounter}
                setRefreshAllProductsCounter={setRefreshAllProductsCounter}
              />
            </div>

            <div className={styles.crudContainer}>
              <ToggleButton
                show={showCreateProductForm}
                setToggle={setShowCreateProductForm}
                textHide={"HIDE PRODUCT FORM"}
                textShow={"CREATE PRODUCT"}
                classCss='showHideButtons'
              />
              {showCreateProductForm && (
                <CreateProductForm
                  setRefreshAllProductsCounter={setRefreshAllProductsCounter}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsCrud
