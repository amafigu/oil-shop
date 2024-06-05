import { CreateProductForm } from "#components/ui/CreateProductForm"
import { CreateUserForm } from "#components/ui/CreateUserForm"
import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import { EditableProductForm } from "#components/ui/EditableProductForm"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { UserHeader } from "#components/ui/UserHeader"
import { editableProductProperties } from "#constants/products"
import { STYLES } from "#constants/styles"
import { editableUserProperties } from "#constants/users"
import { useProductContext } from "#context/productContext"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { useTranslation } from "#hooks/useTranslation"
import { useUsers } from "#hooks/useUsers"
import { filterProductsProps } from "#utils/filterProductsProps"
import { filterUserProps } from "#utils/filterUserProps"
import { useState } from "react"
import styles from "./admin.module.scss"

export const Admin = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false)
  const [showCreateProductForm, setShowCreateProductForm] = useState(false)
  const [showUsersList, setShowUsersList] = useState(false)
  const [showProductsList, setShowProductsList] = useState(false)
  const { notification } = useCheckIsAdmin()
  const { users, deleteUser, addUser, updateUser } = useUsers()
  const { onDeleteProduct, onUpdateProduct, products } = useProductContext()
  const { pages } = useTranslation()
  const usersText = pages.admin.usersManagement
  const productsText = pages.admin.productManagement

  return (
    <main className={styles.wrapper}>
      {notification && <NotificationCard message={notification} />}
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
        {showUsersList && (
          <EditableItemsList
            itemsList={users}
            ItemComponent={EditableItem}
            title={usersText.editableItemsList.title}
            itemProps={{
              onSave: updateUser,
              onDelete: deleteUser,
              renderItemProps: editableUserProperties,
            }}
            filterProps={filterUserProps}
          />
        )}
        <div className={styles.button}>
          <ToggleButton
            isVisible={showCreateUserForm}
            onToggle={setShowCreateUserForm}
            hideBtnText={usersText.toggleCreateItemButton.hide.toUpperCase()}
            showBtnText={usersText.toggleCreateItemButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showCreateUserForm && <CreateUserForm onCreate={addUser} />}
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
        {showProductsList && (
          <EditableItemsList
            itemsList={products}
            ItemComponent={EditableProductForm}
            title={productsText.editableItemsList.title}
            itemProps={{
              onSave: onUpdateProduct,
              onDelete: onDeleteProduct,
              renderItemProps: editableProductProperties,
            }}
            filterProps={filterProductsProps}
          />
        )}
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
