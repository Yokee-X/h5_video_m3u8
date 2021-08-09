<!--
 * @Author: Yokee
 * @Date: 2021-07-14 10:10:47
 * @LastEditTime: 2021-08-09 13:54:44
 * @FilePath: \h5video\src\views\index.vue
-->
<template>
    <div class="container">
        <div id="videoPlayer" class="videoContainer">
            <!-- <div class="text" @click="test">点我点我点点我</div> -->
            <!-- <div class="pause" v-show="tcPause" @click="playAndPause"></div> -->
        </div>
        <div class="videoContent">
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
            <!-- <video
                ref="videoHls"
                class="video"
                playsinline="true"
                webkit-playsinline="true"
                autoplay
                muted
            ></video>
            <div class="pause" v-show="hlsPause"></div> -->
        </div>
        {{ number }}
        <div>{{ date }}</div>
    </div>
</template>

<script>
// import videojs from "video.js";
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
                poster: "https://img1.baidu.com/it/u=2699821401,1244104801&fm=26&fmt=auto&gp=0.jpg", //视频封面图片
                sources: [
                    {
                        src: "http://ivi.bupt.edu.cn/hls/cctv1.m3u8",
                        type: "application/x-mpegURL",
                    },
                ],
            },
            hlsPlayer: null,
            hlsPause: false,
            videoSrc: "http://ivi.bupt.edu.cn/hls/cctv1.m3u8",
            tcPlayer: null,
            tcPause:false,
        };
    },
    mounted() {
        // this.initVideo();
        // this.initHlsVideo();
        this.initTcVideo();
    },
    methods: {
        initVideo() {
            let that = this;
            this.player = videojs("videoPlayer", this.options, function onPlayerReady() {
                console.log("onPlayerReady", this);
                that.videoObj = this;

                this.on("loadstart", function() {
                    console.log("开始请求数据 ");
                });
                // this.on("progress", function () {
                //     console.log("正在请求数据 ");
                // });
                this.on("loadedmetadata", function() {
                    console.log("获取资源长度完成 ");
                });
                this.on("canplaythrough", function() {
                    console.log("视频源数据加载完成");
                });
                this.on("waiting", function() {
                    console.log("等待数据");
                });
                this.on("play", function() {
                    console.log("视频开始播放");
                    that.pause = false;
                });
                this.on("playing", function() {
                    console.log("视频播放中");
                });
                this.on("pause", function() {
                    console.log("视频暂停播放");
                    that.pause = true;
                });
                this.on("ended", function() {
                    console.log("视频播放结束");
                });
                this.on("error", function() {
                    console.log("加载错误");
                });
                this.on("seeking", function() {
                    console.log("视频跳转中");
                });
                this.on("seeked", function() {
                    console.log("视频跳转结束");
                });
                this.on("ratechange", function() {
                    console.log("播放速率改变");
                });
                this.on("timeupdate", function() {
                    console.log("播放时长改变");
                });
                this.on("volumechange", function() {
                    console.log("音量改变");
                });
                this.on("stalled", function() {
                    console.log("网速异常");
                });

                // this.on("click", function(event) {
                //     console.log("触发click事件啊啊啊啊啊啊啊啊啊啊啊啊啊啊", event);
                //     if (that.pause) {
                //         that.player.play();
                //     } else {
                //         that.player.pause();
                //     }
                //     that.number++;
                //     that.pause = !that.pause;
                // });
            });
            // this.player.on("click", function(e) {
            //     console.log("click事件", e);
            // });
        },

        initHlsVideo() {
            let videoSrc = "http://ivi.bupt.edu.cn/hls/cctv1.m3u8";
            // let videoSrc = "https://test-streams.mux.dev/test_001/stream.m3u8";
            let config = {
                autoStartLoad: true,
                startPosition: -1,
                capLevelToPlayerSize: false,
                debug: false,
                defaultAudioCodec: undefined,
                initialLiveManifestSize: 1,
                maxBufferLength: 30,
                maxMaxBufferLength: 600,
                maxBufferSize: 60 * 1000 * 1000,
                maxBufferHole: 0.5,
                maxSeekHole: 2,
                lowBufferWatchdogPeriod: 0.5,
                highBufferWatchdogPeriod: 3,
                nudgeOffset: 0.1,
                nudgeMaxRetry: 3,
                maxFragLookUpTolerance: 0.2,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 10,
                enableWorker: true,
                enableSoftwareAES: true,
                manifestLoadingTimeOut: 10000,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 500,
                manifestLoadingMaxRetryTimeout: 64000,
                startLevel: undefined,
                levelLoadingTimeOut: 10000,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 500,
                levelLoadingMaxRetryTimeout: 64000,
                fragLoadingTimeOut: 20000,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 500,
                fragLoadingMaxRetryTimeout: 64000,
                startFragPrefetch: false,
                appendErrorMaxRetry: 3,
                enableCEA708Captions: true,
                stretchShortVideoTrack: false,
                forceKeyFrameOnDiscontinuity: true,
                abrEwmaFastLive: 5.0,
                abrEwmaSlowLive: 9.0,
                abrEwmaFastVoD: 4.0,
                abrEwmaSlowVoD: 15.0,
                abrEwmaDefaultEstimate: 500000,
                abrBandWidthFactor: 0.8,
                abrBandWidthUpFactor: 0.7,
                minAutoBitrate: 0,
            };
            if (Hls.isSupported()) {
                this.date = 1;
                this.hlsPlayer = new Hls();
                this.hlsPlayer.loadSource(videoSrc);
                this.hlsPlayer.attachMedia(this.$refs.videoHls);
                this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log("加载成功");
                    // this.video.play();
                });
                this.hlsPlayer.on(Hls.Events.ERROR, (event, data) => {
                    // 监听出错事件
                    console.log("加载失败");
                    console.log(event, data);
                });
            } else if (this.$refs.videoHls.canPlayType("application/vnd.apple.mpegurl")) {
                this.$refs.videoHls.src = videoSrc;
                this.date = 2;
                this.number = this.$refs.videoHls.canPlayType("application/vnd.apple.mpegurl");
            } else {
                this.date = 3;
                this.number = "不支持视频播放";
            }
        },
        initTcVideo() {
            let that = this
            this.tcPlayer = new TcPlayer("videoPlayer", {
                m3u8: "http://ivi.bupt.edu.cn/hls/cctv6.m3u8", //请替换成实际可用的播放地址
                // m3u8_hd:"http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8",
                rtmp: "rtmp://58.200.131.2:1935/livetv/cctv1",
                autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                live: true, //设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑。
                poster: {
                    style: "cover",
                    src:
                        "https://img1.baidu.com/it/u=2699821401,1244104801&fm=26&fmt=auto&gp=0.jpg",
                },
                controls: "default", //default 显示默认控件，none 不显示控件，system 移动端显示系统控件。
                systemFullscreen: true,
                x5_player: true,
                x5_type: true,
                x5_fullscreen: true,
                x5_orientation: 1,
                width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
                height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
                wording: {
                    //定义错误提示语
                    2032: "请求视频失败，请检查网络",
                    2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
                },
                listener: function(msg) {
                    if (msg.type == "error") {
                        switch (msg.detail.code) {
                            case 1:
                                console.log("网络错误，请检查网络配置或者播放链接是否正确。");
                                break;
                            case 2:
                                console.log("视频格式 Web 播放器无法解码。");
                                break;
                            case 3:
                                console.log("视频解码错误。");
                                break;
                            case 4:
                                console.log("当前系统环境不支持播放该视频格式。");
                                break;
                            case 5:
                                console.log(
                                    "播放器判断当前浏览器环境不支持播放传入的视频，可能是当前浏览器不支持 MSE 或者 Flash 插件未启用。"
                                );
                                break;
                            case 13:
                                console.log("直播已结束，请稍后再来。");
                                break;
                            case 1001:
                                console.log("断网了");
                                break;
                            case 1002:
                                console.log("获取视频失败，请检查播放链接是否有效。");
                                break;
                            case 2048:
                                console.log("无法加载视频文件，跨域访问被拒绝。");
                                break;
                            default:
                                console.log("出错了");
                                break;
                        }
                    }
                    if (msg.type == "load") {
                        console.log("load执行");
                    }
                    // if (msg.type == "timeupdate") {
                    //     console.log("timeupdate");
                    // }
                    if (msg.type == "loadeddata") {
                        console.log("loadeddata");
                        console.log(msg);
                    }
                    if (msg.type == "progress") {
                        console.log("progress");
                        console.log(msg);
                    }
                    if (msg.type == "play") {
                        that.tcPause = false
                        console.log("play");
                        console.log(msg);
                    }
                    if (msg.type == "playing") {
                        console.log("playing");
                        console.log(msg);
                    }
                    if (msg.type == "pause") {
                        that.tcPause = true
                        console.log("pause");
                        console.log(msg);
                    }
                    if (msg.type == "ended") {
                        console.log("ended");
                        console.log(msg);
                    }
                    if (msg.type == "seeking") {
                        console.log("seeking");
                        console.log(msg);
                    }
                    if (msg.type == "seeked") {
                        console.log("seeked");
                        console.log(msg);
                    }
                    // if (msg.type == "resize") {
                    //     console.log("resize");
                    // }
                    // if (msg.type == "volumechange") {
                    //     console.log("volumechange");
                    // }
                },
            });
        },
        test() {
            this.tcPlayer.fullscreen(true);
            this.number = "电力我";
        },
        playAndPause(){
            this.tcPlayer.togglePlay()
            this.tcPause = !this.tcPause
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
        if (this.player) {
            this.player.dispose();
        }
        // if (this.hlsPlayer) {
        //     this.$refs.videoHls.pause();
        //     this.hlsPlayer.destroy();
        //     this.hlsPlayer = null;
        // }
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    min-height: 100vh;
}
.videoContainer {
    width: 100%;
    /* height: 30vh; */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.text {
    position: absolute;
    font-size: 18px;
    color: #fff;
    left: 50%;
    top: 50%;
    z-index: 10;
}

.videoContent {
    width: 100%;
    /* height: 30vh; */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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
    z-index: 10;

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
