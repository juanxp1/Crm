<template>
  <v-card class="index" rounded="0">
    <v-layout>
      <v-navigation-drawer
        class="custom-drawer"
        :v-model="store.drawer"
        :width="260"
        :rail="store.rail"
        color="grey-darken-4"
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-icon="mdi-domain"
            class="toggle"
            title="Jacgsaw"
            @click="toggle"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            prepend-icon="mdi mdi-home"
            title="Inicio"
            value="Inicio"
          ></v-list-item>
          <v-list-item
            @click="pushDash"
            prepend-icon="mdi mdi-view-dashboard"
            class="bg-primary"
            title="Dashboard"
            value="Tablero"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cart"
            title="Gestionar Tienda"
            value="Actividades"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi mdi-account-group"
            title="Gestion de Usuarios"
            value="Actividades"
            class="mdi mdi-menu-down"
            @Click="toggleApoyos"
          ></v-list-item>
          <!-- Opciones desplegables -->
          <v-list v-if="showApoyos" class="text-end list">
            <v-list-item class="hover">
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list-item
            prepend-icon="mdi-cash-register"
            title="POS System"
            value="Actividades"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-logout"
            title="Cerrar Sesion"
            value="Actividades"
            @click="cerrarSesion"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main> <Navbar /><router-view /> </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAppStore } from "@/store/app";
import Navbar from "../default/AppBar.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useAppStore();
const showApoyos = ref(false);

const toggle = () => store.sideBar();

const toggleApoyos = () => {
  if (store.rail === true) {
    showApoyos.value = !false;
  }
  showApoyos.value = !showApoyos.value;
};

const pushDash = () => {
  router.push("/dashboard");
};

const cerrarSesion = () => {
  router.push("/");
};
</script>

<style scoped>
.hover:hover {
  background-color: #594d95;
  color: white;
  cursor: pointer;
}

.toggle {
  cursor: pointer;
}

.hover {
  padding: 0;
  margin: 0;
  text-align: start;
  background-color: rgb(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .index {
    z-index: 99999;
  }

  .custom-drawer {
    min-width: 100%;
  }
}
</style>
