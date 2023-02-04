# UNDERSTANDING-TS_section13

## 174. Google API キーの取得

- Google Geocoding API と検索すれば、公式ドキュメントが出てくる

## 175. Axios & 住所の座標取得

- npm install --save axios
  - で、インストール。

## 176. Google Maps による地図の表示

- 以下の script タグを index.html の app.ts の読み込みの上に追加する

```html
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

- `&callback=initMap`はマップがロードされた時に呼び出される関数を指定するもの
  - 今回は必要ないので消す
- マーカーを追加するには[こちらのサイト](https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=ja)を参考にする

## メモ

- これはまだコミットしてはいけない！！API キーがダダ漏れになる！！！
