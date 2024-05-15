# Vue 3 + TypeScript + Vite
## finance app

- 環境構築コマンド
```
npm create vite@latest app --template vue-ts
cd app
npm intsall
npm run dev

npm install vuetify@next
npm install axios
npm install vue-router@next
npm install @vue/compiler-sfc
npm install vue-class-component
npm install --save @mdi/font

// main.tsを以下のように修正
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import "vuetify/dist/vuetify.min.css"
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // 使用するアイコンフォントを指定
  },
})

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')

```

- docker環境構築
  ```bash
  # new docker images command
  docker build -t client .
  docker container run -it -v ${home directory}/money_management/client:/client --name client client
  
  # windows
  docker container run -it -v ${home directory}\\money_management\\client:/client --name client client
  
  # again docker container
  docker start client
  docker container exec -it client /bin/bash
  ```

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
