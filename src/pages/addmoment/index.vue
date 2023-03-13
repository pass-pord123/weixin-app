<template>
    <div>
<view>
    <view class="content">
         <text class="date">{{date}}</text>
    <textarea v-model="comment" placeholder="此时此刻的你想说点什么呢...."></textarea>
    </view>
   
    
    <view  class="img"> <image :src="imagePath"></image></view>
   
    <view class="add"  @click="addPicture()"> 
    <image class="camaraicon" src="/static/images/camara.png"></image>
     </view>
      <view class="location" @click="chooseLocation()"> 
      <text class="loc">{{address}}</text>     
    <image class="locationicon" src="/static/images/location.png"></image>
     </view>
    <button @click="confirm" class="ok">发布</button>
</view>
    </div>
</template>

<script>
export default {
data() {
    const currentDate = this.getDate({
    format: true})
    return {
        imagePath: "",
        comment: "",
        address:"",
        IP:"",
        date:currentDate
        
    }
},
onLoad(data) {
    const QQMap =require("../../lib/qqmap-wx-jssdk.js");
    this.QQMap=newQQMapWX({
    key:"TMBBZ-C5P33-2JM35-3ES4C-F4Y5K-XQFXV"
       });
    this.findAddress("公元前");
    this.imagePath = data.imagePath;
   
},
methods: {
    addPicture(){
        let that=this
        wx.chooseMedia({
            count:1,
            success(res){
              that.imagePath= res.tempFiles[0].tempFilePath
            }
        })

    },
    confirm() {
        
        let that=this;
        const parts = this.imagePath.split("/");
        // const provience=this.address.split("省")
        // const IP=provience[0]
        wx.cloud.init();
        wx.cloud.uploadFile({
            filePath: this.imagePath,
            cloudPath: "images/" + parts[parts.length - 1],
            success(res) {
                const db = wx.cloud.database();
                db.collection("moments-data").add({
                    data: {
                        imageURL: res.fileID,
                        comment: that.comment ,
                        address: that.address,
                        date:that.date
                    },
                });
               wx.navigateBack();
            },
            fail: console.error
        });
    },
    gotoMap(){  
         uni.navigateTo({
            url:"/pages/map/index"
         })
    },
    chooseLocation(){
      let that=this
      wx.chooseLocation({      
      latitude: 0,
      success (res) {
        console.log(res);                
         that.address=res.address.split("省")[0]        
      },
      fail(err){
      	console.log(err);
      }

  })
    
  },
  getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
}
}
</script>

<style>
.ok{
    width: 250rpx;
    height: 100rpx;
    text-align: center;
    padding-bottom: 50rpx;
    margin-top: 100rpx;
}
textarea{
    /* border:solid 2rpx rgb(100, 98, 98); */
    margin-top: 10rpx;
    
}
.content{
    padding-left: 60rpx;
    width: 60%;
}
image{
    width: 300rpx;
    height: 300rpx;
    /* border: solid 1rpx; */
}
.img{
    width: 100%;
    text-align: center;
}
.add{
   width: 100%;
   text-align: center;
   margin-top: 20rpx;
}
.location{
   width: 100%;
   text-align: center;
   margin-top: 20rpx;
}
.date{
  font-size: x-small;
  color: blueviolet;
}
.camaraicon, .locationicon{
    width: 50rpx;
    height: 50rpx;
    margin-top: 5rpx;
}
.loc{
    color:blueviolet
}
</style>