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
var uniquePaths = function (m, n) {

};
// @lc code=end
//62:动态规则算法
var uniquePaths = function (m, n) {
  const dp = Array(m).fill().map(item => Array(n));

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

console.log(uniquePaths(3, 7), "---返回结果");

/* 63：不同路径，给定m*n的网格，网格中有障碍物，计算从起始位置到目标点有多少条路径
*/
const uniquePathsWithObstacles = (obstacleGrid) => {
  if (obstacleGrid[0][0] == 1) return 0; // 出发点就被障碍堵住 
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // dp数组初始化
  const dp = new Array(m);
  for (let i = 0; i < m; i++) dp[i] = new Array(n);
  // base case
  dp[0][0] = 1;                 // 终点就是出发点
  for (let i = 1; i < m; i++) { // 第一列其余的case
    dp[i][0] = obstacleGrid[i][0] == 1 || dp[i - 1][0] == 0 ? 0 : 1;
  }
  for (let i = 1; i < n; i++) { // 第一行其余的case
    dp[0][i] = obstacleGrid[0][i] == 1 || dp[0][i - 1] == 0 ? 0 : 1;
  }
  // 迭代
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = obstacleGrid[i][j] == 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1]; // 到达(m-1,n-1)的路径数
};

