<template>
  <Backgroud />
  <div class="login-container">
    <div class="login-form">
      <form class="container-form" @submit.prevent="login">
        <img class="img" :src="logo" alt="logo" />
        <div class="form-group">
          <input
            class="input"
            type="text"
            placeholder="Email Address"
            v-model="email"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
            autocomplete="password"
          />
        </div>
        <button @onclick="login" class="btn">Iniciar sesión</button>
        <a @click="goToRegister">
          <p class="registrar">
            No tienes usuario? Click<span> here</span> para registrar.
          </p>
        </a>
      </form>
    </div>
  </div>
</template>

<script setup>
import Backgroud from "../components/Backgroud.vue";
import Logo from "../assets/logo-blanco-lineal.png";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios"; // Corrección aquí

const logo = Logo;
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const router = useRouter();

const goToRegister = () => {
  router.push("/register");
};

const goHome = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Bienvenido",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    router.push("/dashboard");
  });
};

const api = "https://papolabackend.onrender.com/api/v1/auth/login";

const login = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
    };

    // Realizar la solicitud POST
    const response = await axios.post(api, data);

    // Manejar la respuesta según sea necesario
    console.log(response.data);

    // Si el inicio de sesión fue exitoso, redireccionar al dashboard
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      goHome();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo iniciar sesión. Por favor, verifica tus credenciales.",
      });
    }
  } catch (error) {
    console.error("Error al enviar la solicitud POST:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};
</script>

<style scoped>
@import "../styles/login.css";
</style>
