import fetch from './fetch';

export default {
  // 正在上映电影
  onlineMovie(count) {
    return fetch(`movie/in_theaters?count=${count}`);
  },

  // top250
  top250Movie(count) {
    return fetch(`movie/top250?count=${count}`);
  },

  // 北美票房版
  usaMovie(count) {
    return fetch(`movie/us_box?count=${count}`);
  },

  // 电影详情
  movieDetail(id) {
    return fetch(`movie/subject/${id}`);
  },
};
