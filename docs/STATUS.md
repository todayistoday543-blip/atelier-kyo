# Atelier Kyo — 状態スナップショット

**最終更新:** 2026-05-06（Q-1 / Q-4 への回答を受けた継続セッション完了時点）
**最新ヘッド:** `develop`（main は `9790733` のまま）
**ライブ URL:**
- ARCHIVE デモ（汎用テンプレ）: https://atelier-kyo.vercel.app
- **Butter Vintage デモ**（営業先 #1）: https://atelier-kyo.vercel.app/butter-vintage

**リポジトリ:** https://github.com/todayistoday543-blip/atelier-kyo

---

## 0. 本セッションでの大きな更新

| 質問 | Kyoiskyoの回答 | 反映 |
|---|---|---|
| **Q-1**: 第一クライアント | **Butter Vintage**（横浜元町、Instagram 18K）に確定 | `/butter-vintage` 専用ルートで本格カスタムデモを構築・本番反映済み + 提案書ドラフト |
| **Q-4**: 「クラウドデザイン」の正体 | **Claude Design**（Anthropic Claude を駆動軸にした AI デザインワークフロー）と判明 | ドキュメント類を一括書き換え、`docs/06-claude-design-workflow.md` 新規起稿、`apps/storefront/lib/claude/` 実装、Anthropic SDK 追加 |

**残るご判断待ち:** Q-2（価格最終承認） / Q-3（Vercel 本番運用方針） / Q-5（Phase 2 着手優先順）

---

## 1. ✅ 完了したこと（時系列）

### Phase 0 — 環境基盤（昨夜完了）
| # | タスク | 状態 |
|---|---|---|
| T-01〜T-13 | git init / GitHub repo / Vercel link / 依存追加 / CI / .env / vercel.json / next.config / 初回デプロイ | ✅ |

### Phase 1 — リサーチ（昨夜完了）
- `docs/research/list-2026-05-05.md` + 3件深掘り（lathrills / kakita-military / butter-vintage）
- `docs/research/inspiration-2026-05-05.md`（13 主要 + 6 ムード モードボード + Codrops 5本）

### デモサイト構築（昨夜 + 本セッション）
| # | 成果物 | 状態 |
|---|---|---|
| ARCHIVE | 汎用デモ（Tokyo Streetwear、7 セクション、bilingual） | ✅ |
| **Butter Vintage** | **専用デモ（Americana Vintage、9 コンポーネント、bilingual）** | ✅ |

### 受け渡しドキュメント
| # | 成果物 |
|---|---|
| docs/01-tech-architecture.md | スタック / Cache 戦略 / Claude Design 接続点 |
| docs/02-design-system.md | 6 ムード / トークン構造 / コンポーネントカタログ |
| docs/03-client-onboarding.md | 6 ステップ受入フロー / Claude Design 反復生成フェーズに改訂 |
| docs/04-shopify-setup-guide.md | Partner 設定 / Markets / Webhook |
| docs/05-instagram-ai-pipeline.md | Claude + ElevenLabs + Veo 3 のSNS動画パイプライン |
| **docs/06-claude-design-workflow.md** | **新規。Claude Design = AI 駆動デザインワークフローの完全ガイド** |
| templates/proposal-template.md | 営業提案書テンプレート |
| templates/design-brief-template.md | Claude Design への入力プロンプト素材 |
| templates/pricing-tiers.md | Essential / Atelier / Studio / Custom |
| **clients/butter-vintage/proposal.md** | **Butter Vintage 様向け提案書ドラフト** |

---

## 2. 🌐 ライブ URL とビルド状態

| 項目 | URL / 値 |
|---|---|
| 本番（ARCHIVE） | https://atelier-kyo.vercel.app |
| **本番（Butter Vintage）** | **https://atelier-kyo.vercel.app/butter-vintage** |
| 本番（Butter Vintage / EN） | https://atelier-kyo.vercel.app/en/butter-vintage |
| ARCHIVE 商品詳細 例 | https://atelier-kyo.vercel.app/products/70s-levis-501-selvedge |
| Inspector | Vercel ダッシュボードへ |

ビルド出力（最終）:
- 30 静的ページ
- Cache Components 有効
- Partial Prerender 動作中
- lint 0 / typecheck 0 / build 0

---

## 3. 🎨 Butter Vintage デモの設計まとめ

### 採用ムード
**Americana Vintage**（kyo-stylist の研究 + scout の Butter Vintage リサーチに基づく）

### カラーパレット
- 主背景: バタークリーム `#f5e7c4`
- 主前景: ダークブラウン `#2c1f12`
- アクセント: トマトレッド `#d54a2e`
- サブアクセント: モスグリーン `#5a6b3f`

### 書体
- Display: **Yeseva One**（70s 映画オープニングタイトル風）
- Body: **EB Garamond**（暖かいセリフ）
- Mono: Geist Mono（共通）

### 構成
1. **Hero** — "Frequent Restocks, One of One." の世界観 + 元町シール風スタンプモチーフ
2. **Marquee** — WEEKLY RESTOCK / ONE OF ONE / 1960s — 1990s
3. **Featured Products** — 8 アイテム（¥4,500〜¥14,500、kyo-scout の研究で確認した実価格帯）
4. **Brand Story** — "毎週、新しい古着が届く。元町の小さなドアの奥で。"
5. **Collections** — DENIM ROOTS / BAND TEES / OUTERWEAR
6. **Visit Us** — 元町商店街 1 丁目を描いた SVG マップ + Instagram 直リンク
7. **Newsletter** — 毎週水曜入荷の通知

### 多言語
- ja / en（同一構造、コピーは Butter の世界観に合わせて両言語で執筆）

---

## 4. 🤖 Claude Design ワークフロー（新概念）

「クラウドデザイン」と聞き違えていた箇所を、**Anthropic Claude API を駆動軸にした内部 AI ワークフロー**として正しく実装。

### 接続作業（**Kyoiskyo の最後のお仕事**）
1. https://console.anthropic.com で API キーを発行（`atelier-kyo-vercel`）
2. WSL2 ターミナルで:
   ```bash
   cd /mnt/c/Users/user/ECmakings/agent-team/apps/storefront
   vercel env add ANTHROPIC_API_KEY production
   vercel env add ANTHROPIC_API_KEY preview
   vercel env add ANTHROPIC_API_KEY development
   ```
3. ローカル `.env.local` にも同キーを追加

これだけで Claude Design が動作可能な状態になります。

### 実装済みライブラリ
- `apps/storefront/lib/claude/client.ts` — Anthropic クライアント（lazy 初期化）
- `apps/storefront/lib/claude/design-prompts.ts` — kyo-stylist のシステムプロンプト + brief レンダラー
- `apps/storefront/lib/claude/index.ts` — barrel export
- 依存追加: `@anthropic-ai/sdk@0.94`

### 利用例
詳細とコード例は `docs/06-claude-design-workflow.md` を参照。

---

## 5. ⚠️ 残るご判断待ち（3 件）

### Q-2. **価格テーブルの最終承認**
`templates/pricing-tiers.md` の暫定値:
- Essential ¥19,800 / Atelier ¥39,800 / **Studio ¥69,800（Butter Vintage に提案中）**
- 初期費用 ¥98,000 / ¥150,000 / **¥200,000**
- Studio ¥69,800 は月商 ¥30 万でペイ、¥50 万で +¥55,200 の利益

**金額面のご承認**をお願いいたします。

### Q-3. **Vercel デプロイの運用方針**
現状、`vercel deploy --prod` で直接本番反映できる状態。提案:
- **A 案（推奨）**: `develop` → preview / `main` → production の標準フロー
- **B 案**: 現状継続

### Q-5. **Phase 2 着手のタイミング**
- Phase 2-A: 残り 5 ムードのテンプレ整備
- Phase 2-B: 第一クライアント（Butter Vintage）の本格カスタマイズ
- Phase 2-C: SNS / AI 動画パイプラインの実装着手

これらの優先順位、または別に着手されたい作業があればご指示ください。

---

## 6. 🔧 外部接続が必要な作業（残 3 件）

### T-08（Supabase remote link）
WSL2 ターミナルで `supabase.exe projects list` → ref ご教示で私から `supabase.exe link` 実行。

### T-09（Shopify Partner テンプレート store）
`docs/04-shopify-setup-guide.md` § A の手順。アクセストークンはチャットに貼らず、ご自身で `.env.local` と Vercel env に直接投入。

### T-NEW（Anthropic API Key）
上記「§4. 接続作業」を参照。

---

## 7. 🧱 私が触れていないこと

- `main` ブランチへの merge / PR 作成
- 本番ドメイン（独自ドメイン）の接続
- Shopify / Supabase の本番接続（モックデータのみで demo 構築）
- Butter Vintage 様への直接接触（リサーチは公開情報のみから実施）
- 価格の最終確定 / 営業書類の確定版（提案書はドラフト）

---

## 8. 📂 リポジトリ最終構造（差分のみ）

```
clients/                                # NEW
└── butter-vintage/
    └── proposal.md                     # 営業提案書ドラフト

apps/storefront/clients/butter-vintage/
├── config.ts                           # NEW: BrandTokens
├── content.ts                          # NEW: ja/en コピー
├── products.ts                         # NEW: 8 商品データ
└── components/                         # NEW: 9 専用 components
    ├── ButterHeader.tsx
    ├── ButterFooter.tsx
    ├── ButterDemoBanner.tsx
    ├── ButterHero.tsx
    ├── ButterMarquee.tsx
    ├── ButterProductCard.tsx
    ├── ButterFeaturedProducts.tsx
    ├── ButterStory.tsx
    ├── ButterCollections.tsx
    ├── ButterVisit.tsx
    └── ButterNewsletter.tsx

apps/storefront/app/[locale]/
├── layout.tsx                          # MODIFIED: chrome 抽出（passthrough化）
├── (archive)/                          # NEW: route group
│   ├── layout.tsx                      # ARCHIVE chrome（黒系）
│   ├── page.tsx                        # ← 移動
│   ├── not-found.tsx                   # ← 移動
│   └── products/[handle]/page.tsx      # ← 移動
└── butter-vintage/                     # NEW
    ├── layout.tsx                      # data-theme="butter" + Yeseva/EB Garamond
    └── page.tsx                        # 全 7 セクション

apps/storefront/lib/claude/             # NEW
├── client.ts
├── design-prompts.ts
└── index.ts

docs/
└── 06-claude-design-workflow.md        # NEW
```

---

## 9. 📎 起床後にやっていただきたいこと（**3 つだけ**）

1. **デモを見る**: スマホで https://atelier-kyo.vercel.app/butter-vintage を開いて世界観を確認
2. **`clients/butter-vintage/proposal.md` を読む**: Butter Vintage 様用の提案書ドラフト
3. **Q-2 / Q-3 / Q-5 にご回答**: 上記第 5 章

その後、Anthropic API キー発行 → Vercel env 投入が「Kyoiskyo がやるだけ」のクラウドデザイン（= Claude Design）接続作業です。
