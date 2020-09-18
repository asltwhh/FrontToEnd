var search =function(nums, target){  
    if(nums.length == 2){
        if(nums[0] == target || nums[1] == target){
            return true;
        }else{
            return false;
        }
    }      
    let l=0,r=nums.length-1;
    while(l<=r){
        let mid=parseInt((l+r)/2);
        if(nums[mid]==target){
            return true;
        }
        if(nums[mid]==nums[l]==nums[r]){
            l+=1;
            r-=1;
        }else if(nums[mid]>=nums[l]){
            if(nums[l]<=target && target<nums[mid]){
                r=mid-1;
            }else{
                l=mid+1;
            }    
        }else{
            if(nums[mid]<target && target<=nums[r]){
                l=mid+1;
            }
            else{
                r=mid-1;
            }     
        }  
    }
    return false;
}
console.log(search([3,1],1));