<template>
  <Backgroud />
  <div class="register-container">
    <div class="register-form">
      <form class="container-form" @submit.prevent="register">
        <img class="img" :src="logo" alt="logo" />
        <div class="form-group">
          <input
            class="input"
            type="email"
            placeholder="Email Address"
            id="email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            class="input"
            type="password"
            placeholder="Password"
            id="password"
            v-model="password"
          />
        </div>
        <button class="btn" @onclick="register">Rigistrate</button>
        <p class="login-link">
          Ya tienes cuenta? <span @click="goToLogin">Logueate</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import Backgroud from "../components/Backgroud.vue";
import Logo from "../assets/logo-blanco-lineal.png";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const logo = Logo;
const router = useRouter();
const email = ref("");
const password = ref("");

const goToLogin = () => {
  router.push("/");
};

const goHome = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Registro exitoso",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    router.push("/");
  });
};

const api = "https://papolabackend.onrender.com/api/v1/auth/register";

const register = async () => {
  try {
    // Datos a enviar en la solicitud POST
    const data = {
      email: email.value,
      password: password.value,
    };

    // Realizar la solicitud POST
    const response = await axios.post(api, data);

    // Manejar la respuesta según sea necesario
    console.log(response.data);
    goHome();
  } catch (error) {
    // Manejar los errores de la solicitud
    console.error("Error al enviar la solicitud POST:", error);
    alert("error");
  }
};
</script>

<style scoped>
@import "../styles/register.css";
</style>
