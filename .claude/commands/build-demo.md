---
description: 既にリサーチ済みのクライアント slug に対してデモサイトを構築する
argument-hint: [shop-slug]
---

# デモサイト構築コマンド

対象: $ARGUMENTS

## 前提
- `docs/research/$ARGUMENTS.md` が存在すること
- `clients/$ARGUMENTS/config.ts` のドラフトが存在すること

無ければ、まず `/research $ARGUMENTS` または `/new-client $ARGUMENTS` を実行するよう促す。

## 実行フロー（Agent Teams で並列展開を推奨）

### Phase A: 構造（kyo-architect）
1. `clients/$ARGUMENTS/` 配下のスケルトンを作成
2. Shopify development store の接続（必要なら Kyoiskyo に案内）
3. 商品データのダミー投入（または実データの取り込み）
4. ルーティング・i18n 設定

### Phase B: ビジュアル（kyo-stylist、Phase Aと並行可能）
1. `config.ts` で選定した3Dシーンを実装
2. Hero, Collection, Product 各ページの主要演出を構築
3. パフォーマンスバジェットを宣言してから着手

### Phase C: 監査（kyo-mechanic、Phase A・B完了後）
1. Lighthouse / axe / Three.js perf を計測
2. 改善が必要なら architect / stylist にフィードバック
3. 合格ラインに達するまで反復

### Phase D: デプロイ（kyo-architect）
1. Vercel preview deploy
2. プレビューURLを Kyoiskyo に提示
3. クライアントへの提案資料の骨子を kyo-strategist が作成

## 完了条件
- [ ] Lighthouse mobile 90+
- [ ] preview URL が Kyoiskyo に共有されている
- [ ] `docs/research/$ARGUMENTS-audit.md` に整備記録がある
- [ ] 提案資料の骨子が `docs/research/$ARGUMENTS-pitch.md` にある
