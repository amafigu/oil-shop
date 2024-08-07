import { HOME_BANNER } from "@/constants/media"
import { FC } from "react"
import styles from "./banner.module.scss"

export const Banner: FC = () => {
  return (
    <div className={styles.wrapper} aria-label='page banner'>
      <div className={styles.container}>
        <img
          aria-label='banner image'
          src={`${HOME_BANNER}`}
          title='background'
        />
      </div>
    </div>
  )
}
