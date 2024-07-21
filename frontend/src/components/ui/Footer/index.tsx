import { FC } from "react"
import { FooterIcons } from "./FooterIcons"
import { FooterLinks } from "./FooterLinks"
import styles from "./footer.module.scss"

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <FooterLinks />
      <FooterIcons />
    </footer>
  )
}

export default Footer
