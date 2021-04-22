<template>
  <div class>
    <div>HLS Live / 直播</div>
    <video-player
      class="vjs-custom-skin"
      :options="playerOptions"
      @ready="playerReadied"
    ></video-player>
  </div>
</template>

<script>
// custom skin css
// import "../../common/custom-theme.css";

// videojs
import videojs from 'video.js';
window.videojs = videojs;

// hls plugin for videojs6
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

// export
export default {
  data() {
    return {
      playerOptions: {
        // videojs and plugin options
        height: '360',
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src:
              'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
          }
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: '../../assets/logo.png'
      }
    };
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options;
      };
    }
  }
};
</script>

<style type="text/css"></style>
