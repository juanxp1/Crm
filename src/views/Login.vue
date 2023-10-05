<template>
    <Backgroud />
    <div class="login-container">
        <div class="login-form">
            <form class="container-form" @submit.prevent="login">
                <img class="img" :src="logo" alt="logo" />
                <div class="form-group">
                    <input class="input" type="text" placeholder="Email Address" id="username" v-model="username" />
                </div>
                <div class="form-group">
                    <input class="input" type="password" placeholder="Password" id="password" v-model="password" />
                </div>
                <div class="form">
                    <input class="checkbox" type="checkbox" id="rememberMe" v-model="rememberMe" />
                    <label for="rememberMe">Recuérdame</label>
                </div>
                <button @click="goHome" class="btn" type="submit">Iniciar sesión</button>
                <a @click="goToRegister">
                    <p class="registrar">No tienes usuario? Click<span> here</span>
                        para registrar.</p>
                </a>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import Backgroud from '../components/Backgroud.vue';
import Logo from '../assets/logo-blanco-lineal.png';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const logo = Logo;
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const router = useRouter();

const login = () => {

};

const goHome = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        router.push('/dashboard');
    });
}

const goToRegister = () => {
    router.push('/register');
};
</script>
  
<style scoped>
@import '../styles/login.css';
</style>
  