import { AccountHeader } from "@/components/ui/AccountHeader"
import { OptionCard } from "@/components/ui/OptionCard"
import {
  ACCOUNT_PROFILE,
  PRODUCTS_CREATE,
  PRODUCTS_MANAGEMENT,
  USERS_CREATE,
  USERS_MANAGEMENT,
} from "@/constants/routes"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyUserRole } from "@/hooks/useVerifyUserRole"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect } from "react"
import styles from "./admin.module.scss"

export const Admin: FC = () => {
  const { user, isLoggedIn } = useUserContext()
  const { verifyUserRole } = useVerifyUserRole()
  const { components } = useTranslation()

  useEffect(() => {
    verifyUserRole()
  }, [user, isLoggedIn, verifyUserRole])

  return (
    <main className={styles.wrapper} aria-label='Admin Management Page'>
      <AccountHeader user={user} />
      <section className={styles.container}>
        <div className={styles.optionCards}>
          <OptionCard
            title={components.optionCard.usersManagement}
            route={USERS_MANAGEMENT}
            icon={
              <FontAwesomeIcon
                icon={getIconByName("faUsers")}
                size='4x'
                color='#6e4a9e'
              />
            }
          />
          <OptionCard
            title={components.optionCard.createUser}
            route={USERS_CREATE}
            icon={
              <FontAwesomeIcon
                icon={getIconByName("faUserPlus")}
                size='4x'
                color='#6e4a9e'
              />
            }
          />
          <OptionCard
            title={components.optionCard.productsManagement}
            route={PRODUCTS_MANAGEMENT}
            icon={
              <FontAwesomeIcon
                icon={getIconByName("faCartShopping")}
                size='4x'
                color='#6e4a9e'
              />
            }
          />
          <OptionCard
            title={components.optionCard.createProduct}
            route={PRODUCTS_CREATE}
            icon={
              <FontAwesomeIcon
                icon={getIconByName("faCartPlus")}
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
        </div>
      </section>
    </main>
  )
}
