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