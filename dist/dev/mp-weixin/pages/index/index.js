"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    gotoCommunity() {
      common_vendor.index.navigateTo({
        url: "/pages/community/index"
      });
    },
    gotoRemeber() {
      common_vendor.index.navigateTo({
        url: "/pages/memo/index"
      });
    },
    gotoAccount() {
      common_vendor.index.navigateTo({
        url: "/pages/riji/edit"
      });
    },
    gotoDairy() {
      common_vendor.index.navigateTo({
        url: "/pages/diary/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.gotoRemeber()),
    b: common_vendor.o(($event) => $options.gotoAccount()),
    c: common_vendor.o(($event) => $options.gotoDairy()),
    d: common_vendor.o(($event) => $options.gotoCommunity())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
