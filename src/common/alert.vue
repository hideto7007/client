<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
     <v-card>
        <v-toolbar
          color="error"
          :title="props.title"
        ></v-toolbar>
        <v-card-text>
          <div 
            class="text-h4 pa-12">{{ props.text }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="text"
            @click="homeReturn"
          >閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import router from '../router'

const dialog = ref<boolean>(true)
// プロップを定義
const props = defineProps<{
  title: string,
  text: string
}>();

const homeReturn = (): void => {
  dialog.value = false
  router.push('/')
}
</script>