<template>
  <div style="width: 30%;height: 30%;position: relative">
    <video
      class="video-player-box"
      :id="'videoElement' + id"
      name="videoElement"
      controls
      muted
      preload
    ></video>
    <div class="err-section" v-if="errLoad">
      <div class="err-signal">
        <img src="~@/assets/noSignal.svg" />
        <span style="margin-left: 2%">加载失败</span>
      </div>
      <div class="err-reload" @click="reload">点击重新加载</div>
    </div>
  </div>

  <!--  autoplay="true"-->
</template>

<script>
import flvjs from '@/utils/flv.min';
import { getVideoPay } from '@/api/request/home';
// import Img from '@/components/CImg/CImg'
export default {
  name: 'CVideo',
  // components: { Img },
  data() {
    return {
      flvPlayer: '',
      errLoad: false
    };
  },
  props: {
    // 视频地址
    sources: {
      type: String,
      default: ''
    },
    // 视频类型
    type: {
      type: String,
      default: 'flv'
    },
    // 视频索引,已弃用
    flagIndex: {
      type: Number,
      default: 0
    },
    // 设备id
    id: {
      type: String,
      default: ''
    }
  },
  watch: {
    id() {
      this.destoryVideo();
      this.getPlay();
    }
  },
  mounted() {
    this.getPlay();
  },
  destroyed() {
    this.destoryVideo();
  },
  methods: {
    reload() {
      this.getPlay();
    },
    getPlay() {
      this.errLoad = false;
      if (!this.sources || !this.id) {
        return;
      }
      getVideoPay(this.id).then(this.renderVideo);
    },
    renderVideo() {
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById('videoElement' + this.id);
        // const videoElement = document.getElementsByName('videoElement')[this.flagIndex]
        this.flvPlayer = flvjs.createPlayer(
          {
            type: this.type,
            url: this.sources,
            isLive: true,
            hasVideo: true
          }
          //   {
          // lazyLoadMaxDuration: 3 * 60,
          //   seekType: 'range',
          //   enableWorker: false, // 不启用分离线程
          //   enableStashBuffer: false, // 关闭IO隐藏缓冲区
          //   reuseRedirectedURL: true, // 重用301/302重定向url，用于随后的请求，如查找、重新连接等。
          //   autoCleanupSourceBuffer: true // 自动清除缓存
          // }
        );
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.on('error', err => {
          // console.log('err', err)
          if (err) {
            this.errLoad = true;
            this.destoryVideo();
          }
        });
        this.flvPlayer.load();
        const playPromise = this.flvPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.flvPlayer.play();
            })
            .catch(err => {
              if (err) {
                //   this.errLoad = true
                //   this.destoryVideo()
              }
            });
        }
      }
    },
    destoryVideo() {
      if (!this.flvPlayer) {
        return;
      }
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.video-player-box {
  background: RGBA(68, 87, 123, 1);
  width: 100%;
  height: 100%;
  //width: 30%;
  //height:30%;
  object-fit: fill;
}
.err-section {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -30%;
  margin-top: -20%;
  color: #ffffff;
  font-size: 20px;
  width: 60%;
  height: 50%;
  display: flex;
  //align-items: center;
  justify-content: center;
  flex-direction: column;
  .err-signal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .err-reload {
    color: #b2d2ff;
    font-size: 10px;
    margin-top: 4%;
    margin-left: 10%;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
}
</style>
