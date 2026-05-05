# 06 — Claude Design ワークフロー

> Atelier Kyo における **Claude Design** とは、外部のデザイン会社への委託ではなく、**Anthropic Claude API を駆動軸にしたAI デザインワークフロー**を指します。kyo-stylist が Claude を相棒として使い、コピー・カラー設計・ムード判定・反復生成を回す**社内プロセス**です。
>
> **対象読者:** Kyoiskyo、kyo-stylist 役のオペレーター、将来の自動化担当者。
> **最終更新:** 2026-05-06

---

## 0. なぜ Claude Design を採用するか

| 観点 | 外部デザイン会社への委託 | Claude Design ワークフロー |
|---|---|---|
| 単価 | 1案件 ¥150,000 〜 ¥500,000 | API 利用料 数百円〜数千円 |
| 反復速度 | 数日 〜 数週間 | 数分 |
| 一貫性 | 担当者が変わると揺れる | プロンプトテンプレートに集約 |
| 多言語対応 | 別途翻訳費用 | 1 セッション内で ja / en / zh-Hant / ko 同時生成 |
| コピー量 | 限定的 | 商品 1000 点でもバリエーション可能 |
| 写真 / イラスト | できる | できない（人間の手 + 専用ツール必須） |

→ **写真・モデル撮影・実写ロゴ** は Claude Design の範囲外（人間 + 撮影機材が必要）。
→ **コピー・カラー設計・ムード判定・コンポーネント構造記述・キャプション翻訳** は Claude Design で巻き取る。

---

## 1. 接続点（Vercel ↔ Anthropic）

これが Kyoiskyo に「あとは私がやるだけ」とお伝えいただいた最後の接続作業です。

### 1-A. Anthropic API Key 発行
1. https://console.anthropic.com にログイン
2. Settings → API Keys → **Create Key**
3. Name: `atelier-kyo-vercel`
4. キー文字列（`sk-ant-...`）をコピー、**チャットには貼らない**

### 1-B. Vercel に投入
ご自身の WSL2 ターミナルで:
```bash
cd /mnt/c/Users/user/ECmakings/agent-team/apps/storefront
vercel env add ANTHROPIC_API_KEY production
# プロンプトに API キーを貼り付け
vercel env add ANTHROPIC_API_KEY preview
vercel env add ANTHROPIC_API_KEY development
```

ローカル開発用にも:
```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env.local
```

### 1-C. 接続確認（実装はすでに用意済み）
`apps/storefront/lib/claude/client.ts` が `getAnthropicClient()` で初期化を遅延し、利用時にのみ env を読みます。投入後は API ルートやサーバーアクションから即座に呼び出し可能になります。

---

## 2. ライブラリ構成

```
apps/storefront/lib/claude/
├── client.ts          # Anthropic クライアント lazy 初期化、デフォルトモデル
├── design-prompts.ts  # システムプロンプト（kyo-stylist 人格） + brief レンダラー
└── index.ts           # barrel export
```

### 2-A. デフォルトモデル
`claude-sonnet-4-6` を採用。理由:
- **デザイン判断の品質** が opus より少し劣る程度で済むレベル
- **トークン単価が opus の 1/5**
- **prompt cache が効きやすい**（システムプロンプトが大きいため）

重大なブランド方針判断や、新ムードの設計時のみ `claude-opus-4-7` に切替。

### 2-B. システムプロンプト
`ATELIER_KYO_SYSTEM_PROMPT` で kyo-stylist の人格と設計ルールを宣言。プロンプトキャッシュを使うことで、繰り返し呼び出しでも 90% コスト削減。

---

## 3. 典型的な利用フロー（kyo-stylist のオペレーション）

### フロー A: 新規クライアントの BrandTokens 生成

```ts
import {
  getAnthropicClient,
  CLAUDE_DESIGN_MODEL,
  CLAUDE_DESIGN_MAX_TOKENS,
  ATELIER_KYO_SYSTEM_PROMPT,
  renderClientBrief,
} from "@/lib/claude";

const brief = {
  shopName: "Butter Vintage",
  shopNameKana: "バタービンテージ",
  location: "横浜・元町",
  era: "1960s — 1990s",
  priceRangeJpy: { min: 4500, max: 16000 },
  category: "American casual vintage",
  existingPlatform: "instagram-only" as const,
  followers: 18000,
  inboundFocus: true,
  ownerNote: "Hand-picked, frequent restocks. Owner-run.",
};

const client = getAnthropicClient();
const response = await client.messages.create({
  model: CLAUDE_DESIGN_MODEL,
  max_tokens: CLAUDE_DESIGN_MAX_TOKENS,
  system: [
    {
      type: "text",
      text: ATELIER_KYO_SYSTEM_PROMPT,
      cache_control: { type: "ephemeral" }, // 1 時間キャッシュ
    },
  ],
  messages: [{ role: "user", content: renderClientBrief(brief) }],
});

// response.content[0] に Markdown のデザインブリーフが返る
```

### フロー B: 翻訳生成（ja → en）
- システムプロンプトに「店主の声で、観察者的な簡潔な英語に」と指示
- 商品タイトルや About コピーを一括処理

### フロー C: Instagram キャプション量産
- 商品データ + 撮影写真の説明 + ブランドトーン → 30 秒尺の映像台本 + キャプション
- ハッシュタグ案も同時出力
- ja / en で各 5 案を生成、Kyoiskyo が選定

### フロー D: ムード横断の比較
- 同一クライアントの BrandTokens を 2 ムードで生成 → デモを 2 つ作って店主に提示

---

## 4. ガードレール（守るべき制約）

### 4-A. プロンプトキャッシュを使う
全ての `messages.create` 呼び出しで、システムプロンプトに `cache_control: { type: "ephemeral" }` を付与する。CLAUDE.md の「コスト最適化」原則に直結。

### 4-B. 出力を絶対視しない
Claude の出力は kyo-stylist の最終判断材料。**そのまま本番に投入しない**。
- カラーパレットは目視で照合
- コピーは Kyoiskyo + 店主の二段階承認
- 翻訳は en ネイティブ層へのレビューを推奨（Phase 2）

### 4-C. 個人情報・実在固有名詞の扱い
- 店主の本名、住所詳細、電話番号は**プロンプトに含めない**
- 入力する brief は公開情報のみで構成（住所は丁目までに留める）

### 4-D. AI 生成と明記する場面
- Instagram 投稿で AI 生成キャプションを使う場合、**規約 / トレンドに従い `#AIGenerated` 等を併記**
- 商品説明文は「AI 補助で書きましたよ」と必ずしも明記する必要はないが、誤情報がないか kyo-stylist が校正

### 4-E. モデル選定の最終決定権
- Sonnet 4.6 が標準、Opus 4.7 は重要判断のみ、Haiku 4.5 は定型処理 / 翻訳
- モデル変更は kyo-architect に相談のうえ実施

---

## 5. テスト用スクリプト（Phase 2 で `scripts/` に整備予定）

```bash
# scripts/claude-design.mjs
# 使い方: pnpm tsx scripts/claude-design.mjs --brief clients/butter-vintage/brief.json
```

- 入力: ブリーフ JSON
- 出力: Markdown 形式のデザイン提案（標準出力 or `clients/[slug]/claude-design-output.md`）
- レビューワークフロー: 出力 → kyo-stylist が読む → BrandTokens を `config.ts` に転記 → コピーを `content.ts` に転記

---

## 6. コスト試算

| 用途 | トークン目安 | Sonnet 4.6 単価試算 | 月間想定回数 | 月間コスト |
|---|---|---|---|---|
| 新クライアント BrandTokens 生成 | 5,000 | ¥15 / 回 | 5 回 | ¥75 |
| 商品キャプション量産 | 1,500 / 商品 | ¥4.5 / 商品 | 100 商品 | ¥450 |
| Instagram スクリプト | 3,000 / 動画 | ¥9 / 動画 | 12 動画 | ¥108 |
| ja → en 翻訳 | 2,000 / ページ | ¥6 / ページ | 50 ページ | ¥300 |
| **合計（クライアント 5 社想定）** | — | — | — | **〜¥4,500** |

→ 月数千円で回せる。クライアント月額の 1% 未満。

---

## 7. 既存セッションでの活用例

> 例: ARCHIVE デモのコピーは、**今この瞬間のあなたとの対話セッション**でリアルタイムに生成しました。Butter Vintage デモのコピーも同じ。Claude Design は仰々しいパイプラインではなく、**普段使いの相棒**です。

将来の Kyoiskyo オペレーションでは:
1. 新規リードのリサーチを kyo-scout に依頼
2. リサーチ結果から brief を作成（5 分）
3. Claude Design で BrandTokens + コピー初稿を生成（30 秒）
4. kyo-stylist が承認 → kyo-architect に渡してコード化
5. 一案件を**ヒアリングから提案デモまで 24 時間以内**に持っていくのが目標
