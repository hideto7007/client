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

        <v-btn variant="text" icon="mdi-dots-vertical" @click="myPage"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        :temporary="false"
        :mini-variant-width="34"
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

      <v-main style="height: 500px;">
        <PriceManagment />
      </v-main>
    </v-layout>
  </v-card>
</template>


<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import PriceManagment from '../components/PriceManagment.vue'

const drawer = ref<boolean>(false)

interface Item {
  page: string;
  url: string;
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

watch(drawer, (beforeValue) : void => {
  if (beforeValue) {
    drawer.value = true
  } else {
    drawer.value = false
  }
})

const logout = () : void => {
  console.log("logout")
}

const pageTransition = (key: number) : void => {
  console.log(items.value[key].url)
}

const myPage = () : void => {
  console.log("myPage")
}

onMounted(() => {
  console.log(drawer.value)
})

</script>
