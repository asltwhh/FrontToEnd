var name = "the window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
        	return this.name;
        };
    }
}
console.log(object.getNameFunc()());  //the window