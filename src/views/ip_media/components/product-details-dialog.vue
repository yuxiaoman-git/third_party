<template>
  <el-form>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="产品名称"> {{ dataJson.name }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品类型"> {{ dataJson.type }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品状态">
            {{ dataJson.item_status }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="集数"> {{ dataJson.episodes }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="介质集数">
            {{ dataJson.medium_episodes }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最早卖出日期">
            {{ dataJson.sold_from }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="总时长">
            {{ dataJson.total_time }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权开始">
            {{ dataJson.authorized_start_time }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权结束">
            {{ dataJson.authorized_end_time }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等级"> {{ dataJson.grade }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权方式">
            {{ dataJson.authorized_way }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="版权风险">
            {{ dataJson.copyright_risk }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="清晰度"> {{ dataJson.clarity }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权权利"> {{ dataJson.right }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="站点限制">
            {{ dataJson.site_limit }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="法务合规">
            {{ dataJson.legal_compliance }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上游版权">
            {{ dataJson.up_copyright }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权描述">
            {{ dataJson.authorized_way_desc }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版权链">
            {{ dataJson.copy_chain }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注"> {{ dataJson.remark }} </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>媒体信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="媒体ID">
            {{ dataJson.media && dataJson.media.id }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="节目名称">
            {{ dataJson.media && dataJson.media.name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="节目别名">
            {{ dataJson.media && dataJson.media.alias }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="类型">
            {{ dataJson.media && dataJson.media.type }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄组">
            {{ dataJson.media && dataJson.media.age_group }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="受众">
            {{ dataJson.media && dataJson.media.audience_group }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导演">
            {{ dataJson.media && dataJson.media.director }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="编剧">
            {{ dataJson.media && dataJson.media.writers }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主演">
            {{ dataJson.media && dataJson.media.actor }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="题材">
            {{ dataJson.media && dataJson.media.theme }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评分"> {{ dataJson.media.rater }} </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上映时间">
            {{ dataJson.media && dataJson.media.play_time }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="播出平台">
            {{ dataJson.media.play_app }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发行许可证">
            {{ dataJson.media.publish_licence }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制作机构">
            {{ dataJson.media.make_company }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="看点">
            {{ dataJson.media.sparkle }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剧情介绍">
            {{ dataJson.media.plots }}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="扩展信息">
            {{ getExtensionStr(dataJson.media.extension || {}) }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>版权基本信息</span>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="版权文件名称">
            {{ dataJson.copyright.document_name }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="授权链是否完整">
            {{ dataJson.copyright.copyright_chain }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态标签">
            {{ dataJson.copyright.status_label }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="介质是否有龙标">
            {{ dataJson.copyright.film_release_licence }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>权利明细</span>
      </div>
      <el-table :data="dataJson.copyright.entities" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="is_white"
          label="黑白名单类型"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="entity_category_id"
          label="实体类型"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="entity_ids" label="实体" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="is_audio" label="音频权" width="80">
          <template slot-scope="{ row }">
            <span v-if="row.is_audio == 0">无</span>
            <span v-if="row.is_audio == 1">有</span>
            <span v-if="row.is_audio == 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_video" label="视频权" width="80">
          <template slot-scope="{ row }">
            <span v-if="row.is_video == 0">无</span>
            <span v-if="row.is_video == 1">有</span>
            <span v-if="row.is_video == 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="authorized_way"
          width="180"
          show-overflow-tooltip
          label="授权方式"
        >
        </el-table-column>
        <el-table-column
          prop="terminals"
          width="180"
          show-overflow-tooltip
          label="终端"
        >
        </el-table-column>
        <el-table-column
          prop="is_download"
          show-overflow-tooltip
          width="100"
          label="是否可下载"
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_download == 0">否</span>
            <span v-if="row.is_download == 1">是</span>
            <span v-if="row.is_download == 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="with_granted"
          width="180"
          show-overflow-tooltip
          label="转授权"
        >
        </el-table-column>
        <el-table-column
          prop="vip_pay"
          width="180"
          show-overflow-tooltip
          label="VIP付费"
        >
        </el-table-column>
        <el-table-column
          prop="is_safeguard"
          width="180"
          show-overflow-tooltip
          label="维权"
        >
          <template slot-scope="{ row }">
            <span v-if="row.is_safeguard == 0">否</span>
            <span v-if="row.is_safeguard == 1">是</span>
            <span v-if="row.is_safeguard == 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="editing_program"
          width="180"
          show-overflow-tooltip
          label="剪辑权"
        >
        </el-table-column>
        <el-table-column
          prop="extra"
          width="180"
          show-overflow-tooltip
          label="附加权"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </el-form>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    copyrightId: {
      type: Number,
    },
  },
  data() {
    return {
      dataJson: {
        media: {},
        copyright: {},
      },
      tableData: [],
    };
  },
  mounted() {
    this.copyright_product_list_details();
  },
  methods: {
    getExtensionStr(obj) {
      let str = "";
      Object.keys(obj).forEach((key) => {
        str += `${key}:${obj[key]},`;
      });
      return str;
    },
    async copyright_product_list_details() {
      const res = await this.$store.dispatch(
        "property/copyright_product_list_details",
        { id: this.id, copyright_id: this.copyrightId }
      );
      if (res.code == 0) {
        this.dataJson = res.data;
      }
    },
  },
};
</script>

<style scoped>
::v-deep .el-form-item__label::after {
  content: ":";
}
.box-card {
  margin-bottom: 10px;
}
</style>
