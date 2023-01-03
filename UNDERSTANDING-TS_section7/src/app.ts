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

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  // Union型だとこうなる
  // private data: (string[] | number[] | boolean[]) = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1を返す
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Data1");
textStorage.addItem("Data2");
textStorage.removeItem("Data1");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const obj = { name: "Max" };
// objStorage.addItem(obj);
// objStorage.addItem({ name: "Manu" });
// // ...
// objStorage.removeItem({ name: "Manu" });
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createCourseGoal = (
  title: string,
  description: string,
  date: Date
): CourseGoal => {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
};

const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu");
// names.pop();
