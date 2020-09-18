var a = [5,2,4,6,1,3];
function insertSort(a){
	let b = [];
	b[0] = a[0];
	for(var i=1; i<a.length; i++){
	    for(var j=0; j<b.length; j++){
	        if(a[i] < b[j]){
	            b.splice(j,0,a[i]);
	            break;
	        }else if(a[i]>= b[j] && (a[i]<=b[j+1] || b[j+1] == undefined)){
	            b.splice(j+1,0,a[i]);
	            break;
	        }
	    }
	}
	return b;
}

function insertSort(a){
	var key;
	for(var i=0; i<a.length; i++){
	    for(var j=i+1; j<a.length; j++){
	        if(a[j]<=a[i]){
	            key = a[j];
	            a[j] = a[i];
	            a[i] = key;
	        }
	    }
	}
	return a;
}
// console.log(insertSort(a));  // [0,1,2,3,4,5,7]
// 

var b = [10,3,5,1,6,4,7,2,9,0,13,4]
function quickSort(A,p,r){
	// p为最左边的下标索引
	// r为最右边的下表索引
	if(p<r){
		let q = partition(A,p,r);
		quickSort(A,p,q-1);
		quickSort(A,q+1,r);
	}
	return A;
}
function partition(A,p,r){
	/*
	x是主元：被排序数组最右边的值
	*/
	let x = A[r]; 
	i = p-1;
	// 遍历整个数组，移动左指针，找到比主元小的值
	// 移动右指针，即可得到一个比主元大的值，将两个值交换
	for(let j=p; j<=r; j++){
		if(A[j]<=x){
			i++;
			[A[i],A[j]] = [A[j],A[i]];
		}
	}
	return i;
}
// console.log(quickSort(b,0,b.length-1));
// 

// b = [10,3,5,1,6,4,7,2,9,0,13,4]
function bubbleSort(array){
	var count = 0;
    const len = array.length;
    for(let i=0; i<len; i++){
        for(let j=i+1; j<len; j++){
            if(array[i]>array[j]){
            	count++;
                [array[i],array[j]] = [array[j],array[i]];
            }
        }
    }
    console.log(count);
    return array;
}

/*function bubbleSort(array){
	var count = 0;
    const len = array.length;
    for(let i=0; i<len; i++){
        for(let j=0; j<len-i-1; j++){
            if(array[j]>array[j+1]){
            	count++;
                [array[j],array[j+1]] = [array[j+1],array[j]];
            }
        }
    }
    console.log(count);
    return array;
}*/

/*function bubbleSort(array){
	var count = 0;
    const len = array.length;
    for(let i=0; i<len; i++){
        for(let j=0; j<len-1; j++){
            if(array[j]>array[j+1]){
            	count++;
                [array[j],array[j+1]] = [array[j+1],array[j]];
            }
        }
    }
    console.log(count);
    return array;
}*/
console.log(bubbleSort(b));