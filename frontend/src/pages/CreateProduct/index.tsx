import { AccountSectionHeader } from "@/components/ui/AccountSectionHeader"
import { CreateProductForm } from "@/components/ui/CreateProductForm"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import styles from "./createProduct.module.scss"

export const CreateProduct: FC = () => {
  const { components } = useTranslation()
  const text = components.accountSectionHeader.productsCreation

  return (
    <div className={styles.wrapper}>
      <AccountSectionHeader title={text.title} subtitle={text.subtitle} />
      <CreateProductForm />
    </div>
  )
}
