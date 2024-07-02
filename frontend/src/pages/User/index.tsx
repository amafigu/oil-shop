import { EditableShippingDataForm } from "@/components/ui/EditableShippingDataForm"
import { EditableUserForm } from "@/components/ui/EditableUserForm"
import { ToggleButton } from "@/components/ui/ToggleButton"
import { UserHeader } from "@/components/ui/UserHeader"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/userContext"
import { useGetOrders } from "@/hooks/useGetOrders"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyUserRole } from "@/hooks/useVerifyUserRole"
import { User as ContextUser, ShippingData } from "@/types/User"
import { FC, useEffect, useState } from "react"
import { Order } from "./Order"
import styles from "./user.module.scss"

export const User: FC = () => {
  const [showOrders, setShowOrders] = useState(false)
  const [showShippingData, setShowShippingData] = useState(false)
  const { user, shippingData, isLoggedIn } = useUserContext()
  const { pages } = useTranslation()
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
        {user && <EditableUserForm item={user as ContextUser} />}
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
          <EditableShippingDataForm item={shippingData as ShippingData} />
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
          <ul className={styles.list}>
            {orders.map((item, index) => (
              <li className={styles.item} key={index}>
                <Order item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
