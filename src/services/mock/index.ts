import type { MockFilesFolders } from "./database"
import type { AxiosRequestConfig } from "axios"
import { ref } from "vue"
import { filesFoldersList } from "./database"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios, { delayResponse: parseInt(import.meta.env.VITE_AXIOS_MOCK_DELAY || "0") })

if (import.meta.env.VITE_AXIOS_MOCK !== "true") {
  mock.restore()
}

const instanceResponse = <T>(data: T) => {
  return {
    status: "success",
    message: "mock success",
    data: data
  }
}

mock.onGet("/api/common_info").reply(200, instanceResponse({
  is_active: [true, false][Math.floor(Math.random() * 2)],
  display_name: "Picture Player",
  version: "5.0.0.1891",
  support_file: "HEIC",
  is_show_cast: [true, false][Math.floor(Math.random() * 2)]
}))

mock.onPost("/api/app_activate").reply(200, instanceResponse([]))

const foldersList = ref<GlobalApp.FolderType[]>([])
const imageList = ref<(Pick<GlobalApp.FileType, "name" | "path"> & {
  thumbnail_image: string
  preview_image: string
})[]>([])

const getFilesFoldersList = (paths: string, folders: MockFilesFolders[]) => {
  const splitPaths = paths.split("/").filter((path) => path !== "")
  foldersList.value = []
  imageList.value = []

  if (splitPaths.length === 0) {
    folders.forEach((folder) => {
      foldersList.value.push({
        path: folder.path,
        name: folder.name
      })
    })
  }

  const findFolder = folders.find((folder) => {
    const folderState = splitPaths
      .map((path) => folder.path.indexOf(path) > -1)
      .find((state) => state === true)

    if (folderState) return folder
  })

  if (!findFolder) return

  if (findFolder.path === paths) {
    findFolder.folders.forEach((folder) => {
      foldersList.value.push({
        path: folder.path,
        name: folder.name
      })
    })

    findFolder.files.forEach((file) => {
      imageList.value.push({
        name: file.name,
        path: file.path,
        thumbnail_image: file.path,
        preview_image: file.path
      })
    })
  } else {
    getFilesFoldersList(paths, findFolder.folders)
  }
}

mock.onGet("/api/folders").reply((config: AxiosRequestConfig) => {
  const { path }: { path?: string } = config.params

  getFilesFoldersList(path || "", filesFoldersList)

  return [200, instanceResponse({
    folders: foldersList.value
  })]
})

mock.onGet("/api/files").reply((config: AxiosRequestConfig) => {
  const { path, page }: { path: string, page: number } = config.params

  if (!path || !page) return [404]

  getFilesFoldersList(path, filesFoldersList)

  const batchCount = 50
  const rangePage: [number, number] = [(page - 1) * batchCount, page * batchCount - 1]

  const filterList = imageList.value.filter((file, index) => {
    if (index >= rangePage[0] && index <= rangePage[1]) {
      return file
    }
  })

  return [200, instanceResponse({
    files: filterList,
    paging: {
      page,
      total_page: Math.ceil(imageList.value.length / batchCount)
    }
  })]
})
