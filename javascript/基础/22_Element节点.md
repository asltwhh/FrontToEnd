# Element节点
Element节点对象对应网页的 HTML 元素  
  
每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象  

Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在  
  
**不同的HTML元素对应的元素节点不同，元素节点不是一种对象，是许多种对象，每种对象除了继承Element对象的属性和方法，还具备自己独有的属性和方法**，例如元素a和元素button的构造函数就不同  
  
**实例属性**  

**1 元素特性的相关属性**

    Element.id
    Element.tagName
    Element.dir
    Element.accessKey
    Element.draggable
    Element.lang
    Element.tabIndex
    Element.title

**2 元素状态的相关属性**  

    Element.hidden
    Element.contentEditable，Element.isContentEditable

**3 其他属性**

    Element.attributes
    Element.className，Element.classList
    Element.dataset
    Element.innerHTML
    Element.outerHTML
    Element.clientHeight，Element.clientWidth
    Element.clientLeft，Element.clientTop
    Element.scrollHeight，Element.scrollWidth
    Element.scrollLeft，Element.scrollTop
    Element.offsetParent
    Element.offsetHeight，Element.offsetWidth
    Element.offsetLeft，Element.offsetTop
    Element.style
    Element.children，Element.childElementCount
    Element.firstElementChild，Element.lastElementChild
    Element.nextElementSibling，Element.previousElementSibling

**实例方法**


    属性相关方法：
        getAttribute()：读取某个属性的值
        getAttributeNames()：返回当前元素的所有属性名
        setAttribute()：写入属性值
        hasAttribute()：某个属性是否存在
        hasAttributes()：当前元素是否有属性
        removeAttribute()：删除属性
    Element.querySelector()
    Element.querySelectorAll()
    Element.getElementsByClassName()
    Element.getElementsByTagName()
    Element.closest()
    Element.matches()
    事件相关方法：
        Element.addEventListener()：添加事件的回调函数
        Element.removeEventListener()：移除事件监听函数
        Element.dispatchEvent()：触发事件
    Element.scrollIntoView()
    Element.getBoundingClientRect()
    Element.getClientRects()
    Element.insertAdjacentElement()
    Element.insertAdjacentHTML()，Element.insertAdjacentText()
    Element.remove()
    Element.focus()，Element.blur()
    Element.click()
