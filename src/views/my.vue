<template>
  <div>
    <div class="header">
      <img src="../assets/images/my-pic.jpeg" alt="头像">
      <p>吃光大萝卜</p>
    </div>
    <section>
      <List title="想看" :api="myWant"></List>
      <List title="已看" :api="myHas"></List>
    </section>
    <movie-footer active-item="2"></movie-footer>
  </div>
</template>

<script>
import List from '@/components/List';
import movieFooter from '@/components/Footer';

export default {
  data() {
    return {
      myWant: new Promise(resolve => resolve(this.$store.getters.findWantSee)),
      myHas: new Promise(resolve => resolve(this.$store.getters.findHasSee)),
    };
  },

  components: { List, movieFooter },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/mixin.scss';

.header {
  height: 2rem;
  background: #59c76b;
  padding-top: .01rem;

  img {
    display: block;
    margin: .3rem auto .2rem auto;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  p {
    text-align: center;
    color: #fff;
    font-size: 1.5 * $size;
  }
}

section {
  margin-bottom: .45rem;
}
</style>
