/**
 * 深拷贝
 * 1： 需要判断类型
 * 2： 递归处理
 * 3： 处理对象循环引用问题
 */
function cloneDeep(obj, map = new WeakMap()) {
  // 如果是 null 或者 原始数据类型 或者 时间对象/正则对象， 直接 return
  if (
    obj === null ||
    typeof obj !== "object" ||
    typeof obj === "function" ||
    obj instanceof Date ||
    obj instanceof RegExp
  ) {
    return obj;
  }
  // 处理循环引用的问题
  if (map.get(obj)) {
    return map.get(obj);
  }

  let newObj = null;

  if (obj instanceof Map) {
    newObj = new Map();
    map.set(obj, newObj);
    // 注意这里遍历 map 时候， forof 返回的是一个数组
    for (const [key, value] of obj) {
      newObj.set(key, cloneDeep(value, map));
    }
  } else if (obj instanceof Set) {
    newObj = new Set();
    for (const value of obj) {
      newObj.add(cloneDeep(value, map));
    }
  } else if (obj instanceof Array) {
    newObj = [];
    map.set(obj, newObj);
    obj.forEach((el) => newObj.push(cloneDeep(el, map)));
  } else if (obj instanceof Object) {
    newObj = {};
    map.set(obj, newObj);
    for (const key in obj) {
      newObj[key] = cloneDeep(obj[key], map);
    }
  }

  return newObj;
}

// 测试对象形式
// const obj = {
//   a: 1,
//   b: {
//     name: "小没买过",
//   },
// };

// const obj1 = cloneDeep(obj);

// console.log(obj, obj1);

// obj1.b.name = "dadadada";
// obj.a = 111;

// console.log(obj, obj1);

// 测试 map形式
// const map1 = new Map();
// map1.set("a", 1);
// map1.set("b", { name: "小花花" });

// const map2 = cloneDeep(map1);
// console.log(map1, map2);

// map2.set("a", 222222);
// map2.set("b", { name: "999999" });
// console.log(map1, map2);

// 测试循环引用
const obj = {};
obj.a = obj;
const obj2 = cloneDeep(obj);
obj.b = "123";
console.log(obj, obj2);
