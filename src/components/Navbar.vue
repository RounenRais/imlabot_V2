<script>
import { RouterLink,RouterView } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css'

</script>
<template>
<nav class="navbar">
  
    <router-link class="navLink" to="/">Anasayfa</router-link>
    <router-link class="navLink" to="/about"> Hakkında</router-link>
    <router-link class="navLink" to="/pachnotes"> Yama Notları</router-link>

    <a class="navLink nav-source" href="https://github.com/RounenRais/imlabot_V2"><i class="fab fa-github"></i> Kaynak Kodu</a>

    
  
</nav>

</template>