<template>
    <div>
    <v-btn 
        color="orange-darken-2"
        icon="mdi-arrow-left" 
        @click="back"
    ></v-btn>
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
    </div>
</template>

<script setup lang="ts">
import { ref  } from 'vue'
import router from '@/router'

interface Icon {
    icon: string
    url: string
}

const icons = ref<Icon[]>([
    {
        icon: 'mdi-facebook',
        url: 'https://www.facebook.com/'
    },
    {
        icon: 'mdi-twitter',
        url: 'https://twitter.com/'
    },
    {
        icon: 'mdi-linkedin',
        url: 'https://www.linkedin.com/'
    },
    {
        icon: 'mdi-instagram',
        url: 'https://www.instagram.com/'
    }
])

const iconClick = (key: number) : void => {
    console.log(icons.value[key].url)
    window.location.href = icons.value[key].url
}

const back = () : void => {
    router.go(-1)
}
</script>