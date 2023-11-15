import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./header.module.scss"

const Header = ({ data }) => {
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()
  const text = translate.pages.admin
  const navigate = useNavigate()

  return (
    <div className={styles.headerContainer}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.header}>
        {data ? (
          <div className={styles.dataContainer}>
            <img className={styles.avatar} src={data.image} alt='user' />
            <table className={styles.userDataTable}>
              <thead className={styles.tableHead}>
                <tr className={styles.headRow}>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                <tr className={styles.tableRow}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          `${text.loadingData}`
        )}
      </div>
      {/*
      <button
        className={styles.logoutButton}
        onClick={() =>
          logout(
            navigate,
            setNotification,
            setIsLoggedIn,
            setUserEmail,
            setUser,
          )
        }
      >
        {text.logout}
      </button>*/}
    </div>
  )
}

export default Header
