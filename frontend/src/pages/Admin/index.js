import NotificationCard from "#components/ui/NotificationCard"
import { UserHeader } from "#components/ui/UserHeader"
import { editableProductProperties } from "#constants/products"
import { createUserProperties, editableUserProperties } from "#constants/users"
import { useCheckIsAdmin } from "#hooks/useCheckIsAdmin"
import { useCountProducts } from "#hooks/useCountProducts"
import { useCountUsers } from "#hooks/useCountUsers"
import { useGetProducts } from "#hooks/useGetProducts"
import { useGetUsers } from "#hooks/useGetUsers"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/dataManipulation"
import { onDeleteProduct, onUpdateProduct } from "#utils/products"
import { onCreateUser, onDeleteUser, onUpdateUser } from "#utils/users"
import { CreateItem } from "./CreateItem"
import { CreateProduct } from "./CreateProduct"
import { EditableItemsList } from "./EditableItemsList"
import { EditableItem } from "./EditableItemsList/EditableItem"
import styles from "./admin.module.scss"

export const Admin = () => {
  const { notification } = useCheckIsAdmin()
  const { users } = useGetUsers()
  const { products } = useGetProducts()
  const { setCounter: setUserCounter } = useCountUsers()
  const { setCounter: setProductCounter } = useCountProducts()
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
            setCounter: setUserCounter,
            onSave: onUpdateUser,
            onDelete: onDeleteUser,
            renderItemProps: editableUserProperties,
          }}
        />
        <CreateItem
          onCreate={onCreateUser}
          onChange={listenInputChangeAndSetDataObject}
          setCounter={setUserCounter}
          renderItemProps={createUserProperties}
        />
        <EditableItemsList
          itemsList={products}
          ItemComponent={EditableItem}
          title={components.adminProductsList.title}
          itemProps={{
            setCounter: setProductCounter,
            onSave: onUpdateProduct,
            onDelete: onDeleteProduct,
            renderItemProps: editableProductProperties,
          }}
        />
        <CreateProduct />
      </section>
    </main>
  )
}
