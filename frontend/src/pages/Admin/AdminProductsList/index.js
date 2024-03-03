import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useGetProducts } from "#hooks/useGetProducts"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import { EditableProduct } from "./EditableProduct"
import styles from "./adminProductsList.module.scss"
export const AdminProductsList = () => {
  const [showProducts, setShowProducts] = useState(false)
  const { translate } = useTranslation()
  const text = translate.components.crud.getAllProducts
  const { products } = useGetProducts()
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section
      className={styles.adminProductsList}
      aria-label='Products list section for Admin'
    >
      <ToggleButton
        isVisible={showProducts}
        onToggle={setShowProducts}
        hideBtnText={text.hideButton.toUpperCase()}
        showBtnText={text.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {showProducts && (
        <ul className={styles.show}>
          {products &&
            products.map((product) => (
              <li className={styles.itemRow} key={product.id}>
                <div className={styles.editableInputsContainer}>
                  <div className={styles.atributesContainer}>
                    <EditableProduct product={product} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}
