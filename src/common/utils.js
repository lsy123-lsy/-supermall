export function debounce(func,delay = 100){
 let timer = null
 return function(...args){
   if(timer) clearTimeout(timer)
   
   timer = setTimeout(() => {
     func.apply(this, args)
   },delay);
 }
}

// 格式化时间戳
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    // date.getFullYear() + ''  将时间年份转变为字符串
    // RegExp.$1相当于yyyy，长度为4
    // substr(4 - RegExp.$1.length) 相当于substr(0)，即将date.getFullYear的值替换RegExp.$1

    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};


function padLeftZero (str) {
  // 不管传入几位，保证截取后为两位
  // 传入04，变成0004，从2开始截取为04，传入4，变成004，从1为开始截取为04
  return ('00' + str).substr(str.length);
};


