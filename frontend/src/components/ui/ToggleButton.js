import styles from "./toggleButton.module.scss"

export const ToggleButton = ({
  isVisible,
  onToggle,
  hideBtnText,
  showBtnText,
  classCss,
}) => {
  return (
    <>
      {isVisible ? (
        <button
          aria-label={`${hideBtnText} button`}
          onClick={() => onToggle(false)}
          className={styles[classCss]}
          type='button'
        >
          {hideBtnText}
        </button>
      ) : (
        <button
          aria-label={`${showBtnText} button`}
          onClick={() => onToggle(true)}
          className={styles[classCss]}
          type='button'
        >
          {showBtnText}
        </button>
      )}
    </>
  )
}
