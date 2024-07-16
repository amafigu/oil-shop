import { FC } from "react"
import styles from "./accountSectionHeader.module.scss"

interface AccountSectionHeaderProps {
  title: string
  subtitle: string
}
export const AccountSectionHeader: FC<AccountSectionHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </header>
  )
}
