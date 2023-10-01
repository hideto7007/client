<template>
    <v-footer 
        class="text-center d-flex flex-column"
        style="height: 600px">
      <v-toolbar-title>バージョン 0.1</v-toolbar-title>
      <v-divider :thickness="8" inset></v-divider>
  
      <div>
        <v-btn
          v-for="(icon, index) in icons"
          :key="icon.icon"
          class="mx-4"
          :icon="icon.icon"
          variant="text"
          @click="iconClick(index)"
        ></v-btn>
      </div>
      
      <v-divider></v-divider>
  
      <div>
          <strong>Copyright @</strong> {{ new Date().getFullYear() }}<strong> Finance App Corp.</strong>
      </div>
    </v-footer>
</template>

<script setup lang="ts">
import { ref, defineEmits  } from 'vue'
// import router from '../router'

interface Icon {
    icon: string
    url: string
}

const icons = ref<Icon[]>([
    {
        icon: 'mdi-facebook',
        url: 'no path'
    },
    {
        icon: 'mdi-twitter',
        url: 'no path'
    },
    {
        icon: 'mdi-linkedin',
        url: 'no path'
    },
    {
        icon: 'mdi-instagram',
        url: 'no path'
    }
])

const iconClick = (key: number) : void => {
    console.log(icons.value[key].url)
    // router.push(icons.value[key].url)
}
</script>