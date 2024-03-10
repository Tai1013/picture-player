import { instance, developmentSID, baseURL } from "./xhr"
import { filePath } from "@/helper"
import Cookies from "js-cookie"

type FoldersResponse = {
  folders: GlobalApp.FolderType[]
}
export const getFoldersList = async (path?: string) => {
  return instance<FoldersResponse>({
    method: "get",
    url: "/api/folders",
    params: {
      path
    }
  })
    .then((response) => {
      return response.data.data.folders
    })
    .catch(() => {
      return []
    })
}

type FilesResponse = {
  files: (Pick<GlobalApp.FileType, "name" | "path"> & {
    thumbnail_image: string
    preview_image: string
  })[]
  paging: {
    page: number
    total_page: number
  }
}

export const getFilesList = async (path: string, page: number = 1) => {
  return instance<FilesResponse>({
    method: "get",
    url: "/api/files",
    params: {
      path,
      page
    }
  })
    .then((response) => {
      const { files, paging } = response.data.data
      const data = {
        data: files.map((file) => ({
          name: file.name,
          path: file.path,
          thumbnailImage: filePath(file.thumbnail_image),
          previewImage: filePath(file.preview_image)
        })),
        page: paging.page,
        total: paging.total_page
      }
      return data
    })
    .catch(() => {
      return {
        data: [],
        page: 0,
        total: 0
      }
    })
}

export const postFileDownload = async (path: string, name: string) => {
  if (import.meta.env.VITE_AXIOS_MOCK === "true") return Promise.resolve(true)

  const sid = Cookies.get("NAS_SID") || developmentSID
  const params = { path, name }
  const form = document.createElement("form")

  form.action = baseURL + "api/file_download?sid=" + sid
  form.method = "POST"

  Object.entries(params).forEach(([key, value]) => {
    const element = document.createElement("input")
    element.value = value
    element.name = key
    element.type = "hidden"
    form.appendChild(element)
  })

  document.body.appendChild(form)

  form.submit()
  form.remove()

  return Promise.resolve(true)
}
