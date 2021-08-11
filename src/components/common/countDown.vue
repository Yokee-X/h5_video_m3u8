<!--
 * @Author: Yokee
 * @Date: 2021-08-10 15:00:41
 * @LastEditTime: 2021-08-11 11:05:32
 * @FilePath: \h5video\src\components\common\countDown.vue
-->
<template>
    <div class="content">
        <span class="text">距开播</span>
        <div class="item">
            {{ day }}
        </div>
        <span class="text">天</span>
        <div class="item">
            {{ hour }}
        </div>
        <span class="text">时</span>
        <div class="item">
            {{ minute }}
        </div>
        <span class="text">分</span>
        <div class="item">
            {{ second }}
        </div>
        <span class="text">秒</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer:null,
            day: "",
            hour: "",
            minute: "",
            second: "",
            diff:''
        };
    },
    props: {
        date: [String, Number],
    },
    beforeMount() {
         this.timer = setInterval(()=>{
              this.leftTimer(this.date)
          },1000)
    },
    beforeDestroy(){
        clearInterval(this.timer)
        this.timer=null
    },
    methods: {
        count() {
          
        },
        leftTimer(time) {
             
            var leftTime = new Date(time) - new Date(); //计算剩余的毫秒数
          
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
            var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
            var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
            var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
            this.day =  days.length < 2 ? "0" + days : days;
            this.hour =  hours.length < 2 ? "0" + hours : hours;
            this.minute = minutes.length < 2 ? "0" + minutes : minutes;
            this.second =  seconds.length < 2 ? "0" + seconds : seconds;
           
        },
    },
};
</script>

<style scoped>
.content {
    display: flex;
    align-items: center;
}
.text {
    font-size: 12px;
    font-weight: bold;
    color: #4a4045;
}
.item {
    width: 30px;
    height: 31px;
    border: 1px solid #cbe0f7;
    border-radius: 4px;
    margin-left: 6px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #3E72D7;
    font-weight: bold;
}
</style>