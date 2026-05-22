/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Convert arrays to linked lists for testing purposes
    const arrayToList = (arr) => {
        if (!arr.length) return null;
        const head = { val: arr[0], next: null };
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = { val: arr[i], next: null };
            current = current.next;
        }
        return head;
    };
    
    const listToArray = (head) => {
        const result = [];
        while (head) {
            result.push(head.val);
            head = head.next;
        }
        return result;
    };
    
    // Convert input arrays to linked lists
    const list1 = arrayToList(l1);
    const list2 = arrayToList(l2);
    
    const dummy = { val: 0, next: null };
    let current = dummy;
    let carry = 0;
    let p1 = list1;
    let p2 = list2;
    
    while (p1 || p2 || carry) {
        const val1 = p1 ? p1.val : 0;
        const val2 = p2 ? p2.val : 0;
        const sum = val1 + val2 + carry;
        
        carry = Math.floor(sum / 10);
        current.next = { val: sum % 10, next: null };
        current = current.next;
        
        if (p1) p1 = p1.next;
        if (p2) p2 = p2.next;
    }
    
    return listToArray(dummy.next);
};