<template>
  <v-navigation-drawer
    location="left"
    permanent
    width="120">
    <!-- サイドバーのコンテンツ -->
    <v-list>
      <v-list-item v-for="(item, index) in pages" :key="item.page" link>
        <v-btn variant="text" @click="pageTransition(index)">{{ item.page }}</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, defineEmits  } from 'vue'
import router from '../router';

const emit = defineEmits()

interface Item {
  page: string;
  url: string;
}

const pages = ref<Item[]>([
  {
    page: '貯金額計算',
    url: '/pricemanagement',
  },
  {
    page: '年収管理',
    url: '/about',
  },
  {
    page: 'piyo',
    url: 'no path',
  },
  {
    page: 'hoge',
    url: 'no path',
  },
])

const pageTransition = (key: number) : void => {
  console.log(pages.value[key].url)
  router.push(pages.value[key].url)
  // Header.vue側にメニューバー非表示にするために送信
  emit('pageDrawer', false);
}

</script>