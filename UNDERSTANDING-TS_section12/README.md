# UNDERSTANDING-TS_section12

## 164. JavaScript ライブラリの利用

```NPM Config
npm i --save lodash
```

- Webpack があるおかげで import すれば済む
- ない場合には CDN(コンテンツデリバリーネットワーク(高速にファイルをダウンロード出来るサーバー))を使ったりローカルに JS ファイルを入れる必要がある
- JavaScript ライブラリを利用するには TypeScript が理解できるようにしてあげる必要がある
  - やり方
    - `types` というサードパーティーライブラリをインストールする必要がある
      - [npm のページ](https://www.npmjs.com/package/@types/lodash)
        - [DefinitelyTyped の GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash)
          - あらゆるサードパーティーライブラリがここで TypeScript に翻訳されている
          - `.d.ts`という拡張子のファイル
            - これは declaration ファイル = 宣言ファイル = 型定義ファイル
              - 自分でも作ることは出来るが、基本はつくる必要はない
                - TypeScirpt で書いていれば TypeScript が理解出来るから。
- types の lodash のインストールコマンド

```NPM Config
npm install --save @types/lodash
```

- 宣言ファイルは開発中のみ必要
- 最終的には JavaScript にコンパイルされるので、本番には必要ない
  - よって、`--save-dev`と変更する
