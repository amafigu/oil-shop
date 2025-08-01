import { ActionButton } from "@/components/ui/ActionButton"
import { useMatchedItemsContext } from "@/context/matchedItemsContext"
import { useProductContext } from "@/context/asdasdasproductContext"
import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { searchProducts } from "@/utils/searchProducts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MatchedProductsList } from "../MatchedProductsList"
import styles from "./searchBar.module.scss"

export const SearchBar = () => {
  const { products } = useProductContext()

  const {
    searchProductText,
    setSearchProductText,
    matchedProducts,
    setMatchedProducts,
    showMatchedProductsList,
    setShowMatchedProductsList,
  } = useMatchedItemsContext()

  const { components } = useTranslation()
  const onCancelSearch = () => {
    setSearchProductText("")
    setMatchedProducts([])
  }

  return (
    <div className={styles.searchBar}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <label
            htmlFor='searchbar-input'
            id='searchbar-input'
            className={styles.label}
          >
            {components.searchBar.placeholder}
          </label>
          <div className={styles.searchIconContainer}>
            <div>
              <span>
                <FontAwesomeIcon
                  icon={getIconByName("faSearch")}
                  size={"sm"}
                  color='#686868'
                />
              </span>
            </div>
          </div>
          <input
            id={"searchbar-input"}
            className={styles.input}
            onChange={(e) =>
              searchProducts(
                e,
                products,
                setSearchProductText,
                setMatchedProducts,
                setShowMatchedProductsList,
              )
            }
            value={searchProductText}
          />
          <div className={styles.cancelButtonContainer}>
            {searchProductText && (
              <ActionButton
                action={() => onCancelSearch()}
                className='cancelSearch'
              >
                <FontAwesomeIcon
                  icon={getIconByName("faX")}
                  size='xs'
                  color='#fff'
                />
              </ActionButton>
            )}
          </div>
        </div>
        {matchedProducts.length > 0 && showMatchedProductsList && (
          <div className={styles.matchedListWrapper}>
            <MatchedProductsList
              matchedProducts={matchedProducts}
              setMatchedProducts={setMatchedProducts}
              setShowMatchedProductsList={setShowMatchedProductsList}
              setSearchProductText={setSearchProductText}
            />
          </div>
        )}
      </section>
    </div>
  )
}
