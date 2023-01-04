// autobind decorator
const Autobind = (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjDesctiptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDesctiptor;
};

// ProjectInput Class
class ProjectInput {
  // Code goes here!
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // 取得したDOMに対してidを付与
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  // イベントリスナの設定
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  // 要素を追加
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
