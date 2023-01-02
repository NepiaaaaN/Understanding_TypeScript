// const names: Array<string> = []; // string[]
// // names[0].split(' ');

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("終わりました！");
//   }, 2000);
// });

// promise.then(data -> {
//   data.split(' ');
// });

// extends objectとすることにより、制約を付けることが可能
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

// 確実にlengthプロパティを持つinterfaceを定義
interface Lengthy {
  length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
  let descriptionText = "値がありません。";
  if (element.length > 0) {
    descriptionText = "値は" + element.length + "個です。";
  }
  return [element, descriptionText];
};

console.log(countAndDescribe(["Sports", "Cokking"]));

const extractAndConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => {
  return "Value: " + obj[key];
};

console.log(extractAndConvert({ name: "Max" }, "name"));
