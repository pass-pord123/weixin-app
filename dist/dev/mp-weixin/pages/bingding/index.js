"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      button: false,
      text: "\u53D1\u9001\u9A8C\u8BC1\u7801"
    };
  },
  methods: {
    phone(e) {
      let phone = e.detail.value;
      this.setData({
        phone
      });
    },
    setCode() {
      var phone = this.phonenum;
      var phone_reg = /^1[35789]\d{9}$/;
      if (!phone_reg.test(phone)) {
        wx.showToast({
          title: "\u624B\u673A\u53F7\u683C\u5F0F\u9519\u8BEF",
          icon: "none"
        });
        return;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => _ctx.phonenum = $event.detail.value, (...args) => $options.phone && $options.phone(...args)]),
    b: _ctx.phonenum,
    c: common_vendor.t($data.text),
    d: common_vendor.o(($event) => $options.setCode())
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/bingding/index.vue"]]);
wx.createPage(MiniProgramPage);
