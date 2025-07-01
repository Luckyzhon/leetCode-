

/*
 67：给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和
*/

var addBinary22 = function (a, b) {
  const lena = a.length;
  const lenb = b.length;
  const le = Math.max(lena, lenb)
  let re = 0;
  for (let i = le.length - 1; i >= 0; i--) {
    re[i] = (lena[i] ?? 0) + (lenb[i] ?? 0);
  }
  for (let j = 0; j <= re.length - 1; j++) {
    if (re[j] % 2 === 0) {
      re[j] === 0;
      re[j + 1]++;
    }
  }
  return re;
};


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let ans = "";
  let ca = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = ca;
    sum += i >= 0 ? parseInt(a[i]) : 0;
    sum += j >= 0 ? parseInt(b[j]) : 0;
    ans += sum % 2;
    ca = Math.floor(sum / 2);//向下取整
  }
  ans += ca == 1 ? ca : "";
  return ans.split('').reverse().join('');
};

