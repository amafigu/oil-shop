import { DEFAULT_USER_IMAGE } from "#constants/media"
import useUserContext from "#context/userContext"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { UserHeaderData } from "./UserHeaderData"
import styles from "./userHeader.module.scss"

export const UserHeader = () => {
  const { user } = useUserContext()

  const userData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  }

  return (
    <header className={styles.headerContainer} aria-label='User Description'>
      <section className={styles.header}>
        {user ? (
          <div className={styles.dataContainer}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={user.image}
                alt='user'
                onError={(e) => setDefaultImageByError(e, DEFAULT_USER_IMAGE)}
              />
            </div>
            <UserHeaderData data={userData} />
          </div>
        ) : (
          `loading Data`
        )}
      </section>
    </header>
  )
}
