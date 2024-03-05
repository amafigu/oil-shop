import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { initialProductData } from "#constants/products"
import { STYLES } from "#constants/styles"
import useProductContext from "#context/productContext"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { onDeleteProduct, onUpdateProduct } from "#utils/products"
import { useEffect, useState } from "react"
import { EditableProductInput } from "./EditableProductInput"
import styles from "./editableProduct.module.scss"

export const EditableProduct = ({ product }) => {
  const productProperties = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  }
  const [updatedProductData, setUpdatedProductData] = useState({
    ...productProperties,
  })
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { setCounter } = useProductContext()
  const { translate } = useTranslation()
  const deleteButtonText = translate.components.crud.deleteProduct.button

  useEffect(() => {}, [updatedProductData])

  return (
    <article className={styles.editableItem}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={
              updatedProductData.image.image
                ? DEFAULT_PRODUCT_IMAGE
                : updatedProductData.image
            }
            alt='product'
          />
        </div>
        <ActionButton
          action={(e) =>
            onDeleteProduct(e, product.id, setNotification, setCounter)
          }
          text={deleteButtonText}
          className={STYLES.BUTTONS.ACTION}
        />
      </div>
      <form className={styles.form}>
        {Object.keys(initialProductData).map((key) => (
          <EditableProductInput
            label={key}
            name={key}
            updatedPropertyData={updatedProductData}
            onChange={
              key !== "image"
                ? (e) =>
                    setUpdatedProductData({
                      ...updatedProductData,
                      [e.target.name]: e.target.value,
                    })
                : (e) => setFileToUpload(e, setFile)
            }
            onSave={
              key === "image"
                ? (e) =>
                    onUpdateProduct(
                      e,
                      key,
                      product.id,
                      updatedProductData,
                      setUpdatedProductData,
                      setNotification,
                      file,
                    )
                : (e) =>
                    onUpdateProduct(
                      e,
                      key,
                      product.id,
                      updatedProductData,
                      setUpdatedProductData,
                      setNotification,
                    )
            }
            classCss={STYLES.FORMS.FIELD}
            key={key}
            file={file}
          />
        ))}
      </form>
    </article>
  )
}
