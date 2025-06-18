

/* 防抖 */
function debounce (func,delay ) {
  let timer;
  if(timer) clearTimeout(timer);
  return function(){
    let arge = arguments;
    let current = this;
    timer = setTimeout(()=>{
      func.apply(current,arge)
    }, delay)
  }
}






/* 节流*/