import { AccountSectionHeader } from "@/components/ui/AccountSectionHeader"
import { EditableProductsList } from "@/components/ui/EditableProductsList"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import styles from "./productsManagement.module.scss"

export const ProductsManagement: FC = () => {
  const { components } = useTranslation()
  const text = components.accountSectionHeader.productsManagement

  return (
    <div className={styles.wrapper}>
      <AccountSectionHeader title={text.title} subtitle={text.subtitle} />
      <EditableProductsList />
    </div>
  )
}
