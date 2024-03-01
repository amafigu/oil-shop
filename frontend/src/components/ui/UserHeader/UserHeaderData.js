import { useTranslation } from "#hooks/useTranslation"
import styles from "./userHeaderData.module.scss"

export const UserHeaderData = ({ data }) => {
  const { commonProperties } = useTranslation()
  return (
    <dl className={styles.userHeaderData}>
      <ul className={styles.itemsList}>
        {Object.keys(data).map((property) => (
          <li key={property} className={styles.item}>
            <dt className={styles.term}>{`${commonProperties[property]}: `}</dt>
            <dd className={styles.description}>{data[property]}</dd>
          </li>
        ))}
      </ul>
    </dl>
  )
}
