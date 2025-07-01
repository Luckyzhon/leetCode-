

/* 防抖 */
function debounce(func, delay) {
  let timer;
  if (timer) clearTimeout(timer);
  return function () {
    let arge = arguments;
    let current = this;
    timer = setTimeout(() => {
      func.apply(current, arge)
    }, delay)
  }
}


//节流,可以使用时间搓或者延时器实现

function throttle1(func, delay) {
  let previous = 0;
  return function () {
    let currentTime = Date.now();
    let arge = arguments;
    let that = this;
    if (currentTime - previous > delay) {
      func.apply(that, arge);
      previous = currentTime;
    }
  }
}


function throttle2 (func,delay){
  let timer;
  return function(){
    let arge = arguments;
    let that = this;
    if(!timer){
      timer = setInterval(()=>{
        func.apply(that,arge);
        timer = null;
      },delay)

    }
  }
}




/* 节流*/