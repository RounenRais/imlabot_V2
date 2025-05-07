import { createRouter, createWebHistory } from 'vue-router';

// Sayfa bileşenlerini import edin
import Home from '../src/views/home.vue';
import About from '../src/views/about.vue';
// import About from '../views/About.vue';
// import NotFound from '../views/NotFound.vue';

// Rotaları tanımlayın
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },   {
     path: '/about',
     name: 'About',
     component: About,
   },

];

// Router'ı oluşturun
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;