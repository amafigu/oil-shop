export const verifyUploadedImageUrl = async (file, upload) => {
  if (file) {
    const imageUrl = await upload(file)
    return String(imageUrl)
  } else {
    return ""
  }
}
