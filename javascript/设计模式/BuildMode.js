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
