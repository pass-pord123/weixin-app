"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      formats: {},
      fontColor: "#000",
      isEdit: false,
      type: "default",
      invertedE: false,
      invertedP: false,
      invertedS: false,
      invertedW: false,
      comment: "",
      boxWidth: "",
      active: 0,
      ison: false,
      emotions: "",
      isstyle: false,
      data: new Date(),
      money: "",
      show: false,
      imageValue: [],
      imgCount: 0,
      index: 0,
      imagePath: "",
      showImg: true,
      tempFilePaths: []
    };
  },
  onLoad(data) {
    this.imagePath = data.imagePath;
    this.boxWidth = common_vendor.index.upx2px(1e3) + "px";
  },
  methods: {
    undo() {
      let that = this;
      that.comment = "";
    },
    clear() {
      this.editorCtx.clear({
        success: function(res) {
          console.log("clear success");
        }
      });
    },
    changeBold() {
      let that = this;
      that.ison = !that.ison;
    },
    changeStyle() {
      let that = this;
      that.isstyle = !that.isstyle;
      that.show = !that.show;
    },
    addError() {
      this.invertedE = !this.invertedE;
      let that = this;
      if (this.imagePath) {
        that.showImg = !that.showImg;
        const parts = this.imagePath.split("/");
        wx.cloud.init();
        wx.cloud.uploadFile({
          filePath: this.imagePath,
          cloudPath: "images/" + parts[parts.length - 1],
          success(res) {
            const db2 = wx.cloud.database();
            db2.collection("moments").add({
              data: {
                imageURL: res.fileID,
                comment: that.comment,
                emotion: "#\u652F\u51FA",
                ison: that.ison,
                isstyle: that.isstyle,
                data: that.data,
                show: that.show,
                money: that.money,
                image: that.imageValue
              }
            });
          },
          fail: console.error
        });
      } else {
        const db2 = wx.cloud.database();
        db2.collection("moments").add({
          data: {
            comment: that.comment,
            emotion: "#\u652F\u51FA",
            ison: that.ison,
            isstyle: that.isstyle,
            data: that.data,
            money: that.money,
            show: that.show
          }
        });
      }
    },
    addSuccess() {
      this.invertedS = !this.invertedS;
      let that = this;
      if (this.imagePath) {
        const parts = this.imagePath.split("/");
        wx.cloud.init();
        wx.cloud.uploadFile({
          filePath: this.imagePath,
          cloudPath: "images/" + parts[parts.length - 1],
          success(res) {
            db.collection("moments-data").add({
              data: {
                imageURL: res.fileID,
                comment: that.comment,
                emotion: "#\u6536\u5165",
                ison: that.ison,
                isstyle: that.isstyle,
                data: that.data,
                show: that.show,
                money: that.money
              }
            });
          },
          fail: console.error
        });
      } else {
        const db2 = wx.cloud.database();
        db2.collection("moments-data").add({
          data: {
            comment: that.comment,
            emotion: "#\u6536\u5165",
            ison: that.ison,
            isstyle: that.isstyle,
            data: that.data,
            money: that.money,
            show: that.show
          }
        });
      }
    },
    upload() {
      let that = this;
      wx.chooseMedia({
        count: 1,
        success(res) {
          that.imagePath = res.tempFiles[0].tempFilePath;
        }
      });
    },
    check() {
      wx.navigateTo({ url: "../index/edit" });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _component_t_color_picker = common_vendor.resolveComponent("t-color-picker");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_tag2 + _component_t_color_picker)();
}
const _easycom_uni_icons = () => "../../components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_tag = () => "../../components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_tag)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.upload),
    b: common_vendor.p({
      type: "images",
      size: "28"
    }),
    c: common_vendor.o((...args) => $options.changeBold && $options.changeBold(...args)),
    d: common_vendor.o((...args) => $options.changeStyle && $options.changeStyle(...args)),
    e: common_vendor.o((...args) => $options.undo && $options.undo(...args)),
    f: common_vendor.p({
      date: $data.data
    }),
    g: $data.ison ? 1 : "",
    h: $data.isstyle ? 1 : "",
    i: $data.money,
    j: common_vendor.o(($event) => $data.money = $event.detail.value),
    k: $data.ison ? 1 : "",
    l: $data.isstyle ? 1 : "",
    m: $data.comment,
    n: common_vendor.o(($event) => $data.comment = $event.detail.value),
    o: $data.imagePath,
    p: common_vendor.o($options.addError),
    q: common_vendor.p({
      text: "#\u652F\u51FA",
      type: "error",
      circle: true,
      inverted: $data.invertedE
    }),
    r: common_vendor.o($options.addSuccess),
    s: common_vendor.p({
      text: "#\u6536\u5165",
      type: "success",
      circle: true,
      inverted: $data.invertedS
    }),
    t: common_vendor.o((...args) => $options.check && $options.check(...args)),
    v: common_vendor.sr("colorPicker", "10cd9791-4"),
    w: common_vendor.o(_ctx.confirm),
    x: common_vendor.o(_ctx.cancel),
    y: common_vendor.p({
      color: _ctx.color
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10cd9791"], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/edit/index.vue"]]);
wx.createPage(MiniProgramPage);
