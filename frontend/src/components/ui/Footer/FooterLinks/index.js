import {
  ROUTES_FAQ,
  ROUTES_LOGIN,
  ROUTES_SHOP,
  ROUTES_SIGN_UP,
} from "#constants/routes"
import { useTranslation } from "#hooks/useTranslation"
import { Link } from "react-router-dom"
import styles from "./footerLinks.module.scss"

export const FooterLinks = () => {
  const { translate } = useTranslation()
  const text = translate.components.footer

  return (
    <section>
      <nav className={styles.navigationItems} aria-label='Footer navigation'>
        <ul className={styles.itemsList} aria-label='Links columns'>
          <li className={styles.item} aria-label='Contact data'>
            <p className={styles.itemTitle}>
              {text.linksColumns.wayToUs.title}
            </p>
            <address className={styles.itemsLinksList}>
              <p>{text.linksColumns.wayToUs.address}</p>
              <p>
                {text.linksColumns.wayToUs.postalCode} {text.city}
              </p>
              <p>
                {text.linksColumns.wayToUs.phoneTitle}{" "}
                {text.linksColumns.wayToUs.contactPhone}
              </p>
            </address>
          </li>
          <li className={styles.item} aria-label='Useful Links'>
            <div className={styles.itemTitle}>
              {text.linksColumns.forClient.title}
            </div>
            <ul className={styles.itemsLinksList}>
              <li>
                <Link
                  to={ROUTES_SHOP}
                  title={text.linksColumns.forClient.returnToShopTitle}
                >
                  {text.linksColumns.forClient.returnToShop}
                </Link>
              </li>
              <li>
                <Link to={ROUTES_FAQ} title='FAQ'>
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
              <li>
                <Link to={ROUTES_LOGIN} title='account & login'>
                  {text.linksColumns.users.accountAndLogin}
                </Link>
              </li>
              <li>
                <Link to={ROUTES_SIGN_UP} title='registration'>
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
