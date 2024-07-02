import { ActionButton } from "@/components/ui/ActionButton"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { User } from "@/types/User"
import { filterUsersProps } from "@/utils/filterUsersProps"
import { FC, useEffect, useState } from "react"
import { EditableUserForm } from "../EditableUserForm"
import styles from "./editableUsersList.module.scss"

export const EditableUsersList: FC = () => {
  const [filteredItemsList, setFilteredItemsList] = useState<User[]>([])
  const [isAscendent, setIsAscendent] = useState<boolean[]>(
    filterUsersProps.map(() => true),
  )
  const { pages } = useTranslation()
  const { users } = useUserContext()
  const text = pages.admin.usersManagement.editableItemsList
  useEffect(() => {
    setFilteredItemsList(users)
  }, [users])

  const filterList = (
    action: (list: User[], sortIsAsc: boolean) => User[],
    index: number,
  ) => {
    const sortIsAsc = [...isAscendent]
    sortIsAsc[index] = !sortIsAsc[index]
    setIsAscendent(sortIsAsc)

    const filteredItems = action(
      [...filteredItemsList],
      sortIsAsc[index] ?? true,
    )
    setFilteredItemsList(filteredItems)
  }

  return (
    <section className={styles.wrapper}>
      <h2>{text.title}</h2>
      <div className={styles.container}>
        {filterUsersProps.length > 0 &&
          filterUsersProps.map((filterButton, index) => (
            <ActionButton
              key={index}
              action={() => filterList(filterButton.action, index)}
              text={
                isAscendent[index]
                  ? `${text[filterButton.targetProperty]} asc`
                  : `${text[filterButton.targetProperty]} des`
              }
              className={filterButton.className}
              ariaLabel='Filter button'
            />
          ))}
      </div>
      <ul className={styles.list}>
        {filteredItemsList.map((item, index) => (
          <li className={styles.item} key={item.id || index}>
            <EditableUserForm item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
