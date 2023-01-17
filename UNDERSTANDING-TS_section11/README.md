# UNDERSTANDING-TS_section11

## 153. Webpack とは何か & なぜ必要なのか

- Webpack とは？
  - モジュールバンドラ 及び ビルド自動化ツール
- Webpack をつかって出来ること
  - 複数のファイルを一つのバンドルにまとめることが可能
    - 1 つのファイルにまとめることにより少ない HTTP リクエストで済む
  - コードの最適化(ミニファイ)
    - 小さいファイルサイズになる
      - 関数名をより省略したり...
  - 追加のビルドステップを入れることが出来る
    - 開発用サーバをビルドステップに入れることが可能

## 154. Webpack のインストール & 重要な依存パッケージ

- インストールコマンド

```NPM Config
npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

- パッケージの説明

```JSON
  "devDependencies": {
    "lite-server": "^2.5.4",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
```

- `webpack`
  - 153 で説明した通りのツール
- `webpack-cli`
  - Webpack のコマンドをプロジェクトで実行するために必要
- `webpack-dev-server`
  - 開発用のウェブサーバー
  - 裏で Webpack を実行する。ファイルを常に監視し、変更があれば Webpack を使って再コンパイルを行う
  - これによりブラウザからアプリケーションを実行することが可能
- `typescript`
  - `typescript`はこのマシンにインストール済みだが、プロジェクト単位で TypeScript をインストールしておくのはよいこと。
    - TypeScript のバージョンを明示的に指定できるため。
    - もしグローバルの TypeScript のバージョンに破壊的変更があっても、プロジェクトとしては影響を受けないから
- `ts-loader`
  - Webpack が TypeScript を JavaScript に変換する方法を知るためのパッケージ
  - これにより Webpack が JavaScript へのコンパイルを行うことが出来る
  - その裏では`typescript`が使われる

## 155. エントリポイントと出力設定

### `tsconfig.json`

- `target`は`es6`または`es5`
  - `ts-loader`も TypeScript をコンパイルする時にこの設定を使う
  - 古いブラウザでも動かすとき → es5
  - モダンなブランさだけで動かすとき → es6
- `module`は`ES2015`を指定
  - これは`es6`と同じ意味
- `outDir`
  - `./dist`のままにしておく
- `rootDir`
  - 設定は不要。コメントアウトにしておく
  - どのディレクトリがルートかという設定は Webpack 側で行う

### weboack.config.js

- tsconfig.json と同じ階層に作成する
- webpack がどのように動作するかを設定するためのファイル
- このファイルでは JavaScript を使用する
  - 実際には Node.js で実行される
  - よって、Node.js の export の構文を使う

```JavaScript
module.exports = {}; // このオブジェクトがWebpackの設定になる
```

- Webpack の import の特徴
  - ブラウザに組み込まれたビルトインの ES6 モジュールの機能で JavaScript を import する場合には import するファイル名に`.js`が必要だった
  - Webpack は.js という拡張子や、他の拡張子のファイルを自動的に探して取得するため不要
  - 指定してしまうと逆に Webpack が拡張子が二重になったファイル名を探してしまう
- webpack.config.js の設定
  - entry
    - エントリーポイントのファイルを設定(一番最初に読み込まれるべきファイル)
  - output
    - filename
      - 最終的に出力されるファイル名
    - path
      - 出力されるフォルダへのパス
      - これは`tsconfig`の`outDir`と一緒のパスを指定しないといけない
        - 絶対 path を指定する必要がある
        - webpack.config.js と同じ階層にある dist フォルダの絶対 path を取得するコードが以下

```JavaScript
const path = require("path"); // ★node.jsのimportの構文

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"), // resolveで指定したpathを順番に解決した絶対pathを取得
    // __dirnameはnode.jsでグローバルに使える定数
    // このファイルにあるpathを取得することが出来る
  },
};
```

## 156. ts-loader の利用

- module オブジェクト
  - Webpack が見つけたファイルに対して何をするかということを指定する
- rule というオブジェクトを追加する
  - test プロパティ
    - Webpack が見つけた全てのファイルに対して実行されるファイル名の test
    - このルールを適用するかどうかをファイル名でチェックするということ
    - 正規表現を使用することが出来る
  - use プロパティ
    - .ts の拡張子のファイルに何を使うかについて指定
