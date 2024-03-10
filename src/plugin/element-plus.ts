import "element-plus/dist/index.css"

import { Plugin } from "vue"
import { ElLoading } from "element-plus"

const install: Plugin = (app) => {
  app.use(ElLoading)
}

export default install
