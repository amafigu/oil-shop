import FormInput from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { emptyCreateProductObj } from "#constants/products"
import { STYLES } from "#constants/styles"
import { useCountProducts } from "#hooks/useCountProducts"
import { useGetProductCategories } from "#hooks/useGetProductCategories"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  setFileToUpload,
} from "#utils/dataManipulation"
import { onCreateProduct } from "#utils/products"
import { titleCase } from "#utils/stringManipulation"
import { useState } from "react"
import styles from "./createProductForm.module.scss"

export const CreateProduct = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState(null)
  const [file, setFile] = useState(null)

  const [productData, setProductData] = useState({
    ...emptyCreateProductObj,
  })

  const { translate, components } = useTranslation()
  const { setCounter } = useCountProducts()
  const text = translate.components.crud
  const t = components.createProductForm

  const { productCategories } = useGetProductCategories()

  return (
    <section aria-label='create product form'>
      {notification && <NotificationCard message={notification} />}
      <ToggleButton
        isVisible={isVisible}
        onToggle={setIsVisible}
        hideBtnText={t.hideButton.toUpperCase()}
        showBtnText={t.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {isVisible && (
        <form
          className={styles.form}
          onSubmit={(e) => {
            onCreateProduct(e, productData, setNotification, file, setCounter)
          }}
        >
          {Object.keys(productData).map((field) =>
            field !== "image" && field !== "productCategoryId" ? (
              <FormInput
                classCss={STYLES.FORMS.FIELD}
                key={field}
                name={field}
                onChangeListener={(e) =>
                  listenInputChangeAndSetDataObject(
                    e,
                    productData,
                    setProductData,
                    setNotification,
                  )
                }
                placeholder={field}
                label={field}
                type={field === "price" || field === "size" ? "number" : "text"}
                value={productData[field]}
              />
            ) : field === "productCategoryId" ? (
              <div className={styles.labelAndInputContainer} key={field}>
                <label className={styles.label} htmlFor='name'>
                  {text.forms.commonProperties.category}
                </label>
                <select
                  onChange={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      productData,
                      setProductData,
                      setNotification,
                    )
                  }
                  className={styles.formField}
                  name='productCategoryId'
                  value={productData.productCategoryId}
                >
                  <option value='' disabled>
                    Select a category
                  </option>
                  {productCategories
                    ? productCategories
                        .filter((category) => category.name !== "all")
                        .map((productCategory) => (
                          <option
                            key={productCategory.id}
                            className={styles.formField}
                            value={productCategory.id}
                            name={productCategory.id}
                          >
                            {titleCase(productCategory.name, "_")}
                          </option>
                        ))
                    : ""}
                </select>
              </div>
            ) : (
              <div className={styles.labelAndInputContainer} key={field}>
                <span className={styles.label}>
                  {file ? "Selected file: " : "Select a file"}
                </span>
                <label className={styles.labelForFile} htmlFor='fileInput'>
                  {file ? file.name : "Search on device"}
                </label>

                <input
                  key={field}
                  type='file'
                  name='image'
                  id='fileInput'
                  onChange={(e) => setFileToUpload(e, setFile)}
                  required
                />
              </div>
            ),
          )}
          <button className={styles.formButton} type='submit'>
            {text.forms.createProductForm.submitButton}
          </button>
        </form>
      )}
    </section>
  )
}
