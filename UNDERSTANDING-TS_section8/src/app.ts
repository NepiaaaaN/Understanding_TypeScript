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
  return (_: Function) => {
    console.log("テンプレートを表示");
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
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
