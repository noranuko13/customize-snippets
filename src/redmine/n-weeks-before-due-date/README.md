# redmine/n-weeks-before-due-date

- 期日からN週間前を逆算する。

![Image](https://noranuko13.github.io/customize-snippets/redmine/n-weeks-before-due-date/image.png)

- <https://noranuko13.github.io/customize-snippets/redmine/n-weeks-before-due-date/main.js?week=-2&textKey=merge>

- week: 週数
  - 例えば -2 で2週間前、-3 で3週間前。
- textKey: テキストキー
  - staging: ステージング目安
  - merge: マージ期限
  - week: N週間前

- Redmineの期日がステータスを終了にする日付なので、
  - これを本番リリース日とすると、『ステージング環境に反映する日』『メインブランチのマージ期限日』を
    逆算して対応する形になるので、開始日とは別に目安表示が欲しくなって作成。
- べき論でいえばチケットの期限＝終了日が望ましいのは百も承知だが、
  - 現実的な話、機能追加や仕様変更のチケットが終了になるのって、本番リリース後になることが多い。

- 原理的には『N週間後』も表示できるが、使い道も保守するかどうかも不明。
- 任意のテキストを入力可とすると修正が大変なので、固定の文言を追加していく方向で。
