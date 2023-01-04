// ライブラリのデコレータは大文字から始まることが多い
const Logger = (logString: string) => {
  console.log("LOGGER ファクトリ");
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
};

const WithTemplate = (template: string, hookId: string) => {
  console.log("TEMPLATE ファクトリ");
  return <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) => {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super(); // 古いコンストラクタ関数を実行
        console.log("テンプレートを表示");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
};

// @Logger("ログ出力中 - PERSON")
@Logger("ログ出力中")
@WithTemplate("<h1>Personオブジェクト</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person();

console.log(pers);

// ---

const Log = (target: any, propertyName: string | Symbol) => {
  console.log("Property デコレータ");
  console.log(target, propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log("Accessor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
};

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です - 0以下は設定出来ません");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);

const Autobind = (
  _: any, // target
  _2: string, //methodName
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value; // 関数を取得
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};

class Printer {
  message = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
};

const PositiveNumber = (target: any, propName: string) => {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
};

const validate = (obj: any) => {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
};

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("正しく入力してください！");
    return;
  }
  console.log(createdCourse);
});
