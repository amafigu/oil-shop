import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useGetUsers } from "#hooks/useGetUsers"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect, useState } from "react"
import { EditableUser } from "./EditableUser"
import styles from "./adminUsersList.module.scss"

export const AdminUsersList = () => {
  const [showUsers, setShowUsers] = useState(false)
  const { components } = useTranslation()
  const text = components.adminUsersList
  const { users } = useGetUsers()
  useEffect(() => {}, [users])

  return (
    <section
      className={styles.section}
      aria-label='Users list section for admins'
    >
      <h2>{components.adminUsersList.title}</h2>
      <ToggleButton
        isVisible={showUsers}
        onToggle={setShowUsers}
        hideBtnText={text.hideButton.toUpperCase()}
        showBtnText={text.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {showUsers && (
        <ul className={styles.productsList}>
          {users &&
            users.map((user) => (
              <li className={styles.user} key={user.id}>
                <EditableUser user={user} />
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}
