import { DEFAULT_USER_IMAGE } from "#constants/media"
import { useUserContext } from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import styles from "./userHeader.module.scss"

export const UserHeader = () => {
  const { user } = useUserContext()
  const { commonProperties } = useTranslation()
  const userData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  }

  return (
    <header className={styles.wrapper} aria-label='User Description'>
      <section className={styles.container}>
        {user ? (
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={user.image}
                alt='user'
                onError={(e) => setDefaultImageByError(e, DEFAULT_USER_IMAGE)}
              />
            </div>
            <dl className={styles.fields}>
              <ul className={styles.list}>
                {userData &&
                  Object.keys(userData).map((property) => (
                    <li key={property} className={styles.item}>
                      <dt
                        className={styles.property}
                      >{`${commonProperties[property]}: `}</dt>
                      <dd className={styles.value}>{userData[property]}</dd>
                    </li>
                  ))}
              </ul>
            </dl>
          </div>
        ) : (
          `loading Data`
        )}
      </section>
    </header>
  )
}
