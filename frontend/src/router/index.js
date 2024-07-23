import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginView },
  { path: '/dashboard', component: DashboardView }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
