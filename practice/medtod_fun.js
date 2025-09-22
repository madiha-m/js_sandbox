// Diff b/w method and fun
console.log("function can call in ");

// console.log(Test1());
Test1();

function Test1() {
  console.log((x = 10));
}

// Test2();  > ReferenceError

let Test2 = function () {
  console.log((x = 20));
};

Test2();

// Call back fun

// console.log(Test3());  > ReferenceError

let Test3 = () => {
  return (x = 30);
};

console.log(Test3());

class Test_class {
  Test4() {
    return console.log("call by obj");
  }
}

var class_obj = new Test_class();
class_obj.Test4();
