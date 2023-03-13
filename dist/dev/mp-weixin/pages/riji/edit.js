"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      moments: [],
      id: "",
      wonders: [],
      showImg: true,
      add: true,
      edd: false,
      cdd: true,
      ddd: false,
      index: 0,
      InfoId: "",
      numbers: [],
      sum: "",
      totalProfit: ""
    };
  },
  onShow() {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection("moments-data").orderBy("data", "desc").get().then((res) => {
      this.moments = res.data;
    });
    db.collection("moments").orderBy("data", "desc").get().then((res) => {
      this.wonders = res.data;
    });
  },
  onLoad() {
  },
  methods: {
    addMoment() {
      wx.navigateTo({ url: "../edit/index" });
    },
    change() {
      let that = this;
      that.showImg = !that.showImg;
      that.add = !that.add;
      that.edd = !that.edd;
    },
    changetoo() {
      let that = this;
      that.showImg = !that.showImg;
      that.cdd = !that.cdd;
      that.ddd = !that.ddd;
    },
    plus() {
      const db = common_vendor.wt.database({
        provider: "tencent",
        spaceId: " cloud1-8gzahfae395d9d2a"
      });
      db.collection("moments-data").get();
      const $ = db.command.aggregate.collection("goods").aggregate().group({
        totalProfit: $.sum($.sum(["$price", "$cost"]))
      }).end();
    }
  }
};
if (!Array) {
  const _component_h = common_vendor.resolveComponent("h");
  const _component_uni_card = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_h + _component_uni_card + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.addMoment && $options.addMoment(...args)),
    b: common_vendor.f($data.moments, (moment, k0, i0) => {
      return common_vendor.e({
        a: moment.ison ? 1 : "",
        b: moment.isstyle ? 1 : "",
        c: common_vendor.t(moment.comment),
        d: common_vendor.t(moment.data),
        e: common_vendor.t(moment.emotion),
        f: "7e7f783e-1-" + i0 + ",7e7f783e-0",
        g: common_vendor.t(moment.money),
        h: moment.imageURL
      }, $data.cdd ? {} : {}, $data.ddd ? {} : {}, {
        i: moment.data
      });
    }),
    c: $data.showImg ? 1 : "",
    d: $data.cdd,
    e: $data.ddd,
    f: common_vendor.o((...args) => $options.changetoo && $options.changetoo(...args)),
    g: common_vendor.f($data.wonders, (wonder, k0, i0) => {
      return common_vendor.e({
        a: wonder.ison ? 1 : "",
        b: wonder.isstyle ? 1 : "",
        c: common_vendor.t(wonder.comment),
        d: common_vendor.t(wonder.data),
        e: common_vendor.t(wonder.emotion),
        f: "7e7f783e-3-" + i0 + ",7e7f783e-2",
        g: common_vendor.t(wonder.money),
        h: wonder.imageURL
      }, $data.add ? {} : {}, $data.edd ? {} : {}, {
        i: wonder.data
      });
    }),
    h: $data.showImg ? 1 : "",
    i: $data.add,
    j: $data.edd,
    k: common_vendor.o((...args) => $options.change && $options.change(...args)),
    l: common_vendor.p({
      type: "home",
      size: "28"
    }),
    m: common_vendor.p({
      type: "person",
      size: "28"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/riji/edit.vue"]]);
wx.createPage(MiniProgramPage);
