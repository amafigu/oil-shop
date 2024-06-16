import { DEFAULT_USER_IMAGE } from "@/constants/media"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { UserHeader as IUserHeader } from "@/types/User"
import { setDefaultImageByError } from "@/utils/setDefaultImageByError"
import { useEffect, useState } from "react"
import styles from "./userHeader.module.scss"

export const UserHeader = () => {
  const [userData, setUserData] = useState<IUserHeader>({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  })
  const { user, isLoading } = useUserContext()
  const { commonProperties } = useTranslation()

  useEffect(() => {
    if (isLoading) {
      return
    } else {
      setUserData({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        image: user?.image,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <header className={styles.wrapper} aria-label='User Description'>
      <section className={styles.container}>
        {userData ? (
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={userData.image}
                alt='user'
                onError={(e) => setDefaultImageByError(e, DEFAULT_USER_IMAGE)}
              />
            </div>
            <dl className={styles.fields}>
              <ul className={styles.list}>
                {userData &&
                  Object.keys(userData)
                    .filter((property) => property !== "image")
                    .map((property) => (
                      <li key={property} className={styles.item}>
                        <dt
                          className={styles.property}
                        >{`${commonProperties[property]}: `}</dt>
                        <dd className={styles.value}>
                          {userData[property as keyof IUserHeader]}
                        </dd>
                      </li>
                    ))}
              </ul>
            </dl>
          </div>
        ) : (
          `loading Data`
        )}
      </section>
    </header>
  )
}
