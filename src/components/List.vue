<template>
  <div class="movie-component">
    <div class="title-box">
      <span class="title blod">{{title}}</span>
      <div class="more">更多 ></div>
    </div>
    <div class="content">
      <ul v-show="!loading && loadImgCount === lists.length" class="list">
        <li class="item" v-for="movie in lists" @click="$router.push(`/detail/${movie.id}`)">
          <img :src="movie.images.large" @load="loadImgCount ++">
          <p class="name ellipsis">{{movie.title}}</p>
          <div class="rating">
            <span class="star full-star" v-for="i in movie.rating.fullStar"></span>
            <span class="star empty-star" v-for="i in movie.rating.emptyStar"></span>
            <span class="score">{{movie.rating.averageText}}</span>
          </div>
        </li>
      </ul>
      <loading class="loading" v-show="loading" show="show"></loading>
    </div>
  </div>
</template>

<script>
import loading from '@/components/Loading';

export default {
  name: 'movieList',

  props: [
    'title',
    'api',
  ],

  data() {
    return {
      loadImgCount: 0,
      lists: [],
      loading: true,
    };
  },

  mounted() {
    this.api.then((res) => {
      this.loading = false;
      if (res.data) {
        res = res.data.subjects;
      }
      this.lists = this.filter(res);
    });
  },

  methods: {
    filter(data) {
      return data.map((movie) => {
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

        return tmpMovie;
      });
    },
  },

  components: { loading },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/mixin.scss';

.movie-component {
  height: 2.65rem;
  padding-top: .01rem;
  border-bottom: .1rem solid #f9f9f9;

  &:last-child {
    border-bottom: none;
  }

  .title-box {
    margin: $size 0;
    padding: 0 $size;
    border-left: .03rem solid $green;
  }

  .more {
    color: $green;
    float: right;
  }

  .content {
    overflow: hidden;
  }

  .list {
    white-space: nowrap;
    font-size: 0;
    overflow-x: auto;
    height: 2.08rem; // ios 上滑动顺畅
    -webkit-overflow-scrolling: touch;
  }

  .item {
    font-size: $size;
    width: 1rem;
    margin-left: $size;
    display: inline-block;

    &:last-child {
      margin-right: $size;
    }

    img {
      width: 1rem;
      height: 1.5rem;
      display: block;
    }

    .name {
      line-height: 200%;
      font-weight: bold;
    }

    .rating {
      font-size: 0;

      span {
        font-size: $size;

        &:nth-last-child(2) {
          margin-right: .05rem;
        }
      }

      .star {
        width: .1rem;
        height: .1rem;
        background-size: .1rem;
        display: inline-block;
      }

      .score {
        color: $gray;
      }
    }
  }

  .loading {
    margin: 0 auto;
  }
}
</style>
