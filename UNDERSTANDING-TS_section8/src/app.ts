// ライブラリのデコレータは大文字から始まることが多い
const Logger = (logString: string) => {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
};

@Logger("ログ出力中 - PERSON")
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person();

console.log(pers);
