import {
  SOCIAL_MEDIA_URL_FACEBOOK,
  SOCIAL_MEDIA_URL_INSTAGRAM,
  SOCIAL_MEDIA_URL_YOUTUBE,
} from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./footerIcons.module.scss"

export const FooterIcons = () => {
  const { translate } = useTranslation()
  const text = translate.components.footer

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
            <li>
              <a
                href={SOCIAL_MEDIA_URL_FACEBOOK}
                target='_blank'
                rel='noreferrer'
                title={text.iconsColumns.socialMedia.facebook}
                alt={text.iconsColumns.socialMedia.facebook}
              >
                <FontAwesomeIcon
                  icon={getIconByName("faSquareFacebook")}
                  size='2xl'
                />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_MEDIA_URL_INSTAGRAM}
                target='_blank'
                rel='noreferrer'
                title={text.iconsColumns.socialMedia.instagram}
                alt={text.iconsColumns.socialMedia.instagram}
              >
                <FontAwesomeIcon
                  icon={getIconByName("faSquareInstagram")}
                  size='2xl'
                />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_MEDIA_URL_YOUTUBE}
                target='_blank'
                rel='noreferrer'
                title={text.iconsColumns.socialMedia.youtube}
                alt={text.iconsColumns.socialMedia.youtube}
              >
                <FontAwesomeIcon
                  icon={getIconByName("faSquareYoutube")}
                  size='2xl'
                />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  )
}
