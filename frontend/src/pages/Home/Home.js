import React from "react"
import "./Home.css"
import useLocaleContext from "../../context/locale.context"
import Carousel from "../../components/Carrousel/Carrousel"

const Home = () => {
  const { translate } = useLocaleContext()

  return (
    
    <div className='home-container'>
      <Carousel />
      <h1 className='home-title'>{translate.pages.welcome.title}</h1>
      <p className='home-subtitle'>{translate.pages.welcome.teaser}</p>
    </div>


    
  )
}

export default Home
