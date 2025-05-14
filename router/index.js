import { createRouter, createWebHistory } from 'vue-router';

// Sayfa bileşenlerini import edin
import Home from '../src/views/home.vue';
import About from '../src/views/about.vue';
import PachNotes from '../src/views/pachnotes.vue';
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
   {
    path: '/pachnotes',
    name: 'PachNotes',
    component: PachNotes,
  },
];

// Router'ı oluşturun
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;