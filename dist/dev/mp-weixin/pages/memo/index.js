"use strict";
var common_vendor = require("../../common/vendor.js");
function getDate(type) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (type === "start") {
    year = year - 10;
  } else if (type === "end") {
    year = year + 10;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
const _sfc_main = {
  data() {
    wx.cloud.init();
    const db = wx.cloud.database({
      env: "cloud1-6gq9x2amdf00d4fd"
    });
    db.collection("memo").orderBy("date", "desc").get().then((res) => {
      this.list = res.data;
    });
    return {
      title: "",
      activeInput: false,
      tetxShow: false,
      event: "",
      day: "12:01",
      chemess: "\u70B9\u51FB\u6309\u94AE\u65B0\u5EFA\u4F60\u7684\u5907\u5FD8\u5F55\u5427",
      list: [],
      index: 0,
      date: getDate({
        format: true
      }),
      startDate: getDate("start"),
      endDate: getDate("end"),
      _id: ""
    };
  },
  onshow() {
    wx.cloud.init();
    const db = wx.cloud.database({
      env: "cloud1-6gq9x2amdf00d4fd"
    });
    db.collection("memo").get().then((res) => {
      this.list = res.data;
    });
  },
  computed: {
    listData() {
      let list = JSON.parse(JSON.stringify(this.list));
      return list;
    }
  },
  methods: {
    creat() {
      if (this.activeInput) {
        this.close();
      } else {
        this.open();
      }
    },
    del() {
      wx.cloud.init();
      const db = wx.cloud.database({
        env: "cloud1-6gq9x2amdf00d4fd"
      });
      db.collection("memo").doc("idd").remove({
        success: function(res) {
          console.log(res.data);
        }
      });
    },
    open() {
      this.activeInput = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.tetxShow = true;
        }, 50);
      });
    },
    close() {
      this.tetxShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.activeInput = false;
        }, 350);
      });
    },
    pickerChanged(e) {
      this.index = e.detail.value;
    },
    bindTimeChange: function(e) {
      this.day = e.detail.value;
    },
    submitInput() {
      this.activeInput = false;
      common_vendor.index.setStorageSync("event", this.event);
      common_vendor.index.setStorageSync("date", this.date);
      common_vendor.index.setStorageSync("day", this.day);
      this.list.unshift({
        title: common_vendor.index.getStorageSync("event"),
        time: common_vendor.index.getStorageSync("date"),
        day: common_vendor.index.getStorageSync("day")
      });
      this.close();
      this.event = "";
      wx.cloud.init();
      const db = wx.cloud.database({
        env: "cloud1-6gq9x2amdf00d4fd"
      });
      db.collection("memo").add({
        data: {
          title: common_vendor.index.getStorageSync("event"),
          time: common_vendor.index.getStorageSync("date"),
          day: common_vendor.index.getStorageSync("day")
        }
      }).then((res) => {
        console.log(res);
      });
      db.collection("memo").get().then((res) => {
        this.list = res.data;
      });
    }
  },
  watch: {
    event() {
      common_vendor.index.setStorageSync("event", this.event);
      wx.cloud.init();
      const db = wx.cloud.database({
        env: "cloud1-6gq9x2amdf00d4fd"
      });
      db.collection("memo").get().then((res) => {
        this.list = res.data;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.chemess),
    b: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.day),
        d: common_vendor.t(item._id),
        e: item.title
      };
    }),
    c: common_vendor.o((...args) => $options.del && $options.del(...args)),
    d: common_vendor.t($data.title),
    e: $data.tetxShow ? 1 : "",
    f: common_vendor.o((...args) => $options.creat && $options.creat(...args)),
    g: $data.activeInput
  }, $data.activeInput ? {
    h: $data.event,
    i: common_vendor.o(($event) => $data.event = $event.detail.value),
    j: common_vendor.t($data.date),
    k: $data.date,
    l: $data.startDate,
    m: $data.endDate,
    n: common_vendor.o((...args) => _ctx.bindDateChange && _ctx.bindDateChange(...args)),
    o: common_vendor.t($data.day),
    p: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    q: common_vendor.o((...args) => $options.submitInput && $options.submitInput(...args)),
    r: $data.tetxShow ? 1 : ""
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u4FE1\u7BA1/\u5927\u4E09\u4E0B/\u79FB\u52A8\u5F00\u53D1/Vue/shiji/src/pages/memo/index.vue"]]);
wx.createPage(MiniProgramPage);
