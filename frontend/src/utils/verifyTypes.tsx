export const convertDataToExpectedUserTypes = (data) => {
  return {
    ...data,
    firstName: String(data.firstName),
    lastName: String(data.lastName),
    email: String(data.email),
    password: String(data.password),
  }
}

export const convertDataToExpectedProductTypes = async ({
  data,
  file,
  verifyImgUrl,
  upload,
}) => {
  return {
    ...data,
    image: await verifyImgUrl(file, upload),
    details: String(data.details),
    description: String(data.description),
    categoryId: Number(data.categoryId),
    size: Number(data.size),
    price: Number(data.price),
  }
}

export const extractValidProperty = async ({
  key,
  updatedData,
  upload,
  file,
}) => {
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

export const validate = async ({ item, schema, onError, onNotification }) => {
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
