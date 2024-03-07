import { EditableItem } from "#components/ui/EditableItem"
import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { editableUserShippingDataProperties } from "#constants/shippingData"
import { editableUserProperties } from "#constants/users"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useGetUserShippingData } from "#hooks/useGetUserShippingData"
import { onUpdateUser, onUpdateUserShippingData } from "#utils/users"
import styles from "./user.module.scss"
export const User = () => {
  const { notification, user } = useCheckIsUser()
  const { shippingData } = useGetUserShippingData()

  return (
    <main className={styles.userPage} aria-label='Customer Management Page'>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <UserHeader />

        {user && (
          <EditableItem
            item={user}
            renderItemProps={editableUserProperties}
            onSave={onUpdateUser}
          />
        )}

        {shippingData && shippingData.hasOwnProperty("id") && (
          <EditableItem
            item={shippingData}
            renderItemProps={editableUserShippingDataProperties}
            onSave={onUpdateUserShippingData}
          />
        )}
      </section>
    </main>
  )
}
