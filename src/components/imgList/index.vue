<template>
  <div class="slide-box" v-if="imgList.length">
    <div class="left-box" @click="moveCarousel(-1)">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div :style="{ width: `${getWidth * amount}px`, height: `${imgHeight}px` }">
      <el-carousel
        :interval="5000"
        :autoplay="autoplay"
        indicator-position="none"
        arrow="never"
        :height="`${imgHeight}px`"
        ref="cardShow"
      >
        <el-carousel-item
          v-for="(item, index) in group(imgList, amount)"
          :key="index"
        >
          <div
            class="img-box"
            :style="{
              width: `${imgWidth}px`,
              height: `${imgHeight}px`,
              marginRight: `${imgInterval}px`,
            }"
            :class="[item1.active ? 'active' : '']"
            v-for="(item1, i) in item"
            :key="i"
            @click="handleItem(item1)"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="`${
                item1.episode_horpic
              }?x-oss-process=image/resize,m_lfit,h_${parseInt(
                imgHeight
              )},w_${parseInt(imgWidth)}`"
              fit="contain"
            ></el-image>
            <span class="serial">第{{ item1.serial_num }}集</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="right-box" @click="moveCarousel(1)">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    imgWidth: {
      type: Number,
      default: () => {
        return 70;
      },
    },
    imgHeight: {
      type: Number,
      default: () => {
        return 70;
      },
    },
    amount: {
      type: Number,
      default: () => {
        return 5;
      },
    },
    imgInterval: {
      type: Number,
      default: () => {
        return 10;
      },
    },
    mediaId: {
      type: [String, Number],
      default: () => {
        return 0;
      },
    },
    give: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      loading: false,
      autoplay: false,
      imgList: [],
    };
  },
  computed: {
    getWidth() {
      return this.imgWidth + this.imgInterval;
    },
  },
  watch: {
    mediaId: {
      handler(id) {
        if (id) {
          this.galleryEpisodes(id);
        }
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    group(array, subGroupLength) {
      let index = 0;
      const newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    async galleryEpisodes(id) {
      this.loading = true;
      const res = await this.$store.dispatch("media/galleryEpisodes", {
        id,
        page: 1,
        page_size: 9999,
      });

      if (res && res.code === 0) {
        const list = (res.data && res.data.data_list) || [];
        this.imgList = list.filter((e) => e.episode_horpic);
      }
      this.loading = false;
    },
    moveCarousel(direction) {
      if (direction === -1) {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    },
    handleItem(item) {
      for (const item of this.imgList) {
        this.$set(item, "active", false);
      }
      this.$set(item, "active", true);
      this.$emit("returnBack", item.episode_horpic);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-box {
  display: flex;
  border: 1px solid #eee;
  padding: 7px;
  margin-bottom: 18px;
  .left-box {
    margin-right: 10px;
  }
  .left-box,
  .right-box {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.4s ease-in-out 0s;
  }
  .left-box:hover,
  .right-box:hover {
    background: #dfdfdf;
  }

  .img-box {
    float: left;
    border: 1px solid #eee;
    box-sizing: border-box;
    position: relative;
    .serial {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      color: #fff;
      font-size: 12px;
      padding: 2px 0;
    }
  }
  .img-box.active {
    border: 2px solid #409eff;
  }
}
</style>