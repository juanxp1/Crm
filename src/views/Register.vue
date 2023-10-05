<template>
    <Backgroud />
    <div class="register-container">
        <div class="register-form">
            <form class="container-form" @submit.prevent="register">
                <img class="img" :src="logo" alt="logo" />
                <div class="form-group">
                    <input class="input" type="text" placeholder="Username" id="username" v-model="username" />
                </div>
                <div class="form-group">
                    <input class="input" type="email" placeholder="Email Address" id="email" v-model="email" />
                </div>
                <div class="form-group">
                    <input class="input" type="password" placeholder="Password" id="password" v-model="password" />
                </div>
                <button class="btn" type="submit">Rigistrate</button>
                <p class="login-link">Ya tienes cuenta? <span @click="goToLogin">Logueate</span></p>
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
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');

const register = () => {
    
};

const goToLogin = () => {
    router.push('/');
};
</script>

<style scoped>
@import '../styles/register.css';
</style>
