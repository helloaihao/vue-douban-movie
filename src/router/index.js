import Vue from 'vue';
import Router from 'vue-router';
/* eslint-disable global-require */
const home = r => require.ensure([], () => r(require('@/views/home')), 'home');
const my = r => require.ensure([], () => r(require('@/views/my')), 'my');
const detail = r => require.ensure([], () => r(require('@/views/detail')), 'detail');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
    },
    {
      path: '/my',
      component: my,
    },
    {
      path: '/detail/:id',
      component: detail,
    },
  ],
});
