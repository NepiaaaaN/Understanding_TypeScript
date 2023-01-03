// ライブラリのデコレータは大文字から始まることが多い
const Logger = (constructor: Function) => {
  console.log("ログ出力中...");
  console.log(constructor);
};

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person();

console.log(pers);
