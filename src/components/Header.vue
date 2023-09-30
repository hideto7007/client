<template>
  <div>
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

        <v-btn variant="text" icon="mdi-twitter"></v-btn>
        <v-btn variant="text" icon="mdi-facebook"></v-btn>
        <v-btn variant="text" icon="mdi-instagram"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical" @click.stop="myPageDrawer = !myPageDrawer"></v-btn>
      </v-app-bar>

      <v-main>
      </v-main>

    </v-layout>
  </v-card>
    <div v-if="drawer">
      <!-- ページメニュー -->
      <Sidebar @drawer="toggleDrawer" />
    </div>
    <div v-if="myPageDrawer">
      <!-- 設定一覧 -->
      <MyPage @myPageDrawer="toggleMyPageDrawer" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import MyPage from '../components/MyPage.vue'


const drawer = ref<boolean>(false)
const myPageDrawer = ref<boolean>(false)

// computedプロパティを使用してdrawerとmyPageDrawerの値を管理します
const computedDrawer = computed<boolean>({
  get: () => drawer.value,
  set: (value) => {
    drawer.value = value;
  },
})

const computedMyPageDrawer = computed<boolean>({
  get: () => myPageDrawer.value,
  set: (value) => {
    myPageDrawer.value = value;
  },
})

const toggleDrawer = () => {
  computedDrawer.value = true
}

const toggleMyPageDrawer = () => {
  computedMyPageDrawer.value = true
}

watch([drawer, myPageDrawer], ([], []) => {
  if (computedDrawer.value === true && computedMyPageDrawer.value === true) {
    computedDrawer.value = false
  }
})

const logout = () : void => {
  console.log("logout")
}

</script>
