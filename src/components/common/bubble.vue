<!--
 * @Author: Yokee
 * @Date: 2021-08-11 14:40:42
 * @LastEditTime: 2021-08-11 15:41:26
 * @FilePath: \h5video\src\components\common\bubble.vue
-->
<template>
    <div class="main">
        <img class="avatar" :src="item.avatar" alt="" />
        <div class="content">
            <div class="nickname">{{item.nickname}}：</div>
            <div class="message">
                <div class="triangle"></div>
                {{item.msg}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    props:{
        item:Object
    }
}
</script>

<style scoped>
    .main{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        max-width: 314px;
        padding-left:8px ;
        margin-bottom:5px ;
        margin-top: 8px;
    }
    .avatar{
        width: 32px;
        height: 32px;
        background: #919191;
        border-radius: 50%;
    }
    .content{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .nickname{
        font-size: 15px;
        font-weight: bold;
        color: #989898;
        margin-top: 4px;
        margin-bottom: 11px;
    }
    .message{
        margin-left: 8px;
        position: relative;
        background: #FFF;
        border-radius: 8px;
        padding:8px 6px 9px;
        max-width: 254px;
line-height: 19px;
color: #414142;
font-weight: bold;
font-size: 13px;
    }
    .triangle{
        position: absolute;
        left: -8px;
        top: 7px;
        width: 0;
        height: 0;
        border-left:0 ;
        border-right: 10px solid #FFF;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
    }
</style>