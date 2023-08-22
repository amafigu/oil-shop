import React from "react"
import { Link } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./footer.module.scss"

const Footer = () => {
  const { translate } = useLocaleContext()
  const text = translate.components.footer

  return (
    <footer className={styles.pageFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerStartSection}>
          <span className={styles.footerStartSectionText}>
            {text.newsletter.subscriptionText}
          </span>
        </div>
        <div className={styles.footerNewsletterSection}>
          <div className={styles.registrationFormWrapper}>
            <div className={styles.registrationFormTitle}>
              <span>{text.newsletter.title}</span>
            </div>
            <div className={styles.registrationFormContent}>
              <form className={styles.registrationForm}>
                <div className={styles.registrationFormLabelWrapper}>
                  <label className={styles.registrationFormLabel}>
                    <span>{text.newsletter.registrationTitle}</span>
                  </label>
                </div>

                <div className={styles.registrationEmailInputAndButtonWrapper}>
                  <div className={styles.registrationEmailInputWrapper}>
                    <input
                      name='email'
                      type='email'
                      placeholder={text.newsletter.emailAddressPlaceholder}
                    />
                  </div>
                  <button
                    className={styles.registrationEmailButtonWrapper}
                    title='Subscribe'
                    type='submit'
                  >
                    <span>{text.newsletter.subscriptionTeaser}</span>
                  </button>
                </div>
              </form>
              <p className={styles.registrationDataConsentText}>
                {text.newsletter.registrationDataConsentText}
              </p>
            </div>
          </div>
        </div>
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
                  to='/shop'
                  title={text.linksColumns.forClient.returnToShopTitle}
                >
                  {text.linksColumns.forClient.returnToShop}
                </Link>

                <Link
                  to='/cancellation'
                  title={text.linksColumns.forClient.cancellationPolicyTitle}
                >
                  {text.linksColumns.forClient.cancellationPolicy}
                </Link>

                <Link to='/faq' title='FAQ'>
                  {text.linksColumns.forClient.faq}
                </Link>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.legal.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link to='/company-details' title='company details'>
                  {text.linksColumns.legal.companyDetails}
                </Link>

                <Link to='/general-terms' title='general terms'>
                  {text.linksColumns.legal.generalTerms}
                </Link>

                <Link to='/data-protection' title='data protection'>
                  {text.linksColumns.legal.dataProtection}
                </Link>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.users.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link to='/login' title='account & login'>
                  {text.linksColumns.users.accountAndLogin}
                </Link>

                <Link to='/registration' title='registration'>
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
                <img
                  src={`${process.env.PUBLIC_URL}/assets/iconPay.png`}
                  alt=''
                  id='last'
                  width='316'
                />
              </div>
            </li>
            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.shippingPartners.title}</h4>
              </div>
              <div className={styles.iconsSectionItemIcons}>
                <img
                  id='last'
                  src={`${process.env.PUBLIC_URL}/assets/iconDhl.png`}
                  alt=''
                  width='77'
                />
                <img
                  id='last'
                  src={`${process.env.PUBLIC_URL}/assets/iconUps.png`}
                  alt=''
                  width='77'
                />
              </div>
            </li>

            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.socialMedia.title}</h4>
              </div>

              <div className={styles.iconsSectionItemIcons}>
                <a
                  href='https://www.facebook.com/'
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.facebook}
                  alt={text.iconsColumns.socialMedia.facebook}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/iconFacebook.png`}
                    alt=''
                    width='50'
                  />
                </a>
                <a
                  href='https://www.instagram.com/'
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.instagram}
                  alt={text.iconsColumns.socialMedia.instagram}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/iconInstagram.png`}
                    alt=''
                    width='50'
                  />
                </a>
                <a
                  href='https://www.youtube.com/user/'
                  target='_blank'
                  rel='noreferrer'
                  title={text.iconsColumns.socialMedia.youtube}
                  alt={text.iconsColumns.socialMedia.youtube}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/iconYoutube.png`}
                    alt=''
                    width='50'
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.footerUnderSection}>
          <div className={styles.footerUnderSectionText}>
            <small className={styles.footerUnderSectionTextIcon}>®</small> OYLO
            OILS
          </div>
        </div>
        <div>© {text.copy}</div>
      </div>
    </footer>
  )
}

export default Footer
