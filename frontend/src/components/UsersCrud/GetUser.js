import NotificationCard from "#components/NotificationCard"
import { getUserByEmail } from "#utils/utils"
import { useState } from "react"
import styles from "./getUser.module.scss"

const GetUser = () => {
  const [userEmail, setUserEmail] = useState("")
  const [userDataByEmail, setUserDataByEmail] = useState({})
  const [notification, setNotification] = useState(null)
  const [showUser, setShowUser] = useState(false)

  const getUserAndShow = () => {
    getUserByEmail(userEmail.trim(), setUserDataByEmail, setNotification)
    setShowUser(true)
  }

  return (
    <div className={styles.getUserWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.getUserInputAndButton}>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => getUserAndShow()}
            className={styles.formButton}
          >
            GET USER
          </button>

          {showUser ? (
            <button
              onClick={() => setShowUser(false)}
              className={styles.formButton}
            >
              HIDE USER
            </button>
          ) : (
            <button
              onClick={() => setShowUser(true)}
              className={styles.formButton}
            >
              SHOW USER
            </button>
          )}
        </div>
        <input
          type='text'
          value={userEmail}
          required
          placeholder='User Email'
          onChange={(e) => setUserEmail(e.target.value)}
          className={styles.formField}
        />
      </div>

      <div className={styles.availableUserContainer}>
        {showUser && (
          <div className={styles.availableUser}>
            {" "}
            <img
              src={userDataByEmail.image}
              alt={userDataByEmail.firstName}
              className={styles.itemImage}
            />
            <div className={styles.availableUserData}>
              <div className={styles.item}>
                {userDataByEmail ? userDataByEmail.firstName : "no data"}
              </div>
              <div className={styles.item}>
                {userDataByEmail ? userDataByEmail.lastName : "no data"}
              </div>
              <div className={styles.item}>
                {userDataByEmail ? userDataByEmail.roleId : "no data"}
              </div>
              <div className={styles.item}>
                {userDataByEmail ? userDataByEmail.createdAt : "no data"}
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button
                className={styles.showHideButtons}
                onClick={() => console.log("edit product")}
              >
                EDIT
              </button>

              <button
                className={styles.showHideButtons}
                onClick={() => console.log("delete product")}
              >
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GetUser
