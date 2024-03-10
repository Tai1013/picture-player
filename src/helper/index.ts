import { baseURL } from "@/services/xhr"

export const filePath = (url: string) => {
  if (url.indexOf("@/") === 0) {
    return new URL(`../${url.replace("@/", "")}`, import.meta.url).href
  }
  return baseURL.slice(0, -1) + url
}
