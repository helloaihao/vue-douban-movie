<template>
  <div class="app">
    <h1 v-show="webTitle" id="web-title">豆瓣评分</h1>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import com from '@/common/common';

export default {
  data() {
    return {
      webTitle: false,
    };
  },
  created() {
    if (!com.isWeChat()) {
      this.webTitle = true;
    }
  },
};
</script>

<style lang="scss">
@import './assets/sass/common.scss';


#web-title {
  text-align: center;
  font-size: .18rem;
  padding: .2rem 0 .05rem 0;
  color: #fff;
  background: #42bd56;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
