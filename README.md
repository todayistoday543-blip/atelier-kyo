# 🏢 Atelier Kyo — エージェントチーム構成

> 個人運営の古着屋・ビンテージショップ・セレクトショップ・専門店向けに、月額制で「動的・3D・インバウンド対応」の高品質Shopify ECサイトを提供するサービスのための、AI駆動型構築チームです。

## 📦 このリポジトリに含まれるもの

```
atelier-kyo/
├── CLAUDE.md                          # ⭐ プロジェクト全体方針（Claude Codeが起動時に読む）
├── README.md                          # ← このファイル
├── .claude/
│   ├── agents/
│   │   ├── kyo-strategist.md          # 🧭 統括・戦略
│   │   ├── kyo-scout.md               # 🔍 リサーチ
│   │   ├── kyo-architect.md           # 🏗️ 構築（Next.js/Shopify/Supabase）
│   │   ├── kyo-stylist.md             # 🎨 3D・モーション・デザイン
│   │   └── kyo-mechanic.md            # 🔧 QA・デバッグ・パフォーマンス
│   ├── commands/
│   │   ├── new-client.md              # /new-client [shop]
│   │   ├── research.md                # /research [shop]
│   │   ├── build-demo.md              # /build-demo [slug]
│   │   ├── audit.md                   # /audit [slug]
│   │   └── report.md                  # /report
│   └── settings.json                  # Agent Teams 有効化等
└── docs/
    └── INITIAL_PROMPT.md              # ⭐ Claude Code に最初に投げる第一プロンプト
```

---

## 🚀 起動手順（Quickstart）

### 推奨環境
- **macOS Terminal / iTerm2** または **Ubuntu / WSL2**
- Node.js 20以上
- git
- （推奨）tmux — Agent Teams のペイン分割監視に便利

### Step 1: ファイル配置

このリポジトリ全体を、新規プロジェクトディレクトリのルートに配置してください。

```bash
mkdir ~/projects/atelier-kyo
cd ~/projects/atelier-kyo
# ここに本リポジトリの中身をコピー（CLAUDE.md, .claude/, docs/, README.md）

git init
git add .
git commit -m "chore: initial agent team configuration"
```

### Step 2: GitHub への push（既存アカウント利用）

```bash
gh repo create atelier-kyo --private --source=. --remote=origin
git push -u origin main
```

### Step 3: Claude Code のインストール（未インストールの場合）

```bash
# 公式ドキュメント参照
# https://docs.claude.com/en/docs/claude-code/quickstart
npm install -g @anthropic-ai/claude-code

# またはネイティブインストーラーが提供されていればそちらを使用
claude --version  # v2.1.32 以降であること
```

### Step 4: Agent Teams の有効化

`.claude/settings.json` に既に `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` を設定済みですが、念のため環境変数でもexportしておくと安全です。

```bash
# ~/.zshrc または ~/.bashrc に追記
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### Step 5: Claude Code 起動 + 第一プロンプト投入

```bash
cd ~/projects/atelier-kyo
claude --model opus
```

起動したら、`docs/INITIAL_PROMPT.md` の **「▼▼▼ 以下を Claude Code に投げ込む ▼▼▼」** から **「▲▲▲ ここまでをコピー ▲▲▲」** までの内容を、最初のメッセージとして貼り付けてください。

これでチームが動き始めます。

---

## 🎯 これから準備が必要なもの（Kyoiskyo側）

### 必須（Phase 0）
- [ ] **証券業の副業規定確認** — 雇用主に書面で確認するのが安全
- [ ] **Vercel アカウント** — GitHub連携でサインアップ（無料枠から開始可）
- [ ] **Supabase プロジェクト作成** — 無料枠から開始可
- [ ] **Shopify Partner アカウント** — 無料、開発ストアが無制限に作れる

### 任意（Phase 1以降）
- [ ] 法人化（合同会社、電子定款で初期コスト最小化）
- [ ] 屋号 / ロゴ / 商標
- [ ] 名刺 / 簡単な営業資料

GitHubアカウントは既にお持ちなので、別途構築は不要です。

---

## 🤖 5体のエージェント早見表

| エージェント | 主な責務 | 呼び出す場面 |
|---|---|---|
| 🧭 **kyo-strategist** | 統括・日本語報告・タスク分解 | 何か始める時、報告を受けたい時 |
| 🔍 **kyo-scout** | リサーチ・競合分析・候補発掘 | 「〇〇の店を調査して」 |
| 🏗️ **kyo-architect** | Next.js / Shopify / Supabase 実装 | コードを書く時 |
| 🎨 **kyo-stylist** | 3D・WebGL・モーション・デザイン | 見た目を作る時 |
| 🔧 **kyo-mechanic** | パフォーマンス・a11y・QA・デバッグ | 仕上げ・故障修理・納品前 |

---

## 📋 主なスラッシュコマンド

| コマンド | 用途 |
|---|---|
| `/new-client [name]` | 新規クライアントの受け入れフロー全体を起動 |
| `/research [target]` | 単発のリサーチを実行 |
| `/build-demo [slug]` | リサーチ済みのクライアント向けにデモ構築 |
| `/audit [slug]` | デモサイトの総合監査 |
| `/report` | 全体進捗の日本語報告 |

---

## 🌐 採用した技術選定の理由（要点）

### なぜ Hydrogen ではなく Next.js + Shopify Storefront API か？
横展開（複数クライアント）を前提とするため、Vercelに統一できる Next.js が運用効率に優れます。Hydrogen はShopify特化で強力ですが、将来的に他のCMSや分析ツールを混ぜる時に柔軟性が下がります。

### なぜ Supabase か？
Vercelとの相性が良く、Postgres + Auth + Storage が一体で揃い、無料枠が現実的です。商品/在庫/決済はShopifyに任せ、Supabaseは「お問い合わせ管理 / 運営側ダッシュボード / 分析」など、Shopifyの隙間を埋める用途に絞ります。

### なぜ Three.js + R3F + WebGPU か？
2026年時点で WebGPU は主要ブラウザ全てで動作し、TSL（Three Shading Language）で WGSL/GLSL 両方に対応するシェーダーを書けるため、長期的に陳腐化しにくい選択です。WebGLへの自動フォールバックも標準化されています。

---

## 📞 サポート・FAQ

### Q. 第一プロンプトを送ったら Claude が黙ってしまった
- `.claude/agents/*.md` のYAML frontmatterが壊れていないか確認してください
- `/agents` コマンドでサブエージェントが認識されているか確認

### Q. Agent Teams が起動しない
- Claude Code v2.1.32 以降が必要です
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` が設定されていますか？
- Pro / Max / Team / Enterprise プランのいずれかが必要です

### Q. tmux なしでも動きますか？
- 動きます。ただし複数エージェントの同時監視はやりにくくなります。`tmux` または iTerm2 のペイン分割を推奨します。

### Q. このチーム構成は他のプロジェクトでも使えますか？
- エージェント定義はこのプロジェクト固有の文脈（古着屋・ECサイト）に最適化されています。他用途には別途リブランドして調整することをお勧めします。

---

## 🗓️ 次のアクション

`docs/INITIAL_PROMPT.md` を開き、第一プロンプトを Claude Code に投げ込んでください。

そこからは **kyo-strategist** が日本語で進行をリードします。
