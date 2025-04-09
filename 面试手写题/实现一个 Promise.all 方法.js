
/*
实现一个 Promise.all 方法，接收一个 Promise 数组，返回一个新的 Promise。
当所有输入的 Promise 都成功时，返回的 Promise 成功；
如果有一个失败，则返回的 Promise 失败
*/

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = value;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}

// 静态方法：promise.all
function all(promiseList) {
  return new MPromise((resolve, reject) => {
    // 参数类型判断
    if (!Array.isArray(promiseList)) {
      return reject(new TypeError('arguments must be array'))
    }
    const promiseLength = promiseList.length
    const res = []
    let count = 0
    for (let i = 0; i < promiseLength; i++) {
      // 注意数组元素类型，利用MPromise.resolve无论如何都会返回promise
      MPromise.resolve(promiseList[i]).then(
        (value) => {
          // 不能用push，会造成返回数据的顺序混乱
          count++
          res[i] = value
          // 用count计数，不能用数组长度
          if (count === promiseLength) {
            resolve(res)
          }
        }, error => {
          console.log('xxxx')
          reject(error)
        }
      ).catch(e => {
        reject(e)
      })
    }
  })
}
