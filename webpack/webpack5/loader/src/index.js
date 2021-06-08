console.log("我在测试loader");

class Person {
  constructor(name) {
    this.name = name;
  }
  setName(name) {
    this.name = name;
  }
}

console.log(new Person("whh"));
