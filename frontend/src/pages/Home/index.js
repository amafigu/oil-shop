import {
  faEnvelope,
  faPeopleGroup,
  faSeedling,
  faTree,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React } from "react"
import useLocaleContext from "../../context/localeContext"
import Carousel from "./Carousel"
import ProductsSlider from "./ProductsSlider"
import styles from "./home.module.scss"

const Home = () => {
  const { translate } = useLocaleContext()

  return (
    <div className={styles.homePageWrapper}>
      <div className={styles.homePage}>
        <div className={styles.pageColumn}>
          <div className={styles.carouselWrapper}>
            <Carousel />
          </div>
          <div className={styles.teaserTextWrapper}>
            <div className={styles.teaserText}>
              <h2 className={styles.title}>{translate.pages.welcome.title}</h2>
              <h3 className={styles.subtitleText}>
                {translate.pages.welcome.teaserSentence}
              </h3>
              <h3 className={styles.subtitleText}>
                {translate.pages.welcome.teaserSubSentenceOne}
              </h3>
              <h3 className={styles.subtitleText}>
                {translate.pages.welcome.teaserSubSentenceTwo}
              </h3>
              <h3 className={styles.subtitleText}>
                {translate.pages.welcome.teaserSubSentenceThree}
              </h3>
              <h3 className={styles.subtitleText}>
                {translate.pages.welcome.teaserSubSentenceFour}
              </h3>
            </div>
          </div>
          <div className={styles.productSliderContainer}>
            <ProductsSlider />
          </div>
          <div className={styles.columnsContainer}>
            <div className={styles.teaserCardsWrapper}>
              <div>
                <p className={styles.columnsTitle}>
                  {translate.pages.welcome.subTeaser.title}
                </p>
              </div>
              <div className={styles.teaserCards}>
                <div className={styles.teaserSingleCard}>
                  <p className={styles.teaserCardTitle}>
                    {translate.pages.welcome.subTeaser.teaserFirstSubtitle}
                  </p>
                  <p className={styles.teaserCardText}>
                    {translate.pages.welcome.subTeaser.teaserFirstSentence}
                  </p>
                  <span className={styles.iconColumns}>
                    <FontAwesomeIcon icon={faTree} size='xs' />
                  </span>
                </div>
                <div className={styles.teaserSingleCard}>
                  <p className={styles.teaserCardTitle}>
                    {translate.pages.welcome.subTeaser.teaserSecondSubtitle}
                  </p>
                  <p className={styles.teaserCardText}>
                    {translate.pages.welcome.subTeaser.teaserSecondSentence}
                  </p>

                  <span className={styles.iconColumns}>
                    <FontAwesomeIcon icon={faSeedling} size='xs' />
                  </span>
                </div>
                <div className={styles.teaserSingleCard}>
                  <p className={styles.teaserCardTitle}>
                    {translate.pages.welcome.subTeaser.teaserThirthSubtitle}
                  </p>
                  <p className={styles.teaserCardText}>
                    {translate.pages.welcome.subTeaser.teaserThirthSentence}
                  </p>
                  <span className={styles.iconColumns}>
                    <FontAwesomeIcon icon={faEnvelope} size='xs' />
                  </span>
                </div>
                <div className={styles.teaserSingleCard}>
                  <p className={styles.teaserCardTitle}>
                    {translate.pages.welcome.subTeaser.teaserFourthSubtitle}
                  </p>
                  <p className={styles.teaserCardText}>
                    {translate.pages.welcome.subTeaser.teaserFourthSentence}
                  </p>
                  <span
                    className={`material-symbols-outlined ${styles.iconColumns}`}
                  >
                    <FontAwesomeIcon icon={faPeopleGroup} size='xs' />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
