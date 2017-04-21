<template>
  <div class="movie-component">
    <div class="title-box">
      <span class="title blod">{{title}}</span>
      <div class="more">更多 ></div>
    </div>
    <div class="content">
      <ul class="list">
        <li class="item" v-for="movie in lists">
          <img :src="movie.images.large">
          <p class="name ellipsis">{{movie.title}}</p>
          <div class="rating">
            <span class="star full-star" v-for="i in movie.rating.fullStar"></span>
            <span class="star empty-star" v-for="i in movie.rating.emptyStar"></span>
            <span class="score">{{movie.rating.averageText}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fetch from '@/service/fetch';

export default {
  name: 'movieList',

  props: [
    'title',
    'api',
  ],

  data() {
    return {
      lists: [],
    };
  },

  mounted() {
    this.getMovie();
  },

  methods: {
    getMovie() {
      fetch(`${this.api}?start=0&count=10`)
        .then((res) => {
          this.lists = this.filter(res.data.subjects);
        });
    },

    filter(data) {
      return data.map((moive) => {
        const tmpMovie = { ...moive };

        // 星级计算
        if (tmpMovie.rating.average === 0) {
          tmpMovie.rating.averageText = '暂无评分';
          tmpMovie.rating.fullStar = 0;
          tmpMovie.rating.emptyStar = 0;
        } else {
          tmpMovie.rating.averageText = tmpMovie.rating.average;
          tmpMovie.rating.fullStar = Math.floor(tmpMovie.rating.average / 2);
          tmpMovie.rating.emptyStar = 5 - tmpMovie.rating.fullStar;
        }

        return tmpMovie;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/mixin.scss';

.movie-component {
  height: 2.55rem;
  padding-top: .01rem;
  border-bottom: .1rem solid #f9f9f9;

  &:last-child {
    border-bottom: none;
  }

  .title-box {
    margin: $size 0;
    padding: 0 $size;
    border-left: .03rem solid $gren;
  }

  .more {
    color: $gren;
    float: right;
  }

  .content {
    overflow: hidden;
  }

  .list {
    white-space: nowrap;
    font-size: 0;
    overflow-x: auto;
  }

  .item {
    font-size: $size;
    width: 1rem;
    padding-left: $size;
    display: inline-block;

    &:last-child {
      padding-right: $size;
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
}
</style>
