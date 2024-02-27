import TableRow from "#components/ui/TableRow"
import { DEFAULT_USER_IMAGE } from "#constants/media"
import useUserContext from "#context/userContext"
import { setDefaultImageByError } from "#utils/dataManipulation"
import styles from "./header.module.scss"

const Header = () => {
  const { user } = useUserContext()
  const tableData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
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
            <TableRow data={tableData} />
          </div>
        ) : (
          `loading Data`
        )}
      </div>
    </div>
  )
}

export default Header
