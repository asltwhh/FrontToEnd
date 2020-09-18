# 问题1
    var p1 = {
      name:'小明',
      age:'12',
      action:function(where,doing){
       console.log(this.age + '岁的'+this.name + '在' + where + doing);
      }  
    }
    var p2 = {
      name:'小红',
      age:'15'
    }
    console.log(p1.action.call(p2,'操场上','运动')) //15岁的小红在操场上运动
    console.log(p1.action.call()); // undefined岁的undefined在undefinedundefined,因为window.age等不存在

    obj.call();不加参数时，this指代window
    call(this指代的对象,参数1,参数2,...):
    apply(this指代的对象,[参数1,参数2,...])
        使用这两个函数会直接改变this指代的对象，与谁调用无关

# 问题2：以下代码执行后，a.x和b.x的结果分别是？
    function A(x){
        this.x = x;
    }
    A.prototype.x = 1;
    function B(x){
        this.x = x;
    }
    B.prototype = new A();  // B的原型是类A的一个对象，并且这个对象在创建时没有传入参数，所以此时这个对象中的属性x = undefined;
    var a = new A(2)  // 构建对象a,并且传入了参数2，则a.x = 2
    b = new B(3);  // 构建了对象b，并且传入了参数3，则此时b.x = 3
    delete b.x;  // 删除了对象b的属性x,想要查找b.x,就需要去B的原型中，则有b.x = undefined

    此题的一个陷阱点就是B.prototype = A(),A 中没有传入参数

问题3：
在开发中，往往需要从后台调用一些数据在前端显示，如何在前端显示一组无序的数据？？？

    考察：
        父元素.append(子元素)
        子元素.appendTo(父元素)

做法1：

    $(document).ready(function(e){
    var $li=$("
    张三
    ");
    $("ul").append($li);
    });

做法2：

    $(document).ready(function(e){
    var $li=$("
    张三
    ");
    $($li).appendTo("ul");
    });

问题5：
在一个表单中，如果想要给输入框添加一个输入验证，可以用下面的哪个事件实现？

    change()
    change(fn)

    hover移入移出，输入验证一般不会使用hover
    keypress也不会用作输入验证，
    change可以用作输入验证的事件，change(fn)只是一种实现方式，还有其他实现方式：
        原生js的onchange属性，
        html属性onchange，
        addEventListener(onchange,fn)都是实现方式，
        jquery中除了$(selector).change(fn)外还有bind(change,fn) 

问题6：
 在 javascript 中，用于阻止默认事件的默认操作的方法是 

    preventDefault();

问题7：

    在Js中有6中数据类型：
        String:字符串
        Number:数值
        Boolean:布尔值
        None:空值
        Undefined:未定义
        Object:对象
        前五种属于几本的数据类型，Object属于引用数据类型

问题8：

    function test(a){
    a=a+10;
    }
    var a=10;
    test(a);
    console.log(a);  // 10

注意：由于var 声明的变量的变量提升作用，上段代码执行流程为：

    function test(a){
        // 形参中的a相当于声明 var a;但是这个a只能在函数体中起作用
    a=a+10;
    }
    var a=10;
    test(a);
    console.log(a); // 所以这里输出的仍然是全局作用a

问题9：

    var val = 12;
    function fun1(){
        console. log(val);
        var val = 20;
        console.log(val);
    }
    fun1();  // undefined  20


由于变量提升：

    var val = 12;
    function fun1(){
        var val;  // val变量提升，提前声明,但是为初始化，所以值为undefined
        console. log(val);
        val = 20;
        console.log(val);
    }
    fun1();

问题10：
在同一个窗口下能够检测一个js对象是数组类型

    Array.isArray(arr)
    instanceof    arr instanceof Array
    Object.prototype.toString.call(arr)

Array不是基本数据类型，所以不能使用typeof检测



