<template>
    <v-navigation-drawer>
      <!-- サイドバーのコンテンツ -->
      <v-list>
        <v-list-item v-for="(item, index) in myPages" :key="item.title" link>
            <v-icon>{{ item.icon }}</v-icon>
            <v-btn variant="text" @click="myPagesList(index)">{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
<script setup lang="ts">
import { ref, defineEmits  } from 'vue'
  
const emit = defineEmits()
  
interface MyPage {
  title: string;
  icon: string;
}

const myPages = ref<MyPage[]>([
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
  {
    title: 'アカウント',
    icon: 'mdi-account-circle',
  },
  {
    title: 'バージョン',
    icon: '$vuetify',
  },
])
  
  const myPagesList = (key: number) : void => {
    console.log(myPages.value[key].title)
    // Header.vue側にメニューバー非表示にするために送信
    emit('myPageDrawer', false);
  }

</script>
  