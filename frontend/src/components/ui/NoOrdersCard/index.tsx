import { SHOP } from "@/constants/routes"
import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import styles from "./noOrdersCard.module.scss"

interface NoOrdersCardProps {
  icon: ReactElement
  title: string
  subtitle: string
}
export const NoOrdersCard: FC<NoOrdersCardProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <Link to={SHOP}></Link>
    </article>
  )
}
