import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const developmentProxy = {
    "/api": {
      target: `http://${env.VITE_API_DEV_HOST}`,
      changeOrigin: true,
      secure: false,
      rewrite: (path: string) => path.replace(/^\/api/, "")
    }
  }

  return {
    plugins: [
      {
        name: "html-transform",
        transformIndexHtml (html) {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${env.VITE_APP_LOGO}</title>`
          )
        }
      },
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(process.cwd(), "src/assets/icons")
        ],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      })
    ],
    base: env.VITE_APP_BASE,
    build: {
      outDir: 'docs',
      assetsDir: "assets",
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks (id) {
            if (id.includes("node_modules")) {
              const modules = id.toString().split("node_modules/")[1].split("/")[0].toString()
              if (modules.indexOf("egjs") > -1) return "egjs"
              if (modules.indexOf("swiper") > -1) return "swiper"
              if (modules.indexOf("element-plus") > -1) return "element-plus-" + modules.indexOf("element-plus")
              return "vendor"
            }
          },
          sanitizeFileName (name) {
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : "";
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
            );
          }
        }
      }
    },
    server: {
      proxy: developmentProxy
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    }
  }
})
