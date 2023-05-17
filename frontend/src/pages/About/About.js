import React from "react"
import useLocaleContext from "../../context/locale.context"

const About = () => {
  const { translate } = useLocaleContext()
  return (
    <div>
      <h1>{translate.pages.about.title}</h1>
      <p>{translate.pages.about.teaser}</p>
    </div>
  )
}

export default About
