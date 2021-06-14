这是本人在学习了redux,react-redux,redux-thunk之后的note

redux主要提供了一个保存state的store仓库，reducer作为一个仓库管理者。reducer是一个纯函数，接收旧的state和action对象，返回newState到store仓库中，还可以初始化state

    在UI组件中的事件中，建立产生某个行为的action对象{type:事件类型,data:state}
    通过dispatch(action)发起行为，store将该action和目前的state传递给reducer
    reducer针对对应的事件类型，得到newState,并将其返回给store仓库

    如果需要在组件中使用state,可以将store引入到该组件中，通过store.getState()方法获取目前的state

[redux总结](./01.redux-note/README.md)

react-redux提供了Provider组件和connect连接器，方便操作store

    使用Provider包围整个app，并且将store对象传递给Provider组件
    使用connect连接器，通过第一个参数将state传递给组件的props,通过第二个参数将action creator传递给组件的props
        第二个参数使用对象的方式传递时，就可以省略dispatch的步骤，自动dispatch

[react-redux总结](./02.react-redux-note/README.md)

redux-thunk:实现异步操作的中间件，将dispatch的可接收参数类型变为函数

    先编写异步操作的action creator(返回一个函数)
    然后引入redux-thunk修改dispatch的可接收参数类型

[redux-thunk总结](./03.redux-thunk-note/README.md)

参考：

    https://jspang.com/detailed?id=48#toc257
    https://www.cnblogs.com/chaoyuehedy/p/9713167.html


