# Understanding_TypeScript

# 事前準備
## `TypeScript`をインストール
```node
npm install -g typescript
```

# 進め方
- 各ディレクトリ毎にワークスペースを区切って勉強

# 毎回ディレクトリを作成する時に必要となる操作
1. `lite-server`をインストール
```node
npm install --save-dev lite-server
```
2. 
4. 


#　メモ(書きたいこと)
- `tsc -w`で自動コンパイルができること

詳しくはここをみること  
https://www.udemy.com/course/understanding-typescript-jp/learn/lecture/20179094

# 各ディレクトリに必要となるファイル
- `.crz`
```
{
  "path": "cz-conventional-changelog-ja"
}
```
  - これで`git cz`をすると勝手にコミットメッセージを生成してくれるようになる
  - それを日本語対応するためのオプション
