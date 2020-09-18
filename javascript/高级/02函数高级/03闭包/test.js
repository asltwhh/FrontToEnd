function fun(){
	var i=0;
	return function(){
		console.log(i++);
	}
}
var f1 = fun();
f1();
f1();

var f2 = fun();
f2();
