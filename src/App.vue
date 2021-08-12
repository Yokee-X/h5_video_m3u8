<!--
 * @Author: Yokee
 * @Date: 2021-07-13 17:00:21
 * @LastEditTime: 2021-08-12 16:15:34
 * @FilePath: \h5video\src\App.vue
-->
<template>
    <div id="app">
      <router-view />
       
    </div>
</template>

<script>
export default {

};
</script>
<style>
html,body{
  overflow-x: hidden;
}
#app{
  width: 100%;
  height: 100vh;
}
*{
  padding: 0;
  margin: 0;
}
input{
  outline: 0;
}
textarea{
  outline: 0;
}
.clear-fix{
  overflow: hidden;
  clear: both;
}
</style>
