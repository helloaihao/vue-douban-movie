import Vue from 'vue';
import Router from 'vue-router';
// import List from '@/components/List';
import Hello from '@/components/Hello';
import home from '@/views/home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
    },
    {
      path: '/hello',
      component: Hello,
    },
  ],
});
