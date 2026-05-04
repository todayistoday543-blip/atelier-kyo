# 🏢 Atelier Kyo — AI駆動型ECサイト構築サービス

## 📌 事業概要（Business Definition）

**事業名（仮）:** Atelier Kyo / アトリエ京
**ミッション:** 個人運営のセレクトショップ・古着屋・ビンテージショップ・専門店向けに、月額制で「動的・3D・インバウンド対応」の高品質Shopify ECサイトを提供する。

### ターゲット顧客
- 個人で運営しているアパレルショップ、セレクトショップ、古着屋、ビンテージショップ
- スノーボード専門店、バイク専門店、雑貨店など、個人で仕入れて販売する小売事業者
- 委託料金（一般的に売上の20-30%）に疲弊している事業者
- 海外顧客（インバウンド）への販売拡大を検討している事業者

### 提供価値（Value Proposition）
1. **「かっこいいウェブサイト＝かっこいい服を売る店」の心理効果** をデザインで実装
2. 既存委託サービスより**低い月額料金**で、独自Shopifyストアを所有
3. **Three.js / WebGPU / TSL** による2026年最先端の3D・動的UI
4. **Shopify Markets** によるインバウンド多通貨・多言語対応
5. **AI動画コンテンツ（C-Dance, ElevenLabs, Veo）** によるInstagram運用支援

### コンプライアンス制約 ⚠️
- 証券会社勤務の副業規定を**事前に確認すること**
- 法人化する場合は合同会社（電子定款）が初期コスト最小

---

## 🛠️ 技術スタック（Tech Stack）

### コア
- **フロントエンド:** Next.js 16 (App Router) + React 19 + TypeScript
- **コマース:** Shopify Storefront API (GraphQL) + Next.js Commerce template ベース
- **スタイリング:** Tailwind CSS v4 + CSS Modules（カスタムシェーダーUI用）
- **3D / モーション:** Three.js (WebGPU + WebGL fallback) + React Three Fiber + drei + react-three-postprocessing + GSAP + Framer Motion
- **デプロイ:** Vercel (Edge Runtime, ISR, Cache Components)
- **データベース:** Supabase (Postgres + Auth + Storage) — 顧客管理・分析・お問い合わせ
- **バージョン管理:** GitHub
- **AIメディア:** ElevenLabs Pro / Veo 3 (Google Flow) / C-Dance / Claude API

### 設計原則
1. **Hydrogenではなく Next.js + Storefront API を採用** — 理由：複数クライアントを横展開する際、Shopify以外のCMS・分析ツールも組み合わせる必要があり、Vercelに統一した方がデプロイ・運用が単純化する
2. **Performance budget厳守:** LCP < 1.8s, INP < 200ms, 3Dシーンは draw call < 100, vertices < 数十万
3. **Mobile-first:** 3Dエフェクトは必ずWebGLフォールバックと「reduce-motion」対応を実装
4. **Accessibility:** WCAG 2.2 AA準拠、キーボード操作・スクリーンリーダー対応
5. **テンプレート化:** クライアント固有のロジックは `/clients/[slug]/` に分離し、コアコンポーネントは再利用

---

## 🤖 エージェントチーム構成

このプロジェクトは**5体のサブエージェント + 統括（あなた = メインセッション）** で構成されます。
詳細は `.claude/agents/` 配下の各Markdownを参照。

| エージェント名 | 役割 | 主な責務 |
|---|---|---|
| **kyo-strategist** | 戦略・統括 | プロジェクト分解、レポーティング、意思決定の補助、Kyoiskyoへの日本語報告 |
| **kyo-scout** | リサーチ | クライアント候補のリサーチ、競合サイト分析、デザインインスピレーション収集 |
| **kyo-architect** | 設計・構築 | Next.js + Shopify Storefront API実装、Three.js/R3Fコンポーネント実装 |
| **kyo-stylist** | デザイン・UI | 3Dエフェクト、シェーダー、モーション、ブランディング、レスポンシブ |
| **kyo-mechanic** | デバッグ・QA | パフォーマンス計測、Lighthouse、アクセシビリティ、E2Eテスト、修正 |

統括（メインセッション）は **Kyoiskyoに対して常に日本語（フォーマル敬語）で報告** します。

---

## 📁 ディレクトリ構造

```
atelier-kyo/
├── CLAUDE.md                          # ← このファイル
├── .claude/
│   ├── agents/                        # サブエージェント定義
│   │   ├── kyo-strategist.md
│   │   ├── kyo-scout.md
│   │   ├── kyo-architect.md
│   │   ├── kyo-stylist.md
│   │   └── kyo-mechanic.md
│   ├── commands/                      # スラッシュコマンド
│   │   ├── new-client.md              # /new-client [shop-name]
│   │   ├── research.md                # /research [shop-name or url]
│   │   ├── build-demo.md              # /build-demo [shop-slug]
│   │   ├── audit.md                   # /audit [shop-slug]
│   │   └── report.md                  # /report
│   └── settings.json                  # Agent Teams有効化フラグ等
├── docs/
│   ├── 00-business-plan.md            # 事業計画
│   ├── 01-tech-architecture.md        # 技術アーキテクチャ
│   ├── 02-design-system.md            # デザインシステム
│   ├── 03-client-onboarding.md        # クライアント受け入れフロー
│   ├── 04-shopify-setup-guide.md      # Shopify構築手順
│   ├── 05-instagram-ai-pipeline.md    # SNS運用支援パイプライン
│   └── research/                      # クライアント別リサーチ結果
├── apps/
│   └── storefront/                    # Next.js本体
│       ├── app/
│       ├── components/
│       │   ├── three/                 # 3D / WebGL
│       │   ├── motion/                # Framer Motion / GSAP
│       │   ├── commerce/              # 商品・カート・チェックアウト
│       │   └── ui/                    # 共通UIプリミティブ
│       ├── lib/
│       │   ├── shopify/               # Storefront APIクライアント
│       │   └── supabase/              # Supabaseクライアント
│       └── public/
├── packages/
│   └── design-tokens/                 # 共通デザイントークン
├── clients/                           # クライアント別カスタマイズ
│   └── [slug]/
│       ├── config.ts                  # ブランドカラー、フォント、3Dテーマ
│       ├── content/                   # コピー、画像
│       └── overrides/                 # コンポーネント上書き
└── package.json
```

---

## 🌏 言語ポリシー

- **Kyoiskyoへの報告・確認:** 必ず日本語（フォーマル敬語）
- **コード・コメント・コミットメッセージ・ドキュメント:** 英語（保守性・将来の海外エンジニア参加を見越して）
- **クライアントサイトの本文・UI文言:** 日本語＋英語（i18n対応）

---

## ✅ 起動構成の推奨

**推奨環境:**
- **Claude Code CLI** をターミナル（macOS Terminal / iTerm2 / Ubuntu）で起動
- `tmux` を入れて Agent Teams をペイン分割で監視できる構成
- VS Code または Cursor を併用してコードレビュー
- `git` + GitHub で `main` / `develop` / `client/[slug]` ブランチ運用

**最初に必要なアカウント:**
- ✅ GitHub（既存）
- ⏳ Vercel（GitHub連携で5分）
- ⏳ Supabase（無料枠から開始可）
- ⏳ Shopify Partner アカウント（無料、デモストア無制限）
- ⏳ Anthropic API キー（既存契約のClaude APIから取得）

---

## 🚦 進行ルール

1. **すべての作業前に、kyo-strategist が計画をKyoiskyoに日本語で提示し、承認を得る**
2. **大きな変更（依存追加、アーキテクチャ変更、本番デプロイ）は必ず確認を挟む**
3. **3D・WebGL関連コードを書く前に必ずパフォーマンスバジェットを宣言する**
4. **クライアント候補のサイトを収集する際は、リサーチ結果を `docs/research/[slug].md` に保存**
5. **コミットは Conventional Commits 形式（feat:, fix:, docs:, perf:, etc.）**
