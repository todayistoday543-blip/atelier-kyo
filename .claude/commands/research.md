---
description: 指定した店舗・URL・キーワードに対してリサーチを実行する
argument-hint: [shop-name-or-url-or-keyword]
---

# リサーチ実行コマンド

引数: $ARGUMENTS

**kyo-scout** に作業を委譲してください。

## 実施内容
1. 引数が URL の場合 → そのサイトを WebFetch で取得し詳細分析
2. 引数が店舗名の場合 → WebSearch で公式サイト・SNS・取扱ブランドを調査
3. 引数がキーワード（例：「横浜 古着屋 個人」）の場合 → 候補リストを5-10件ピックアップ

## 出力先
- 個別店舗のレポート: `docs/research/[slug].md`
- リスト形式のリサーチ: `docs/research/list-[YYYY-MM-DD].md`

## 報告
完了後、kyo-strategist に成果をパスし、Kyoiskyoに **日本語サマリー** を提示する。
