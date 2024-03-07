import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { editableUserShippingDataProperties } from "#constants/shippingData"
import { editableUserProperties } from "#constants/users"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useGetOrdersWithProducts } from "#hooks/useGetOrdersWithProducts"
import { useGetUserShippingData } from "#hooks/useGetUserShippingData"
import { useTranslation } from "#hooks/useTranslation"
import { onUpdateUser, onUpdateUserShippingData } from "#utils/users"
import { Order } from "./Order"
import styles from "./user.module.scss"

export const User = () => {
  const { notification, user } = useCheckIsUser()
  const { shippingData } = useGetUserShippingData()
  const { components } = useTranslation()
  const { orders, notification: ordersNotification } =
    useGetOrdersWithProducts()

  return (
    <main className={styles.userPage} aria-label='Customer Management Page'>
      {notification && <NotificationCard message={notification} />}
      {ordersNotification && <NotificationCard message={ordersNotification} />}
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
        {orders && (
          <EditableItemsList
            itemsList={orders}
            ItemComponent={Order}
            title={components.ordersList.title}
          />
        )}
      </section>
    </main>
  )
}
