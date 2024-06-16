export const verifyUploadedImageUrl = async (
  file: File | null | undefined,
  upload: (file: File) => Promise<string>,
): Promise<string> => {
  if (file) {
    const imageUrl = await upload(file)
    return String(imageUrl)
  } else {
    return ""
  }
}
