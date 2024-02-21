import React from "react"
import styles from "./toggleButton.module.scss"

const ToggleButton = ({ show, setToggle, textHide, textShow, classCss }) => {
  return (
    <>
      {show ? (
        <button
          onClick={() => setToggle(false)}
          className={styles[classCss]}
          type='button'
        >
          {textHide}
        </button>
      ) : (
        <button
          onClick={() => setToggle(true)}
          className={styles[classCss]}
          type='button'
        >
          {textShow}
        </button>
      )}
    </>
  )
}

export default ToggleButton
