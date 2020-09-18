class ListNode{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

function reverseLinkedList(head){
    let dummy = head;   // O(1)
    let tmp = dummy;   // O(1)
    while(head !== null && head.next !== null){
        dummy = head.next;   // O(1)
        head.next = dummy.next;   // O(1)
        dummy.next = tmp;  // O(1)
        tmp = dummy;   // O(1)
    }
    // 返回翻转链表的头节点
    return dummy;
}
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode();

var reversed_head = reverseLinkedList(head);
var tmp1 = reversed_head;
while(tmp1 !== null){
	console.log(tmp1.val);
	tmp1 = tmp1.next;
}