import { FooterIcons } from "./FooterIcons"
import { FooterLinks } from "./FooterLinks"
import styles from "./footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.container} aria-label='Footer'>
      <div className={styles.divider}></div>
      <FooterLinks />
      <FooterIcons />
    </footer>
  )
}

export default Footer
