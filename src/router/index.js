import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store/index";
import HomeView from '@/views/HomeView.vue';
import FavoriteView from '@/views/FavoriteView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: route => ({
      page: 1,
      category: route.query.category || "",
      area: route.query.area || "",
      time: route.query.time || "",
      ingredient: route.query.ingredient || "",
      title: route.query.title || "",
    })

  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoriteView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const fieldsToSync = ['page', 'area', 'time', 'ingredient', 'category', 'query'];

const updateQuery = () => {
  const query = { ...router.currentRoute.query };

  fieldsToSync.forEach(field => {
    query[field] = store.state[field] || '';
  });

  router.replace({ ...router.currentRoute, query });
};

fieldsToSync.forEach(key => {
  store.watch(
    state => state[key],
    () => {
      updateQuery();
    }
  );
});


router.afterEach((to, from) => {
  if (to.name !== 'favorites') {
    fieldsToSync.forEach(key => {
      if (to.query[key] !== store.state[key]) {
        if (key === 'page' && !to.query.page) {
          to.query.page = 1;
        }
        store.commit('set', { key, value: to.query[key] || '' });
      }
    });
  }
});

export default router;
