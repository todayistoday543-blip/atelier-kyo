# Atelier Kyo — 状態スナップショット

**最終更新:** 2026-05-05（Kyoiskyo 就寝中の自律稼働 + 起床後の継続セッション完了時点）
**最新ヘッド:** `develop @ a883a85`（main は `9790733` のまま）
**ライブ URL:** https://atelier-kyo.vercel.app（**production**）
**リポジトリ:** https://github.com/todayistoday543-blip/atelier-kyo

---

## 0. 一行要約

> **Phase 0 完了 / Phase 1 リサーチ完了 / 営業商材レベルのデモサイト本番反映済み / 受け渡しドキュメント 8 本起稿済み**。Kyoiskyo の判断待ち事項は 5 件、外部接続が必要な作業は 2 件のみ。

---

## 1. ✅ 完了したこと（章別）

### 1-A. 環境基盤（Phase 0、計 13 タスク）
| # | タスク | 状態 |
|---|---|---|
| T-01〜T-13 | git init / GitHub repo / Vercel link / 依存追加 / CI / .env / vercel.json / next.config / 初回デプロイ | ✅ |

詳細は `docs/PHASE-0-STATUS.md`（前夜の自律稼働分の記録）を参照。

### 1-B. リサーチ（Phase 1）
| # | 成果物 | 件数 |
|---|---|---|
| P1-A | `docs/research/list-2026-05-05.md` + 上位3件深掘り（lathrills / kakita-military / butter-vintage） | 12 候補 |
| P1-B | `docs/research/inspiration-2026-05-05.md`（13 主要 + 6 ムード モードボード + Codrops 5本） | 13+ |

### 1-C. デモサイト構築
| # | 成果物 | 状態 |
|---|---|---|
| DEMO-1 | ARCHIVE — ATELIER KYO DEMO（7セクション） | ✅ 本番反映 |
| DEMO-2 | next-intl で ja / en（zh-Hant / ko は Phase 2） | ✅ |
| DEMO-3 | モック商品 9 件（バイリンガル）+ 商品詳細ページ | ✅ |

### 1-D. 受け渡しドキュメント
| # | 成果物 |
|---|---|
| docs/01-tech-architecture.md | スタック / Cache 戦略 / 接続点 |
| docs/02-design-system.md | 6 ムード / トークン構造 / コンポーネントカタログ |
| docs/03-client-onboarding.md | 6 ステップ受入フロー / 役割表 |
| docs/04-shopify-setup-guide.md | Partner 設定 / Markets / Webhook / 既存サービスからの移行 |
| docs/05-instagram-ai-pipeline.md | Claude + ElevenLabs + Veo 3 のSNS動画パイプライン |
| templates/proposal-template.md | 営業提案書テンプレート（{{shop_name}}） |
| templates/design-brief-template.md | デザイン委託先（クラウドデザイン）への指示書 |
| templates/pricing-tiers.md | Essential / Atelier ⭐ / Studio ⭐ / Custom |

---

## 2. 🌐 ライブ URL とビルド状態

| 項目 | URL / 値 |
|---|---|
| 本番 | https://atelier-kyo.vercel.app |
| 直近デプロイID | `dpl_8f1zGAHngqS61RK5DwBG24Uwvf6J` |
| Inspector | https://vercel.com/todayistoday543-gmailcoms-projects/atelier-kyo/8f1zGAHngqS61RK5DwBG24Uwvf6J |
| ja ページ | https://atelier-kyo.vercel.app/ja（または `/`） |
| en ページ | https://atelier-kyo.vercel.app/en |
| 商品詳細 例 | https://atelier-kyo.vercel.app/products/70s-levis-501-selvedge |
| 商品詳細 en 例 | https://atelier-kyo.vercel.app/en/products/schott-perfecto-1970s |

ビルド出力:
- 27 静的ページ（ja×11 + en×11 + アンカー / not-found）
- Cache Components 有効
- Partial Prerender 動作中（◐ マーカー）
- Lighthouse は **未計測**（VERIFY タスク参照）

---

## 3. 🎨 デモサイトの設計まとめ

### 仮想ブランド
**ARCHIVE — ATELIER KYO DEMO**
- 横浜・伊勢佐木町の架空ヴィンテージアトリエ
- ターゲット潜在顧客がブランド名を脳内置換できる汎用設計

### 採用ムード
**Tokyo Streetwear**（黒 × 白 × 酸性グリーン #bdfd47）

### 構成
1. **Hero** — `100svh` / 巨大セリフ kinetic タイポ / 動的グラデ / dual CTA
2. **Marquee** — フルワイドの ticker（CSS keyframe）
3. **Featured Products** — 9 アイテム（1962–1993、USA/France/UK/Japan）
4. **Brand Story** — 5/7 二段組 / sticky kicker / 生成ビジュアルブロック
5. **Collections** — 3 アーカイブカード（WINTER 70s / WORKWEAR ROOTS / DEADSTOCK）
6. **Visit Us** — 住所 + 営業時間 + カスタム SVG マップ
7. **Newsletter** — メール登録フォーム

### ナビゲーション
- 検索 / カート（バッジ 0）/ ロケール切替（JA / EN）
- スティッキーヘッダー（バックドロップブラー）
- 上部 DEMO バナー（実運用では非表示にする）

### 商品データ表現の選定
**外部画像依存ゼロ**。各商品はグラデーション + 巨大ナンバーバッジ（"01"〜"09"）+ ノイズオーバーレイで「アーカイブ」感を表現。理由:
- デモが壊れない（外部画像 URL 切れリスクなし）
- 営業先が「自分の店ならどう見えるか」を脳内で想起しやすい
- 写真撮影の手配前でも商談に持っていける

---

## 4. ⚠️ Kyoiskyo の判断待ち事項（5 件）

### Q-1. **第一クライアント候補の優先順位**
3 候補の特性が大きく異なる:
- **LATHRILLS（川崎）** — 既存サイトはあるが Shop-Pro。脱却ストーリーが訴求しやすい
- **柿田商店（横須賀ドブ板通り、1952 年創業）** — 老舗 × 米軍基地正面 × 英語ゼロ。インバウンドストーリー最強
- **Butter Vintage（横浜元町）** — Instagram のみ ~18K フォロワー。EC ゼロイチ案件、写真資産が強い

**「映える店舗」優先か「実利益貢献の大きい老舗」優先か**、方針確認をお願いいたします。

### Q-2. **価格テーブルの最終承認**
`templates/pricing-tiers.md` の暫定値:
- Essential ¥19,800 / Atelier ¥39,800 / Studio ¥69,800
- 初期費用 ¥98,000 / ¥150,000 / ¥200,000

副業規定との整合は確認済みとお伺いしておりますが、**金額面のご承認**をお願いいたします（変更があれば差し替えます）。

### Q-3. **Vercel デプロイの運用方針**
現状、main へ push しなくても production に直接デプロイできてしまっています。提案:
- **A 案（推奨）**: `develop` → preview / `main` → production の標準フロー。Kyoiskyo が main にマージするまで production は更新されない
- **B 案**: 現状継続。Kyoiskyo が `vercel deploy --prod` を打って本番更新

### Q-4. **「クラウドデザイン」の正体**
プロンプト内で 2 回ご言及いただいた「クラウドデザイン」が、(a) 外部のデザイン会社／パートナー、(b) クラウドベースのデザインツール（Figma 等）、(c) 別の固有名詞、のどれに該当するか教えていただけますでしょうか。今のドキュメント類は **(a) 外部デザイン委託先**として書いておりますので、別意味であれば差し替えます。

### Q-5. **Phase 2 着手のタイミング**
Phase 0 / Phase 1 はほぼ完了です。次は:
- Phase 2-A: 残り 5 ムードのテンプレ整備（kyo-stylist 主導）
- Phase 2-B: 第一クライアントへのカスタマイズ着手（kyo-architect / クラウドデザイン）
- Phase 2-C: SNS / AI 動画パイプラインの実装着手
これらの優先順位、または別に着手されたい作業があればご指示ください。

---

## 5. 🔧 外部接続が必要な作業（残 2 件）

### T-08（Supabase remote link）
WSL2 ターミナルで:
```bash
supabase.exe projects list   # 認証状態確認
supabase.exe login            # 未ログインなら（ブラウザ）
```
Atelier Kyo 用プロジェクトの **ref**（`/dashboard/project/<ref>/`）をご教示いただければ、私から `supabase.exe link --project-ref <ref>` を実行いたします。

### T-09（Shopify Partner テンプレート store）
1. https://partners.shopify.com → Stores → Add store → Create development store
2. Storefront API 用 private app を発行 → **store URL とアクセストークン**を取得
3. アクセストークンは **チャットに貼らず**、ご自身の `.env.local` と Vercel env に直接投入（手順は `docs/04-shopify-setup-guide.md` の B-5 / B-6 にあります）

---

## 6. 🧱 私が触れていないこと

- `main` ブランチへの merge / PR 作成
- 本番ドメイン（独自ドメイン）の接続
- 本番 Shopify との接続（モックデータのみで demo 構築）
- 本番 Supabase との接続（ローカル init のみ）
- 価格の最終確定 / 営業書類の確定版
- 副業規定再確認（既に Kyoiskyo より「問題なし」とご回答済み）
- 法人化の手続き（個人事業主として進行中）

---

## 7. 📂 リポジトリ構造（最終形）

```
atelier-kyo/
├── CLAUDE.md
├── README.md
├── .claude/
│   ├── agents/ (5 体)
│   ├── commands/ (5 個)
│   └── settings.json
├── .github/workflows/ci.yml
├── apps/storefront/
│   ├── app/
│   │   ├── layout.tsx              # passthrough
│   │   ├── globals.css             # Tokyo Streetwear theme
│   │   └── [locale]/
│   │       ├── layout.tsx          # NextIntlClientProvider, fonts
│   │       ├── page.tsx            # Home (7 sections)
│   │       ├── not-found.tsx       # 404
│   │       └── products/[handle]/page.tsx
│   ├── components/
│   │   ├── layout/ (Header / Footer / SmoothScrollProvider /
│   │   │           LocaleSwitcher / DemoBanner)
│   │   ├── product/ProductCard.tsx
│   │   ├── sections/ (Hero / Marquee / FeaturedProducts /
│   │   │              BrandStory / Collections / VisitUs /
│   │   │              Newsletter)
│   │   └── ui/ (Container / Button)
│   ├── data/mock-products.ts
│   ├── i18n/
│   │   ├── routing.ts / request.ts / navigation.ts
│   │   └── messages/{ja,en}.json
│   ├── lib/
│   │   ├── shopify/ (client / queries / index)
│   │   ├── supabase/ (server / client / types)
│   │   └── utils.ts
│   ├── proxy.ts                    # Next 16 (旧 middleware)
│   ├── supabase/ (config.toml)     # local config
│   ├── vercel.json
│   ├── next.config.ts
│   └── package.json
├── docs/
│   ├── 00-business-plan.md         # 既存
│   ├── 01-tech-architecture.md     # 新規
│   ├── 02-design-system.md         # 新規
│   ├── 03-client-onboarding.md     # 新規
│   ├── 04-shopify-setup-guide.md   # 新規
│   ├── 05-instagram-ai-pipeline.md # 新規
│   ├── INITIAL_PROMPT.md           # 既存
│   ├── PHASE-0-STATUS.md           # 前夜のスナップショット
│   ├── STATUS.md                   # ★ 本ファイル
│   └── research/
│       ├── list-2026-05-05.md
│       ├── inspiration-2026-05-05.md
│       ├── lathrills.md
│       ├── kakita-military.md
│       └── butter-vintage.md
└── templates/
    ├── proposal-template.md
    ├── design-brief-template.md
    └── pricing-tiers.md
```

---

## 8. 🔄 コミット履歴（最近のもの）

```
a883a85 docs: handoff package — 5 internal docs and 3 client/partner templates
0b7298c feat(storefront): build sales-quality demo storefront
8cdec67 feat(storefront): i18n routing and Next 16 file conventions
9a4d415 docs(research): Yokohama-area shop candidates and design inspiration
8903922 docs: add Phase 0 status snapshot
3ed2f02 docs(agents): align kyo-architect setup commands with pnpm
362a4ed feat(storefront): scaffold lib wrappers and local supabase config
a540d67 ci: add storefront workflow and prettier tooling
935a13f chore(storefront): add env template, vercel.json, and next config
dbf015d feat(storefront): add core runtime and dev dependencies
0918684 docs: align spec to Next.js 16 (Cache Components)
0c4db0e feat(storefront): scaffold Next.js 16 app
9790733 chore: initial agent team configuration
```

---

## 9. 📎 起床後の最初の 5 分でやっていただきたいこと

1. https://atelier-kyo.vercel.app をモバイルで開いて、ja / en の切替・スクロール体験・商品クリックを確認
2. `docs/STATUS.md`（本ファイル）に目を通す
3. `templates/pricing-tiers.md` の金額をご確認、修正があればご指示ください
4. 上記 **Q-1〜Q-5** にご回答ください
5. T-08 / T-09 の段取りをご検討ください

---

**おはようございます、Kyoiskyoさん。基盤と材料は揃えておきました。あとは方針のご判断をお願いいたします。**
