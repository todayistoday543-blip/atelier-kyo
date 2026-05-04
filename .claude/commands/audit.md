---
description: 指定したクライアントのデモサイトに対して総合監査を実行する
argument-hint: [shop-slug]
---

# 総合監査コマンド

対象: $ARGUMENTS

**kyo-mechanic** に作業を委譲してください。

## 監査項目（順番に実行）
1. ローカル `npm run build` でエラーゼロを確認
2. preview deploy URL を取得（無ければ architect にデプロイ依頼）
3. Lighthouse mobile / desktop の両方を実行
4. axe で accessibility 監査
5. Three.js シーンがある場合は r3f-perf でフレームレート確認
6. E2E テスト（Playwright）を実行
7. バンドルサイズ分析

## 出力
- `docs/research/$ARGUMENTS-audit.md` に整備記録を保存
- 重大問題（P0/P1）があれば、kyo-strategist 経由で Kyoiskyo に**即時報告**

## 合格条件
- Performance / Accessibility / Best Practices / SEO **すべて 90+**
- 重大なa11y違反ゼロ
- E2E主要シナリオがすべて green
