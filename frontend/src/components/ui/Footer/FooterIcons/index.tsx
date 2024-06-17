import {
  SOCIAL_MEDIA_URL_FACEBOOK,
  SOCIAL_MEDIA_URL_INSTAGRAM,
  SOCIAL_MEDIA_URL_YOUTUBE,
} from "@/constants/media"
import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./footerIcons.module.scss"

export const FooterIcons: FC = () => {
  const { translate } = useTranslation()
  const text = translate.components.footer
  const items = [
    {
      url: SOCIAL_MEDIA_URL_FACEBOOK,
      title: text.iconsColumns.socialMedia.facebook,
      icon: (
        <FontAwesomeIcon icon={getIconByName("faSquareFacebook")} size='2xl' />
      ),
    },
    {
      url: SOCIAL_MEDIA_URL_INSTAGRAM,
      title: text.iconsColumns.socialMedia.instagram,
      icon: (
        <FontAwesomeIcon icon={getIconByName("faSquareInstagram")} size='2xl' />
      ),
    },
    {
      url: SOCIAL_MEDIA_URL_YOUTUBE,
      title: text.iconsColumns.socialMedia.youtube,
      icon: (
        <FontAwesomeIcon icon={getIconByName("faSquareYoutube")} size='2xl' />
      ),
    },
  ]

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.title}>
            <h4>{text.iconsColumns.creditCards.title}</h4>
          </div>
          <ul className={styles.icons}>
            <li>
              <FontAwesomeIcon icon={getIconByName("faPaypal")} size='2xl' />
            </li>
            <li>
              <FontAwesomeIcon icon={getIconByName("faGooglePay")} size='2xl' />
            </li>
          </ul>
        </li>
        <li className={styles.item}>
          <div className={styles.title}>
            <h4>{text.iconsColumns.shippingPartners.title}</h4>
          </div>
          <ul className={styles.icons}>
            <li>
              <FontAwesomeIcon icon={getIconByName("faDhl")} size='2xl' />
            </li>
            <li>
              <FontAwesomeIcon icon={getIconByName("faUps")} size='2xl' />
            </li>
          </ul>
        </li>
        <li className={styles.item}>
          <div className={styles.title}>
            <h4>{text.iconsColumns.socialMedia.title}</h4>
          </div>
          <ul className={styles.icons}>
            {items.map((item) => (
              <li key={item.url}>
                <Link to={item.url} title={item.title}>
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  )
}
