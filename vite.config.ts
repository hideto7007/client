import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "^/api*": {
        target: 'http://host.docker.internal:8080', // このURLをサーバーのベースURLに置き換えてください
        changeOrigin: true,
        rewrite: (path) => path.replace("^/api", ""),
      },
    },
  },
})


// TODO
// ローカルサーバーで実行する際のIP http://localhost:8080
// dockerコンテナ起動した際のIP http://host.docker.internal:8080