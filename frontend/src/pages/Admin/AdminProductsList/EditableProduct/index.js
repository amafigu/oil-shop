import { uploadToS3 } from "#api/aws/uploadToS3"
import { deleteProductById } from "#api/products/deleteProductById"
import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { initialProductData } from "#constants/products"
import { STYLES } from "#constants/styles"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
import {
  ignoreUnsavedProperties,
  validateUserAndProductFieldsInDataObject,
} from "#utils/validation"
import { useState } from "react"
import { setFileToUpload } from "../../../../utils/dataManipulation"
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
  const { translate } = useTranslation()
  const deleteButtonText = translate.components.crud.deleteProduct.button

  const onDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await deleteProductById(product.id)
      if (response && response.status === 200) {
        setNotification("product deleted")
        setTimeout(() => {
          setNotification(null)
        }, SHORT_MESSAGE_TIMEOUT)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdate = async (e, key) => {
    e.preventDefault()
    console.log(key)

    try {
      let validProperty
      let image
      if (key === "image") {
        image = await uploadToS3(file)
        console.log(image)

        validProperty = { image: image }
      } else {
        const cleanedUpdatedData = ignoreUnsavedProperties(
          updatedProductData,
          key,
        )

        console.log(cleanedUpdatedData)

        validProperty = validateUserAndProductFieldsInDataObject(
          cleanedUpdatedData,
          setNotification,
        )

        if (!validProperty) {
          return
        }
        console.log(validProperty)
      }

      const dataRequest = await updateProductDataRequest(
        product.id,
        validProperty,
      )
      console.log(dataRequest)
      if (dataRequest && dataRequest.status === 200) {
        const updatedProduct = dataRequest.data.product
        return updatedProduct
      }
    } catch (error) {
      console.error(error)
      if (error.response && error.response.data.message) {
        console.error(error.response.data.message)
        if (setNotification) {
          setNotification(
            `Error by updating data: ${error.response.data.message}`,
          )
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        }
      } else {
        console.error(error)
        if (setNotification) {
          setNotification("Error by updating data")
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        }
      }
    }
  }

  return (
    <article className={styles.editableProduct}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.imageAndButtonContainer}>
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
          action={onDelete}
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
            onSave={(e) => onUpdate(e, key)}
            classCss={STYLES.FORMS.FIELD}
            key={key}
            file={file}
          />
        ))}
      </form>
    </article>
  )
}
