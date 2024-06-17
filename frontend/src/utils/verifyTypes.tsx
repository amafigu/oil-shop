/* eslint-disable @typescript-eslint/no-explicit-any */
interface ConvertUserData {
  firstName: string
  lastName: string
  email: string
  password: string
  [key: string]: any
}

export const convertDataToExpectedUserTypes = (data: ConvertUserData) => {
  return {
    ...data,
    firstName: String(data.firstName),
    lastName: String(data.lastName),
    email: String(data.email),
    password: String(data.password),
  }
}

interface Product {
  details: string
  description: string
  categoryId: number
  size: number
  price: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface ConvertProductData {
  data: Product
  file: File | null | undefined
  verifyImgUrl: (
    file: File | null | undefined,
    upload: (file: File) => Promise<string>,
  ) => Promise<string>
  upload: (file: File) => Promise<string>
}

export const convertDataToExpectedProductTypes = async ({
  data,
  file,
  verifyImgUrl,
  upload,
}: ConvertProductData): Promise<Product> => {
  return {
    ...data,
    image: file ? await verifyImgUrl(file, upload) : "",
    description: String(data.description),
    categoryId: Number(data.categoryId),
    size: Number(data.size),
    price: Number(data.price),
  }
}

interface ExtractValidProperty {
  key: string
  updatedData: { [key: string]: any }
  upload: (file: File) => Promise<string>
  file?: File
}

export const extractValidProperty = async ({
  key,
  updatedData,
  upload,
  file,
}: ExtractValidProperty): Promise<{ [key: string]: any }> => {
  if (key === "image" && file) {
    const image = await upload(file)
    return { [key]: image }
  } else {
    const value = updatedData[key]
    if (key === "price" || key === "size") {
      return { [key]: Number(value) }
    } else {
      return { [key]: value }
    }
  }
}

interface Validate {
  item: any
  schema: any
  onError: (error: any, onNotification: any) => void
  onNotification: any
}

export const validate = async ({
  item,
  schema,
  onError,
  onNotification,
}: Validate): Promise<any> => {
  try {
    if (schema) {
      return schema.parse(item)
    } else {
      return
    }
  } catch (error) {
    console.error("Error by validation", error)
    onError(error, onNotification)
  }
}
