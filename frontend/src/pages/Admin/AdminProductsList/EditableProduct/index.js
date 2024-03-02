import { updateProduct } from "#api/products/updateProduct"
import { ActionButton } from "#components/ui/ActionButton"
import EditableImageInput from "#components/ui/EditableImageInput"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { initialProductData } from "#constants/products"
import { STYLES } from "#constants/styles"
import { useCountProducts } from "#hooks/useCountProducts"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/dataManipulation"
import { deleteProductAndUpdateState } from "#utils/products"
import { useEffect, useState } from "react"
import { EditableProductInput } from "./EditableProductInput"
import styles from "./editableProduct.module.scss"
export const EditableProduct = ({ product }) => {
  const { counter, setCounter } = useCountProducts()
  const productProperties = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  }
  const [nonUpdatedProductData, setNonUpdatedProductData] = useState({
    ...productProperties,
  })

  const [updatedProductData, setUpdatedProductData] = useState({
    ...productProperties,
  })

  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useTranslation()
  const deleteActionText =
    translate.components.editableListProductData.deleteButton
  const deleteButtonText = translate.components.crud.deleteProduct.button
  useEffect(() => {}, [counter])

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const updateProductAndRefreshList = async (e, key) => {
    e.preventDefault()
    await updateProduct(
      e,
      product.id,
      key,
      file,
      updatedProductData,
      setUpdatedProductData,
      setNonUpdatedProductData,
      setNotification,
      setCounter,
    )
  }
  return (
    <>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.editableProduct}>
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
          <ActionButton
            text={deleteButtonText}
            action={() =>
              deleteProductAndUpdateState(
                product.id,
                setNotification,
                setCounter,
                deleteActionText,
              )
            }
          />
        </div>

        <div className={styles.formContainer}>
          {Object.keys(initialProductData).map((key) =>
            key !== "image" ? (
              <div className={styles.inputContainer} key={key}>
                {updatedProductData[key] !== undefined && (
                  <EditableProductInput
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
                    onSave={(e) => updateProductAndRefreshList(e, key)}
                    classCss={STYLES.FORMS.FIELD}
                    originalPropertyData={nonUpdatedProductData}
                    updatedPropertyData={updatedProductData}
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
                  onSave={(e) => updateProductAndRefreshList(e, key)}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </>
  )
}
