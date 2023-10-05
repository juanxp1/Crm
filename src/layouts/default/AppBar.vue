<template>
  <v-toolbar density="compact" color="blue-grey-darken-4">
    <v-app-bar-nav-icon @click="toggle"></v-app-bar-nav-icon>
    <v-toolbar-title>Jacgsaw</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { useAppStore } from '@/store/app';
const store = useAppStore();

// const toggle = () => store.sideBar();


const toggle = () => {
  store.sideBar();
  // store.setDrawer();
};

</script>

<style  scoped></style>