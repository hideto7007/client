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

```