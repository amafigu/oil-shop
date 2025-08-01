import { FormInput } from "@/components/ui/FormInput"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { STYLES } from "@/constants/styles"
import { useProductContext } from "@/context/useProductContext"
import { useTranslation } from "@/hooks/useTranslation"
import { CreateProduct } from "@/types/Product"
import { listenInput } from "@/utils/listenInput"
import { setFileToUpload } from "@/utils/setFileToUpload"
import { FormEvent, useState } from "react"
import { CategoryOptions } from "../CategoryOptions"
import styles from "./createProductForm.module.scss"
import { defaultProductData } from "@/constants/products"

export function CreateProductForm() {
  const { onCreateProduct, categories } = useProductContext()
  const { components } = useTranslation()
  const [file, setFile] = useState<File | null | undefined>(null)
  const [data, setData] = useState<CreateProduct>(defaultProductData)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    await onCreateProduct({ e, data, file })
    setData({ ...data })
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={submit}>
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
            className={STYLES.BUTTONS.SAVE}
          />
        </div>
      </form>
    </section>
  )
}
