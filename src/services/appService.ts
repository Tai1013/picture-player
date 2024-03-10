import { instance } from "./xhr"
import { useConfigStore, storeToRefs } from "@/stores"

type CommonInfoResponse = {
  is_active: boolean
  display_name: string
  version: string
  support_file: string
  is_show_cast?: boolean
}

export const getCommonInfo = async () => {
  return instance<CommonInfoResponse>({
    method: "get",
    url: "/api/common_info"
  })
    .then((response) => {
      const { information } = storeToRefs(useConfigStore())
      const data = response.data.data

      information.value = {
        isActive: data.is_active,
        displayName: data.display_name,
        version: data.version,
        supportFile: data.support_file,
        isShowCast: data.is_show_cast || false
      }

      return data
    })
}

export const postAppActivate = async () => {
  return instance({
    method: "post",
    url: "/api/app_activate"
  })
    .then(() => {
      const { information } = storeToRefs(useConfigStore())

      information.value.isActive = true
      return true
    })
    .catch(() => {
      return false
    })
}
