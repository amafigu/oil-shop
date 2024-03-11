import { CreateItem } from "#components/ui/CreateItem"
import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import {
  createProductProperties,
  editableProductProperties,
} from "#constants/products"
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
import styles from "./admin.module.scss"

export const Admin = () => {
  const { notification } = useCheckIsAdmin()
  const { users } = useGetUsers()
  const { products } = useGetProducts()
  const { setCounter: setUsersCounter } = useCountUsers()
  const { setCounter: setProductsCounter } = useCountProducts()
  const { productCategories: itemCategories } = useGetProductCategories()
  const { components } = useTranslation()
  return (
    <main className={styles.adminPage}>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <UserHeader />
        <EditableItemsList
          itemsList={users}
          ItemComponent={EditableItem}
          title={components.adminUsersList.title}
          itemProps={{
            setCounter: setUsersCounter,
            onSave: onUpdateUser,
            onDelete: onDeleteUser,
            renderItemProps: editableUserProperties,
          }}
        />
        <CreateItem
          onCreate={onCreateUser}
          onChange={listenInputChangeAndSetDataObject}
          setCounter={setUsersCounter}
          renderItemProps={createUserProperties}
        />
        <EditableItemsList
          itemsList={products}
          ItemComponent={EditableItem}
          title={components.adminProductsList.title}
          itemProps={{
            setCounter: setProductsCounter,
            onSave: onUpdateProduct,
            onDelete: onDeleteProduct,
            renderItemProps: editableProductProperties,
          }}
        />
        <CreateItem
          onCreate={onCreateProduct}
          onChange={listenInputChangeAndSetDataObject}
          setCounter={setProductsCounter}
          renderItemProps={createProductProperties}
          itemCategories={itemCategories}
        />
      </section>
    </main>
  )
}
