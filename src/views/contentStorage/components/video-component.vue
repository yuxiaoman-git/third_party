<template>
  <el-dialog
    title="预览"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    :close-on-click-modal="false"
    width="500px"
  >
    <div style="text-align: center">
      <video controls autoplay width="450px" ref="videoElement" :src="url">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import mpegts from "mpegts.js";
export default {
  props: {
    visible: {
      type: Boolean,
    },
    url: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    isTs: {
      get() {
        const fileExtension = this.url.substring(this.url.lastIndexOf("."));
        return fileExtension === ".ts";
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  watch: {
    dialogVisible: {
      handler(flag) {
        this.$nextTick(() => {
          if (flag && this.isTs) {
            this.player = this.createPlayer();
            const videoElement = this.$refs.videoElement;
            if (this.player && videoElement) {
              this.player.attachMediaElement(videoElement);
              this.player.load();
              this.player.play();
            }
          }
        });
        if (!flag) {
          this.player_destroy();
        }
      },
    },
  },
  mounted() {},
  methods: {
    createPlayer() {
      if (mpegts.getFeatureList().mseLivePlayback) {
        return mpegts.createPlayer({
          type: "mse", // could also be mpegts, m2ts, flv
          isLive: true,
          url: this.url,
        });
      }
    },
    player_destroy() {
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
    },
  },
};
</script>

<style>
</style>