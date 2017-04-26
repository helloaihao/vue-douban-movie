<template>
  <div class="home">
    <movie-header></movie-header>
    <section>
      <List title="正在上映" :api="onlineMovieApi"></List>
      <List title="TOP250" :api="topMovieApi"></List>
    </section>
    <movie-footer active-item="1"></movie-footer>
  </div>
</template>

<script>
import List from '@/components/List';
import Api from '@/service/api';
import movieHeader from '@/components/Header';
import movieFooter from '@/components/Footer';

export default {
  data() {
    return {
      onlineMovieApi: Api.onlineMovie,
      topMovieApi: Api.topMovie,
    };
  },

  components: { List, movieHeader, movieFooter },
};
</script>
