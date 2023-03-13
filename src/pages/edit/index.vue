<template>
    <view>
        <view>        
		<view class="content">
        <uni-icons  type="images" size="28" @click="upload" ></uni-icons>
     <i class="iconfont icon-zitijiacu" @tap="changeBold"></i>
    <i class="iconfont icon-fontsize" @tap="changeStyle"></i>
    <i class="iconfont icon-shanchu" @tap="undo"></i>
	</view>
    <view>
        <view>
    <uni-dateformat :date="data"></uni-dateformat>
    </view>

    <input type="number" v-model="money" :class="{'checkyes':ison,'checkno':isstyle}" id="editor" placeholder="请输入金额" />
    <input  v-model="comment" :class="{'checkyes':ison,'checkno':isstyle}" id="editor" placeholder="账单明细" />
    <image :src="imagePath"></image>
    <view>
      <view>
    <uni-tag text="#支出" type="error" @click="addError" :circle="true" :inverted="invertedE"></uni-tag>
    <uni-tag text="#收入" type="success"  @click="addSuccess" :circle="true" :inverted="invertedS"></uni-tag>
	</view></view>
    <button @click="check">返回</button>
</view>
<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
</view>
</view>
 

</template>

<script>
export default {
data() {
    return {
        formats: {},
        fontColor: '#000',
        isEdit: false,
        type: "default",
		invertedE: false,
        invertedP: false,
        invertedS: false,
        invertedW: false,
        comment: "",
        boxWidth:"",
		active: 0,
		ison:false,
        emotions:"",
        isstyle:false,
        data:new Date(),
        money:"",
        show:false,
        imageValue:[],
         imgCount:0,
        index: 0,
        imagePath: "",
        showImg:true,
        tempFilePaths:[]
    }
},
onLoad(data) {
    this.imagePath = data.imagePath;
    this.boxWidth = uni.upx2px(1000) + 'px';
  
},
methods: {

			undo() {
				let that=this;
                that.comment=""
			},
            clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success");
					}
				});
			},
		
    changeBold(){
    let that = this
    that.ison=!that.ison
    },
    changeStyle(){
    let that = this
    that.isstyle=!that.isstyle
    that.show=!that.show
    },	

    addError(){
       this.invertedE = !this.invertedE;
       let that=this;
        if (this.imagePath){
          that.showImg=!that.showImg
        const parts = this.imagePath.split("/");
        wx.cloud.init();
        wx.cloud.uploadFile({
           filePath: this.imagePath,
           cloudPath: "images/" + parts[parts.length - 1],//生成独一无二文件名
         success(res) {//文件上传完毕后调用success
           const db = wx.cloud.database();
                db.collection("moments").add({
                    // if a data value is empty, add() might fail silently
                    data: { 
                        imageURL:res.fileID ,
                        comment: that.comment, // how to access this.comment here?
                        emotion:"#支出",
                        ison:that.ison,
                        isstyle:that.isstyle,
                        data:that.data,
                        show:that.show,
                        money:that.money,
                        image:that.imageValue
                    },
                });
          },
           fail: console.error
        });
          
      } else {
        const db = wx.cloud.database();
                db.collection("moments").add({
                    // if a data value is empty, add() might fail silently
                    data: {
                        comment: that.comment, // how to access this.comment here?
                        emotion:"#支出",
                        ison:that.ison,
                        isstyle:that.isstyle,
                        data:that.data,
                        money:that.money,
                        show:that.show,
                    },
                
        });
      }
        
    },
    

    addSuccess(){
        this.invertedS = !this.invertedS;
        let that=this;
        if (this.imagePath){
        const parts = this.imagePath.split("/");
        wx.cloud.init();
        wx.cloud.uploadFile({
           filePath: this.imagePath,
            cloudPath: "images/" + parts[parts.length - 1],//生成独一无二文件名
            success(res) {//文件上传完毕后调用success
                db.collection("moments-data").add({
                    // if a data value is empty, add() might fail silently
                    data: {
                        imageURL: res.fileID,
                        comment: that.comment, // how to access this.comment here?
                        emotion:"#收入",
                        ison:that.ison,
                        isstyle:that.isstyle,
                        data:that.data,
                        show:that.show,
                        money:that.money,
                    },
                });
            },
            fail: console.error
        });}else{
            const db = wx.cloud.database();
                db.collection("moments-data").add({
                    // if a data value is empty, add() might fail silently
                    data: {
                        comment: that.comment, // how to access this.comment here?
                        emotion:"#收入",
                        ison:that.ison,
                        isstyle:that.isstyle,
                        data:that.data,
                        money:that.money,
                        show:that.show,
                    },
                
        });
    };
 },
    upload(){
        let that=this
   		wx.chooseMedia({
        count: 1,
        success(res) {
           that.imagePath= res.tempFiles[0].tempFilePath
        }
      });
    },
  

    check() {
        wx.navigateTo({url:"../index/edit"})

    },
           
		}
            
}   




</script>

<style lang="scss" scoped>
 .checkyes{//默认样式
					//height: 60rpx;
					//width: 20%;
					// background: yellow;
					font-size: "15px";
					//float: left;
					//display: block;
					justify-content: center;
					align-items: center;
					//padding: 30rpx;
                    font-weight: bold;
				}
    .logo{
        height:55rpx;
        width:23px;
        font-weight:bold
    }
    .checkno{
     font-size:large
    }
    .container {
		padding: 10px;
	}

	#editor {
		background-color:aliceblue;
        margin-top:3px;
        margin-bottom:3px;
        height:45px
	}

    .ql-container {
	box-sizing: border-box;
	padding: 12px 15px;
	width: 100%;
	min-height: 30vh;
	height: auto;
	background: #fff;
	font-size: 16px;
	line-height: 1.5;
}

.ql-active {
	color: #06c;
}

.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
}
	
.toolbar {
	box-sizing: border-box;
	border-bottom: 0;
	font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

	.example-body {
		display: flex;
		flex-direction: column;
		line-height: 1.5em;
	}

@import "./editor.css" 
</style>