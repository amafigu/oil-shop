import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { PRODUCTS } from "@/constants/routes"
import { useTranslation } from "@/hooks/useTranslation"
import { Product } from "@/types/Product"
import { setDefaultImageByError } from "@/utils/setDefaultImageByError"
import { titleCase } from "@/utils/titleCase"
import { Dispatch, FC, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./matchedProductsList.module.scss"

interface Navigate {
  productId: number
  navigate: (route: string) => void
  setItemsList: Dispatch<SetStateAction<Product[]>>
  setShowList: Dispatch<SetStateAction<boolean>>
  setSearchProductText: Dispatch<SetStateAction<string>>
}

interface MatchedProductsListProps {
  matchedProducts: Product[]
  setMatchedProducts: Dispatch<SetStateAction<Product[]>>
  setShowMatchedProductsList: Dispatch<SetStateAction<boolean>>
  setSearchProductText: Dispatch<SetStateAction<string>>
}

const navigateAndClose = ({
  productId,
  navigate,
  setItemsList,
  setShowList,
  setSearchProductText,
}: Navigate) => {
  navigate(`${PRODUCTS}/${productId}`)
  setItemsList([])
  setShowList(false)
  setSearchProductText("")
}

export const MatchedProductsList: FC<MatchedProductsListProps> = ({
  matchedProducts,
  setMatchedProducts,
  setShowMatchedProductsList,
  setSearchProductText,
}) => {
  const navigate = useNavigate()
  const { components } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} aria-label={"Searched products list"}>
        {matchedProducts.map((product: Product) => (
          <li
            className={styles.item}
            aria-label={`Searched item: ${product.name}`}
            key={product.id}
            onClick={() => {
              navigateAndClose({
                productId: product.id,
                navigate,
                setItemsList: setMatchedProducts,
                setShowList: setShowMatchedProductsList,
                setSearchProductText,
              })
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigateAndClose({
                  productId: product.id,
                  navigate,
                  setItemsList: setMatchedProducts,
                  setShowList: setShowMatchedProductsList,
                  setSearchProductText,
                })
              }
            }}
            tabIndex={0}
          >
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
                onError={(e) =>
                  setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                }
              />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.data}>
                <span className={styles.content}>
                  {titleCase(product.brand, " ")}
                </span>
                <span className={styles.content}>
                  {titleCase(product.name, "_")}
                </span>
                <span className={styles.content}>{`${product.size} ml`}</span>
              </div>
              <div className={styles.price}>
                <span className={styles.content}>{`${product.price} €`}</span>
                <span className={styles.contentTaxes}>
                  {components.matchedProductsList.taxesInclusive}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
