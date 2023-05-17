import React from "react"
import "./Product.css"
import useLocaleContext from "../../context/locale.context"

const Product = ({ name, image, size, price, description }) => {
  const { translate } = useLocaleContext()

  return (
    <div className='product'>
      <h2 className='product-name'>{name}</h2>
      <img className='product-image' src={image} alt={name} />
      <p className='product-size'>
        {translate.products.oil.size}: {size} ml
      </p>
      <p className='product-price'>
        {translate.products.oil.price} ${price}
      </p>
      <p className='product-description'>{description}</p>
      <button className='product-button'>Buy</button>
    </div>
  )
}

export default Product
