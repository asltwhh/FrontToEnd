# Document节点
Document节点对象代表整个文档，每张网页都具备自己的document对象  
**获取document对象：**  

    正常网页：直接document或者window.document
    iframe框架里面的网页：使用iframe节点的contentDocument属性
    Ajax操作返回的文档：使用XMLHttpRequest对象的responseXML属性

document对象继承了**EventTarget**接口和**Node**接口，并且混入了**ParentNode**接口，所以在document对象上就可以调用这些接口的方法  
  
document还有很多自己的属性和方法  
  
**属性**  

    快捷方式属性
        document.defaultView
        document.doctype
        document.documentElement
        document.body，document.head
        document.scrollingElement
        document.activeElement
        document.fullscreenElement
    节点集合属性:除了document.styleSheets,其他集合属性返回的都是HTMLCollection实例
        document.links
        document.forms
        document.images
        document.embeds，document.plugins
        document.scripts
        document.styleSheets
    文档静态信息属性
        document.documentURI，document.URL
        document.domain
        document.location
        document.lastModified
        document.title
        document.characterSet
        document.referrer
        document.dir
        document.compatMode
    文档状态属性
        document.hidden
        document.visibilityState
        document.readyState
    document.cookie
    document.designMode
    document.currentScript
    document.implementation
  
**方法**
  
    document.open()，document.close()
    document.write()，document.writeln()
    document.querySelector()，document.querySelectorAll()
    document.getElementsByTagName()
    document.getElementsByClassName()
    document.getElementsByName()
    document.getElementById()
    document.elementFromPoint()，document.elementsFromPoint()
    document.createElement()
    document.createTextNode()
    document.createAttribute()
    document.createComment()
    document.createDocumentFragment()
    document.createEvent()
    document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
    document.hasFocus()
    document.adoptNode()，document.importNode()
    document.createNodeIterator()
    document.createTreeWalker()
    document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()
    document.getSelection()
