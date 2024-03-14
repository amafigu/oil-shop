import { CreateItem } from "#components/ui/CreateItem"
import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { UserHeader } from "#components/ui/UserHeader"
import {
  createProductProperties,
  editableProductProperties,
} from "#constants/products"
import { STYLES } from "#constants/styles"
import { createUserProperties, editableUserProperties } from "#constants/users"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { useCountProducts } from "#hooks/useCountProducts"
import { useCountUsers } from "#hooks/useCountUsers"
import { useGetProductCategories } from "#hooks/useGetProductCategories"
import { useGetProducts } from "#hooks/useGetProducts"
import { useGetUsers } from "#hooks/useGetUsers"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/listenInputChangeAndSetDataObject"
import { onCreateProduct } from "#utils/onCreateProduct"
import { onCreateUser } from "#utils/onCreateUser"
import { onDeleteProduct } from "#utils/onDeleteProduct"
import { onDeleteUser } from "#utils/onDeleteUser"
import { onUpdateProduct } from "#utils/onUpdateProduct"
import { onUpdateUser } from "#utils/onUpdateUser"
import { toggleAndRefresh } from "#utils/toggleAndRefresh"
import { useState } from "react"
import styles from "./admin.module.scss"

export const Admin = () => {
  const [showCreateUserForm, setShowCreateUserForm] = useState(false)
  const [showCreateProductForm, setShowCreateProductForm] = useState(false)
  const [showUsersList, setShowUsersList] = useState(false)
  const [showProductsList, setShowProductsList] = useState(false)
  const { notification } = useCheckIsAdmin()
  const { users } = useGetUsers()
  const { products } = useGetProducts()
  const { setCounter: setUsersCounter } = useCountUsers()
  const { setCounter: setProductsCounter } = useCountProducts()
  const { productCategories } = useGetProductCategories()
  const { pages } = useTranslation()
  const usersText = pages.admin.usersManagement
  const productsText = pages.admin.productManagement

  return (
    <main className={styles.adminPage}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.container}>
        <UserHeader />
      </div>
      <section className={styles.container}>
        <h2>{usersText.title}</h2>
        <div className={styles.toggleButton}>
          <ToggleButton
            isVisible={showUsersList}
            onToggle={() =>
              toggleAndRefresh(setShowUsersList, showUsersList, setUsersCounter)
            }
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
              setCounter: setUsersCounter,
              onSave: onUpdateUser,
              onDelete: onDeleteUser,
              renderItemProps: editableUserProperties,
            }}
          />
        )}
        <div className={styles.toggleButton}>
          <ToggleButton
            isVisible={showCreateUserForm}
            onToggle={setShowCreateUserForm}
            hideBtnText={usersText.toggleCreateItemButton.hide.toUpperCase()}
            showBtnText={usersText.toggleCreateItemButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>

        {showCreateUserForm && (
          <CreateItem
            onCreate={onCreateUser}
            onChange={listenInputChangeAndSetDataObject}
            setCounter={setUsersCounter}
            renderItemProps={createUserProperties}
          />
        )}
      </section>
      <section className={styles.container}>
        <h2>{productsText.title}</h2>
        <div className={styles.toggleButton}>
          <ToggleButton
            isVisible={showProductsList}
            onToggle={() =>
              toggleAndRefresh(
                setShowProductsList,
                showProductsList,
                setProductsCounter,
              )
            }
            hideBtnText={productsText.toggleListButton.hide.toUpperCase()}
            showBtnText={productsText.toggleListButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showProductsList && (
          <EditableItemsList
            itemsList={products}
            ItemComponent={EditableItem}
            title={productsText.editableItemsList.title}
            itemProps={{
              setCounter: setProductsCounter,
              onSave: onUpdateProduct,
              onDelete: onDeleteProduct,
              renderItemProps: editableProductProperties,
            }}
          />
        )}
        <div className={styles.toggleButton}>
          <ToggleButton
            isVisible={showCreateProductForm}
            onToggle={setShowCreateProductForm}
            hideBtnText={productsText.toggleCreateItemButton.hide.toUpperCase()}
            showBtnText={productsText.toggleCreateItemButton.show.toUpperCase()}
            classCss={STYLES.BUTTONS.SHOW_HIDE}
          />
        </div>
        {showCreateProductForm && (
          <CreateItem
            onCreate={onCreateProduct}
            onChange={listenInputChangeAndSetDataObject}
            setCounter={setProductsCounter}
            renderItemProps={createProductProperties}
            itemCategories={productCategories}
          />
        )}
      </section>
    </main>
  )
}
