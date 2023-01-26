const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const searchAddressHandler = (event: Event) => {
  event.preventDefault(); // formがHTTPリクエストを送らないように設定
  const enteredAddress = addressInput.value;

  // Google API に送信
};

form.addEventListener("submit", searchAddressHandler);
