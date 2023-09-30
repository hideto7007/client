<template>
    <q-drawer
      v-model="showSidebar"
      side="left"
      bordered
      content-class="bg-primary text-white"
    >
      <!-- サイドバーのコンテンツをここに配置 -->
      <div class="q-pa-md">
        <p>Sidebar Content</p>
      </div>
    </q-drawer>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        showSidebar: false,
      };
    },
  };
  </script>
  
  <style scoped>
  /* スタイルを追加 */
  </style>
  