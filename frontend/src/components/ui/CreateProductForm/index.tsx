import { FormInput } from "@/components/ui/FormInput"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { STYLES } from "@/constants/styles"
import { useProductContext } from "@/context/productContext"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useTranslation } from "@/hooks/useTranslation"
import { CreateProduct } from "@/types/Product"
import { listenInput } from "@/utils/listenInput"
import { setFileToUpload } from "@/utils/setFileToUpload"
import { FC, FormEvent, useState } from "react"
import { CategoryOptions } from "../CategoryOptions"
import styles from "./createProductForm.module.scss"

export const CreateProductForm: FC = () => {
  const { onCreateProduct } = useProductContext()
  const { categories } = useProductCategory()
  const { components } = useTranslation()
  const [file, setFile] = useState<File | null | undefined>(null)
  const [data, setData] = useState<CreateProduct>({
    name: "",
    categoryId: 0,
    description: "",
    price: 0,
    details: "",
    size: 0,
    image: "",
    brand: "",
  })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    await onCreateProduct({ e, data, file })
    setData({ ...data })
  }

  return (
    <section aria-label='Create product' onSubmit={submit}>
      <form className={styles.container}>
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
                value={data[field as keyof CreateProduct]?.toString() ?? ""}
              />
            ),
        )}
        <div className={styles.button}>
          <SubmitButton
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={components.createItem.submitButton}
          />
        </div>
      </form>
    </section>
  )
}
