/* 58:给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。

单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。*/
var lengthOfLastWord = function (s) {
  const str = s.split(' ');
  const list = str.filter((item)=>item);
  const len = list[list.length-1].length;
  return len;
};


