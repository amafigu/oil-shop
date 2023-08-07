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
                {text.linksColumns.first.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <div> {text.linksColumns.first.address}</div>
                <div>
                  {text.linksColumns.first.postalCode} {text.city}
                </div>
                <div>
                  {text.linksColumns.first.phoneTitle}{" "}
                  {text.linksColumns.first.contactPhone}
                </div>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.second.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link
                  to='/shop'
                  title={text.linksColumns.second.returnToShopTitle}
                >
                  {text.linksColumns.second.returnToShop}
                </Link>

                <Link
                  to='/cancellation'
                  title={text.linksColumns.second.cancellationPolicyTitle}
                >
                  {text.linksColumns.second.cancellationPolicy}
                </Link>

                <Link
                  to='/return'
                  title={text.linksColumns.second.returnProductsTitle}
                >
                  {text.linksColumns.second.returnProducts}
                </Link>

                <Link to='/faq' title='FAQ'>
                  {text.linksColumns.second.faq}
                </Link>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.third.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link to='/company-details' title='company details'>
                  {text.linksColumns.third.companyDetails}
                </Link>

                <Link to='/general-terms' title='general terms'>
                  {text.linksColumns.third.generalTerms}
                </Link>

                <Link to='/data-protection' title='data protection'>
                  {text.linksColumns.third.dataProtection}
                </Link>
              </div>
            </li>

            <li className={styles.columnsSectionItem}>
              <div className={styles.columnsSectionItemTitle}>
                {text.linksColumns.fourth.title}
              </div>
              <div className={styles.columnsSectionItemLinks}>
                <Link to='/login' title='account & login'>
                  {text.linksColumns.fourth.accountAndLogin}
                </Link>

                <Link to='/registration' title='registration'>
                  {text.linksColumns.fourth.registration}
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.iconsSection}>
          <ul className={styles.iconsSectionElements}>
            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.first.title}</h4>
              </div>
              <div className={styles.iconsSectionItemIcons}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/" + "iconPay.png"}
                  alt=''
                  id='last'
                  width='316'
                />
              </div>
            </li>
            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.second.title}</h4>
              </div>
              <div className={styles.iconsSectionItemIcons}>
                <img
                  id='last'
                  src={process.env.PUBLIC_URL + "/assets/" + "iconDhl.png"}
                  alt=''
                  width='77'
                />
                <img
                  id='last'
                  src={process.env.PUBLIC_URL + "/assets/" + "iconUps.png"}
                  alt=''
                  width='77'
                />
              </div>
            </li>

            <li className={styles.iconsSectionItem}>
              <div className={styles.iconsSectionItemTitle}>
                <h4>{text.iconsColumns.third.title}</h4>
              </div>

              <div className={styles.iconsSectionItemIcons}>
                <a
                  href='https://www.facebook.com/'
                  target='_blank'
                  title={text.iconsColumns.third.facebook}
                  alt={text.iconsColumns.third.facebook}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/" + "iconFacebook.png"
                    }
                    alt=''
                    width='50'
                  />
                </a>
                <a
                  href='https://www.instagram.com/'
                  target='_blank'
                  title={text.iconsColumns.third.instagram}
                  alt={text.iconsColumns.third.instagram}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/" + "iconInstagram.png"
                    }
                    alt=''
                    width='50'
                  />
                </a>
                <a
                  href='https://www.youtube.com/user/'
                  target='_blank'
                  title={text.iconsColumns.third.youtube}
                  alt={text.iconsColumns.third.youtube}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/" + "iconYoutube.png"
                    }
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
