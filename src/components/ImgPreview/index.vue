<template>
  <div>
    <el-popover :placement="placement" trigger="hover" :open-delay="200">
      <el-image :src="src" style="max-width: 400px"> </el-image>
      <el-image
        :style="{ width: width, height: height, verticalAlign: 'middle' }"
        :src="`${src}?x-oss-process=image/resize,m_lfit,w_${parseInt(width)}`"
        :fit="fit"
        slot="reference"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "ImgPreview",
  props: {
    src: {
      type: String,
      default: () => {
        return "";
      },
    },
    width: {
      type: String,
      default() {
        return "30px";
      },
    },
    height: {
      type: String,
    },
    placement: {
      type: String,
      default: () => {
        return "right";
      },
    },
    fit: {
      type: String,
      default: () => {
        return "fit";
      },
    },
  },
  mounted() {},
};
</script>

<style>
</style>