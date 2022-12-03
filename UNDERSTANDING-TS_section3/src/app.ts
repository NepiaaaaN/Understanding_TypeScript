const button = document.querySelector("button");

const clickHandler = (message: string) => {
  // let userName = "Max";
  console.log("Clicked!" + message);
};

if (button) {
  button.addEventListener("click", clickHandler.bind(null, `You're welcome!`));
}
