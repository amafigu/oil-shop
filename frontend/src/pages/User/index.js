import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { editableUserShippingDataProperties } from "#constants/shippingData"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useGetUserShippingData } from "#hooks/useGetUserShippingData"
import { EditableItem } from "#pages/Admin/EditableItemsList/EditableItem"
import { onUpdateUserShippingData } from "#utils/users"

import styles from "./user.module.scss"
export const User = () => {
  const { notification, user } = useCheckIsUser()
  const { shippingData } = useGetUserShippingData()
  console.log(shippingData)

  return (
    <main className={styles.userPage} aria-label='Customer Management Page'>
      <div className={styles.userPage}>
        {notification && <NotificationCard message={notification} />}
        <section className={styles.container}>
          <UserHeader />
          {/* <EditableItem
            item={user}
            renderItemProps={editableUserProperties}
            onSave={onUpdateUser}
          />*/}

          {
            <EditableItem
              item={shippingData}
              renderItemProps={editableUserShippingDataProperties}
              onSave={onUpdateUserShippingData}
            />
          }
        </section>
      </div>
    </main>
  )
}
