<template>
  <div>
  <v-card>
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="pageDrawer = !pageDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title type="button" @click="returnTitle">Finance App</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="logout">
          <v-icon left>mdi-logout</v-icon> 
        </v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical" @click="myPageDialogAction"></v-btn>
      </v-app-bar>

      <v-main>
      </v-main>

    </v-layout>
  </v-card>
    <div v-if="pageDrawer">
      <!-- ページメニュー -->
      <Sidebar @pageDrawer="togglePageDrawer" />
    </div>
    <div v-if="myPageDialog">
      <!-- 設定一覧 :dialog="true"-->
      <MyPage
        :dialog="true"
        @myPageDialog="toggleMyPageDialog" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import MyPage from '../components/MyPage.vue'
import router from '../router'

const pageDrawer = ref<boolean>(false)
const myPageDialog = ref<boolean>(false)

const togglePageDrawer = (val: boolean) : void => {
  pageDrawer.value = val
}

const myPageDialogAction = () : void => {
  myPageDialog.value = !myPageDialog.value
}

const toggleMyPageDialog = (val: boolean) : void => {
  myPageDialog.value = val
}

const returnTitle = () : void => {
  router.push('/')
  console.log("click")
}

watch(pageDrawer, (beforeValue) : void => {
  if (beforeValue) {
    pageDrawer.value = true
  } else {
    pageDrawer.value = false
  }
})

watch(myPageDialog, (beforeValue) : void => {
  if (beforeValue) {
    myPageDialog.value = true
  } else {
    myPageDialog.value = false
  }
})

const logout = () : void => {
  console.log("logout")
}

</script>
