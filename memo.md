```
interface sideItem {
  title: string;
  icon: string;
}

const sideItems = ref<sideItem[]>([
  {
    title: 'ホーム',
    icon: 'mdi-home',
  },
  {
    title: 'ダッシュボード',
    icon: 'mdi-view-dashboard',
  },
  {
    title: '設定',
    icon: 'mdi-cog',
  },
])
```

- unittest exec command

```bash

# test exec command
npm run test

# test file in describe or it get information
npm run test -- --verbose


# test coverage check command
npm run test -- --coverage


# test one file check command
npm run test -- test/components/alert.spec.ts

# Node.jsとnpmのバージョンを更新
RUN npm install -g n
RUN n stable

# Vue.jsのインストール
RUN npm install -g @vue/cli
```
