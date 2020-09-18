class Stack{
    constructor(){
        // 使用数组的形式
        this.stack = [];
    }

    // 栈是否为空
    is_empty(){
        if(this.stack.length == 0){
            return true;
        }else{
            return false;
        }
    }

    // 栈的大小
    size(){
        return this.stack.length;
    }

    // 弹栈
    pop(){
        if(this.is_empty()){
            return null;
        }else{
            return this.stack.pop();
        }
    }

    // 压栈
    push(val){
        return this.stack.push(val);
    }

    // 返回栈顶元素
    peak(){
        if(this.is_empty()){
            return null;
        }else{
            return this.stack[this.stack.length-1]
        }
    }
}

/*var stack1 = new Stack();
stack1.push(1);
stack1.push(2);
stack1.push(3);
stack1.push(4);
console.log(stack1.size()); // 4
stack1.pop();
console.log(stack1);  // [1,2,3]
console.log(stack1.peak());  // 3
console.log(stack1);  // [1,2,3]*/


class QueueByTwostack{
    constructor(){
        this.stack1 = new Stack();
        this.stack2 = new Stack();
    }
    // 入队列
    enQueue(val){
        this.stack1.push(val);
    }
    // 出队列
    deQueue(){
        // 只弹出栈1中第一个元素后面的元素
        // 需要先定义一个变量保存原栈1的长度，在for循环中不能直接写i<this.stack1.size(),因为栈1的长度是随着循环次数减小的
        var len1 = this.stack1.size();
        for(let i=0; i<len1-1; i++){
            let value = this.stack1.pop();
            console.log(value);
            this.stack2.push(value);
        }
        let res = this.stack1.pop();
        // 同理也需要提前用一个变量保存栈2的长度
        var len2 = this.stack2.size();
        for(let i=0; i<len2; i++){
            let value = this.stack2.pop();
            this.stack1.push(value);
        }
        return res;
    }
}

let qbts = new QueueByTwostack();
console.log(qbts.stack1);
qbts.enQueue(1);
qbts.enQueue(2);
qbts.enQueue(3);
qbts.enQueue(4);
console.log(qbts.stack1);//[1,2,3,4]
console.log(qbts.stack1.size());
qbts.deQueue();
console.log(qbts.stack1);//[2,3,4]
qbts.deQueue();
console.log(qbts.stack1);//[3,4]