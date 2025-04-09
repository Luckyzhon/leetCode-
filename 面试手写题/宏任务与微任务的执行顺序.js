console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async function async1() {
  console.log('async1 start');
  await Promise.resolve().then(() => {
    console.log('promise1');
  });
  console.log('async1 end');
}

async1();

console.log('script end');


/*
 输出顺序：
 script start
 async1 start
 script end
 promise1
 async1 end
 setTimeout
*/