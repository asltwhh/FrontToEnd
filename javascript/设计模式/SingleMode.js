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
console.log(SingleMode("whh1", 13));

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
