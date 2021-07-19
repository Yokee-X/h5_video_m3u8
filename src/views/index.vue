<!--
 * @Author: Yokee
 * @Date: 2021-07-14 10:10:47
 * @LastEditTime: 2021-07-19 10:07:31
 * @FilePath: \h5video\src\views\index.vue
-->
<template>
    <div class="container">
        <div class="video"  >
            <!-- playsinline="true" 取消ios端自动全屏 -->
            <video
                id="videoPlayer"
                class="video-js vjs-default-skin"
                style="width: 100%; height: 100%"
                playsinline="true"
                controls
               @click="videoClick"
            >
                <!-- <source
                    src="http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8"
                    type="application/x-mpegURL"
                /> -->
            </video>
        </div>
        {{ number }}
        <div>{{ date }}</div>
    </div>
</template>

<script>
import videojs from "video.js";
// import "videojs-contrib-hls";
// import 'videojs-http-streaming'
export default {
    data() {
        return {
            date: 0,
            number: 0,
            pause: false,
            player: null,
            videoObj: null,
            options: {
                autoplay: false, //自动播放
                controls: true, //是否显示控制条
                preload: "auto", //预加载
                nativeControlsForTouch: false,
                nativeVideoTracks: false,
                nativeAudioTracks: false,
                fluid: true, //自适应宽高
                // width: "100%",
                // height: "100%",
                poster:
                    "https://img1.baidu.com/it/u=2699821401,1244104801&fm=26&fmt=auto&gp=0.jpg", //视频封面图片
                sources: [
                    {
                        src: "http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8",
                        type: "application/x-mpegURL",
                    },
                ],
            },
        };
    },
    mounted() {
        this.initVideo()
    },
    methods: {
        initVideo() {
            let that = this;
            this.player = videojs("videoPlayer", this.options, function onPlayerReady() {
                console.log("onPlayerReady", this);
                that.videoObj = this;

                this.on("loadstart", function () {
                    console.log("开始请求数据 ");
                });
                // this.on("progress", function () {
                //     console.log("正在请求数据 ");
                // });
                this.on("loadedmetadata", function () {
                    console.log("获取资源长度完成 ");
                });
                this.on("canplaythrough", function () {
                    console.log("视频源数据加载完成");
                });
                this.on("waiting", function () {
                    console.log("等待数据");
                });
                this.on("play", function () {
                    console.log("视频开始播放");
                    that.pause = false;
                });
                this.on("playing", function () {
                    console.log("视频播放中");
                });
                this.on("pause", function () {
                    console.log("视频暂停播放");
                    that.pause = true;
                });
                this.on("ended", function () {
                    console.log("视频播放结束");
                });
                this.on("error", function () {
                    console.log("加载错误");
                });
                this.on("seeking", function () {
                    console.log("视频跳转中");
                });
                this.on("seeked", function () {
                    console.log("视频跳转结束");
                });
                this.on("ratechange", function () {
                    console.log("播放速率改变");
                });
                this.on("timeupdate", function () {
                    console.log("播放时长改变");
                });
                this.on("volumechange", function () {
                    console.log("音量改变");
                });
                this.on("stalled", function () {
                    console.log("网速异常");
                });

                this.on("click", function () {
                    console.log("触发click事件啊啊啊啊啊啊啊啊啊啊啊啊啊啊");
                    if (that.pause) {
                        that.player.play();
                    } else {
                        that.player.pause();
                    }
                    that.number++;
                    that.pause = !that.pause;
                });
            });
        },
        videoClick() {
            this.date = new Date().getTime();
            console.log("点击点击");
            this.$emit("player");
        },
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    min-height: 100vh;
}
.video {
    /* width: 100%;
    height: 30vh; */
    position: relative;
}

</style>