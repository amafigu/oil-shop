import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { AdminProductsList } from "./AdminProductsList"
import { AdminUsersList } from "./AdminUsersList"
import { CreateProduct } from "./CreateProduct"
import { CreateUser } from "./CreateUser"
import styles from "./admin.module.scss"

export const Admin = () => {
  const { notification } = useCheckIsAdmin()

  return (
    <main className={styles.adminPage}>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <UserHeader />
        <AdminProductsList />
        <CreateProduct />
        <AdminUsersList />
        <CreateUser />
      </section>
    </main>
  )
}
