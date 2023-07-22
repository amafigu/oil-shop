import React from "react"
import "../../styles/pages/_cancellation.scss"

const Cancellation = () => {
  return (
    <div className='container'>
      <div className='policyWrapper'>
        <h1>Cancellation Policy</h1>
        <p>
          We comply with the EU’s Consumer Rights Directive 2011/83/EU.
          Therefore, you may cancel your purchase within 14 days from the day
          you receive your items, without giving any reason.
        </p>
        <p>
          To exercise your right of cancellation, you must inform us of your
          decision to cancel the purchase in a clear statement (for example, a
          letter sent by post or email) before the cancellation period has
          expired.
        </p>
        <p>
          For more detailed information, please refer to our terms of service or
          contact our customer service.
        </p>
      </div>
    </div>
  )
}

export default Cancellation
