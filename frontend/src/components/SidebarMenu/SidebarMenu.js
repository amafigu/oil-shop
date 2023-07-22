import React from "react"
import styles from "../../styles/components/_sidebarMenu.module.scss"
import { Link } from "react-router-dom"
import useLocaleContext from "../../context/localeContext"

const SidebarMenu = ({ className, setSidebarMenuVisible }) => {
  const { translate } = useLocaleContext()
  const text = translate.components.sidebarMenu

  const Categories = Object.freeze({
    ALL: "all",
    ESSENTIAL_OIL: "essentialOil",
    DIFUSER: "difuser",
    BODY_CARE: "bodyCare",
    ROLL: "roll",
    MASSAGE_OIL: "massageOil",
  })

  return (
    <div className={styles[className]}>
      <div className={styles.sidebar}>
        <div
          className={styles.sidebarItem}
          onClick={() => setSidebarMenuVisible(false)}
        >
          <span class='material-symbols-outlined'>close</span>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=all`}>{text.allProducts}</Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=${Categories.ESSENTIAL_OIL}`}>
            {text.essentialOils}
          </Link>
        </div>

        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=${Categories.DIFUSER}`}>
            {text.difusers}
          </Link>
        </div>

        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=${Categories.BODY_CARE}`}>
            {text.bodyCare}
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=${Categories.ROLL}`}>{text.rollOn}</Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={`/shop?category=${Categories.MASSAGE_OIL}`}>
            {text.massageOils}
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <a href='mailto:oylooils@gmail.com'>Contact us</a>
        </div>
        <div className={styles.sidebarItem}>
          <Link to='/login' title={text.accountAndLogin}>
            {text.accountAndLogin}
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to='/shop' title={text.onlineShop}>
            {text.onlineShop}
          </Link>
        </div>

        <div className={styles.sidebarItem}>
          <Link to='/cancellation' title={text.cancellationPolicyTitle}>
            {text.cancellationPolicy}
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to='/return' title={text.returnProductsTitle}>
            {text.returnProducts}
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to='/faq' title={text.faqTitle}>
            {text.faq}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
