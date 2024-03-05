import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { useGetUsers } from "#hooks/useGetUsers"
import { AdminProductsList } from "./AdminProductsList"
import { AdminUsersList } from "./AdminUsersList"
import { CreateProduct } from "./CreateProduct"
import { CreateUser } from "./CreateUser"
import { EditableItemsList } from "./EditableItemsList"
import { EditableItem } from "./EditableItemsList/EditableItem"
import styles from "./admin.module.scss"

export const Admin = () => {
  const { notification } = useCheckIsAdmin()
  const { users } = useGetUsers()

  return (
    <main className={styles.adminPage}>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <UserHeader />
        <AdminProductsList />
        <CreateProduct />
        <AdminUsersList />
        <CreateUser />
        <EditableItemsList
          itemsList={users}
          ItemComponent={EditableItem}
          title={"USER LIST"}
        />
      </section>
    </main>
  )
}
