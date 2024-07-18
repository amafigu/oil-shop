import { useTranslation } from "@/hooks/useTranslation"
import { User } from "@/types/User"
import { FC } from "react"
import styles from "./accountHeader.module.scss"

interface AccountHeaderProps {
  user: User | null
}
export const AccountHeader: FC<AccountHeaderProps> = ({ user }) => {
  const { components } = useTranslation()
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.greeting}>
          {components.accountHeader.greeting}
        </span>
        <h1 className={styles.name}>{user?.firstName}</h1>
        <span className={styles.sentence}>
          {components.accountHeader.management}
        </span>
      </div>
    </header>
  )
}
