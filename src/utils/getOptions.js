
export const options = [
  {
    value: "movie",
    label: "电影",
  },
  {
    value: "tvseries",
    label: "电视剧",
  },
  {
    value: "animation",
    label: "动漫",
  },
  {
    value: "animation_movie",
    label: "动漫电影",
  },
  {
    value: "web_movie",
    label: "网络电影",
  },
  {
    value: "sport",
    label: "体育",
  },
  {
    value: "travel",
    label: "旅游",
  },
  {
    value: "web_tv",
    label: "网剧",
  },
  {
    value: "variety",
    label: "综艺",
  },
  {
    value: "education",
    label: "教育",
  },
  {
    value: "mother_baby",
    label: "母婴",
  },
  {
    value: "game",
    label: "游戏",
  },
  {
    value: "short_film",
    label: "短片",
  },
  {
    value: "documentary",
    label: "纪录片",
  },
  {
    value: "square_dance",
    label: "广场舞",
  },
  {
    value: "SPECIAL_COLUMN",
    label: "专栏题目",
  },
  {
    value: "children",
    label: "儿童",
  },
  {
    value: "opera",
    label: "戏曲",
  },
  {
    value: "LIFE",
    label: "生活",
  },
  {
    value: "FILM",
    label: "影视",
  },
]
export const pro_type = [
  {
    value: "剧场版",
    label: "剧场版",
  },
  {
    value: "TV版",
    label: "TV版",
  },
  {
    value: "真人版",
    label: "真人版",
  },
  {
    value: "DVD版",
    label: "DVD版",
  },
]
export const MediaRating = [
  {
    value: "Ⅰ",
    label: "适合任何年龄的人观看",
  },
  {
    value: "Ⅱ",
    label: "13岁以下不宜观看",
  },
  {
    value: "ⅡA",
    label: "13岁以下，建议有家长陪同观看",
  },
  {
    value: "ⅡB",
    label: "18岁以下，建议有家长陪同观看",
  },
  {
    value: "Ⅲ",
    label: "18岁以上",
  },
]
export const MediaCodingFormat = [
  {
    value: 1,
    label: "仅包含H.264",
  },
  {
    value: 2,
    label: "仅包含H.265",
  },
  {
    value: 3,
    label: "包含H.264和H.265",
  }
]
export const contentType = [
  {
    value: "1",
    label: "正片",
  },
  {
    value: "2",
    label: "片花",
  },
  {
    value: "3",
    label: "预告片",
  },
  {
    value: "4",
    label: "其他",
  },
]
export const definition = [
  {
    value: 2,
    label: "流畅 320P",
  },
  {
    value: 3,
    label: "标清 480P",
  },
  {
    value: 4,
    label: "高清 720P",
  },
  {
    value: 5,
    label: "全高清 1080P",
  },
  {
    value: 10,
    label: "蓝光 4K",
  },
]
export const TaskStatus = [
  {
    value: 1,
    label: '转码已发起'
  },
  {
    value: 2,
    label: '转码中'
  },
  {
    value: 3,
    label: '转码完成'
  },
  {
    value: 4,
    label: '转码失败',
    refill: true
  },
  {
    value: 11,
    label: '介质注入已发起'
  },
  {
    value: 12,
    label: '介质注入中'
  },
  {
    value: 13,
    label: '介质注入完成'
  },
  {
    value: 14,
    label: '介质注入失败',
    refill: true

  },
  {
    value: 21,
    label: '信息注入已发起'
  },
  {
    value: 22,
    label: '信息注入中'
  },
  {
    value: 23,
    label: '信息注入完成'
  },
  {
    value: 24,
    label: '信息注入失败',
    refill: true

  }
]
export const category = [
  {
    value: "Provider",
    label: "卖方",
  },
  {
    value: "Customer",
    label: "买方",
  },
];
export const location = [
  {
    value: "Provider",
    label: "上游",
  },
  {
    value: "Customer",
    label: "下游",
  },
  {
    value: "Both",
    label: "上下游",
  },
]
export const priority = [
  {
    value: 1,
    label: '重要'
  },
  {
    value: 3,
    label: '正常'
  },
  {
    value: 4,
    label: '暂缓'
  },
]
//连续剧
const sitcom = {
  only: [
    {
      label: "第几集",
      key: "start",
      prop: "start",
      value: "",
    },
    {
      label: "总集数",
      key: "total",
      value: "1",
      hidden: true,
    },
    // {
    //   label: "间隔天数",
    //   key: "interval_days",
    //   value: "0",
    //   hidden: true,
    // },
  ],
  double: [
    {
      label: "开始集数",
      key: "start",
      prop: "start",
      value: "",
    },
    {
      label: "总集数",
      key: "total",
      prop: "total",
      value: "",
    },
    // {
    //   label: "间隔天数",
    //   key: "interval_days",
    //   value: "0",
    //   hidden: true,
    // },
  ],
  pattern: [
    { label: '多集创建', key: 'double' },
    { label: '单集创建', key: 'only' }
  ]
};
const movie = {
  only: [
    {
      label: "开始集数",
      key: "start",
      value: "1",
      disabled: true
    },
    {
      label: "总集数",
      key: "total",
      value: "1",
      disabled: true,
    },
    // {
    //   label: "间隔天数",
    //   key: "interval_days",
    //   value: "0",
    //   hidden: true,
    // },
  ],
  pattern: [
    { label: '单集创建', key: 'only' }
  ]

}
const singleEpisodes = { //单集
  only: [
    {
      label: "第几期",
      key: "start",
      prop: "start",
      value: "",
    },
    {
      label: "总期数",
      key: "total",
      value: "1",
      hidden: true,
    },
    // {
    //   label: "间隔天数",
    //   key: "interval_days",
    //   prop: "interval_days",
    //   value: "1",
    //   hidden: true,
    // },
  ],
  pattern: [
    { label: '单集创建', key: 'only' }
  ]
}

export const objJson = {
  tvseries: sitcom,//电视剧
  animation: sitcom,//动漫
  web_tv: sitcom,//网剧
  movie,//电影
  animation_movie: movie,//动漫电影
  web_movie: movie,//网络电影
  variety: singleEpisodes,//综艺
  sport: sitcom,//体育
  travel: sitcom,//旅游
  education: sitcom,//教育
  mother_baby: sitcom,//母婴
  game: sitcom,//游戏
  short_film: sitcom,//短片
  documentary: sitcom,//纪录片
  square_dance: sitcom,//广场舞
  SPECIAL_COLUMN: sitcom,//专栏题目
  children: sitcom,//儿童
}
export const whether = [
  {
    value: 1,
    label: "是",
  },
  {
    value: 0,
    label: "否",
  },
  {
    value: 2,
    label: "未知",
  }
]
