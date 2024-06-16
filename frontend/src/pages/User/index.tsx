import { EditableItemsList } from "@/components/ui/EditableItemsList"
import { EditableShippingDataForm } from "@/components/ui/EditableShippingDataForm"
import { EditableUserForm } from "@/components/ui/EditableUserForm"
import { ToggleButton } from "@/components/ui/ToggleButton"
import { UserHeader } from "@/components/ui/UserHeader"
import { editableUserShippingDataProperties } from "@/constants/shippingData"
import { STYLES } from "@/constants/styles"
import { editableUserProperties } from "@/constants/users"
import { useUserContext } from "@/context/userContext"
import { useGetOrders } from "@/hooks/useGetOrders"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyUserRole } from "@/hooks/useVerifyUserRole"
import { User as IUser, ShippingData } from "@/types/User"
import { FC, useEffect, useState } from "react"
import { Order } from "./Order"
import styles from "./user.module.scss"

export const User: FC = () => {
  const [showOrders, setShowOrders] = useState(false)
  const [showShippingData, setShowShippingData] = useState(false)
  const { user, onUpdateUser, onUpdateShippingData, shippingData, isLoggedIn } =
    useUserContext()
  const { components, pages } = useTranslation()
  const { orders } = useGetOrders()
  const { verifyUserRole } = useVerifyUserRole()

  useEffect(() => {
    verifyUserRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoggedIn])

  return (
    <main className={styles.wrapper} aria-label='Customer Management Page'>
      <section className={styles.container}>
        <UserHeader />
        {user && (
          <EditableUserForm
            item={user as IUser}
            renderItemProps={editableUserProperties}
            onSave={onUpdateUser}
          />
        )}
        <div className={styles.buttonContainer}>
          <ToggleButton
            isVisible={showShippingData}
            onToggle={setShowShippingData}
            hideBtnText={pages.user.toggleShippingData.hide.toUpperCase()}
            showBtnText={pages.user.toggleShippingData.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showShippingData && shippingData && (
          <EditableShippingDataForm
            item={shippingData as ShippingData}
            renderItemProps={editableUserShippingDataProperties}
            onSave={onUpdateShippingData}
          />
        )}
        <div className={styles.buttonContainer}>
          <ToggleButton
            isVisible={showOrders}
            onToggle={setShowOrders}
            hideBtnText={pages.user.toggleOrders.hide.toUpperCase()}
            showBtnText={pages.user.toggleOrders.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showOrders && orders && (
          <EditableItemsList
            itemsList={orders}
            ItemComponent={Order}
            title={components.ordersList.title}
            filterProps={[]}
          />
        )}
      </section>
    </main>
  )
}
