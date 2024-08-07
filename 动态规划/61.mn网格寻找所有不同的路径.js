/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var uniquePaths = function(m, n) {

};
// @lc code=end
var uniquePaths = function(m, n) {
  const dp = Array(m).fill().map(item => Array(n))
  
  for (let i = 0; i < m; ++i) {
      dp[i][0] = 1
  }
  
  for (let i = 0; i < n; ++i) {
      dp[0][i] = 1
  }
  
  for (let i = 1; i < m; ++i) {
      for (let j = 1; j < n; ++j) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
  }
  return dp[m - 1][n - 1]
};

console.log(uniquePaths(3,7),"---返回结果");



