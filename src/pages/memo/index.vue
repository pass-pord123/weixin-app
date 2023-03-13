<template>
	<view class="content">

		<view class="text-area">
			<text class="chemess">{{ chemess }}</text>
		</view>
		<view class="todo-content" v-for="item in list" :key="item.title">
			<view class="todo-list">
				<view class="todo-list_content" id="{{item.id}}">{{ item.title }} {{ item.time }} {{ item.day }} </view>
				<view class="itemid" data-text="item._id">id:{{ item._id }}</view>
				<button class="mini-btn" type="default" size="mini" @click="del">X</button>
			</view>
		</view>
		<view class="main">
			<view class="text-area">
				<text class="title">{{ title }}</text>
			</view>

			<!-- 字体图标 -->
			<view class="create-todo" @click="creat"><text class="iconfont iconhao1"
					:class="{ 'create-todo-active': tetxShow }"></text></view>

			<view class="create-content" v-if="activeInput" :class="{ 'create-show': tetxShow }">
				<view class="create-content-box">
					<view class="create-input">
						<input class="inputtext" type="text" v-model="event" placeholder="开始输入..." />
					</view>
					<view class="pickers">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="datepick">{{ date }}</view>
						</picker> <span>&emsp;||&emsp;</span>

						<picker mode="time" @change="bindTimeChange">
							<view class="create-day">{{ day }}</view>
						</picker>

					</view>

					<view class="creat-button" @click="submitInput">新建</view>
				</view>

			</view>
		</view>




	</view>
</template>

<script>
function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 10;
	} else if (type === 'end') {
		year = year + 10;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
import { getBindingIdentifiers, isTemplateElement, pipelinePrimaryTopicReference } from "@babel/types";

export default {

	data() {
		id: '';
		wx.cloud.init();
		const db = wx.cloud.database({
			env: "cloud1-6gq9x2amdf00d4fd",
		});
		db.collection('memo').orderBy("date", "desc").get().then((res) => {
			this.list = res.data;
		});
		return {
			title: "",
			activeInput: false,
			tetxShow: false,
			event: "",
			day: '12:01',
			chemess: "点击按钮新建你的备忘录吧",
			list: [],
			index: 0,
			date: getDate({
				format: true
			}),
			startDate: getDate('start'),
			endDate: getDate('end'),
			_id: '',

		};
	},

	onshow() {
		wx.cloud.init();
		const db = wx.cloud.database({
			env: "cloud1-6gq9x2amdf00d4fd",
		});
		db.collection('memo').get().then((res) => {
			this.list = res.data;
		});

	},
	computed: {

		listData() {
			let list = JSON.parse(JSON.stringify(this.list)); //拷贝对象
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
				env: "cloud1-6gq9x2amdf00d4fd",
			});
			db.collection('memo').doc(
				'idd'
			).remove({
				success: function (res) {
					console.log(res.data)
				}
			});

		},
		//打开动画
		open() {
			this.activeInput = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.tetxShow = true;
				}, 50);
			});
		},
		//关闭动画
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
		bindTimeChange: function (e) {
			this.day = e.detail.value;
		},
		submitInput() {
			this.activeInput = false;
			uni.setStorageSync("event", this.event);
			uni.setStorageSync("date", this.date);
			uni.setStorageSync("day", this.day);

			this.list.unshift({
				title: uni.getStorageSync("event"),
				time: uni.getStorageSync("date"),
				day: uni.getStorageSync("day")
			})
			this.close();
			this.event = "";
			wx.cloud.init();
			const db = wx.cloud.database({
				env: "cloud1-6gq9x2amdf00d4fd",
			});
			db.collection("memo")
				.add({
					data: {
						title: uni.getStorageSync("event"),
						time: uni.getStorageSync("date"),
						day: uni.getStorageSync("day")
					},
				})
				.then((res) => { console.log(res) })
			db.collection('memo').get().then((res) => {
				this.list = res.data;
			});
		}
	},
	watch: {
		event() {
			uni.setStorageSync("event", this.event);
			wx.cloud.init();
			const db = wx.cloud.database({
				env: "cloud1-6gq9x2amdf00d4fd",
			});
			db.collection('memo').get().then((res) => {
				this.list = res.data;
			});


		}
	}
}
	;
</script>

<style>
.pickers {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.text-area {
	display: flex;
	justify-content: center;
}

.create-show {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.main {
	margin-top: 60px;
}

.itemid {
	display: none;
}

.inputtext {
	text-align: center;
	margin-top: 30px;

}

.datepick {
	display: flex;
	flex-direction: row-reverse;

}

.chemess {
	font-size: 36rpx;
	color: cornflowerblue;
	font-weight: bolder;
}

.title {
	font-size: 36rpx;
	color: cornflowerblue;
	font-weight: bolder;
}

.creat-button {
	margin-top: 30px;
	margin-left: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	width: 80px;
	border-radius: 50px;
	font-size: 16px;
	color: #88d4ec;
	box-shadow: -2px 0px 2px 1px rgba(0, 0, 0, 0.1);
}

.create-todo {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 70px;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #deeff5;
	box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
}

.iconhao1 {
	font-size: 30px;
	color: #add8e6;
}

.create-content {
	position: absolute;
	bottom: 95px;
	transition: all 0.3s;
	opacity: 0;
	transform: scale(2) translateY(200%);
}

.create-show {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.create-content-box {
	margin-left: 75px;
	align-items: center;
	height: 170px;
	border-radius: 20px;
	background: #deeff5;
	box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
	z-index: 2;
}

.todo-list {
	position: relative;
	display: flex;
	align-items: center;
	padding: 15px;
	margin: 15px;
	color: #0c3854;
	font-size: 14px;
	border-radius: 10px;
	background: #cfebfd;
	box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	overflow: hidden;
}
</style>