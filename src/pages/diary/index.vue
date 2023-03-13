<template>
<view class="mainbody">
<view class="diaries">
	
			<div v-for="(diary,index) in diaries" :key="index" class="card">
				<view>
							<div>
								<text class="dates">{{diary.year}}-{{diary.month}}-{{diary.date}}</text>
                            </div>
								
					
					<div>
						<text class="moods">{{diary.mood}}</text>
						
					</div>

					<div>
						<text class="tianqi">天气情况：{{diary.weather}}{{diary.weatherTemp}}°C</text>
						</div>

								
						<div>
							<img style="width: 20px; height:20px; background-color: white;padding-right:3px" :src="diary.moodsrc" />
							
						</div>
					</view>
					<view class="content">
						<div>
							<text class="title">{{diary.content}}</text>
							
						</div>
						<view>
							<image :src="diary.imgURLs[0]" class="image"></image>
							<image :src="diary.imgURLs[1]" class="image"></image>
							<image :src="diary.imgURLs[2]" class="image"></image>
						</view>
					
					
				</view>
				<cover-view class="action-button">
                <cover-image @click="remove" src="/static/delete.png" />
            </cover-view>	
			
				</div>
				
             <view class="upDown">
				<view  @click="up">
					<image class="updown up" src="/static/images/up.png"></image>
				</view>
				<view @click="down">
					<image class="updown down" src="/static/images/down.png"></image>
				</view>
			</view>

				<cover-image
				@click="addOrUpdate()"
				class="optionLogo"
				src="/static/addlogo.png"
				>
				
			</cover-image>
			
			
			<view>
					
		</view>
		</view>
		</view>
	
</template>

<script>
export default {
	 data() {
    return {
       diaries: [],
       id:"",
    };
},
onShow() {
	var that = this;
    wx.cloud.init(
	
);
    const db = wx.cloud.database();
    db.collection('dairy')
.orderBy("fullDate","desc")
.get().then(function(res) {
	that.diaries = res.data;
    });
},
  onLoad() { },
  methods: {
	addOrUpdate(){
			 wx.navigateTo({url:"/pages/diary/editdia"})	
    },
			
			
	up(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			down(){
				uni.pageScrollTo({
					scrollTop: 999999999999999999999999,
					duration: 300
				});
			},

           remove(){
                wx.cloud.init({
				// env: "xgmoments-84rox"
			});
    var that = this;
    var db = wx.cloud.database();
    db.collection("dairy")
      .where({_id:that.id})
      .remove()
            }
	
    },
			
			}

</script>


<style>
.logo-size{
						width: 29rpx;
						height:29rpx;
}
.mainbody{
	background-color:rgb(76, 152, 198);
	margin-top: 0;
}
.diaries{
	background-color:rgb(76, 152, 198);
}

.title {
 
  font-size:large;
  color:dimgrey;
  float: left;
  /* padding-top:20px; */
  
}
.dates {
	/* padding-top: 20px; */
	height: 82px;
	float: left;
	color:black;
	font-size: larger;
}
.moods{
	float:left;
	/* padding-top: 20px; */
}

.card{
	border-radius: 20px;
	background-color:white;
	margin-bottom: 50px;
	margin-top: 50px;
	height:auto;
	padding-left: 10px;
	padding-right: 10px;
	margin-left:13px;
	margin-right:13px;
	padding-bottom: 15px;
display: flex;
flex-direction: column;
}
image{
	height: 90px;
	width: 70px;
	
}
.action-button {

  bottom: 0;
  margin-left:220px ;
  width: 40px;
  height: 40px;
  
}
.tianqi{
	/* padding-top: 10px; */
	height: 82px;
	float: left;
	color:black;
	font-size: larger;
}
.arrow {
		height: 70rpx;
		width: 70rpx;
	}
	.updown {
		height: 70rpx;
		width: 70rpx;
		position: fixed;
		float: right;
		bottom: 50%;
		right: 0;
	}

	.down {
		margin: 30px 0 0  0 ;
	}

	.up {
		margin: 0 0 30px 0 ;
	}

	.optionLogo{
position:fixed;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  transform: translateX(-50%) translateY(-50%);
	}

.hint-line{
				display: flex;
				flex-direction: column;
				width: 93rpx;
				height: 229rpx;
}
.hint-logo{
					width: 93rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
}

.center-line{
						width: 1px;
						height: 183rpx;
						background-color: #707070;
}
		
	
</style>