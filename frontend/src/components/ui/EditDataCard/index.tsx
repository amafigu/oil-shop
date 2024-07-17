import { Dispatch, FC, SetStateAction } from "react"
import styles from "./editDataCard.module.scss"

interface EditDataCardProps {
  title: string
  data: string[]
  setShowForm: Dispatch<SetStateAction<boolean>>
  action: string
}

export const EditDataCard: FC<EditDataCardProps> = ({
  title,
  data,
  setShowForm,
  action,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.data}>
        {data.map((item) => (
          <div className={styles.dataItem} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => setShowForm(true)}>
          {action}
        </button>
      </div>
    </div>
  )
}
