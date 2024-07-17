import { AccountHeader } from "@/components/ui/AccountHeader"
import { OptionCard } from "@/components/ui/OptionCard"
import { ACCOUNT_ORDERS, ACCOUNT_PROFILE } from "@/constants/routes"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyUserRole } from "@/hooks/useVerifyUserRole"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect } from "react"
import styles from "./user.module.scss"

export const User: FC = () => {
  const { user, isLoggedIn } = useUserContext()
  const { verifyUserRole } = useVerifyUserRole()
  const { components } = useTranslation()

  useEffect(() => {
    verifyUserRole()
  }, [user, isLoggedIn, verifyUserRole])

  return (
    <main className={styles.wrapper} aria-label='User Management Page'>
      <AccountHeader user={user} />
      <section className={styles.container}>
        <div className={styles.optionCards}>
          {user?.role?.name === "customer" && (
            <>
              <OptionCard
                title={components.optionCard.orders}
                route={ACCOUNT_ORDERS}
                icon={
                  <FontAwesomeIcon
                    icon={getIconByName("faBagShopping")}
                    size='4x'
                    color='#6e4a9e'
                  />
                }
              />
              <OptionCard
                title={components.optionCard.profile}
                route={ACCOUNT_PROFILE}
                icon={
                  <FontAwesomeIcon
                    icon={getIconByName("faCircleUser")}
                    size='4x'
                    color='#6e4a9e'
                  />
                }
              />
            </>
          )}
        </div>
      </section>
    </main>
  )
}
