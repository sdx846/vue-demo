<template>
  <div class>
    <div>AudioTrack && playsinline / 音轨 及 移动端不全屏</div>
    <video-player
      class="vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
      @ready="playerReadied($event)"
    ></video-player>
  </div>
</template>

<script>
import videojs from "video.js";
export default {
  data() {
    return {
      playerOptions: {
        height: "360",
        playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
        sources: [
          {
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L"
          }
        ],
        poster:
          "../../assets/logo.png"
      }
    };
  },
  methods: {
    playerReadied(player) {
      const track = new videojs.AudioTrack({
        id: "my-spanish-audio-track",
        kind: "translation",
        label: "Spanish",
        language: "es"
      });
      player.audioTracks().addTrack(track);
      // Get the current player's AudioTrackList object.
      const audioTrackList = player.audioTracks();

      // Listen to the "change" event.
      audioTrackList.addEventListener("change", function() {
        // Log the currently enabled AudioTrack label.
        for (let i = 0; i < audioTrackList.length; i++) {
          const track = audioTrackList[i];
          if (track.enabled) {
            videojs.log(track.label);
            return;
          }
        }
      });
    }
  }
};
</script>

<style type="text/css">
</style>
