# javascript assets

このディレクトリ(`resources/assets/js/`) に移動して、

* `npm run test` で Lint & Test 実行
* `npm run lint` で Lint 実行
* `npm run build` で `dist/` ディレクトリへ production ビルド

webpack / Lint / テスト(`mocha`, `chai` など) の関連ファイルは `vue-cli`（``vue init webpack``）で取得したものを配置。

それに追加（または変更）したもの。

```json
  "dependencies": {
    "bulma": "^0.5.1",
    "font-awesome": "^4.7.0",
    "moment": "^2.18.1",
    "chroma-js": "^1.3.4",
    "axios": "^0.16.1",
    "vue": "^2.4.2",
    "vue-router": "^2.7.0",
    "vuex": "^2.3.0",
    "css-toggle-switch": "^4.0.2"
  },
  "devDependencies": {
    "avoriaz": "^4.2.0",
    
   // ...
   
  }
```

``npm install 

