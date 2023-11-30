import TableRow from "#components/TableRow"
import styles from "./header.module.scss"

const Header = ({ data }) => {
  const tableData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role, // TODO: change to role id for name that should come with user from somewhere
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {data ? (
          <div className={styles.dataContainer}>
            <img className={styles.avatar} src={data.image} alt='user' />
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
