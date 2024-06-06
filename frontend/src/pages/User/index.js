import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { editableUserShippingDataProperties } from "#constants/shippingData"
import { editableUserProperties } from "#constants/users"
import { useUserContext } from "#context/userContext"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useGetOrders } from "#hooks/useGetOrders"
import { useGetUserShippingData } from "#hooks/useGetUserShippingData"
import { useTranslation } from "#hooks/useTranslation"
import { Order } from "./Order"
import styles from "./user.module.scss"

export const User = () => {
  const { notification } = useCheckIsUser()
  const { user, updateUser, shippingData } = useUserContext()
  const { updateShippingData } = useGetUserShippingData()
  const { components } = useTranslation()
  const { orders, notification: ordersNotification } = useGetOrders()
  return (
    <main className={styles.wrapper} aria-label='Customer Management Page'>
      {notification && <NotificationCard message={notification} />}
      {ordersNotification && <NotificationCard message={ordersNotification} />}
      <section className={styles.container}>
        <UserHeader />
        {user && (
          <EditableItem
            item={user}
            renderItemProps={editableUserProperties}
            onSave={updateUser}
          />
        )}
        {shippingData &&
          Object.prototype.hasOwnProperty.call(shippingData, "id") && (
            <EditableItem
              item={shippingData}
              renderItemProps={editableUserShippingDataProperties}
              onSave={updateShippingData}
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
