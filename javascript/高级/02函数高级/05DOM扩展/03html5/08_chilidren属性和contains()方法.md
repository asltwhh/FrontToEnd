# children属性

    children属性和childNodes属性相同，不过children属性是html5中新加入的
    两者都返回一个NodeList

# contains()方法：检查某个节点是不是另一个节点的后代

    父节点.contains(子节点); // 返回true或者false
    IE、Firefox 9+、Safari、Opera 和 Chrome均支持此方法

compareDocumentPosition()方法：也能够确定节点间的关系

    IE9+、Firefox、Safari、Opera 9.5+和 Chrome均支持此方法

    返回一个表示该关系的位掩码（ bitmask）
        1：（给定的节点不在当前文档中）
        2：（给定的节点在DOM树中位于参考节点之前）
        4：（给定的节点在DOM树中位于参考节点之后）
        8：（给定的节点是参考节点的祖先）
        16：（给定的节点是参考节点的后代）

兼容所有浏览器：确定一个节点是不是另一个节点的后代：

```
确定一个节点是不是另一个节点的后代

function contains(refNode, otherNode){
    // 判断参考节点是否具备contains()方法，以及检查当前浏览器所用的 WebKit版本号。
    // 如果方法存在而且不是 WebKit（!client.engine.webkit），则继续执行代码。
    // 否则，如果浏览器是 WebKit 且至少是 Safari 3（WebKit版本号为 522 或更高），那么也可以继续执行代码
    //在 WebKit 版本号小于 522 的 Safari 浏览器中，contains()方法不能正常使用。
    if (typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)){
        // 适用于IE、Firefox 9+、Safari、Opera 和 Chrome浏览器
        return refNode.contains(otherNode);
    } else if (typeof refNode.compareDocumentPosition == "function"){
        // 适用于IE9+、Firefox、Safari、Opera 9.5+和 Chrome
        return !!(refNode.compareDocumentPosition(otherNode) & 16);
    } else {
        // 适用于旧版本 Safari 设计的一个后备策略

        // 从当前节点开始遍历它的祖先节点，看参考节点是否是其祖先节点
        var node = otherNode.parentNode;
        do {
            if (node === refNode){
                return true;
            } else {
                node = node.parentNode;
            }
        } while (node !== null);

        return false;
    }
}
```
