<template>
  <view class="content">
    <view class="logo1_containner" @click="gotoRemeber()">
      <image class="logo" src="/static/images/remeber.jpg"></image>
      <text>备忘录</text>
    </view>
    <view class="logo2_containner" @click="gotoAccount()">
      <image class="logo" src="/static/images/account.jpg"></image>
      <text>记账本</text>
    </view>
    <view class="logo3_containner" @click="gotoDairy()">
      <image class="logo" src="/static/images/diary.jpg"></image>
      <text>日记</text>
    </view>
    <view class="logo4_containner" @click="gotoCommunity()">
      <image class="logo" src="/static/images/community.jpg"></image>
      <text>社区</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  onLoad() { },
  methods: {
    gotoCommunity() {
      uni.navigateTo({
        url: '/pages/community/index'
      })
    },
    gotoRemeber() {
      uni.navigateTo({
        url: '/pages/memo/index'
      })
    },
    gotoAccount(){
      uni.navigateTo({
        url: '/pages/riji/edit'
      })
    },
     gotoDairy(){
      uni.navigateTo({
        url: '/pages/diary/index'
      })
    },

  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: #d8d8f0; */
}

.logo {
  height: 320rpx;
  width: 230rpx;
  border-radius: 25rpx;
}

.logo1_containner {
  position: absolute;
  top: 100rpx;
  left: 10%;
  width: 230rpx;
  height: 400rpx;
  text-align: center;
}

.logo2_containner {
  position: absolute;
  top: 100rpx;
  right: 15%;
  width: 230rpx;
  height: 400rpx;
  text-align: center;
}

.logo3_containner {
  position: absolute;
  top: 560rpx;
  left: 10%;
  width: 230rpx;
  height: 400rpx;
  text-align: center;
}

.logo4_containner {
  position: absolute;
  top: 560rpx;
  right: 15%;
  width: 230rpx;
  height: 400rpx;
  text-align: center;
}

text {
  height: 50rpx;
  color: #8f8f94;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
