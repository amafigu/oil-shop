import { Product } from "@/types/Product"

export const product: Product = {
  id: 1,
  name: "Sample Product",
  price: 100,
  size: 1,
  details: "Sample details",
  description: "Sample description",
  categoryId: 1,
  image: "sample-image.jpg",
  brand: "Sample Brand",
  category: { name: "Sample Category" },
}
