import axios from "axios";
import { GOOGLE_API_KEY } from "./APIKEY";

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
script.defer = true;
document.head.appendChild(script);

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  /** https://developers.google.com/maps/documentation/javascript/geocoding?hl=ja#GeocodingStatusCodes */
  status: "OK" | "ZERO_RESULTS";
};

declare let google: any;
// function initMap() {}

const searchAddressHandler = (event: Event) => {
  event.preventDefault(); // formがHTTPリクエストを送らないように設定
  const enteredAddress = addressInput.value;

  // Google API に送信
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("座標を取得出来ませんでした。");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 16,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });

      console.log(response);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
};

form.addEventListener("submit", searchAddressHandler);
