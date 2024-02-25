import {
  SOCIAL_MEDIA_URL_FACEBOOK,
  SOCIAL_MEDIA_URL_INSTAGRAM,
  SOCIAL_MEDIA_URL_YOUTUBE,
} from "#constants/media"
import {
  ROUTES_FAQ,
  ROUTES_LOGIN,
  ROUTES_SHOP,
  ROUTES_SIGN_UP,
} from "#constants/routes"
import { useTranslation } from "#hooks/useTranslation"
import {
  faDhl,
  faGooglePay,
  faPaypal,
  faSquareFacebook,
  faSquareInstagram,
  faSquareYoutube,
  faUps,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./footer.module.scss"

const Footer = () => {
  const { translate } = useTranslation()
  const text = translate.components.footer

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.startSection}>
          <span className={styles.startSectionText}>
            {text.newsletter.usefulLinks}
          </span>
        </div>
        <div className={styles.newsletterSection}></div>
        <div className={styles.columnsSection}>
          <ul className={styles.columnsSectionElements}>
            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.wayToUs.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <div> {text.linksColumns.wayToUs.address}</div>
                <div>
                  {text.linksColumns.wayToUs.postalCode} {text.city}
                </div>
                <div>
                  {text.linksColumns.wayToUs.phoneTitle}{" "}
                  {text.linksColumns.wayToUs.contactPhone}
                </div>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.forClient.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link
                  to={ROUTES_SHOP}
                  title={text.linksColumns.forClient.returnToShopTitle}
                >
                  {text.linksColumns.forClient.returnToShop}
                </Link>

                <Link to={ROUTES_FAQ} title='FAQ'>
                  {text.linksColumns.forClient.faq}
                </Link>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.users.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link to={ROUTES_LOGIN} title='account & login'>
                  {text.linksColumns.users.accountAndLogin}
                </Link>

                <Link to={ROUTES_SIGN_UP} title='registration'>
                  {text.linksColumns.users.registration}
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.iconsSection}>
          <ul className={styles.iconsSectionElements}>
            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.creditCards.title}</h4>
              </div>
              <div className={styles.iconsSectionItemIcons}>
                <div className={styles.iconsSectionItemIcons}>
                  <FontAwesomeIcon icon={faPaypal} size='2xl' />
                  <FontAwesomeIcon icon={faGooglePay} size='2xl' />
                </div>
              </div>
            </li>
            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.shippingPartners.title}</h4>
              </div>
              <div className={styles.iconsSectionItemIcons}>
                <FontAwesomeIcon icon={faDhl} size='2xl' />
                <FontAwesomeIcon icon={faUps} size='2xl' />
              </div>
            </li>

            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.socialMedia.title}</h4>
              </div>

              <div className={styles.iconsSectionItemIcons}>
                <a
                  href={SOCIAL_MEDIA_URL_FACEBOOK}
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.facebook}
                  alt={text.iconsColumns.socialMedia.facebook}
                >
                  <FontAwesomeIcon icon={faSquareFacebook} size='2xl' />
                </a>
                <a
                  href={SOCIAL_MEDIA_URL_INSTAGRAM}
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.instagram}
                  alt={text.iconsColumns.socialMedia.instagram}
                >
                  <FontAwesomeIcon icon={faSquareInstagram} size='2xl' />
                </a>
                <a
                  href={SOCIAL_MEDIA_URL_YOUTUBE}
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.youtube}
                  alt={text.iconsColumns.socialMedia.youtube}
                >
                  <FontAwesomeIcon icon={faSquareYoutube} size='2xl' />
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.underSection}>
          <div className={styles.underSectionText}>
            <small className={styles.underSectionTextIcon}>®</small> OYLO OILS
          </div>
        </div>
        <div>© {text.copy}</div>
      </div>
    </footer>
  )
}

export default Footer
