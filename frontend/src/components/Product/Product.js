import React from "react"
import style from "./Product.module.css"
import useLocaleContext from "../../context/locale.context"

const Product = ({ name, image, size, price, description }) => {
  const { translate } = useLocaleContext()
  console.log(image)

  return (
    <div className={style.product}>
      <h2 className={style.productName}>{name}</h2>
      <img className={style.productImage} src={image} alt={name} />
      <p className={style.productSize}>
        {translate.products.oil.size}: {size} ml
      </p>
      <p className={style.productPrice}>
        {translate.products.oil.price} ${price}
      </p>
      <p className={style.productDescription}>{description}</p>
    </div>
  )
}

export default Product
