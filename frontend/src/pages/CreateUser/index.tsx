import { AccountSectionHeader } from "@/components/ui/AccountSectionHeader"
import { CreateUserForm } from "@/components/ui/CreateUserForm"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import styles from "./createUser.module.scss"

export const CreateUser: FC = () => {
  const { onCreateCustomer } = useUserContext()
  const { components } = useTranslation()
  const text = components.accountSectionHeader.usersCreation
  return (
    <div className={styles.wrapper}>
      <AccountSectionHeader title={text.title} subtitle={text.subtitle} />
      <CreateUserForm onCreate={onCreateCustomer} />
    </div>
  )
}
