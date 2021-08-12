<!--
 * @Author: Yokee
 * @Date: 2021-07-14 10:10:47
 * @LastEditTime: 2021-08-12 10:17:33
 * @FilePath: \h5video\src\views\index.vue
-->
<template>
    <div class="container">
        <!-- 视频 -->
        <my-video />
        <!-- 倒计时 -->
        <div class="countdown">
            <count-down :date="date"></count-down>
            <div class="warning">
                <img
                    src="../assets/iconfont/warning.png"
                    alt=""
                    class="warning-img"
                />
                <span class="warning-text">开播提醒</span>
            </div>
        </div>
        <!-- 轮播控制栏 -->
        <div class="swiper-control">
            <div class="swiper-control-container">
                <div
                    class="swiper-control-item"
                    :class="{
                        'swiper-control-item-select': swiperIndex == index,
                    }"
                    v-for="(item, index) in swiperList"
                    :key="index"
                    @click="changeSwiper(index)"
                >
                    <div
                        v-if="swiperIndex == index"
                        class="swiper-item-border"
                    ></div>
                    {{ item }}
                </div>
            </div>
            <div class="subscribe">公众号</div>
        </div>
        <!-- 中间轮播 -->
        <swiper
            ref="mySwiper"
            class="swiper"
            :options="{
                allowTouchMove: false,
                observer: true,
                observeParents: true,
            }"
            style="width: 100%; flex: 1"
        >
            <swiper-slide style="background: #f6f6f6" class="scroll">
                <div class="chat">
                    <bubble
                        v-for="(item, index) in messageList"
                        :key="index"
                        :item="item"
                    />
                </div>
            </swiper-slide>
            <swiper-slide style="background: red">Slide 2</swiper-slide>
        </swiper>
        <div class="bottom">
            <!-- 底部输入框 -->
            <div class="input-box">
                <img
                    src="../assets/iconfont/smile.png"
                    alt=""
                    class="input-img"
                />
                <el-input
                    v-model="text"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    placeholder="说点什么~"
                    resize="none"
                    class="input-content"
                >
                </el-input>
                <span class="input-text" @click="sendMsg">发送</span>
            </div>
            
        </div>
    </div>
</template>

<script>
import myVideo from "@/components/common/myVideo";

import countDown from "@/components/common/countDown";
import bubble from "@//components/common/bubble";
export default {
    data() {
        return {
            date: new Date("2021-08-17".replace(/-/g, "/")).getTime(),
            text: "", //输入框内容
            swiperIndex: 0, //轮播索引
            swiperList: ["互动", "介绍"],
            messageList: [
                {
                    avatar:
                        "https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg",
                    nickname: "张三",
                    msg: "消息笑嘻嘻下四大搜的艾斯欧迪dsadLK的萨达哦安迪哦啊",
                },
                {
                    avatar:
                        "https://img2.baidu.com/it/u=1481409823,181204090&fm=11&fmt=auto&gp=0.jpg",
                    nickname: "李四",
                    msg:
                        "这是消息消息哈哈哈打地区读取文件看到斯柯达是看到龙卷风",
                },
                {
                    avatar:
                        "https://img2.baidu.com/it/u=1194131577,2954769920&fm=26&fmt=auto&gp=0.jpg",
                    nickname: "赵六",
                    msg: "12可爱的说法",
                },
                {
                    avatar:
                        "https://img1.baidu.com/it/u=1340127580,1407454083&fm=26&fmt=auto&gp=0.jpg",
                    nickname: "王五",
                    msg: "321331大萨达12",
                },
                {
                    avatar:
                        "https://img1.baidu.com/it/u=1340127580,1407454083&fm=26&fmt=auto&gp=0.jpg",
                    nickname: "王五",
                    msg: "432432",
                },
            ],
        };
    },
    components: {
        countDown,
        bubble,
        myVideo,
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiperInstance;
        },
    },

    methods: {
        changeSwiper(index) {
            if (this.swiperIndex == index) return;
            this.swiperIndex = index;
            this.swiper.slideTo(index);
        },
        sendMsg() {
            if (!this.text) {
                this.$message.warning("不可发送空内容");
                return;
            }
            let obj = {
                avatar:
                    "https://img2.baidu.com/it/u=3899206724,3673140865&fm=26&fmt=auto&gp=0.jpg",
                nickname: "测试",
                msg: this.text,
            };
            this.messageList = [obj, ...this.messageList];
            this.text = "";
            this.swiper.update();
        },
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    /* background: #ddd; */
}

.countdown {
    width: 375px;
    height: 49px;
    background: linear-gradient(90deg, #eff4ff 0%, #ffffff 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 8px;
}

.warning {
    display: flex;
    align-items: center;
}
.warning-img {
    width: 10px;
    height: 12px;
    margin-right: 2px;
}
.warning-text {
    font-size: 12px;
    font-weight: bold;
    color: #3e72d7;
}
.swiper-control {
    width: 100%;
    height: 37px;
    display: flex;
}
.swiper-control-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.swiper-control-item {
    height: 100%;
    line-height: 37px;
    position: relative;
    font-size: 13px;
    font-weight: bold;
    color: #000000;
}
.swiper-control-item-select {
    color: #3e72d7;
}
.swiper-item-border {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -7px;
    width: 14px;
    height: 4px;
    background: #3e72d7;
    border-radius: 2px;
}
.subscribe {
    width: 76px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3484fd;
    color: #fff;
    font-size: 15px;
}

.scroll {
    overflow-y: scroll;
}
.chat {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    width: 100%;
    background: #f6f6f6;
    padding-bottom: 67px;
}

.bottom {
    width: 375px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
}

.input-box {
    position: relative;
    width: 100%;
    min-height: 62px;
    background: #ffffff;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
}
.input-img {
    width: 26px;
    height: 26px;
    margin-right: 8px;
}
.input-content {
    width: 272px;
    margin-right: 15px;
}
.input-text {
    font-size: 13px;
    font-weight: bold;
    color: #3e72d7;
}

/deep/.el-textarea__inner {
    font-size: 16px;
    border-radius: 15px;
    background: #f6f6f6;
}
/deep/.el-textarea__inner:focus {
    border-color: #c0c4cc;
}
</style>
