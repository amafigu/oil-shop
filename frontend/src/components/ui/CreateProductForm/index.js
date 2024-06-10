import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import { STYLES } from "#constants/styles"
import { useNotificationContext } from "#context/notificationContext"
import { useProductContext } from "#context/productContext"
import { useProductCategory } from "#hooks/useProductCategory"
import { useTranslation } from "#hooks/useTranslation"
import { listenInput } from "#utils/listenInput"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useState } from "react"
import { CategoryOptions } from "../CategoryOptions"
import styles from "./createProductForm.module.scss"

export const CreateProductForm = () => {
  const { setNotification } = useNotificationContext()
  const { onCreateProduct } = useProductContext()
  const { categories } = useProductCategory()
  const { components } = useTranslation()
  const [file, setFile] = useState(null)
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
    details: "",
    size: "",
    image: "",
  })

  return (
    <section aria-label='Create product form'>
      <form className={styles.container}>
        <CategoryOptions
          data={data}
          setData={setData}
          onChange={listenInput}
          setNotification={setNotification}
          options={categories}
          key={"categoryId"}
        />
        {Object.keys(data).map(
          (field) =>
            field !== "categoryId" &&
            field !== "category" && (
              <FormInput
                classCss={STYLES.FORMS.FIELD}
                key={field}
                name={field}
                onChangeListener={
                  field === "image"
                    ? (e) => setFileToUpload(e, setFile)
                    : (e) => listenInput(e, data, setData, setNotification)
                }
                placeholder={field}
                label={field}
                type={field === "image" ? field : undefined}
                value={data[field]}
              />
            ),
        )}
        <div className={styles.button}>
          <ActionButton
            action={async (e) => {
              await onCreateProduct({ e, data, file })
              setData({ ...data })
            }}
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={components.createItem.submitButton}
          />
        </div>
      </form>
    </section>
  )
}
