"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      moments: []
    };
  },
  onShow() {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection("moments-data").orderBy("date", "desc").get().then((res) => {
      this.moments = res.data;
    });
  },
  onLoad() {
  },
  methods: {
    addMoment() {
      common_vendor.index.navigateTo({
        url: "/pages/addmoment/index"
      });
    },
    onRemove() {
      let id = this.dataId;
      let db = wx.cloud.database();
      let usercollection = db.collection("moments-data");
      usercollection.where({
        _id: id
      }).remove({
        success: function(res) {
          console.log("\u5220\u9664\u6210\u529F");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.moments, (moment, index, i0) => {
      return {
        a: common_vendor.t(moment.comment),
        b: moment.imageURL,
        c: common_vendor.t(moment.address),
        d: common_vendor.t(moment.date),
        e: common_vendor.t(moment._id),
        f: index
      };
    }),
    b: common_vendor.o(($event) => $options.onRemove()),
    c: common_vendor.o(($event) => $options.addMoment())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/community/index.vue"]]);
wx.createPage(MiniProgramPage);
