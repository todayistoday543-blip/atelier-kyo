# 01 — 技術アーキテクチャ

> Atelier Kyo が顧客に提供する Shopify EC 基盤の技術構成図と、その設計判断の理由。
> **対象読者:** クラウドデザイン担当者、外部開発委託先、技術系ステークホルダー、Kyoiskyo自身の備忘。
> **最終更新:** 2026-05-05

---

## 1. 全体像

```
                                                      ┌─ Shopify Storefront API ──┐
                                                      │  (商品・在庫・カート・決済)   │
┌──────────┐    HTTPS    ┌──────────────────┐         └──────────────┬───────────┘
│  顧客     │ ◀─────────▶ │ Vercel (hnd1)    │  ◀── GraphQL ──────────┘
│  (PC/SP)  │             │  Next.js 16 App  │
└──────────┘             │  + Cache Comps   │  ◀── @supabase/ssr ──┐
                          │  + next-intl     │                      │
                          │  + Three.js R3F  │      ┌──────────────┴────┐
                          └──────────┬───────┘      │ Supabase (Tokyo)  │
                                      │             │  Postgres + Auth   │
                                      │             │  (お問い合わせ /   │
                                      │             │   運営ダッシュボード) │
                                      ▼             └──────────────────┘
                              GitHub (private)
                              `atelier-kyo` リポジトリ
```

## 2. 採用技術スタック

| 層 | 技術 | バージョン |
|---|---|---|
| フロント | Next.js (App Router) | 16.x |
| フレームワーク基盤 | React | 19.x |
| 言語 | TypeScript (strict) | 5.x |
| スタイリング | Tailwind CSS | v4 |
| 国際化 | next-intl | 4.x |
| 3D / WebGL | Three.js + React Three Fiber + drei + postprocessing | r170+ / 9+ / 10+ |
| モーション | GSAP + Lenis + Motion (旧 Framer Motion) | 3 / 1.x / 12 |
| バリデーション | Zod | 4.x |
| EC バックエンド | Shopify Storefront API (GraphQL) | 2026-01 |
| 補助 DB / 認証 | Supabase (Postgres + Auth + Storage) | — |
| デプロイ | Vercel (hnd1 リージョン / Edge + Functions) | — |
| ランタイムキャッシュ | Cache Components (`'use cache'` + `cacheTag`) | Next 16 標準 |

## 3. 設計の3つの根本原則

### 原則 A — **横展開を最優先**
複数クライアントに同じ基盤を展開するため、Shopify 公式の Hydrogen ではなく **Next.js + Storefront API** を採用。デプロイ先・ビルドツール・認証フローを Vercel に統一することで、新規クライアント立ち上げ時のオーバーヘッドを最小化。

### 原則 B — **役割分担を厳格に**
| 担当 | 用途 |
|---|---|
| Shopify | 商品マスタ / 在庫 / 注文 / 決済 / 顧客アカウント |
| Supabase | お問い合わせ受付 / 運営側ダッシュボード / 分析イベント / クライアント別 CMS |
| Vercel | 配信 / Edge ロジック / ISR + Cache Components |
| GitHub Actions | CI（lint / typecheck / build） |

「Shopify がやるべきことを Supabase に持ち込まない」「Supabase でやるべきことを Shopify Metaobjects で無理に表現しない」を徹底。

### 原則 C — **見栄え > 機能数**
2026年のトップ EC サイトは色数を絞り、material / shader / 3D 表現に予算を全振りする方針が主流。当社も「Tokyo Streetwear」「Americana Vintage」「Mid-Century Modern」「Gorpcore」「Workwear Heritage」「Y2K Cyber」の **6 ムード × 共通コンポーネント** で美しさを差別化軸に置く。詳細は `docs/02-design-system.md`。

## 4. キャッシュ戦略 (Cache Components)

Next 16 で stable 化された **Cache Components** を全面採用。

```ts
// 例: 商品データのキャッシュ層
export async function getProduct(handle: string) {
  'use cache';
  cacheTag('product', `product-${handle}`);
  cacheLife('hours');
  const client = getStorefrontClient();
  return await client.request(PRODUCT_BY_HANDLE_QUERY, { variables: { handle } });
}
```

- **静的に近いシェル**: ヘッダー / ナビ / フッター / レイアウト → ビルド時プリレンダー
- **商品データ**: `cacheTag('product', 'product-${handle}')` で個別管理
- **コレクション**: `cacheTag('collection', 'collection-${handle}')`
- **無効化**: Shopify Webhook → `/api/revalidate` → `updateTag()` で該当キャッシュのみ更新
- **多通貨切替**: 通貨 ID も cache key の一部に含める（closure 経由で自動取り込み）

設計書はこちら: [Cache Components 公式ドキュメント](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)

## 5. インバウンド / 多言語

- **next-intl 4** で `ja` / `en` を実装（Phase 2 で `zh-Hant` / `ko` 追加予定）
- **localePrefix: "as-needed"** によりデフォルトロケール (`ja`) は URL から省略
- **Shopify Markets** の `@inContext(country, language)` ディレクティブで通貨・税・送料を自動ローカライズ
- **`proxy.ts`**（Next 16 で `middleware.ts` から改名）が `Accept-Language` を読み、適切なロケールへ振り分け

## 6. パフォーマンス予算（クライアント納品ライン）

| 指標 | 目標値 (mobile / 4G slow throttling) |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| LCP | < 1.8s |
| INP | < 200ms |
| CLS | < 0.1 |
| First Load JS (Three.js 除外) | < 200KB gzipped |
| Three.js シーン | 60fps (desktop) / 30fps (mobile mid-range) |

3D シーンは必ず:
- `next/dynamic` + `ssr: false` で遅延ロード
- `prefers-reduced-motion` で静止画にフォールバック
- WebGL 非対応端末で静止画 / CSS アニメーション

## 7. CI / デプロイフロー

```
                           ┌─ feature/* ──┐
                           ▼              │
     develop ─── PR ──▶ main ───── Vercel auto-deploy ───▶ Preview URL
                                                              │
                                                              ▼
                                                          (Kyoiskyo 確認)
                                                              │
                                                              ▼
                                                  vercel deploy --prod
                                                              │
                                                              ▼
                                                    atelier-kyo.vercel.app
                                                    （または client/[slug] 個別URL）
```

- GitHub Actions (`.github/workflows/ci.yml`): lint / typecheck / build をビルド時 placeholder env で実行
- Vercel project: `atelier-kyo` (id: `prj_seb1AYep2I3yH1yfMVgHwqMNuAnR`, region: hnd1)
- 環境変数は Vercel ダッシュボード経由で投入（`SHOPIFY_*`, `SUPABASE_*`）

## 8. クライアント別カスタマイズ (`clients/[slug]/`)

```
clients/
└── [shop-slug]/
    ├── config.ts        # ブランドカラー、フォント、3Dシーン選択（BrandTokens）
    ├── content/         # 店主のコピー / 画像差し替え
    └── overrides/       # コンポーネント上書き（必要時のみ）
```

コアコンポーネントは `apps/storefront/components/` で共有。クライアント固有のロジックは `clients/[slug]/` に隔離することで、共通基盤の改善が全クライアントへ自動波及する設計。

## 9. クラウドデザイン（外部デザイン委託先）との接続点

Atelier Kyo は **基盤エンジニアリング**を担当。**ビジュアルデザイン**（写真・グラフィック・モーションのコンセプト）は外部のクラウドデザインに委託する想定。

| 提供する側 | 受け取る側 | 形式 |
|---|---|---|
| クラウドデザイン → Atelier Kyo | デザインカンプ / Figma / 画像素材 | Figma URL or 画像 ZIP |
| Atelier Kyo → クラウドデザイン | デザインブリーフ / コンポーネント仕様 / パフォーマンス予算 | `templates/design-brief-template.md` を埋めたもの |
| Vercel ダッシュボード | （Kyoiskyo） | プロジェクト設定 / 環境変数 |

接続フロー詳細は `docs/03-client-onboarding.md` を参照。

## 10. セキュリティ / コンプライアンス

- **Shopify Storefront API token** は public access token（不正使用時の影響を最小化）
- **Supabase Service Role Key** はサーバーサイドのみ使用（`.env.local` / Vercel env）
- **Supabase テーブル** には必ず Row Level Security (RLS) を設定してから本番接続
- **CSP ヘッダー** を `next.config.ts` で定義（Phase 2 で実装）
- **個人情報**: お問い合わせフォームのみ Supabase に保存。商品/顧客アカウントは Shopify 管轄
- **DEMO サイト**は実在する店舗を装わない旨を画面上に常時表示

## 11. 監視とアラート（Phase 2 以降）

- Vercel Analytics（標準）
- Vercel Speed Insights（標準）
- Sentry（エラー監視、Phase 2）
- Lighthouse CI（PR ごとに preview deploy へ実行、Phase 2）
- Uptime: Vercel 標準（99.99% SLA）
