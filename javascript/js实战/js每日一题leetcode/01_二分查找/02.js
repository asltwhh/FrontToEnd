let nums = [4, 3, 2, 7, 8, 2, 3, 1];
let arr = [1, 2, 3, 4, 5, 6, 7, 8];
for (let i = 0; i < nums.length; i++) {
  if (arr[nums[i] - 1] != 0) {
    console.log(nums[i]);
    arr.splice(nums[i] - 1, 1, 0);
    console.log(arr);
  }
}
