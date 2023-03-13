<template>
    <view class="main">
         <view class="background">
            <image class="back" src="/static/images/bj.jpeg"></image>
           
            <view class="user">
               <!-- <image class="touxiang" src='{{avatarUrl}}'></image>  -->
            <open-data type="userAvatarUrl" class="userimage"></open-data>       
            </view> 
          <view class="username">
             <open-data type="userNickName" ></open-data><open-data type="city"></open-data> 
          </view>
          
        </view>
        <view class="content">
            <view class="contact" @click="show_contact()">
            <image class="icons" src="/static/images/call.png"></image>
              联系我们</view>
            <view class="line" ></view>
            <view class="about_us" @click="show_us()">
            <image class="icons" src="/static/images/team.png"></image>
            关于我们</view>
            <view class="line"></view>
            <view class="protocol" @click="show_protocol()">
            <image class="icons" src="/static/images/user.png"></image>
            用户协议</view>
            <view class="line"></view>
            <view class="privacy" @click="show_privacy()">
            <image class="icons" src="/static/images/loc.png"></image>
            隐私政策</view>
            <view class="line"></view>
            <view class="telnumber" @click="gotoPage">
            <image class="icons" src="/static/images/phone.png"></image>
            绑定手机</view>
            <view class="line"></view>
        </view>
    </view>
</template>

<script>
export default{
    data(){
      return {
        userimage:'',
        username:'',
      }
    },

    methods: {   
       show_contact(){
        wx.showModal({
           title: '联系我们',
           showCancel:false,
           content: '如您有任何宝贵的意见可以随时联系我们\r\n Miss Li:19806413613 \r\n Miss Xiao:19806413613\r\nMiss Huang:19806413613\r\nMiss Hu:19806413613',
           success: function(res) {
           if (res.confirm) {
              console.log('用户点击确定')}
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    // }
  }
})   
   },
       show_us(){
        wx.showModal({
           title: '关于我们',
           content: '我们团队由四名来自广东外语外贸大学英语语言文化学院语言信息管理专业19级的学生组成，致力于给大家带来更好的使用体验，成为大家的好帮手。谢谢使用！',
           showCancel:false,
           success: function(res) {
           if (res.confirm) {
              console.log('用户点击确定')
            } 
  }
})

       },
       show_protocol(){
        wx.showModal({
           title: '用户协议',
           showCancel:false,
           content: '本协议为您与本小程序管理者之间所订立的契约，具有合同的法律效力，请您仔细阅读。一、本协议内容、生效、变更。本协议内容包括协议正文及所有本小程序已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，应向本小程序咨询。您在同意所有协议条款并完成注册程序，才能成为本站的正式用户，您勾选“我以阅读并同意本小程序用户协议和法律协议”按钮后，本协议即生效，对双方产生约束力。只要您使用本小程序平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得本小程序对您问询的解答等理由，主张本协议无效，或要求撤销本协议。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。 您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用本小程序平台服务。本小程序有权根据需要不定期地制订、修改本协议及/或各类规则，并在本小程序平台公示，不再另行单独通知用户。变更后的协议和规则一经在网站公布，立即生效。如您不同意相关变更，应当立即停止使用本小程序平台服务。您继续使用本小程序平台服务的，即表明您接受修订后的协议和规则。',
           success: function(res) {
           if (res.confirm) {
              console.log('用户点击确定')
            } 
  }
})
       },
       show_privacy(){
         wx.showModal({
           title: '隐私政策',
           showCancel:false,
           content: '本程序非常重视用户隐私政策并严格遵守相关的法律规定。请您仔细阅读《隐私政策》后再继续使用。如果您继续使用我们的服务，表示您已经充分阅读和理解我们协议的全部内容。本小程序尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更优质的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。',
           success: function(res) {
           if (res.confirm) {
              console.log('用户点击确定')
            } 
  }
})

       },

        gotoPage() {
            uni.navigateTo({
					url:'/pages/bingding/index'
				})
        },
        login(e){
          this.setData({
            userimage:e.detail.userInfor.navatarUrl,
            username:e.detail.userInfor.nickName

          })
        },

    },
   
        
    }
</script>


<style>

.background{
    position:relative
}
.back{
    width: 100%;
    height: 400rpx;
}
.user{
  position: fixed;
  top: 80rpx;
  left: 30rpx;
  height: 200rpx;
  width: 200rpx;
  border-radius: 50%;
  overflow: hidden;
}
.username{
  position: fixed;
  top: 180rpx;
  left: 250rpx;
}
.userimage{
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  border:solid 1rpx red
}

.content{
    width: 100%;
    height: 750rpx;
    background: rgb(253, 254, 254);
    position:absolute;
    top:360rpx;
    border-radius: 40rpx;   
    text-align: center;
}
.contact, .about_us, .protocol, .privacy, .telnumber{
    padding-top: 30rpx;
    padding-bottom: 20rpx;
    color: rgb(86, 83, 83);
    text-align: left;
    padding-left: 90rpx;
}
.line{
    width: 90%;
    height: 5rpx;
    background-color:lightgray;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.5;
}
.icons{
  width: 50rpx;
  height: 50rpx;
  margin-top: 5rpx;
}

</style>