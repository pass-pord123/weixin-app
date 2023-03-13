<template>
<view class="content" style="height:146px;color:white" :style="{background: 'url('+imageURL+')'}">
	<view class="date">
	<view class="day">{{date_d}}</view>
	<view class="line">|</view>
	<view class="time">
		<view class="mouth">{{date_m}}</view>
		<view class="year">{{date_y}}</view>
	</view>
</view>

<view class="temper">
	<img src="/static/天气.png" alt="" id="weatherLogo"> 
      <text style="padding-left:8px" id="weather">当前天气：{{weather}} {{temp}}°C</text>
	</view>
<view style="font-size:13px">混乱生起的地方，也是宁静生起的地方。透过智慧，哪里有混乱，哪里就有宁静。</view>
  </view>
  <view class="top">
	<view class="uni-list-cell-db">
          <picker
            mode="date"
            :value="fulldate"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <view class="uni-input" v-if="fulldate" id="chooseDate">{{fulldate}}</view>
            <text v-else id="today">
              {{month}}月{{date}}日
              <text id="fullTime">/ {{fullTime}} 今天</text>
            </text>
          </picker>
        </view>
	 
      <br />
      <view class="uni-list" id="mood">
        <view class="uni-list-cell">
          <view class="uni-list-cell-db">
			<img src="/static/9.jpg" alt v-if="index==9" class="moodImg" />
			<img src="/static/8.jpg" alt v-if="index==8" class="moodImg" />
			<img src="/static/7.jpg" alt v-if="index==7" class="moodImg" />
			<img src="/static/6.jpg" alt v-if="index==6" class="moodImg" />
            <img src="/static/5.jpg" alt v-if="index==5 || index==0" class="moodImg" />
            <img src="/static/4.jpg" alt v-if="index==4" class="moodImg" />
            <img src="/static/3.jpg" alt v-if="index==3" class="moodImg" />
            <img src="/static/2.jpg" alt v-if="index==2" class="moodImg" />
            <img src="/static/1.jpg" alt v-if="index==1" class="moodImg" />
            
          </view>
		  <picker @change="bindPickerChange" :value="index" :range="mood" id="moodPicker">
              <view class="uni-input" style="padding-left:43px">{{mood[index]}}</view>
            </picker>
        </view>
      </view>
  </view>


  <view>
		<!-- 
		  更多api，请前往：https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html 
		  字体图标，微信小程序官方的确没有给出名称
		-->

		<view class="toolbar" @touchend.stop="format" :style="'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'">
			<i :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header"
			 :data-value="1"></i>
			<i :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')" data-name="header"
			 :data-value="2"></i>
			<i :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')" data-name="header"
			 :data-value="4"></i>
			<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
			<i :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')" data-name="strike"></i>
			<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
			<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
			 data-value="center"></i>
			<i :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')" data-name="color"
			 :data-value="fontColor" @tap="open"></i>
			<i :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#00ff00' ? 'ql-active' : '')" data-name="backgroundColor"
			 data-value="#00ff00"></i>
			<!-- 引用黄河浪的color取色器 -->
			<i class="iconfont icon-date" @tap="insertDate"></i>
			<i class="iconfont icon-undo" @tap="undo"></i>
			<i class="iconfont icon-redo" @tap="redo"></i>
			<i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
			<i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
			 data-value="ordered"></i>
			<i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
			<i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
			<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
			
			<i class="iconfont icon-shanchu" @tap="clear"></i>
			<i class="iconfont icon-baocun" @tap="saveEditor" id="1"></i>
			
			
		</view>
		<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
	</view>
	<view class="container">
			<editor :nodes="content" id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
			  @statuschange="onStatusChange" @ready="onEditorReady">
			</editor>
	</view>




  <view>
        <image
          v-for="(path, index) in tempFilePaths"
          :key="index"
          :src="path"
          class="imgPreview"
          :id="index"
          @click="previewImg"
          @touchstart.prevent="touchstart(path)"
          @touchend.prevent="touchend"
        />
      </view>

	<view>
		<button @click="addImg" id="addImgBtn">
        <text id="plus">+</text>
      </button>
	</view>

	 <view>
	<img src="/static/mylocation.png" alt id="locationLogo" width="2px;" />
      <text id="location" style="padding-left: 6px;">所在位置: {{city}}</text>
	 </view>


	 <view class="end">
		<button @click="addDiary" id="complete">完成</button>
	 </view>


 
</template>

<script>
import tColorPicke from '@/components/t-color-picker.vue';
var _self;
export default {
	components: {
			't-color-picker': tColorPicke
		},
  data() {
    return {
	 tempDelta: {},
      nowTime:'',
      imageURL: '/static/bg1.jpg',
      date_d:'',
      date_m:'',
      date_y:'',
	  year: "",
      month: "",
      date: "",
	   fullDate: "",
      hour: "",
      fullTime: "",
	  fulldate: "",
	  dairy:{},
      mood: ["选择今日心情", "生气", "伤心", "平静", "高兴", "兴奋","打call","得意","惊讶","裂开"],
	  index: 0,
	  path:'',
	 tempFilePaths: [],
	 moodIndex: 0,
     moodsrc:"",
	 color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
	isEdit: false,
	fontColor: '#000',
	formats: {},
	readOnly: false,
	placeholder: '开始输入...',
	editorHeight: 300,
	keyboardHeight: 0,
	isIOS: false,
	weather: "",
    temp: "",
	longitude: "",
    latitude: "",
	city: "",
	fileIDs: [],
	content:'',
    imgCount:0
    }
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    }
  },
  onLoad() {
    this.getTime()
	this.getTimes();
	_self = this;
	 this.gotoCurrentLocation();
	 //console.log(data);
    this.imagePath = data.imagePath;
  },
  methods: {
	//save editor的内容
	 saveEditor() {
        var that = this
		
        this.editorCtx.getContents({
          success(res) {
            // debugger
            that.tempDelta = res.delta
            console.log(res)
		uni.setStorageSync("content", res.text);
          }
        })

      },

	//获取当前位置
    gotoCurrentLocation() {
      var that = this;
      wx.getLocation({
        geocode: true,
        success(res) {
          //console.log(res)
          that.longitude = res.longitude + Math.random() / 10000;
          that.latitude = res.latitude + Math.random() / 10000;
          that.getWeather();
          that.getcity();
          //console.log(res.address);
        },
        fail(res) {
          console.log(res);
        }
      });
    },
    //获取当前位置所处的城市名
    getcity() {
      var that = this;
      var longitude = this.longitude;
      var latitude = this.latitude;
      var key = "a12b0c9381094359bce6f44c9cab3adc";
      var location = longitude + "," + latitude;

      wx.request({
        url: "https://geoapi.heweather.net/v2/city/lookup?",
        data: {
          location: location,
          key: key
        },
        success(res) {
          var city = res.data["location"][0]["adm1"]+res.data["location"][0]["adm2"];
          that.city = city;
        }
      });
    },	
	  //获取当前位置的天气信息
    getWeather() {
      var that = this;
      var longitude = that.longitude;
      var latitude = that.latitude;
      var key = "a12b0c9381094359bce6f44c9cab3adc";
      var location = longitude + "," + latitude;
      wx.request({
        url: "https://devapi.qweather.com/v7/weather/now?",
        data: {
          location: location,
          key: key,
		  now:{

		  }
        },
        success(res) {
          var weather = res.data.now.text;
          var temp = res.data.now.temp;
          that.weather = weather;
          that.temp = temp;
        }
      });
    },
	cancel() {
				this.isEdit = false;
			},
			open() {
				this.$refs.colorPicker.open();
				this.isEdit = true;
				// uni.hideKeyboard();
			},
			hideKey() {
				uni.hideKeyboard();
			},
			async confirm(e) {
				this.isEdit = false;
				this.fontColor = await e.hex;
				this.onStatusChange({
					detail: {
						color: e.hex
					}
				});
				this.$forceUpdate();
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context(function(res) {
					_self.editorCtx = res.context;
				}).exec();
			},
			undo() {
				this.editorCtx.undo();
			},

			redo() {
				this.editorCtx.redo();
			},

			blur() {
				this.editorCtx.blur();
			},

			format(e) {
				// this.hideKey();
				let {
					name,
					value
				} = e.target.dataset;
				if (!name) return; // console.log('format', name, value)
				this.editorCtx.format(name, value);
			},

			onStatusChange(e) {
				this.formats = e.detail;
			},

			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success');
					}
				});
			},

			// store(e) {
			// 	this.editorCtx.getContents({
			// 		success: function(res) {
			// 			e.currentTarget.id == 1 ? console.log('保存内容:', res.html) : uni.navigateTo({
			// 				url: `../preview/preview?rich=${encodeURIComponent(res.html)}`
			// 			});
			// 		}
			// 	});
			// },

			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success");
					}
				});
			},

			removeFormat() {
				this.editorCtx.removeFormat();
			},

			insertDate() {
				const date = new Date();
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				this.editorCtx.insertText({
					text: formatDate
				});
			},



        
		addImg(){
		var that = this;
		var count=9-that.tempFilePaths.length
		if (count<0){
			count=0
		}
		wx.chooseImage({
			count: count,
			sizeType: ["original", "compressed"],
			sorceType: ["album", "camera"],
			success(res) {
			console.log(res);
			for (var i = 0; i < res.tempFilePaths.length; i += 1) {
				that.tempFilePaths.push(res.tempFilePaths[i]);
			}
			that.imgCount=that.imgCount+res.tempFilePaths.length
			//console.log(that.tempFilePaths);
			}
		});
		},
		 //点击图片进行预览
    previewImg: function(event) {
      var that = this;
      var imgList = that.tempFilePaths;
      var myindex = event.currentTarget.id;
      // console.log(myindex);
      uni.previewImage({
        current: that.tempFilePaths[myindex], // 当前显示图片的http链接
        urls: imgList
      });
    },

    //长按删除图片
    touchstart(index) {
      let that = this;
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      console.log(111, index);
      this.Loop = setTimeout(
        function() {
          uni.showModal({
            title: "删除",
            content: "请问要删除本张图片吗？",
            success: function(res) {
              if (res.confirm) {
                console.log(1324213412);
                that.tempFilePaths = that.tempFilePaths.filter(
                  path => path != index
                );
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }.bind(this),
        1000
      );
    },
	touchend() {
      console.log("结束");
      clearInterval(this.Loop);
    },

	//picker选择心情
    bindPickerChange: function(e) {
      // this.moodIndex=0
      console.log("picker发送选择改变,携带值为", e.target.value);
      this.index = e.target.value;
      this.moodIndex = this.index;
      this.moodsrc = "/static/" + this.moodIndex + ".jpg"
    },
	  bindDateChange: function(e) {
      this.fulldate = e.target.value;
      var splitDates = e.target.value.split("-");
      var year = splitDates[0];
      var month = splitDates[1];
      var date = splitDates[2];
      this.year = year;
      this.month = month;
      this.date = date;
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
    },
	//获取当前时间
    getTimes: function() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      var date = myDate.getDate();
      var hour = myDate.getHours();
      var minute = myDate.getMinutes();
      var fullDate = month + "月" + date + "日";
      var fullTime = hour + ":" + minute;
      this.year = year;
      this.month = month;
      this.date = date;
      this.fullDate = fullDate;
      this.fullTime = fullTime;
      this.hour = hour;
    },

    getTime() {
				let date = new Date();
 
				var y = date.getFullYear();
 
				var m = date.getMonth();
				switch (m) {
					case 0:
						m = 'Jan';
						break;
					case 1:
						m = 'Feb';
						break;
					case 2:
						m = 'Mar';
						break;
					case 3:
						m = 'Apr';
						break;
					case 4:
						m = 'MAy';
						break;
					case 5:
						m = 'Jun';
						break;
					case 6:
						m = 'Jul';
						break;
					case 7:
						m = 'Aug';
						break;
					case 8:
						m = 'Sep';
						break;
					case 9:
						m = 'Oct';
						break;
					case 10:
						m = 'Nov';
						break;
					case 11:
						m = 'Dec';
						break;
				}
 
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
 
				this.date_d = d;
				this.date_y = y;
				this.date_m = m;
			},
// 往数据库添加记录
    addDiary(){
	  //console.log(that.tempDelta)
      var validness = false;
      var that = this;
	  that.content = uni.getStorageSync("content")
      wx.cloud.init({
				// env: "xgmoments-84rox"
			});

     if (that.tempFilePaths.length != 0) {
        //有上传照片
        for (var i = 0; i < that.tempFilePaths.length; i++) {
          var splitPaths = that.tempFilePaths[i].split("/");
          wx.cloud
            .uploadFile({
              cloudPath: "Images/" + splitPaths[splitPaths.length - 1],
              filePath: that.tempFilePaths[i]
            })
            .then(function(res) {
              console.log(res);
              that.fileIDs.push(res.fileID);
              if (that.fileIDs.length == that.tempFilePaths.length) {
                that.addToDB();
              }
            });
        }
      } else {
        that.addToDB();
      }
      wx.showToast({
        title: "记录成功",
        icon: "success",
        duration: 2000
      });
    //   wx.navigateBack();
    wx.navigateTo({url:"/pages/diary/index"})
    },
    addToDB() {
      var that = this;
      var db = wx.cloud.database();
	  //console.log(that.fileIDs)
	//   that.fileIDs = uni.getStorageSync("fileIDs")
      db.collection("dairy").add({
        data: {
    content: that.content,
		year: that.year,
          month: that.month,
          date: that.date,
          hour: that.hour,
          fullTime:that.fullTime,
          imgURLs: that.fileIDs,
          weather: that.weather,
          weatherTemp: that.temp,
          longitude: that.longitude,
          latitude: that.latitude,
          city:that.city,
          mood: that.mood[that.moodIndex],
          moodIndex:that.moodIndex,
          moodsrc:that.moodsrc,
          id:that._id,
          //5兴奋 4高兴 3 心平气和 2难过 1生气
         fullDate:
            that.year.toString() + that.month.toString() + that.date.toString()
        },
        
      });
      
    }

  }
}
</script>

<style>
@import "./editor.css";
/* .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
} */



/* .text-area {
  display: flex;
  justify-content: center;
} */
#today {
  font-size: 27px;
  font-weight: bold;
  color: rgb(102, 102, 102);
}
#chooseDate {
  font-size: 25px;
  color: rgb(102, 102, 102);
}
#fullTime {
  font-size: 19px;
  font-weight: lighter;
  color: rgb(102, 102, 102);
}

.date{
  color: white;
   display: flex;
   padding-left: 7px;
   padding-top: 30px;
}

.day{
  
  font-weight:bolder;
  font-size: 40px;
}
.line{
  
  height:55px;
  /* border-right: solid #f3f4f6 2px; */
  font-size: 34px;
  color:white;
}
.time{
  padding-left: 6px;
}
#weatherLogo{
width: 18px;
height: 17px;
}
#locationLogo {
width: 18px;
height: 18px;

}
.moodPicker{
position: relative;
left: 30px;
padding-right: 40px;
}
.moodImg {
width: 29px;
height: 30px;
position: relative;
top:20px;
left:-1px;
padding-left: 14px;
}
image {
  width: 25%;
  height: 130px;
  position: relative;
  padding-left: 6px;
  left:14px;
  top:5px;
  margin-right: 7px;
}
#complete {
  background-color: #62cff3;
  color: white;
  font-weight: bold;
 position: relative;
 top:30px;
  width: 100%;
}

</style>
