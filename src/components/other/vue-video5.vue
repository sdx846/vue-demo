<template>
  <div class>
    <div>rtmp flash / 流媒体</div>
    <video-player
      class="vjs-custom-skin"
      :options="playerOptions"
    ></video-player>
  </div>
</template>

<script>
import 'videojs-flash';
export default {
  data() {
    return {
      playerOptions: {
        height: '360',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
          }
        ],
        techOrder: ['flash'],
        autoplay: false,
        controls: true,
        poster: '../../assets/logo.png'
      }
    };
  }
};
</script>

<style type="text/css"></style>
