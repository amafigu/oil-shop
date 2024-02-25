import EditableImageInput from "#components/ui/EditableImageInput"
import EditableInput from "#components/ui/EditableInput"
import NotificationCard from "#components/ui/NotificationCard"
import { API_PRODUCTS_PRODUCT, STYLES } from "#constants/constants"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { deleteProductById } from "#utils/products"
import { useEffect, useState } from "react"
import styles from "./editableListProductData.module.scss"

const EditableListProductData = ({
  setRefreshAllProductsCounter,
  product,
  refreshAllProductsCounter,
}) => {
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    image: "",
    size: "",
  }

  const [nonUpdatedProductData, setNonUpdatedProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  })

  const [updatedProductData, setUpdatedProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  })

  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useTranslation()

  const textAdminCrud = translate.pages.admin.crud
  const buttonsText = translate.components
  const textDelete = translate.components.crud

  useEffect(() => {}, [refreshAllProductsCounter])

  const updateProductDataAndSetStates = async (e, propertyName) => {
    let image = ""

    if (file) {
      image = await uploadToS3(file)
    }

    let updatedProductDataWithImage = { ...updatedProductData, image }
    setUpdatedProductData(updatedProductDataWithImage)

    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      product.id,
      API_PRODUCTS_PRODUCT,
      setNonUpdatedProductData,
      updatedProductDataWithImage,
      setUpdatedProductData,
      setNotification,
    )
    if (!updatedData) {
      return
    }
    setUpdatedProductData(updatedData.data.product)
    setTimeout(
      () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
      SHORT_MESSAGE_TIMEOUT,
    )
  }

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const deleteProductAndUpdateState = async (id) => {
    try {
      const deleteProductResponse = await deleteProductById(id)
      if (deleteProductResponse) {
        setNotification(textDelete.deleteProduct.success)
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        setTimeout(
          () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
          SHORT_MESSAGE_TIMEOUT,
        )
      }
    } catch (error) {
      setNotification(textDelete.deleteProduct.error)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      console.error("Can not delete product", error)
    }
  }

  return (
    <>
      <div className={styles.editableProductDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <div className={styles.imageAndButtonContainer}>
          {nonUpdatedProductData !== initialProductData && (
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={
                  !nonUpdatedProductData.image
                    ? DEFAULT_PRODUCT_IMAGE
                    : nonUpdatedProductData.image
                }
                alt='product'
              />
            </div>
          )}
          <button
            className={styles.formButton}
            onClick={() =>
              deleteProductAndUpdateState(
                product.id,
                setNotification,
                textAdminCrud.users.deletedByEmail,
                textAdminCrud.users.deleteError,
              )
            }
          >
            {buttonsText.crud.deleteProduct.button}
          </button>
        </div>

        <div className={styles.formContainer}>
          {Object.keys(initialProductData).map((key) =>
            key !== "image" ? (
              <div className={styles.inputContainer} key={key}>
                {updatedProductData[key] !== undefined && (
                  <EditableInput
                    label={key}
                    name={key}
                    value={updatedProductData[key]}
                    onChange={(e) =>
                      listenInputChangeAndSetDataObject(
                        e,
                        updatedProductData,
                        setUpdatedProductData,
                        setNotification,
                      )
                    }
                    onSave={(e) => updateProductDataAndSetStates(e, key)}
                    classCss={STYLES.FORMS.FIELD}
                    originalPropertyData={nonUpdatedProductData}
                    updatedPropertyData={updatedProductData}
                    refreshAllProductsCounter={refreshAllProductsCounter}
                  />
                )}
              </div>
            ) : (
              <div className={styles.inputContainer} key={key}>
                <EditableImageInput
                  label={key}
                  name={key}
                  onChange={(e) => {
                    setFileToUpload(e)
                  }}
                  classCss={STYLES.FORMS.ITEM_ROW}
                  file={file}
                  onSave={(e) => updateProductDataAndSetStates(e, key)}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </>
  )
}

export default EditableListProductData
