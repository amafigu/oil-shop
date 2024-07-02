import { CreateProductForm } from "@/components/ui/CreateProductForm"
import { CreateUserForm } from "@/components/ui/CreateUserForm"
import { EditableProductsList } from "@/components/ui/EditableProductsList"
import { EditableUsersList } from "@/components/ui/EditableUsersList"
import { ToggleButton } from "@/components/ui/ToggleButton"
import { UserHeader } from "@/components/ui/UserHeader"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useVerifyUserRole } from "@/hooks/useVerifyUserRole"
import { useEffect, useState } from "react"
import styles from "./admin.module.scss"

export const Admin = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false)
  const [showCreateProductForm, setShowCreateProductForm] = useState(false)
  const [showUsersList, setShowUsersList] = useState(false)
  const [showProductsList, setShowProductsList] = useState(false)
  const { onCreateCustomer, user, isLoggedIn } = useUserContext()
  const { verifyUserRole } = useVerifyUserRole()
  const { pages } = useTranslation()
  const usersText = pages.admin.usersManagement
  const productsText = pages.admin.productManagement

  useEffect(() => {
    verifyUserRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoggedIn])

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <UserHeader />
      </div>
      <section className={styles.container}>
        <h2>{usersText.title}</h2>
        <div className={styles.button}>
          <ToggleButton
            isVisible={showUsersList}
            onToggle={() => setShowUsersList((prevState) => !prevState)}
            hideBtnText={usersText.toggleListButton.hide.toUpperCase()}
            showBtnText={usersText.toggleListButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showUsersList && <EditableUsersList />}
        <div className={styles.button}>
          <ToggleButton
            isVisible={showCreateUserForm}
            onToggle={setShowCreateUserForm}
            hideBtnText={usersText.toggleCreateItemButton.hide.toUpperCase()}
            showBtnText={usersText.toggleCreateItemButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showCreateUserForm && <CreateUserForm onCreate={onCreateCustomer} />}
      </section>
      <section className={styles.container}>
        <h2>{productsText.title}</h2>
        <div className={styles.button}>
          <ToggleButton
            isVisible={showProductsList}
            onToggle={() => setShowProductsList((prevState) => !prevState)}
            hideBtnText={productsText.toggleListButton.hide.toUpperCase()}
            showBtnText={productsText.toggleListButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showProductsList && <EditableProductsList />}
        <div className={styles.button}>
          <ToggleButton
            isVisible={showCreateProductForm}
            onToggle={setShowCreateProductForm}
            hideBtnText={productsText.toggleCreateItemButton.hide.toUpperCase()}
            showBtnText={productsText.toggleCreateItemButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showCreateProductForm && <CreateProductForm />}
      </section>
    </main>
  )
}
