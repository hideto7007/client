<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="secondary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Finance App</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="logout">
          <v-icon left>mdi-logout</v-icon> 
        </v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical" @click.stop="myPageDrawer = !myPageDrawer"></v-btn>
      </v-app-bar>

      <!-- ページメニュー -->
      <v-navigation-drawer
        v-model="drawer"
        location="left"
        :temporary="false"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-btn variant="text" @click="pageTransition(index)">{{ item.page }}</v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- 詳細情報一覧 -->
      <v-navigation-drawer
        v-model="myPageDrawer"
        location="right"
        :temporary="false"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in myPages"
            :key="index"
          >
            <v-btn variant="text" @click="myPageList(index)">{{ item.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 700px;">
        <!-- <PriceManagment /> -->
      </v-main>
    </v-layout>
  </v-card>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
// import PriceManagment from '../components/PriceManagment.vue'

const drawer = ref<boolean>(false)
const myPageDrawer = ref<boolean>(false)

interface Item {
  page: string;
  url: string;
}

interface MyPage {
  title: string;
  value: string;
}


const items = ref<Item[]>([
  {
    page: '貯金額計算',
    url: '/pricemanagement',
  },
  {
    page: '年収管理',
    url: 'no path',
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

const myPages = ref<MyPage[]>([
  {
    title: 'アカウント',
    value: 'account',
  },
  {
    title: 'おしらせ',
    value: 'notice',
  },
  {
    title: 'バージョン',
    value: 'version',
  },
  {
    title: '関連サイト',
    value: 'relation_site',
  },
])

watch(drawer, (beforeValue) : void => {
  if (beforeValue) {
    drawer.value = true
  } else {
    drawer.value = false
  }
})

watch(myPageDrawer, (beforeValue) : void => {
  if (beforeValue) {
    myPageDrawer.value = true
  } else {
    myPageDrawer.value = false
  }
})

const logout = () : void => {
  console.log("logout")
}

const pageTransition = (key: number) : void => {
  console.log(items.value[key].url)
  drawer.value = false
}
const myPageList = (key: number) : void => {
  console.log(myPages.value[key].value)
  myPageDrawer.value = false
}

onMounted(() => {
  console.log(drawer.value)
})

</script>
