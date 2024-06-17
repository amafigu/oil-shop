import { ActionButton } from "@/components/ui/ActionButton"
import { FormInput } from "@/components/ui/FormInput"
import { STYLES } from "@/constants/styles"
import { useProductContext } from "@/context/productContext"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useTranslation } from "@/hooks/useTranslation"
import { listenInput } from "@/utils/listenInput"
import { setFileToUpload } from "@/utils/setFileToUpload"
import { FC, FormEvent, useState } from "react"
import { CategoryOptions } from "../CategoryOptions"
import styles from "./createProductForm.module.scss"

interface ProductData {
  name: string
  categoryId: number
  description: string
  price: number
  details: string
  size: number
  image: string
  [key: string]: string | number
}

export const CreateProductForm: FC = () => {
  const { onCreateProduct } = useProductContext()
  const { categories } = useProductCategory()
  const { components } = useTranslation()
  const [file, setFile] = useState<File | null | undefined>(null)
  const [data, setData] = useState<ProductData>({
    name: "",
    categoryId: 0,
    description: "",
    price: 0,
    details: "",
    size: 0,
    image: "",
  })

  const handleCreateProduct = async (e: FormEvent) => {
    await onCreateProduct({ e, data, file })
    setData({ ...data })
  }

  return (
    <section aria-label='Create product form'>
      <form className={styles.container} id='create-product'>
        <CategoryOptions
          data={data}
          setData={setData}
          onChange={listenInput}
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
                    : (e) => listenInput(e, data, setData)
                }
                placeholder={field}
                label={field}
                type={field === "image" ? field : undefined}
                value={data[field]?.toString() ?? ""}
              />
            ),
        )}
        <div className={styles.button}>
          <ActionButton
            action={handleCreateProduct}
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={components.createItem.submitButton}
          />
        </div>
      </form>
    </section>
  )
}
