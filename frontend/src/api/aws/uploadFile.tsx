import { baseUrl } from "@/constants/api"
import axios from "axios"

export const uploadFile = async (
  file: File | null | undefined,
): Promise<string> => {
  if (!file) return ""
  let newUrl = ""
  try {
    const response = await axios.get(
      `${baseUrl}/aws/generate-upload-url?fileName=${file.name}`,
      { withCredentials: true },
    )
    newUrl = `https://oylo-images.s3.us-east-2.amazonaws.com/${response.data.fileName}`

    await axios.put(response.data.uploadURL, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
  } catch (error) {
    console.error("Error uploading to S3: ", error)
    return ""
  }
  return newUrl
}
