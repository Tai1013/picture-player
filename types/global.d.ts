type CommonButtonType = {
  tooltip?: string
  visable?: boolean
  disabled?: boolean
  iconSize?: string | number
  buttonSize?: string | number
  color?: string
  placement?: import("element-plus").Placement
  onClick?: () => void
}

declare namespace GlobalApp {
  type Mode = "welcome" | "playback" | "slideshow"
  type FolderType = {
    name: string
    path: string
  }
  type FileType = {
    name: string
    path: string
    thumbnailImage: string,
    previewImage: string
  }
  type Pagination = {
    total: number
    page: number
  }
  interface IconButtonType extends CommonButtonType {
    icon: string
    active?: boolean
  }
  interface SquareButtonType extends CommonButtonType {
    icon?: string
    label?: string
    isTranslate?: boolean
    class?: string
  }
  type DropdownOption = {
    label: string
    value: string | number
    icon?: string
    children?: DropdownOption[] | readonly DropdownOption[]
    active?: boolean
    disabled?: boolean
    onClick?: <T = string | number>(command: T) => void
  }
}
