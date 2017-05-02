<template>
  <div v-if="movie.id">
    <header>
      <div class="head" :style="{background: `url(${movie.images.large})`, backgroundSize: '100%'}">
        <div class="mask"></div>
        <img :src="movie.images.large" alt="">
        <div class="head-info">
          <p class="title ellipsis">{{ movie.title }}</p>
          <p class="title ellipsis" v-show="movie.title !== movie.original_title">{{ movie.original_title }}</p>
          <div class="score">
            <div class="score-item">
              <p class="rating-text">{{ movie.rating.averageText }}</p>
            </div>
            <div class="score-item">
              <div class="rating-star">
                <span class="star full-star" v-for="i in movie.rating.fullStar"></span>
                <span class="star empty-star" v-for="i in movie.rating.emptyStar"></span>
              </div>
              <p class="rating-count">{{ movie.ratings_count }}人评价</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section>
      <p class="genres">
        {{ movie.genres.join(' / ') }}
      </p>
      <p class="countries">
        {{ movie.year }}年上映 {{ movie.countries.join(' / ') }}
      </p>
      <p class="casts">
        {{ movie.people.join(' / ') }}
      </p>
      <div class="see-btn">
        <div class="btn btn-want" @click="addWantSee(movie)" v-show="state !== 2">{{state === 1 ? '取消' : ''}}想看</div>
        <div class="btn btn-has" @click="addHasSee(movie)" :class="{width100: state === 2}">{{state === 2 ? '取消' : ''}}已看</div>
      </div>
      <h4 class="summary-title">{{ movie.title }}剧情简介</h4>
      <p class="summary">{{ movie.summary }}</p>
    </section>
  </div>
</template>

<script>
import Api from '@/service/api';

export default {
  data() {
    return {
      movie: {},
      id: 0,
      state: 0, // 1-想看 2-已看
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    Api.movieDetail(this.id).then(res => (this.movie = this.filter(res.data)));
    this.$store.state.myMovie.forEach((m) => {
      if (this.id === m.id) {
        this.state = m.seeState;
      }
    });
  },

  methods: {
    filter(movie) {
      const tmpMovie = { ...movie };

      // 星级计算
      if (tmpMovie.rating.average === 0) {
        tmpMovie.rating.averageText = '暂无评分';
        tmpMovie.rating.fullStar = 0;
        tmpMovie.rating.emptyStar = 0;
      } else {
        tmpMovie.rating.averageText = tmpMovie.rating.average.toFixed(1);
        tmpMovie.rating.fullStar = Math.round(tmpMovie.rating.average / 2);
        tmpMovie.rating.emptyStar = 5 - tmpMovie.rating.fullStar;
      }

      // 导演明星
      tmpMovie.people = tmpMovie.casts.map(cast => cast.name);
      tmpMovie.people.unshift(`${tmpMovie.directors[0].name}(导演)`);
      tmpMovie.people = tmpMovie.people.slice(0, 4);

      return tmpMovie;
    },

    addWantSee(movie) {
      if (this.state) {
        this.$store.commit('removeMovie', movie);
        this.state = 0;
      } else {
        this.$store.commit('addWantSee', movie);
        this.state = 1;
      }
    },

    addHasSee(movie) {
      if (this.state === 2) {
        this.$store.commit('removeMovie', movie);
        this.state = 0;
      } else if (this.state === 1) {
        this.$store.commit('removeMovie', movie);
        this.$store.commit('addHasSee', movie);
        this.state = 2;
      } else {
        this.$store.commit('addHasSee', movie);
        this.state = 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/mixin.scss';

.head {
  height: 1.8rem;
  background-size: 100% auto;
  position: relative;
  margin-bottom: .35rem;

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  img {
    position: absolute;
    width: 1rem;
    height: 1.5rem;
    left: $size;
    bottom: -$size;
  }

  .head-info {
    position: absolute;
    left: 1.3rem;
    top: .7rem;

    .title {
      color: #fff;
      font-size: .2rem;
      font-weight: 200;
      width: 2.3rem;
    }

    .score {
      margin-top: .1rem;

      &-item {
        display: inline-block;
        padding-right: .05rem;
      }

      .rating-text {
        color: #fff;
        font-size: .36rem;
      }

      .rating-count {
        color: #bdbdbd;
        font-size: .12rem;
      }

      .rating-star {
        height: .15rem;
        font-size: 0;

        span {
          font-size: $size;
        }

        .star {
          width: .1rem;
          height: .1rem;
          background-size: .1rem;
          display: inline-block;
        }
      }
    }
  }
}

section {
  padding: 0 $size;

  .see-btn {
    margin: .2rem 0;

    .btn {
      display: inline-block;
      width: 48%;
      height: .3rem;
      line-height: .3rem;
      text-align: center;
      border: solid 1px #ff9900;
      border-radius: .05rem;
      color: #ff9900;
      background: #fff;

      &:nth-child(2) {
        margin-left: .09rem;
      }

      &.width100 {
        width: 100%;
        margin-left: 0;
      }
    }
  }

  .summary-title {
    color: $gray;
    font-size: $size;
    line-height: 300%;
  }

  .summary {
    word-break: break-all;
  }
}
</style>
