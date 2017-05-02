<template>
  <footer>
    <div class="footer-item" :class="{active: activeItem === '1'}" @click="showHome()">
      <div class="item-box">
        <svg class="icon" aria-hidden="true" v-show="activeItem === '1'">
          <use xlink:href="#icon-dianying"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="activeItem !== '1'">
          <use xlink:href="#icon-dianying1"></use>
        </svg>
        <p>电影</p>
      </div>
    </div>
    <div class="footer-item" :class="{active: activeItem === '2'}" @click="showMy()">
      <div class="item-box my-icon">
        <svg class="icon" aria-hidden="true" v-show="activeItem === '2'">
          <use xlink:href="#icon-ren"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="activeItem !== '2'">
          <use xlink:href="#icon-ren1"></use>
        </svg>
        <p>我的</p>
      </div>
    </div>
  </footer>
</template>

<script scoped>
export default {
  name: 'footer',

  props: ['activeItem'],

  methods: {
    showHome() {
      this.$router.push('/');
    },
    showMy() {
      this.$router.push('my');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/mixin.scss';

footer {
  display: flex;
  position: fixed;
  background: #fff;
  width: 100%;
  bottom: 0;
  height: .45rem;

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .footer-item {
    flex: 1;

    &.active {
      color: $green;
    }

    .item-box {
      width: .3rem;
      height: .45rem;
      margin: 0 auto;

      &.my-icon {
        width: .25rem;
      }

      p {
        margin-top: -.05rem;
        font-size: .12rem;
        text-align: center;
      }

      .icon {
        width: 100%;
        height: .3rem;
      }
    }
  }
}
</style>
