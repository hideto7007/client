<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">メニュー</span>
        </v-card-title>
      <!-- サイドバーのコンテンツ -->
      <v-list>
        <v-list-item v-for="(item, index) in myPages" :key="item.title" link>
            <v-icon>{{ item.icon }}</v-icon>
            <v-btn variant="text" @click="myPagesList(index)">{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close">
            <v-icon
              start
              icon="mdi-arrow-left"
            ></v-icon>
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted  } from 'vue'
  

const emit = defineEmits()
const dialog = ref<boolean>(false)
  
interface MyPage {
  title: string;
  icon: string;
}

const props = defineProps<{
  dialog: boolean,
}>()

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
}

const close = () : void => {
  dialog.value = false
  // Header.vue側にメニューバー非表示にするために送信
  emit('myPageDialog', false)
}

onMounted(() => {
  if (props.dialog) {
    dialog.value = true
  }
})

</script>
  