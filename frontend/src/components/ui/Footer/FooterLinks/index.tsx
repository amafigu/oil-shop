import { FAQ, LOGIN, SHOP, SIGN_UP } from "@/constants/routes"
import { useTranslation } from "@/hooks/useTranslation"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./footerLinks.module.scss"

export const FooterLinks: FC = () => {
  const { translate } = useTranslation()
  const text = translate.components.footer

  return (
    <section>
      <nav className={styles.navigationItems}>
        <ul className={styles.itemsList}>
          <li className={styles.item}>
            <p className={styles.itemTitle}>
              {text.linksColumns.wayToUs.title}
            </p>
            <address className={styles.itemsLinksList}>
              <p>{text.linksColumns.wayToUs.address}</p>
              <p>
                {text.linksColumns.wayToUs.postalCode}{" "}
                {text.linksColumns.wayToUs.city}
              </p>
              <p>
                {text.linksColumns.wayToUs.phoneTitle}{" "}
                {text.linksColumns.wayToUs.contactPhone}
              </p>
            </address>
          </li>
          <li className={styles.item}>
            <div className={styles.itemTitle}>
              {text.linksColumns.forClient.title}
            </div>
            <ul className={styles.itemsLinksList}>
              <li className={styles.link}>
                <Link
                  to={SHOP}
                  title={text.linksColumns.forClient.returnToShopTitle}
                >
                  {text.linksColumns.forClient.returnToShop}
                </Link>
              </li>
              <li className={styles.link}>
                <Link to={FAQ} title='FAQ'>
                  {text.linksColumns.forClient.faq}
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <div className={styles.itemTitle}>
              {text.linksColumns.users.title}
            </div>
            <ul className={styles.itemsLinksList}>
              <li className={styles.link}>
                <Link to={LOGIN} title='account & login'>
                  {text.linksColumns.users.accountAndLogin}
                </Link>
              </li>
              <li className={styles.link}>
                <Link to={SIGN_UP} title='registration'>
                  {text.linksColumns.users.registration}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  )
}
