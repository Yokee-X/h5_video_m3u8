<!--
 * @Author: Yokee
 * @Date: 2021-07-14 10:10:47
 * @LastEditTime: 2021-08-12 16:17:45
 * @FilePath: \h5video\src\views\index.vue
-->
<template>
    <div class="container">
        <!-- 视频 -->
        <my-video />
        <div class="clear-fix"></div>
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
        <div class="clear-fix"></div>

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
            <div class="subscribe" @click="subscribeShow = true">公众号</div>
        </div>
        <van-popup v-model="subscribeShow" round class="popup">
            <div>
                <div class="popup-content">
                    <div class="popup-title">谢谢你的关注</div>
                    <div class="popup-text">
                        "四川省预防医学会微平台"聚焦专业，关注健康
                    </div>
                    <img src="" alt="" class="popup-img" />
                    <div class="popup-waning">长按二维码填写报名表</div>
                </div>

                <div class="popup-close" @click="subscribeShow = false">
                    关闭
                </div>
            </div>
        </van-popup>
        <div class="clear-fix"></div>

        <!-- 中间轮播 -->
        <swiper
            ref="mySwiper"
            class="swiper"
            :options="{
                allowTouchMove: false,
                observer: true,
                observeParents: true,
            }"
            style="width: 100%; flex: 1;"
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
            <swiper-slide>
                <div class="intro">
                    <div class="introduce-content">
                        <div class="introduce-title">四川省预防医学会</div>
                        <div class="introduce-bottom">
                            <div class="introduce-flex-row">
                                <div class="introduce-flex-row">
                                    <img
                                        src="../assets/iconfont/clock.png"
                                        class="introduce-icon1"
                                        alt=""
                                    />
                                    <div class="introduce-status">未开始</div>
                                </div>
                                <div class="introduce-time">
                                    2021年08月14日 18:53
                                </div>
                            </div>
                            <div class="introduce-flex-row">
                                <img class="introduce-icon2" src="../assets/iconfont/user.png" alt="">
                                <span class="introduce-number">154</span>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="bottom">
            <!-- 底部输入框 -->
            <div class="input-box">
                <img
                    src="../assets/iconfont/smile.png"
                    alt=""
                    class="input-img"
                    @click="show = !show"
                />
                <el-input
                    v-model="text"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    placeholder="说点什么~"
                    resize="none"
                    class="input-content"
                    @focus="focus"
                >
                </el-input>
                <span class="input-text" @click="sendMsg">发送</span>
            </div>
            <!-- emoji -->
            <transition name="slide-fade">
                <div class="emoji-container" v-show="show">
                    <swiper :options="{}" style="width: 100%; height: 100%">
                        <swiper-slide
                            v-for="(item, index) in emoji"
                            :key="'swiper' + index"
                        >
                            <div class="emoji-content">
                                <div
                                    class="emoji-item"
                                    v-for="(emojiItem, ind) in item"
                                    :key="ind + 'emoji' + index"
                                >
                                    <span
                                        v-if="emojiItem != 'del'"
                                        @click="selectEmoji(emojiItem)"
                                    >
                                        {{ emojiItem }}</span
                                    >
                                    <img
                                        v-else
                                        src="../assets/iconfont/del.png"
                                        class="del"
                                        @click="deleteEmoji"
                                    />
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import myVideo from "@/components/common/myVideo";
import { emojilist, checkEmoji } from "@/utils/emoji";
import countDown from "@/components/common/countDown";
import bubble from "@//components/common/bubble";

export default {
    data() {
        return {
            emojilist,
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
            subscribeShow: false, //公众号
            show: false,
        };
    },
    beforeMount() {},
    components: {
        countDown,
        bubble,
        myVideo,
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiperInstance;
        },
        emoji() {
            let arr = [];
            for (let i = 0; i < Math.ceil(this.emojilist.length / 20); i++) {
                let temp = this.emojilist.slice(i * 20, (i + 1) * 20);
                let len = temp.length;
                if (len < 20) {
                    for (let a = 0; a < 20 - len; a++) {
                        temp.push("");
                    }
                }
                arr.push([...temp, "del"]);
            }
            console.log(arr, "emoji");
            return arr;
        },
    },

    methods: {
        changeSwiper(index) {
            if (this.swiperIndex == index) return;
            this.swiperIndex = index;
            this.swiper.slideTo(index);
        },
        sendMsg() {
            //todo 发送新消息置低
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
        focus() {
            this.show = false;
        },
        selectEmoji(item) {
            this.text = this.text + item;
        },
        deleteEmoji() {
            let isEmoji1 = checkEmoji(
                this.text.slice(this.text.length - 1, this.text.length)
            );
            let isEmoji2 = checkEmoji(
                this.text.slice(this.text.length - 2, this.text.length)
            );
            let len = 1;
            if (isEmoji1) {
                len = 1;
            } else if (isEmoji2) {
                len = 2;
            }
            this.text = this.text.slice(0, this.text.length - len);
        },
    },
};
</script>

<style scoped>
.container {
    overflow-x: hidden;
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
.popup-content {
    width: 100%;
    height: 258px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding-top: 18px;
}
.popup {
    width: 300px;
}
.popup-title {
    font-size: 17px;

    color: #353535;
    font-weight: bold;
}
.popup-text {
    font-size: 13px;
    font-weight: bold;
    color: #333333;
    margin: 12px 0 15px;
}
.popup-img {
    width: 135px;
    height: 135px;
    margin-bottom: 11px;
}
.popup-waning {
    font-size: 13px;
    font-weight: bold;
    color: #adadad;
}
.popup-close {
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
    text-align: center;
    line-height: 50px;
    color: #919499;
    font-size: 17px;
    font-weight: bold;
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
    /* padding-bottom: 67px; */
}

.intro {
    background: #fff;
    width: 100%;
}
.introduce-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #dcdcdc;
    box-sizing: border-box;
    padding: 14px 12px 0;
}
.introduce-title {
    font-size: 17px;
    font-weight: bold;
    color: #010000;
}
.introduce-bottom {
    margin-top:17px ;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.introduce-flex-row{
    display: flex;
    align-items: center;
}
.introduce-icon1 {
    width: 12px;
    height: 12px;
}
.introduce-status {
    font-size: 11px;
    color: #00b645;
    margin: 0 11px 0 5px;
}
.introduce-time {
    font-size: 11px;
    font-weight: bold;
    color: #010000;
}
.introduce-icon2{
    width: 13px;
height: 14px;
margin-right: 5px;
}
.introduce-number{
font-size: 11px;
font-weight: bold;
color: #5C6067;
}

.bottom {
    width: 100%;
    /* position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99; */
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

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s linear;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(171px);
    opacity: 0;
}
.emoji-container {
    position: relative;
    width: 100%;
    height: 171px;
    background: #fff;
}
.emoji-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.emoji-item {
    width: 32px;
    margin: 0 10px 14px;
}
.del {
    width: 32px;
}
</style>
