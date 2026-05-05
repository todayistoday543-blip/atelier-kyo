# 04 — Shopify セットアップガイド

> Atelier Kyo 基盤を新規クライアント向けに立ち上げる際の **Shopify 側の設定手順**を、画面操作ベースで記述。
> **対象読者:** Kyoiskyo（自分でやる時）、kyo-architect（クライアント代行時）、Claude Design担当者（参考）。
> **最終更新:** 2026-05-05 / Shopify 2026年初頭版に対応

---

## 0. 前提

- Shopify Partner アカウント取得済み（無料、開発ストア無制限）
- 本番運用時は **Basic Shopify ($39/月) または Shopify ($105/月)** プランを推奨
- Shopify Markets はすべての有料プランで利用可能

---

## A. デモ用テンプレート Store の作成（社内共有テンプレ）

> Atelier Kyo 営業段階で「とりあえず見せられる店」として 1 つだけ持っておくテンプレート用 store。

### A-1. Partner ダッシュボードで Development store 作成
1. https://partners.shopify.com → ログイン
2. 左メニュー **Stores** → **Add store** → **Create development store**
3. 設定:
   - Store name: `Atelier Kyo Template`（任意）
   - Store URL: 自動生成（例 `atelier-kyo-template.myshopify.com`）
   - Store purpose: **Build a new store for a client**
   - Build version: **Latest**
4. Create

### A-2. ダミー商品の投入
1. Admin → Products → Add product を 8〜10 件
2. または公式テスト用 CSV を `docs/research/sample-products.csv` から取り込み（Phase 2 で整備予定）

### A-3. Storefront API の private app 作成
1. Admin → **Settings** → **Apps and sales channels** → **Develop apps**
2. **Create app** → 名前: `Atelier Kyo Storefront`
3. **Configure Storefront API access**
4. スコープ（必須最小、過剰権限は付与しない）:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_read_content`
   - `unauthenticated_read_customer_tags`
   - `unauthenticated_read_metaobjects`（Phase 2 で使用）
5. **Install app** → Storefront access token をコピー
6. `.env.local` に投入（**機密情報、Slack / メールには貼らない**）

```bash
SHOPIFY_STORE_DOMAIN=atelier-kyo-template.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<コピーしたトークン>
SHOPIFY_API_VERSION=2026-01
```

7. Vercel ダッシュボードでも同じ env を投入:
   ```bash
   vercel env add SHOPIFY_STORE_DOMAIN production
   vercel env add SHOPIFY_STOREFRONT_ACCESS_TOKEN production
   vercel env add SHOPIFY_API_VERSION production
   ```

---

## B. クライアント別 Store の作成（実運用）

### B-1. Development store の作成（A-1 と同じ手順）
- Store name はクライアントの屋号
- 初期段階は Development store のまま、契約締結後に **Transfer to client** で運用権限を移管

### B-2. プランの選択
| プラン | 月額 | 推奨タイミング |
|---|---|---|
| Basic Shopify | $39 | 月商 〜50 万円 / 個人運営の最初の 1 年 |
| Shopify | $105 | 月商 50 〜 200 万円 / インバウンド本格化時 |
| Advanced Shopify | $399 | 月商 200 万円以上 / 多通貨が経営インパクトを持つ規模 |
| Plus | $2,000+ | 法人化・組織化以降 |

### B-3. テーマ無効化（重要）
Atelier Kyo は **Shopify テーマを使いません**。すべてのフロントは Next.js 側にあるため、Shopify の管理画面側のテーマ表示は実害ないが、必要なら最低限のリダイレクトテーマを設定:
- Online Store → Themes → 削除しない / カスタマイズしない
- DNS 上ではドメインを Vercel に向ける（[B-7 参照](#b-7-カスタムドメインの設定)）

### B-4. 商品データの投入
- 既存 BASE / STORES / Shop-Pro からの移行は CSV インポート推奨
- 移行スクリプトは `apps/storefront/scripts/migrate-from-base.ts` 等を Phase 2 で整備
- 商品画像は `cdn.shopify.com` 経由で配信される（`next.config.ts` の `remotePatterns` で許可済み）

### B-5. Storefront API 設定（A-3 と同じ手順）
- クライアント別 store ごとに Private app を作成し、token を取得
- token は `clients/[slug]/.env.production` および Vercel project の env に投入

### B-6. Shopify Markets（多通貨・多言語）の設定

> インバウンド対応のキモ。Atelier Kyo の差別化要因のひとつ。

1. Admin → **Settings** → **Markets**
2. **Add market** で対象国を追加:
   - Japan（プライマリ、JPY、ja）
   - International（USD、en）
   - 必要に応じ：Hong Kong / Taiwan（HKD・TWD、zh-Hant）、Korea（KRW、ko）
3. 各 Market で:
   - Currency: 自動為替 or 固定
   - Language: 翻訳投入（手動 or Shopify Translate & Adapt アプリ）
   - Pricing rules: 国ごとに価格係数（例: 海外 +10%）
   - Shipping: zone ごとの送料設定
4. Storefront API で `@inContext(country: $country, language: $language)` ディレクティブが自動的にこの設定を読む

### B-7. カスタムドメインの設定
1. Vercel ダッシュボード → atelier-kyo project → Settings → Domains
2. クライアントの独自ドメインを追加（例: `archive-yokohama.com`）
3. DNS A レコードを Vercel が指定する IP に向ける（Vercel が自動的に発行）
4. SSL は Vercel が Let's Encrypt で自動発行

---

## C. Shopify Webhook → Next.js キャッシュ無効化

> 商品変更時に Next.js の Cache Components を即無効化する仕組み。

### C-1. Webhook の作成
1. Admin → **Settings** → **Notifications** → **Webhooks**
2. **Create webhook**:
   - Event: `Product update`
   - Format: JSON
   - URL: `https://atelier-kyo.vercel.app/api/revalidate?secret=<SHOPIFY_REVALIDATION_SECRET>`
3. 同様に `Product create`, `Product delete`, `Collection update` 等を追加

### C-2. Next.js 側の API ルート（実装は Phase 2）
```ts
// app/api/revalidate/route.ts
import { updateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  // body の topic（X-Shopify-Topic header）に応じて updateTag
  updateTag('product');
  if (body.handle) updateTag(`product-${body.handle}`);
  return Response.json({ revalidated: true });
}
```

---

## D. 既存サービスからの移行手順

### D-1. BASE → Shopify
- BASE 管理画面 → 商品 → CSV エクスポート
- Shopify 管理画面 → 商品 → インポート → CSV
- カラムマッピングが必要（特に画像 URL、カテゴリ）
- 移行用スクリプト（Phase 2 整備）でリンクとリダイレクトを保持

### D-2. STORES → Shopify
- 同様に CSV エクスポート → Shopify インポート
- STORES 独自の「タグ」「コレクション」概念は Shopify では「Collections」と「Tags」に分離

### D-3. Shop-Pro → Shopify
- Shop-Pro はカスタム CSV のみ。手動マッピングが必要
- LATHRILLS（候補リスト 1 位）はこのケース

### D-4. Instagram のみ運営 → Shopify
- 商品台帳がない状態 → Atelier Kyo が初期投入を支援
- 写真は既存 Instagram から取得（クライアント承認のうえ）
- Butter Vintage（候補 3 位）はこのケース

---

## E. 引き渡し時の確認チェックリスト

- [ ] Storefront API token が `.env.production` と Vercel env に投入済み
- [ ] Markets 設定（最低 Japan + International）完了
- [ ] Webhook（4 種類）が登録済み
- [ ] テスト購入が完了する（test mode、本番カードは使わない）
- [ ] Shopify 管理画面でクライアントが商品追加できる
- [ ] カスタムドメインの SSL がアクティブ
- [ ] Vercel preview deploy が緑
- [ ] Lighthouse mobile 90+

---

## F. クライアント運用の典型的トラブルとその対処

| 症状 | 主因 | 対処 |
|---|---|---|
| 商品を追加したのに反映されない | Webhook が発火していない / シークレット不一致 | Shopify Admin で Webhook の delivery log を確認 → secret を再設定 |
| 多通貨が表示されない | Markets が ON だが Storefront API のクエリに `@inContext` がない | クエリを修正（kyo-architect 担当） |
| Lighthouse スコアが落ちた | Hero 画像の最適化漏れ / Three.js が初期 bundle に混入 | `next/image` priority + `next/dynamic({ ssr: false })` を確認 |
| カートが空になる | Shopify checkout への redirect 失敗 | Storefront API の `checkoutUrl` を直接 redirect、cookies の SameSite を確認 |
| Edge runtime で Supabase が動かない | Edge ランタイムで Node.js API を使用 | `@supabase/ssr` の Edge 版を使用、または Node.js Functions に切替 |

---

## G. リファレンス

- Shopify Storefront API 公式: https://shopify.dev/docs/api/storefront
- Shopify Markets ドキュメント: https://help.shopify.com/manual/markets
- Shopify Storefront API client (npm): https://www.npmjs.com/package/@shopify/storefront-api-client
- Vercel × Shopify 統合事例: https://vercel.com/templates/next.js/nextjs-commerce
