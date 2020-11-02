var threeSum = function (nums) {
  let n = nums.length;
  let res = [];
  // 如果数组为null或者数组的长度小于3，直接返回null
  if (!nums || n < 3) {
    return res;
  }
  // 将数组按照正序排列
  nums.sort((a, b) => {
    return a - b;
  });
  // 如果nums[i]>0,因为数组已经按照正序排列，说明后面不可能存在三数之和为0
  // 因为最小的数就大于0了
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return res;
    }
    // 对于已经循环过的相同的数直接跳过
    // 不能写nums[i]===nums[i+1]，这样会先排除重复的数
    // 如果存在[-1,-1,0],则会直接跳过第一个数，导致[-1,-1,0]被丢失
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let target = 0 - nums[i];
    let L = i + 1,
      R = n - 1;
    while (L < R) {
      // console.log(nums[i], nums[L], nums[R]);
      if (nums[L] + nums[R] === target) {
        res.push([nums[i], nums[L], nums[R]]);
        // 去重
        while (L < R && nums[L] === nums[L + 1]) {
          L += 1;
        }
        while (L < R && nums[R] === nums[R - 1]) {
          R -= 1;
        }
        L += 1;
        R -= 1;
      } else if (nums[L] + nums[R] > target) {
        R -= 1;
      } else {
        L += 1;
      }
    }
  }
  return res;
};
console.log(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]));
