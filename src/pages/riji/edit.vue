<template>
  <button @click="addMoment">今日记账</button>
  <div class="cont">
  <uni-card>
  <view v-for="moment in moments" :key="moment.data" class="list">  
    <p :class="{'checkyes':moment.ison,'checkno':moment.isstyle}"></p><view>{{ moment.comment}}</view><view>{{moment.data}}</view><button class="mini-btn" type="primary" size="mini">{{moment.emotion}}</button><view class="bill"><h>+</h>{{moment.money}}</view>
  <image :class="{'showImg':showImg}" :src="moment.imageURL" mode="aspectFit" ></image>
  <h2  @click="changetoo" size="mini" >            
    <p v-if="cdd" id="btn">显示</p>
     <p v-if="ddd" id="btn">收起</p>
     </h2>  
  </view> 
  
   </uni-card>
<uni-card>
<view v-for=" wonder in wonders" :key="wonder.data"  class="list">  
    <p :class="{'checkyes':wonder.ison,'checkno':wonder.isstyle}">
  </p><view>{{ wonder.comment}}</view> <view>{{wonder.data}}</view><button class="mini-btn" type="warn" size="mini">{{wonder.emotion}}</button><view class="bill"><h>-</h>{{wonder.money}}</view>
  <image :class="{'showImg':showImg}" :src="wonder.imageURL" mode="aspectFit"></image>
  <h1  @click="change" size="mini" >            
    <p v-if="add" id="btn">显示</p>
     <p v-if="edd" id="btn">收起</p>
     </h1>
  </view>				
   </uni-card>		 
   <div id="bottom">							
		<uni-icons  type="home" size="28"  class="export"></uni-icons>	
    	<uni-icons  type="person" size="28"  class="print" ></uni-icons>	</div>
</div>
</template>

<script>

export default {
 data() {
    return {
        moments: [],
        id:"",
        wonders:[],
        showImg:true,
        add:true,//代表add显示
        edd:false,
        cdd:true,//代表add显示
        ddd:false,
        index:0,
				InfoId:'',
        numbers:[],
        sum:"",
        totalProfit:''
    };
},

onShow() {
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('moments-data').orderBy("data", "desc").get().then((res) => {
      this.moments = res.data;  
  
    });
     db.collection('moments').orderBy("data", "desc").get().then((res) => {
      this.wonders = res.data;
    });
   

},
  onLoad() { },
  methods: {
    addMoment() {
     // wx.chooseMedia({
       // count: 1,
       // success(res) {
         // wx.navigateTo({ url: "/pages/edit/index?imagePath=" + res.tempFiles[0].tempFilePath })
         wx.navigateTo({url:"../edit/index"})
        },
	change(){
    let that=this
    that.showImg=!that.showImg
    that.add=!that.add
    that.edd=!that.edd
  },
  changetoo(){
    let that=this
    that.showImg=!that.showImg
    that.cdd=!that.cdd
    that.ddd=!that.ddd
  },
  plus(){
    const db = uniCloud.database({
  provider: 'tencent',
  spaceId: ' cloud1-8gzahfae395d9d2a'
})
db.collection('moments-data').get()
const $ = db.command.aggregate
// let res = await db
  .collection('goods')
  .aggregate()
  .group({
    totalProfit: $.sum(
      $.sum(['$price', '$cost'])
    )
  })
  .end()

   
  }
  
      },
    }
  //},
//}
</script>

<style>
.checkyes{
					font-size: "15px";
					justify-content: center;
					align-items: center;
					font-weight: bold;
				}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.checkno{
     font-size:large
    }
  .show{
    color:red
    }
  .bill{
    margin-left: 210px;
  }
  .showImg{
    width:0px;
    height:0px  }
#btn{
   margin-left: 210px;
   color:blue
}
    
        #bottom {
            width: 100%;
        height: 2rem;
        display: flex;
        align-items: flex-end;
        position: fixed;
        bottom: 0;
        z-index: 999,
        }
         .export {
            height: 50%;
            width: 100%;
         
            display: flex;
            justify-content: center;
            align-items: center;
           
           background-color:#fff;
        }

        .print {
            height: 65%;
            width: 100%;          
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:#fff;
        }
</style>
