<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <v-app>
    <v-main>
      <Header />
        <router-view/>
    </v-main>
  </v-app>
</template>
