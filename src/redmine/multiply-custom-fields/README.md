# redmine/multiply-custom-fields

- カスタムフィールド（整数）を乗算する。

- 管理 > カスタムフィールド > チケット
  - 掛ける名称の末尾に『＊』を追加する。
  - 計算結果の名称の末尾に『［＊］』を追加する。

![Image](https://noranuko13.github.io/customize-snippets/redmine/multiply-custom-fields/image.png)

- <https://noranuko13.github.io/customize-snippets/redmine/multiply-custom-fields/main.js>
- <https://noranuko13.github.io/customize-snippets/redmine/multiply-custom-fields/style.css>

- ※小数には未対応。
  - JavaScriptで小数点以下の計算を行う場合、何らかの対策をしないと誤差が生じる。
  - 本リポジトリではVanilla JSのみの使用に限定しているため、
    ライブラリを用いる以外の方法となると、バグりやすくメンテが大変そう。
