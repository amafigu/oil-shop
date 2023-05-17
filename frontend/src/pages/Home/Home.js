import React from "react"
import "./Home.css"
import useLocaleContext from "../../context/locale.context"

const Home = () => {
  const { translate } = useLocaleContext()

  return (
    <div className='home-container'>
      <h1 className='home-title'>{translate.pages.welcome.title}</h1>
      <p className='home-subtitle'>{translate.pages.welcome.teaser}</p>
    </div>
  )
}

export default Home
