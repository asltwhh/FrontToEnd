var searchRange = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let mid = parseInt((l + r) / 2);
    if (nums[mid] < target) {
      l = mid + 1; //只有当nums[mid]<target时才移动l,所以l始终指向第一个不小于target的元素所在的位置
    } else {
      r = mid - 1;
    }
  }
  console.log(l);
  // 如果nums[l]不等于target，则说明数组中不存在等于target的元素
  if (nums[l] !== target) {
    return [-1, -1];
  }

  // 存在向后查找最后一个target所在的位置
  let res = l;
  while (nums[res + 1] === target) {
    res++;
  }
  return [l, res];
};
console.log(
  searchRange(
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 8, 10, 10],
    4
  )
);
