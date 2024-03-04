import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useGetProducts } from "#hooks/useGetProducts"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import { EditableProduct } from "./EditableProduct"
import styles from "./adminProductsList.module.scss"
export const AdminProductsList = () => {
  const [showProducts, setShowProducts] = useState(false)
  const { components } = useTranslation()
  const text = components.adminProductsList
  const { products } = useGetProducts()
  useEffect(() => {}, [products])
  return (
    <section
      className={styles.section}
      aria-label='Products list section for admins'
    >
      <h2>{components.adminProductsList.title}</h2>
      <ToggleButton
        isVisible={showProducts}
        onToggle={setShowProducts}
        hideBtnText={text.hideButton.toUpperCase()}
        showBtnText={text.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {showProducts && (
        <ul className={styles.productsList}>
          {products &&
            products.map((product) => (
              <li className={styles.product} key={product.id}>
                <EditableProduct product={product} />
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}
