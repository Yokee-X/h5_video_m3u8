<!--
 * @Author: Yokee
 * @Date: 2021-07-14 10:10:47
 * @LastEditTime: 2021-07-19 18:17:46
 * @FilePath: \h5video\src\views\index.vue
-->
<template>
    <div class="container">
        <div class="videoContent" @click="videoControl">
            <!-- video.js -->
            <!-- playsinline="true" 取消ios端自动全屏 -->
            <!-- <video
                id="videoPlayer"
                class="video-js vjs-default-skin vjs-big-play-centered"
                style="width: 100%; height: 100%"
                playsinline="true"
                controls
            >
                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider
                    upgrading to a web browser that
                    <a
                        href="https://videojs.com/html5-video-support/"
                        target="_blank"
                    >
                        supports HTML5 video
                    </a>
                </p>
            </video> -->

            <!-- hls.js -->
            <video ref="videoHls" class="video"></video>
            <div class="pause" v-show="hlsPause"></div>
            
        </div>
        {{ number }}
        <div>{{ date }}</div>
    </div>
</template>

<script>
import videojs from "video.js";
import Hls from "hls.js";
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
                        src: "http://ivi.bupt.edu.cn/hls/cctv1.m3u8",
                        type: "application/x-mpegURL",
                    },
                ],
            },
            hlsPlayer: null,
            hlsPause: true,
        };
    },
    mounted() {
        // this.initVideo();
        this.initHlsVideo();
    },
    methods: {
        initVideo() {
            let that = this;
            this.player = videojs(
                "videoPlayer",
                this.options,
                function onPlayerReady() {
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

                    this.on("click", function (event) {
                        console.log(
                            "触发click事件啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                            event
                        );
                        if (that.pause) {
                            that.player.play();
                        } else {
                            that.player.pause();
                        }
                        that.number++;
                        that.pause = !that.pause;
                    });
                }
            );
            this.player.on("click", function (e) {
                console.log("click事件", e);
            });
        },

        initHlsVideo() {
            let videoSrc = "http://ivi.bupt.edu.cn/hls/cctv1.m3u8";
            // let videoSrc = "https://test-streams.mux.dev/test_001/stream.m3u8";
            let config = {
                liveDurationInfinity:true,
                liveSyncDurationCount:3
            }
            this.hlsPlayer = new Hls(config);
            if (Hls.isSupported()) {
            this.hlsPlayer.loadSource(videoSrc);
            this.hlsPlayer.attachMedia(this.$refs.videoHls);
            this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log('加载成功');
                    // this.video.play();
                });
              this.hlsPlayer.on(Hls.Events.ERROR, (event, data) => {
                // console.log(event, data);
                // 监听出错事件
                console.log('加载失败');
              });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            this.$refs.videoHls.src = videoSrc;
            console.log(this.$refs.videoHls)
            }else{
                alert('不支持视频播放')
            }
        },
        videoControl() {
            if (this.$refs.videoHls.paused) {
                this.$refs.videoHls.play();
                this.hlsPause = false;
            } else {
                this.$refs.videoHls.pause();
                this.hlsPause = true;
            }
        },
    },
    beforeDestroy() {
        // if (this.player) {
        //     this.player.dispose();
        // }
        if (this.hlsPlayer) {
            this.$refs.videoHls.pause();
            this.hlsPlayer.destroy();
            this.hlsPlayer = null;
        }
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    min-height: 100vh;
}
.videoContent {
    width: 100%;
    height: 30vh;
    position: relative;
}
.video {
    width: 100%;
    height: 100%;
}

.pause {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid #fff;
}
.pause:hover {
    background: rgba(255, 255, 255, 0.7);
}
.pause::before {
    content: "";
    display: block;
    border: 15px solid rgba(255, 255, 255, 0.7);
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    margin-left: 15px;
    margin-top: 6px;
    width: 0;
    height: 0;
}
.pause::before:hover {
    border-left-color: #fff;
}

.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}
.video-js .vjs-big-play-button {
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
}
.video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
}
</style>