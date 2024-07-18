import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { User } from "@/types/User"
import { filterUsersProps } from "@/utils/filterUsersProps"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { ListUserForm } from "../ListUserForm"
import styles from "./editableUsersList.module.scss"

export const EditableUsersList: FC = () => {
  const [filteredItemsList, setFilteredItemsList] = useState<User[]>([])
  const { pages } = useTranslation()
  const { users } = useUserContext()
  const text = pages.admin.usersManagement.editableItemsList

  useEffect(() => {
    setFilteredItemsList(users || [])
  }, [users])

  const selectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value)
    if (index >= 0 && index < filterUsersProps.length) {
      const filterAction = filterUsersProps[index]?.action
      if (filterAction && filteredItemsList) {
        const sortedItems = filterAction([...filteredItemsList])
        setFilteredItemsList(sortedItems)
      }
    }
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filterColumn}>
            <div className={styles.selector}>
              <label className={styles.label} htmlFor='filterOptions'></label>
              <select
                className={styles.select}
                name='filterOptions'
                id='filterOptions'
                onChange={selectFilter}
                defaultValue=''
              >
                <option value='' disabled>
                  {`${text.sortBy} ...`}
                </option>
                {filterUsersProps.map((filterButton, index) => (
                  <option key={index} value={index}>
                    {filterButton.isAsc
                      ? `${text[filterButton.targetProperty]}: ${
                          text.ascendent
                        }`
                      : `${text[filterButton.targetProperty]}: ${
                          text.descendent
                        }`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.listColumn}>
            <ul className={styles.list}>
              {filteredItemsList.map((item, index) => (
                <li className={styles.item} key={item.id || index}>
                  <ListUserForm item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
