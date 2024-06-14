export const verifyUploadedImageUrl = async (
  file: File,
  upload: (file: File) => Promise<string>,
) => {
  if (file) {
    const imageUrl = await upload(file)
    return String(imageUrl)
  } else {
    return ""
  }
}
