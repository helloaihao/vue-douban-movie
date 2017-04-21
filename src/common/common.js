export default {
  // 判断是否为微信
  isWeChat() {
    const ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    return ua ? ua.toString() === 'micromessenger' : false;
  },
};
