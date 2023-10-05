<template>
  <v-app>
    <SidebarVue />
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import SidebarVue from './Sidebar.vue';
</script>
