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


<script setup lang="ts">
import { ref, watch } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import MyPage from '../components/MyPage.vue'


const drawer = ref<boolean>(false)
const myPageDrawer = ref<boolean>(false)

const toggleDrawer = (val: boolean) => {
  drawer.value = val
}

const toggleMyPageDrawer = (val: boolean) => {
  myPageDrawer.value = val
}

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

watch([drawer, myPageDrawer], ([], []) => {
  if (drawer.value === true && myPageDrawer.value === true) {
    drawer.value = false
  }
})

const logout = () : void => {
  console.log("logout")
}

</script>
