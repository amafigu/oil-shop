import ToggleButton from "#components/ToggleButton"
import styles from "#pages/Admin/admin.module.scss"
import { useState } from "react"
import CreateProductForm from "./CreateProductForm"
import DeleteProduct from "./DeleteProduct"
import GetAllProducts from "./GetAllProducts"
import GetProduct from "./GetProduct"
import UpdateProductForm from "./UpdateProductForm"
const ProductsCrud = ({
  refreshAllProductsCounter,
  setRefreshAllProductsCounter,
}) => {
  const [showProductsSection, setShowProductsSection] = useState(false)

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
            PRODUCTS OPERATIONS SECTION
            <div className={styles.crudContainer}>
              GET PRODUCT
              <GetProduct />
            </div>
            <div className={styles.crudContainer}>
              GET ALL PRODUCTS
              <GetAllProducts
                refreshAllProductsCounter={refreshAllProductsCounter}
              />
            </div>
            <div className={styles.crudContainer}>
              CREATE PRODUCT
              <CreateProductForm />
            </div>
            <div className={styles.crudContainer}>
              UPDATE PRODUCT
              <UpdateProductForm />
            </div>
            <div className={styles.crudContainer}>
              DELETE PRODUCT
              <DeleteProduct
                setRefreshAllProductsCounter={setRefreshAllProductsCounter}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsCrud
