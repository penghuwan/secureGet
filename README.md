# SecureGet
获取深层嵌套的对象属性时，能安全查询属性值的函数

# Description
在复杂的系统中，我们可能需要获取嵌套得很深的对象属性，但却查找路径并不一定总是固定的，例如对对象obj
```
var obj = {
  a: {
    b: {
      c: ...
    }
  }
}
```
你可能想总是通过obj.a.b.c获取c的值，但问题是时obj的结构可能发生变化，如可能在b对象无数据时，结构如下，此时obj.a.b.c是会报错的
```
var obj = {
  a: {
  }
}
obj.a.b.c // Uncaught TypeError: Cannot read property 'c' of undefined
```
所以你不得不做安全检查，正如我们前端工程里经常做的事情
```
var a = obj.a || {};
var b = a.b || {};
var c = b.c;
```
SecureGet正是用于解决这个问题

# Usage
```
npm i secure-getter
```

```
const secureGet = require('secure-getter')
const obj = {
    a: {
        b: {
            c: '啦啦啦'
        }
    }
}
const obj1 = {
    a: {

    }
}
const obj2 = {
}
console.log(secureGet(obj, 'a.b.c')); // 啦啦啦
console.log(obj.a.b.c); // 啦啦啦

console.log(secureGet(obj1, 'a.b.c')); // undefined
console.log(obj1.a.b.c); // Uncaught TypeError: Cannot read property 'c' of undefined

console.log(secureGet(obj2, 'a.b.c'));  // undefined 
console.log(obj2.a.b.c); // Uncaught TypeError: Cannot read property 'b' of undefined
```

# Advantages & Disadvantages
+ secureGet的优点：正如上面介绍，它是简化了我们的安全检查
+ secureGet的缺点：字符串传入的属性，难以测试检查，不利于排查错误，这使得它显得鸡肋

# Other
+ 我曾思考，传入的属性路径参数的格式是否要为一个数组，即['a','b','c'],但我发现实际上单引号的数量增加了编写代码的难度，于是放弃了，选择传入字符串，并用'·'标识符分割
