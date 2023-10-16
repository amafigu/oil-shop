import { useState } from "react"
import styles from "./getProduct.module.scss"

const GetProduct = () => {
  const [userEmail, setUserEmail] = useState("")

  return (
    <div>
      <input
        type='text'
        value={userEmail}
        required
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button className={styles.formButton}></button>
    </div>
  )
}

export default GetProduct
