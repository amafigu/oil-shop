import TableRow from "#components/ui/TableRow"
import { DEFAULT_USER_IMAGE } from "#constants/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import styles from "./header.module.scss"

const Header = ({ data }) => {
  const tableData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {data ? (
          <div className={styles.dataContainer}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={data.image}
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
