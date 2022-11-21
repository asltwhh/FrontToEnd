# js 设计模式

## 设计模式介绍

设计模式是 解决问题的时候针对特定问题给出的简洁而优化的处理方案

js 设计模式中，最核心的思想是：封装变化，分离变与不变的部分，保证变的部分灵活，不变的部分稳定

## 构造器模式

```
var employee1 = {
    name: 'whh1',
    age: 12,
}
var employee1 = {
    name: 'whh2',
    age: 13,
}

变👇

function Employee(name, age){
    this.name = name;
    this.age = age;
    <!-- 注意：使用函数构造器时不要将方法直接写在函数中，因为这样每次创建实例时会为当前实例在内存中开辟新的空间存储该函数，所有实例不是共用一个内存指向的方法，造成空间的浪费 -->
    <!-- this.say = function(word){
        console.log(word)
    } -->
}
<!-- 放在原型中，所有实例均可以顺着隐式原型链(__proto__)访问 -->
Employee.prototype.say = function(word){
    console.log(word)
}

var employee1 = new Employee('whh1',12)
var employee2 = new Employee('whh2',13)
employee1.say('whh1 says something')
employee1.say('whh1 says something')
```

实现 Tabs:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .header li {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid;
        text-align: center;
      }
      .header li.active {
        background-color: red;
      }
      .box li {
        display: none;
        width: 300px;
        height: 100px;
        border: 1px solid blue;
        padding: 5px;
      }
      .box li.active {
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="container1">
      <ul class="header">
        <li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <ul class="box">
        <li class="active">111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
      </ul>
    </div>
    <div class="container2">
      <ul class="header">
        <li class="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <ul class="box">
        <li class="active">111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
        <li>555</li>
      </ul>
    </div>
    <script>
      function Tabs(selector, type = "click") {
        // type: click 或者 mouseover
        this.type = type;
        this.selector = document.querySelector(selector);
        this.headerItems = this.selector.querySelectorAll(".header li");
        this.boxItems = this.selector.querySelectorAll(".box li");
        console.log(this.headerItems, this.boxItems, this);
        this.change();
      }
      Tabs.prototype.change = function () {
        // 注意：这里要用let
        for (let i = 0; i < this.headerItems.length; i++) {
          this.headerItems[i].addEventListener(
            this.type,
            () => {
              for (let j = 0; j < this.headerItems.length; j++) {
                this.headerItems[j].classList.remove("active");
                this.boxItems[j].classList.remove("active");
              }
              this.headerItems[i].classList.add("active");
              this.boxItems[i].classList.add("active");
            },
            false
          );
        }
      };
      new Tabs(".container1");
      new Tabs(".container2", "mouseover");
    </script>
  </body>
</html>
```

## 原型模式

```
class Employee {
    <!-- 原型对象中 -->
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    <!-- 原型对象中 -->
    say(word){
        console.log(word)
    }
}
var employee1 = new Employee('whh1',12)
var employee2 = new Employee('whh2',13)
employee1.say('whh1 says something')
employee1.say('whh1 says something')
```

例子：实现 tab

```
class Tabs {
// type: click 或者 mouseover
constructor(selector, type = "click") {
    this.type = type;
    this.selector = document.querySelector(selector);
    this.headerItems = this.selector.querySelectorAll(".header li");
    this.boxItems = this.selector.querySelectorAll(".box li");
    console.log(this.headerItems, this.boxItems, this);
    this.change();
}
change() {
    // 注意：这里要用let
    for (let i = 0; i < this.headerItems.length; i++) {
    this.headerItems[i].addEventListener(
        this.type,
        () => {
        for (let j = 0; j < this.headerItems.length; j++) {
            this.headerItems[j].classList.remove("active");
            this.boxItems[j].classList.remove("active");
        }
        this.headerItems[i].classList.add("active");
        this.boxItems[i].classList.add("active");
        },
        false
    );
    }
}
}
new Tabs(".container1");
new Tabs(".container2", "mouseover");
```

## 工厂模式

由一个工厂对象决定创建某一类产品对象类的实例，主要用于创建同一类对象

优点： 只需要正确参数就可以获取到想要的对象实例，无需了解创建细节

缺点：

- 对象的创建逻辑全部保存在工厂函数内部，每增加新的构造函数就需要修改判断逻辑的代码，当参数类型不是 3 个，比较多时工厂函数的判断逻辑将增加，进而成为一个比较庞大的函数，难以维护
- 如果对于不同的角色还需要进行不同的操作，则还需要进行判断逻辑，比较麻烦

总结：适用于对象创建逻辑不复杂，类型较少的情况

举例：后台系统的权限管理

```
// 不同角色进入当前产品页展示不同的侧边栏
function User(role, pages) {
    this.role = role;
    this.pages = pages;
}
User.prototype.dataShow = () => {
    // 如果不同角色需要展示不同的数据，则还需要再分类不同的角色，比较麻烦
}
function useFactory(role) {
    switch (role) {
        case "superadmin":
            return new User("superadmin", [
                "home",
                "user-manage",
                "right-manage",
                "news-manage",
            ]);
            break;
        case "admin":
            return new User("admin", ["home", "user-manage", "news-manage"]);
            break;
        case "editor":
            return new User("editor", ["home", "news-manage"]);
            break;
        default:
            throw new Error("参数错误，请输入正确的员工类型");
    }
}
```

es6:

```
// 不同角色进入当前产品页展示不同的侧边栏
class User {
    constructor(role, pages){
        this.role = role;
        this.pages = pages;
    }
    <!-- 静态方法，输入类自身 -->
    static useFactory(role) {
        switch (role) {
            case "superadmin":
                return new User("superadmin", [
                    "home",
                    "user-manage",
                    "right-manage",
                    "news-manage",
                ]);
                break;
            case "admin":
                return new User("admin", ["home", "user-manage", "news-manage"]);
                break;
            case "editor":
                return new User("editor", ["home", "news-manage"]);
                break;
            default:
                throw new Error("参数错误，请输入正确的员工类型");
        }
    }
    dataShow = () => {
        // 如果不同角色需要展示不同的数据，则还需要再分类不同的角色，比较麻烦
    }
}
var user = User.useFactory('superadmin)
```

## 抽象工厂模式

抽象工厂模式不直接创建实例，直接创建产品类簇，分别管理自己的处理逻辑

```
class User {
    constructor(name, role, pages) {
        this.name = name;
        this.role = role;
        this.pages = pages;
    }
    welcome() {
        console.log("欢迎你", name);
    }
    dataShow() {
        // 需要基于不同的产品簇去实现不同的逻辑
        throw new Error("抽象方法需要被实现");
    }
}
class SuperAdmin extends User {
    constructor(name) {
        super(name, "superadmin", [
        "home",
        "user-manage",
        "right-manage",
        "news-manage",
        ]);
    }
    dataShow() {
        console.log("展示superadmin对应的数据");
    }
    // 权限管理
    addRight() {}
    // 用户管理
    addUser() {}
}
class Admin extends User {
    constructor(name) {
        super(name, "admin", ["home", "user-manage", "news-manage"]);
    }
    dataShow() {
        console.log("展示admin对应的数据");
    }
    // 用户管理
    addUser() {}
    }
class Editor extends User {
    constructor(name) {
        super(name, "superadmin", ["home", "news-manage"]);
    }
    dataShow() {
        console.log("展示editor对应的数据");
    }
}
function getAbstractUserFactory(role) {
    switch (role) {
        case "superadmin":
            return new SuperAdmin("whh");
            break;
        case "admin":
            return new Admin("whh1");
            break;
        case "editor":
            return new Editor("whh2");
            break;
        default:
            throw new Error("参数错误，请输入正确的员工类型");
    }
}
const user = getAbstractUserFactory("superadmin");
console.log(user);
```

## 建造者模式

建造者模式用于创建复杂的对象，它将复杂对象的创建和表示相分离，使得同样的创建过程可以有不同的表示

建造者模式允许用户一步步创建一个复杂的对象（关注整个创建过程），用户只需要指定对象类型和内容即可，不需要关心每一步的内部逻辑

举例：二级品类

- 首先加载一级品类（食物，衣服，化妆品等等）需要明确要先初始化，然后获取要加载的数据，然后再渲染
- 加载二级品类（衣服：每一件衣服的信息），同样包含初始化，获取数据和渲染

```
class Navbar {
  init() {
    console.log("navbar-init");
  }
  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("navbar-getData");
        resolve("navbar-getData");
      }, 1000);
    });
  }
  render() {
    console.log("navbar-render");
  }
}
class List {
  init() {
    console.log("list-init");
  }
  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("list-getData");
        resolve("list-getData");
      }, 0);
    });
  }
  render() {
    console.log("list-render");
  }
}
// 建造者只关注内部的调用顺序
class Builder {
  async startBuild(builder) {
    builder.init();
    // 保证先获取数据再render
    await builder.getData();
    builder.render();
  }
}

const op = new Builder();
op.startBuild(new Navbar());
op.startBuild(new List());

/*
navbar-init
list-init
list-getData
list-render
navbar-getData
navbar-render
*/
```

## 单例模式

保证一个类仅有一个实例，并且提供一个访问该实例的全部访问点

解决全部使用的类频繁创建和销毁，占用内存的问题

创建方式：

- es5 闭包
- es6 的方式

```
闭包
const SingleMode = (function () {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }
  const instance = new User("whh", 12);
  return function (name, age) {
    if (!instance) {
      return new User(name, age);
    }
    return instance;
  };
})();
console.log(SingleMode("whh1", 13));  // { name: 'whh', age: 12 }

es6
class SingleMode1 {
  constructor(name, age) {
    if (!SingleMode1.instance) {
      this.name = name;
      this.age = age;
      SingleMode1.instance = this;
    }
    return SingleMode1.instance;
  }
}
console.log(new SingleMode1("whh", 12)); //{ name: 'whh', age: 12 }
console.log(new SingleMode1("whh1", 13)); //{ name: 'whh', age: 12 }
```

应用：redux 中的 store，全局就一个，每次创建都是最开始创建的那个

```
对话框，无论打开关闭多次，始终是一个最初创建的那个对话框，这样也避免了实例的频繁创建
每次要用，直接调用该函数就可以获取到最初的实例，不用担心被覆盖
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .modal {
        width: 300px;
        height: 200px;
        background-color: aqua;
      }
    </style>
  </head>
  <body>
    <button id="open">打开</button>
    <button id="close">关闭</button>
    <script>
      const SingleMode = (function () {
        let instance = null;
        return function (name, age) {
          if (!instance) {
            instance = document.createElement("div");
            instance.className = "modal";
            instance.style.display = "none";
            document.body.appendChild(instance);
          }
          return instance;
        };
      })();
      document.querySelector("#open").onclick = () => {
        const modal = SingleMode();
        modal.style.display = "block";
      };
      document.querySelector("#close").onclick = () => {
        const modal = SingleMode();
        modal.style.display = "none";
      };
    </script>
  </body>
</html>
```

## 装饰器模式
