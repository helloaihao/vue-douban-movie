<template>
  <div class="hello">
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <movie-footer active-item="2"></movie-footer>
  </div>
</template>

<script>
import movieFooter from '@/components/Footer';

export default {
  name: 'hello',

  computed: {
    count() {
      return this.$store.state.count;
    },
  },

  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    },
  },

  components: { movieFooter },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
