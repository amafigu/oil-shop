import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { PRODUCTS } from "@/constants/routes"
import { useMenuOptions } from "@/hooks/useMenuOptions"
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
  const { setShowProductsSearchBar } = useMenuOptions()

  return (
    <ul className={styles.list} aria-label={"Searched products list"}>
      {matchedProducts.map((product) => (
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
            setShowProductsSearchBar(false)
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
              setShowProductsSearchBar(false)
            }
          }}
          tabIndex={0}
        >
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
            />
          </div>
          <div>
            <span className={styles.content}>
              {product.name ? titleCase(product.name, "_") : ""}
            </span>
            <span className={styles.content}>{`${product.size} ml`}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
