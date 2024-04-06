<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <v-btn
      @Click="goToFacturacion"
      color="primary w-100"
      class="mt-15"
      rounded="0
            "
      >Ir a facturacion</v-btn
    >
  </v-parallax>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToFacturacion = () => {
  router.push("/dashboard/facturacion");
};
</script>

<style scoped></style>
