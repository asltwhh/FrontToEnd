class Queue{
    constructor(){
        this.queue = [];
    }
    size(){
        return this.queue.length;
    }
    is_empty(){
        if(this.queue.length == 0){
            return true;
        }else{
            return false;
        }
    }
    enQueue(val){
        // unshift向数组的开头添加一个新的元素
        this.queue.unshift(val);
    }
    deQueue(){
        if(this.is_empty()){
            return null;
        }else{
            return this.queue.pop();
        }
    }
}

/*var queue = new Queue();
console.log(queue);  // []
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);
console.log(queue);  // [4,3,2,1]
queue.deQueue();
console.log(queue);  //[4,3,2]*/

class StackByQueue{
    constructor(){
        this.queue = new Queue();
    }
    push(val){
        // inQueue中用的是unshift(),在头部添加
        this.queue.enQueue(val);
    }
    pop(){
        for (let i=0; i<this.queue.size()-1; i++){
            var value = this.queue.deQueue();
            this.queue.enQueue(value);
        }
        return this.queue.deQueue();
    }
}

var sbq = new StackByQueue();
sbq.push(1);
sbq.push(2);
sbq.push(3);
sbq.push(4);
console.log(sbq.queue);  // [4,3,2,1]
sbq.pop();
console.log(sbq.queue);  // [3,2,1]
sbq.pop();
console.log(sbq.queue);  // [2,1]