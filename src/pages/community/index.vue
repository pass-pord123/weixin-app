<template>
    <view class="main">
        <view class="searching"  > 
         搜索相关内容
        <image class="searchingicon" src="/static/images/searching.jpeg"> </image>       
        </view>
        <div v-for="(moment,index) in moments" :key="index" class="moment">
            <p>{{ moment.comment }}</p>
            <br>
            <image :src="moment.imageURL" class="picture"></image>
            <p class="ip">发布于{{moment.address}} {{moment.date}}</p>
            <!-- <input class="momentid" value="{{moment._id}}"> -->
            <!-- <view data-id="{{moment._id}}"></view> -->
            <p class="momentid" data-id="{{moment._id}}"> {{moment._id}}</p>
            <view class="del">
                <image src="/static/images/delet.png" class="delicon" @click="onRemove()"></image>
            </view>
        </div>
        <view class="editing" @click="addMoment()">
        <image class="editingimg" src="/static/images/editicon.png"></image>
        </view>
    </view>
</template>

<script>
 export default {
 data() {
    return {
        moments: [],
        // id:""
    };
},
onShow() {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('moments-data').orderBy("date", "desc").get().then((res) => {
      this.moments = res.data;
    });
     //console.log(data)
},
  onLoad() { },
  methods: {
    addMoment() {     
      uni.navigateTo({
        url:"/pages/addmoment/index"
      })
    },
    
    onRemove(){
       // let that=this
        let id=this.dataId
        let db= wx.cloud.database();
        let usercollection=db.collection('moments-data');
        usercollection.where({            
            _id:id
        }).remove({
            success:function(res){
                console.log("删除成功")
        }

        })
    // this.$refs.udb.remove(id)

        
       
    },
    // omRemove(){
    //     const db = uniCloud.database();
    //     db.collection("moment-data")
    //     .where({
    //          _id: "5f79fdb337d16d0001899566"
    //      })
    //     .remove()
	//     .then((res) => {
	// 	  uni.showToast({
	// 		title: '删除成功'
	// 	})
	// 	console.log("删除条数: ",res.deleted);
    //    	}).catch((err) => {
	// 	uni.showModal({
	// 		content: err.message || '删除失败',
	// 		showCancel: false
	// 	})
	//      }).finally(() => {
		
	// })
    // },

//     onRemove(){    
//       const db = wx.cloud.database()
//       this.id=this.moments._id
//       db.collection('moments-data').doc(this.id).remove({
//         success: res => {
           
//           wx.showToast({
//             title: '删除成功',
//           })
//           this.setData({
//                 comment:"",
//                 imageURL:"",
//                 address:"",
//                 date:"",
//             //    _id:"",
//           })
//         },
//         fail: err => {
//           wx.showToast({
//             icon: 'none',
//             title: '删除失败',
//           })
//           console.error('[数据库] [删除记录] 失败：', err)
//         }
//       })
//   },


    // gotoSearching(){
    //     uni.navigateTo({
	// 	 url:'/pages/search/index'
	// 			})
    // }
  },
}
</script>


<style>
.main{
    width: 100%;
}
.searching{
    text-align: center;
    width: 600rpx;
    height: 60rpx;
    background-color: rgb(221, 221, 220);
    margin-top: 5rpx;
    margin-left: auto;
    margin-right: auto;
    border-radius: 25rpx;
    text-align: center;
}
.searchingicon{
    width: 50rpx;
    height: 50rpx;       
}
.picture{
    width: 200rpx;
    height: 200rpx;
    display: flex;
    margin-top: 10rpx;
}
.moment{
    width: 78%;
    margin-top: 80rpx;
    margin-left: 50rpx;
    margin-right: 60rpx;
    background-color: rgb(238, 240, 240);
    border-radius: 50rpx;
    padding-left: 50rpx;
    padding-bottom: 30rpx;
    padding-top: 15rpx;
}
.editingimg{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    border: solid 1rpx #ffc64b;
}
.editing{
    position: fixed;
    bottom: 50rpx;
    right: 50rpx;
}
p{
    color: rgb(80, 79, 79);
    width:60% 
}
.ip{
    color: blue;
    font-size: x-small;
    margin-top: 10rpx;
}
.del{
    width: 100%;
    margin-left: 85%;
    color: blue;
}
.delicon{
    width: 50rpx;
    height: 50rpx;
}
.momentid{
    display: none;
}
</style>