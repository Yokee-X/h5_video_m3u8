/*
 * @Author: Yokee
 * @Date: 2021-08-10 15:05:04
 * @LastEditTime: 2021-08-11 09:35:44
 * @FilePath: \h5video\src\utils\handleTime.js
 */
export function handleTime(time) {
	// time = time.replace(/\-/g,"/")
	console.log('time', time)
	let date = new Date(time);
	console.log('date', date)
	let day = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
	console.log('day', day)
	let h = date.getHours().toString();
	let m = date.getMinutes().toString();
	let s = date.getSeconds().toString();
	console.log('h', h, '\n', 'm', m, '\n', 's', s, '\n')
	h = h.length < 2 ? '0' + h : h;
	m = m.length < 2 ? '0' + m : m;
	s = s.length < 2 ? '0' + s : s;
	return `${day} ${h}:${m}:${s}`;
}

export function leftTimer(time){ 
    var leftTime = (new Date(time)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    days = checkTime(days); 
    hours = checkTime(hours); 
    minutes = checkTime(minutes); 
    seconds = checkTime(seconds); 
    setInterval("leftTimer(2016,11,11,11,11,11)",1000); 
    document.getElementById("timer").innerHTML = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
   } 
   function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
    if(i<10) 
    { 
    i = "0" + i; 
    } 
    return i; 
   } 