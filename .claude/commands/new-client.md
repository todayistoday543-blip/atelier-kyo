---
description: 新しいデモ構築候補のクライアント受け入れフロー全体を起動する
argument-hint: [shop-name-or-url]
---

# 新規クライアント受け入れフロー

引数: $ARGUMENTS

以下のフローを順番に実行してください：

## ステップ1: kyo-strategist
- 引数から店舗の slug（半角英数+ハイフン）を決定
- TodoWriteで以下のタスクを登録：
  1. リサーチ（kyo-scout）
  2. デザインムード提案（kyo-stylist）
  3. 実装計画（kyo-architect）
  4. 第一稿構築
  5. 監査（kyo-mechanic）
  6. Kyoiskyoへの最終報告
- Kyoiskyoに **日本語で進行計画を提示し、承認を得る**

## ステップ2: kyo-scout（承認後）
- `docs/research/[slug].md` にリサーチレポートを作成
- 既存ウェブサイト、Instagram、取扱ブランド、現状の弱みを記録
- 推奨デザインムード（テンプレートから選択）と理由を提案

## ステップ3: kyo-stylist（リサーチ完了後）
- リサーチを参照し、`clients/[slug]/config.ts` のドラフトを作成
- ブランドカラー、フォント、3Dシーン候補2-3個を選定
- パフォーマンスバジェットを宣言

## ステップ4: kyo-architect（デザイン承認後）
- `clients/[slug]/` ディレクトリを作成
- 必要なルート上書き、コンテンツファイルを準備
- Shopify development store を作成（Kyoiskyoに案内）

## ステップ5: kyo-mechanic（実装後）
- preview deploy に対する Lighthouse 監査
- アクセシビリティチェック
- 整備記録を `docs/research/[slug]-audit.md` に保存

## ステップ6: kyo-strategist（最終）
- 全結果をまとめて Kyoiskyoに日本語で報告
- 営業提案資料の骨子を提案
