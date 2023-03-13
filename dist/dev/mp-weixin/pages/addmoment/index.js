"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      imagePath: "",
      comment: "",
      address: "",
      IP: "",
      date: currentDate
    };
  },
  onLoad(data) {
    require("../../lib/qqmap-wx-jssdk.js");
    this.QQMap = newQQMapWX({
      key: "TMBBZ-C5P33-2JM35-3ES4C-F4Y5K-XQFXV"
    });
    this.findAddress("\u516C\u5143\u524D");
    this.imagePath = data.imagePath;
  },
  methods: {
    addPicture() {
      let that = this;
      wx.chooseMedia({
        count: 1,
        success(res) {
          that.imagePath = res.tempFiles[0].tempFilePath;
        }
      });
    },
    confirm() {
      let that = this;
      const parts = this.imagePath.split("/");
      wx.cloud.init();
      wx.cloud.uploadFile({
        filePath: this.imagePath,
        cloudPath: "images/" + parts[parts.length - 1],
        success(res) {
          const db = wx.cloud.database();
          db.collection("moments-data").add({
            data: {
              imageURL: res.fileID,
              comment: that.comment,
              address: that.address,
              date: that.date
            }
          });
          wx.navigateBack();
        },
        fail: console.error
      });
    },
    gotoMap() {
      common_vendor.index.navigateTo({
        url: "/pages/map/index"
      });
    },
    chooseLocation() {
      let that = this;
      wx.chooseLocation({
        latitude: 0,
        success(res) {
          console.log(res);
          that.address = res.address.split("\u7701")[0];
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.date),
    b: $data.comment,
    c: common_vendor.o(($event) => $data.comment = $event.detail.value),
    d: $data.imagePath,
    e: common_vendor.o(($event) => $options.addPicture()),
    f: common_vendor.t($data.address),
    g: common_vendor.o(($event) => $options.chooseLocation()),
    h: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/addmoment/index.vue"]]);
wx.createPage(MiniProgramPage);
