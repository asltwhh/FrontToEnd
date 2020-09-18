/*var twoSum = function(nums, target) {
	let map = new Map();
	for(let i in nums){
	    map.set(
	        nums[i],
	        i
	    )
	}

	for(let j = 0; j < nums.length - 1; j++){
		// 判断map中是否包含target-nums[j]作为value值，并且这个值和当前的数不是一个数
	    if(map.has( target - nums[j] ) && map.get( target - nums[j]) != j ){
	        return [j, map.get( target - nums[j])];
	    }
	}
}*/


// 没有理解
var twoSum = function(nums, target) {
	   const map = {}
	   for (let i = 0; i < nums.length; i++){
	   	console.log(map[target - nums[i] ]);
	       if(map[target - nums[i] ] >= 0){
	       	console.log('结束啦')
	           return [ map[target - nums[i] ], i]
	       }
	       map[nums[i]] = i;    
	       console.log(map)        
	    }
    
	}
var arr = twoSum([2,7,11,15], 9);
console.log(arr)