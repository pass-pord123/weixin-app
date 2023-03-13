<template>
<form>
    <view class="phone"> 
        <text> 绑定手机</text>
       <input placeholder="请输入手机号" type="text" class="tel" @input="phone" maxlength="11" v-model="phonenum">
    </view>

    <view class="fix"> 
        <text> 输入验证码</text>
       <input placeholder="请输入四位短信验证码" type="text" class="mode"><button class="getmode" disabled="{{button}}" @click="setCode()">{{text}}</button>
    </view>
</form>    
</template>

<script>
export default{
    data(){
        return{
            phone:'',
            button:false,
            text:'发送验证码'


        }
    },
    methods:{
        phone(e){
          let phone=e.detail.value
            
            this.setData({
                phone:phone
            })

        },
        setCode(){
          
           var phone = this.phonenum;
            var phone_reg=/^1[35789]\d{9}$/;
            if(!phone_reg.test(phone)){
                wx.showToast({
                    title:"手机号格式错误",
                    icon:'none'

                })
                return
            }

        }
    }
}

</script>

<style>
.tel{
    border: solid 1rpx rgb(213, 211, 211);
    height: 100rpx;
    width: 90%;
    border-radius: 25rpx;
    background: rgb(213, 211, 211);
    margin-left: 20rpx;
    margin-top: 20rpx;
}
.mode{
    border: solid 1rpx rgb(213, 211, 211);
    height: 100rpx;
    width: 60%;
    border-radius: 25rpx;
    background: rgb(213, 211, 211);
    margin-left: 20rpx;
    margin-top: 20rpx;
}
.phone, .fix{
    margin-top: 50rpx;
}
text{
    padding-left: 100rpx;
    margin-bottom: 50rpx;
}
.getmode{
    width: 30%;
    font-size: smaller;
    margin-left: 65%;
    margin-top: -90rpx;
    background: rgb(150, 221, 182);

}
</style>