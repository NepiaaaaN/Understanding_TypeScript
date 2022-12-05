# Understanding_TypeScript

## 進め方

- 各ディレクトリ毎にワークスペースを区切って勉強
- 1 セクション終わったら 1 コミットを積む
  - PR は不要

## 毎回ディレクトリを作成する時に必要となる手順

1. `template`ディレクトリをコピー
2. 新規に名前をつける(`UUNDERSTANDING-TS_section○`)
3. そのディレクトリ内で`npm install`を実施する
   - そうすることで自動で必要なパッケージ(主に`lite-server`)が install される

## 開発時に必要な手順

1. VSCode でターミナルを開く
2. 3 分割にする
3. 1 つのターミナルでは、`npm start`を実施し、localhost を立ち上げる
4. 1 つのターミナルでは、`tsc -w`を実施し、TypeScript を監視モードで自動コンパイルするようにする
5. 1 つのターミナルでは、git 操作を行う

## コミットの仕方

- 以下を実施することにより、自動でコミットメッセージが作られるようになる ([参考](https://dev.classmethod.jp/articles/commitizen/))

```sh
git add -A
git cz
```
