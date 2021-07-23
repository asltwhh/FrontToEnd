console.log(hoistFunction);
function hoistFunction() {
  console.log(a);
  {
    var a = 123;
  }
  console.log(a);
}

hoistFunction();
