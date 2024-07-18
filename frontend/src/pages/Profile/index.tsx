import { AccountSectionHeader } from "@/components/ui/AccountSectionHeader"
import { EditDataCard } from "@/components/ui/EditDataCard"
import { Modal } from "@/components/ui/Modal"
import { ShippingDataForm } from "@/components/ui/ShippingDataForm"
import { UserForm } from "@/components/ui/UserForm"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyIsLoggedIn } from "@/hooks/useVerifyIsLoggedIn"
import { ShippingData, User } from "@/types/User"
import { FC, useEffect, useState } from "react"
import styles from "./profile.module.scss"

export const Profile: FC = () => {
  const { verifyIsLoggedIn } = useVerifyIsLoggedIn()
  const { user, isLoading, shippingData } = useUserContext()
  const { components } = useTranslation()
  const [showPersonalData, setShowPersonalData] = useState<boolean>(false)
  const [showShippingData, setShowShippingData] = useState<boolean>(false)
  const text = components.accountSectionHeader.profile
  const personalData = components.editDataCard.personalData
  const addressData = components.editDataCard.addressData

  useEffect(() => {
    if (!isLoading) {
      verifyIsLoggedIn()
    }
  }, [user, isLoading, verifyIsLoggedIn])

  return (
    <main className={styles.wrapper} aria-label='Profile page'>
      <AccountSectionHeader title={text.title} subtitle={text.subtitle} />
      <section className={styles.content}>
        {user && shippingData && (
          <div className={styles.cardContainer}>
            <EditDataCard
              title={personalData.title}
              action={personalData.action}
              setShowForm={setShowPersonalData}
              data={[`${user?.firstName} ${user?.lastName}`, user.email]}
            />
            {user?.role?.name !== "admin" && (
              <EditDataCard
                title={addressData.title}
                action={addressData.action}
                setShowForm={setShowShippingData}
                data={[
                  `${shippingData?.street} ${shippingData?.number}`,
                  `${shippingData?.postalCode} - ${shippingData?.city}, ${shippingData?.country}`,
                ]}
              />
            )}
          </div>
        )}
      </section>
      <div>
        <Modal
          isOpen={showPersonalData}
          onClose={() => setShowPersonalData(false)}
        >
          <UserForm item={user as User} setShowForm={setShowPersonalData} />
        </Modal>
        <Modal
          isOpen={showShippingData}
          onClose={() => setShowShippingData(false)}
        >
          <ShippingDataForm
            item={shippingData as ShippingData}
            setShowForm={setShowShippingData}
          />
        </Modal>
      </div>
    </main>
  )
}
