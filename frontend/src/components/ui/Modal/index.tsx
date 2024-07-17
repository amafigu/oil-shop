import { FC, ReactNode } from "react"
import styles from "./modal.module.scss"

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}
