import { AccountSectionHeader } from "@/components/ui/AccountSectionHeader"
import { EditableUsersList } from "@/components/ui/EditableUsersList"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import styles from "./usersManagement.module.scss"

export const UsersManagement: FC = () => {
  const { components } = useTranslation()
  const text = components.accountSectionHeader.usersManagement

  return (
    <div className={styles.wrapper}>
      <AccountSectionHeader title={text.title} subtitle={text.subtitle} />
      <EditableUsersList />
    </div>
  )
}
