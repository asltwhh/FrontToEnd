function singleNonDuplicate(nums) {
    let left = 0, right = nums.length-1;
    while(left <= right){
        let mid = parseInt((left+right)/2);
        if(mid%2 === 1){
            mid--;
        }
        if(nums[mid] === nums[mid+1]){
            left = mid+2;
        }else{
            right = mid-2;
        }
    }
    return nums[left];
}
function singleNonDuplicate(nums) {
    for(let i=0; i<nums.length; i+=2){
        if(nums[i] !== nums[i+1]){
            return nums[i];
        }
    }
}
function singleNonDuplicate(nums) {
    let left = 0, right = nums.length-1;
    while(left<=right){
        let mid = parseInt((left+right)/2);
        if(nums[mid] === nums[mid-1]){
            // 如果前面的数组长度为偶数，则target在后面的数组中
            if((mid-1)%2 === 0){
                // target在后面的数组中
                left = mid+1;
            }else{
                // target在前面的数组中
                right = mid-2;
            }
        }else if(nums[mid] === nums[mid+1]){
            // 如果前面的数组长度为偶数，则target在后面的数组中
            if(mid%2 === 0){
                // target在后面的数组中
                left = mid+2;
            }else{
                // target在前面的数组中
                right = mid-1;
            }
        }else{
            return nums[mid];
        }
    }
}
console.log(singleNonDuplicate([1,1,2,2,3,3,4,4,5,5,6,7,7,8,8]))