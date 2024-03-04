import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import UsersCrud from "#components/users/UsersCrud"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { useState } from "react"
import { AdminProductsList } from "./AdminProductsList"
import { CreateProduct } from "./CreateProduct"
import styles from "./admin.module.scss"

export const Admin = () => {
  const [emailInUserError, setEmailInUserError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const { notification } = useCheckIsAdmin()

  return (
    <main className={styles.adminPage}>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <UserHeader />
        <AdminProductsList />
        <CreateProduct />
        <UsersCrud
          setEmailInUserError={setEmailInUserError}
          setFieldErrors={setFieldErrors}
          emailInUserError={emailInUserError}
          fieldErrors={fieldErrors}
        />
      </section>
    </main>
  )
}
