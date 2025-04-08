
/*60:给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列 ,按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列
示例：输入 n =3 , k = 3 ; 输出：213
      输入：n = 4，k=9 ；输出：2314
      输入：n=3，k =1；输出：123

*/

const getPermutation = (n, k) => {
  const used = new Set();

  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum = groupNum * i;
  }

  const helper = (temp) => {      // temp是当前已选的数字数组
    const progress = temp.length; // progress表示当前已选了几个数字

    if (progress == n) {          // 因为是空降到正确的组，选够了n个即可返回
      return temp.join('');
    }

    groupNum = groupNum / (n - progress); // 一个分组有多少个

    for (let i = 1; i <= n; i++) {
      if (used.has(i)) continue;

      if (k > groupNum) { // k大于一组的个数
        k = k - groupNum; // 更新k，
        continue;         // 跳过这一组，即跳过当前的数字i
      }
      temp.push(i);        // 选择i
      used.add(i);         // 记录选择
      return helper(temp); // 进度+1 继续选
    }
  };

  return helper([]);
};

/*61：旋转链表 ： 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 eg： 1 , 2, 3, 4  k=2 ; 返回 3,4,1,2
*/

var rotateRight = function (head, k) {
  

};

/* 66：给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。
*/
var plusOne = function(digits) {
  const len = digits.length;
  for(let i = len - 1; i >= 0; i--) {
      digits[i]++;
      digits[i] %= 10;
      if(digits[i]!=0)
          return digits;
  }
  digits = [...Array(len + 1)].map(_=>0);
  digits[0] = 1;
  return digits;
};
