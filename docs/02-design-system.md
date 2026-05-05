# 02 — デザインシステム

> Atelier Kyo は「6ムード × 共通コンポーネント」体系で複数のクライアントに展開できる**美意識のテンプレート**を持っています。
> **対象読者:** Claude Design担当者、kyo-stylist 役のエンジニア、新規クライアント担当時のリファレンスとして。
> **最終更新:** 2026-05-05

---

## 1. 設計思想

### 1-A. 「色は絞る、素材で勝つ」原則
2026年のトップ EC サイト（DICH, Adcker, Odd Ritual, Renaissance Edition, Sal Parasuco 等）の共通項として、**カラーパレットを 2-3 色に絞り**、差別化予算を **material / shader / 3D 品質**に全振りする傾向が確認されています。当社のデザイントークンもこの方針を踏襲します。

### 1-B. 「動かしすぎない」鉄則
「商品が主役、エフェクトは引き立て役」を徹底。スクロール演出・3Dシーンの導入は **Performance Budget の宣言**を経てから着手します（kyo-stylist のフローを参照）。

### 1-C. 「店主の人格」を画面の向こうに
量産型テンプレでは出せない「個人運営」の質感を、**コピーのトーン × 余白 × タイポグラフィの抑揚**で実装。ロゴ・写真の良し悪しよりも、**書体組み**が勝負所。

---

## 2. 6 ムード一覧

各クライアントには下記 6 ムードのいずれか、または組み合わせを **kyo-scout のリサーチ結果**に基づいて kyo-stylist が提案。`clients/[slug]/config.ts` に `BrandTokens` として格納。

| ムード | 配色 | 推奨書体 | 推奨 3D 表現 | 想定業態 |
|---|---|---|---|---|
| **Americana Vintage** | セピア × ベージュ × アクセントレッド | Slab Serif (Rockwell系) | Particle Field | アメリカ古着 / デニム / ワーク |
| **Tokyo Streetwear** | 黒 × 白 × ネオン緑 or ピンク | Mono (JetBrains Mono系) + Display Sans | Glitch / RGB shift | ストリート / 裏原 / Y2K |
| **Mid-Century Modern** | アイボリー × マスタード × チャコール | Geometric Sans (Futura系) | Liquid Blob (控えめ) | ミッドセンチュリー家具 / インテリア / 雑貨 |
| **Gorpcore / Outdoor** | アースカラー × フルオレンジ | Industrial (Suisse Int'l系) | Topographical mesh | アウトドア / バイク / スノーボード |
| **Workwear / Heritage** | インディゴ × 生成り × 真鍮 | Classic Serif (Caslon系) | Subtle parallax + grain | ヘリテージ / ワークウェア / クラフト |
| **Y2K / Cyber** | クロームグラデ × 紫 × シアン | Display (Editorial New系) | Iridescent shader | ストリート / コレクター / レコード |

**現時点でビルド済みのデモ:** Tokyo Streetwear (`apps/storefront/`)。残り 5 ムードは Phase 2 で各 1 サンプル作成予定。

---

## 3. デザイントークン構造

```ts
// packages/design-tokens / clients/[slug]/config.ts
export type BrandTokens = {
  colors: {
    ink: string;        // 主背景（黒系）
    charcoal: string;   // セクション背景
    bone: string;       // 主前景（白系）
    haze: string;       // 補助前景
    accent: string;     // ブランドアクセント（1色のみ厳守）
    accentSoft?: string;// アクセントの柔らかい派生
    flare?: string;     // 必要時のサブアクセント（最大1）
  };
  typography: {
    sans: string;       // 本文
    mono: string;       // ラベル / KPI / kicker
    display: string;    // 見出し / Hero
  };
  motion: {
    intensity: 'subtle' | 'moderate' | 'bold';
    style: 'minimal' | 'organic' | 'glitch' | 'editorial';
    reducedMotionFallback: 'static' | 'css-only' | 'none';
  };
  three: {
    enabled: boolean;
    scenes: Array<
      | 'hero-distortion'
      | 'product-orbit'
      | 'particle-field'
      | 'liquid-blob'
      | 'topographical-mesh'
      | 'iridescent-shader'
    >;
    performanceBudget: {
      maxDrawCalls: number;
      maxVertices: number;
      maxTextureMB: number;
    };
  };
};
```

### 3-A. 現状デモ（ARCHIVE / ATELIER KYO DEMO）のトークン

```ts
{
  colors: {
    ink: '#000000',
    charcoal: '#0a0a0a',
    bone: '#f4f1ea',
    haze: '#a8a8a8',
    accent: '#bdfd47',  // 酸性グリーン
    accentSoft: '#a8e63f',
    flare: '#ff3d6f',   // 必要時のみ
  },
  typography: {
    sans: 'Geist',
    mono: 'Geist Mono',
    display: 'Instrument Serif',
  },
  motion: {
    intensity: 'moderate',
    style: 'editorial',
    reducedMotionFallback: 'static',
  },
  three: {
    enabled: false,  // Phase 2 で導入予定
    scenes: [],
    performanceBudget: { maxDrawCalls: 100, maxVertices: 200000, maxTextureMB: 30 },
  },
}
```

---

## 4. 共通コンポーネント・カタログ

### 4-A. レイアウト
- **`Header`** — sticky / blur / locale switcher / search / cart
- **`Footer`** — Shop / About / Follow の3列 + コピーライト
- **`Container`** — narrow (3xl) / default (7xl) / wide (1440px) / full
- **`SmoothScrollProvider`** — Lenis、`prefers-reduced-motion` 自動 bypass
- **`DemoBanner`** — DEMO 表示用ストリップ（実運用では非表示にする）

### 4-B. UI プリミティブ
- **`Button`** — solid / ghost / outline × sm / md / lg
- **`LinkButton`** — `<a>` 版

### 4-C. セクションテンプレート
- **`Hero`** — 100svh / kinetic typography / 動的グラデ背景 / dual CTA
- **`Marquee`** — フルワイド ticker（CSS keyframe）
- **`FeaturedProducts`** — 3列商品グリッド + ヘッダ「VIEW ALL」
- **`BrandStory`** — 5/7 二段組 / sticky kicker / 生成ビジュアルブロック
- **`Collections`** — 3カードのアーカイブグリッド
- **`VisitUs`** — 住所 + 営業時間 + カスタム SVG マップ
- **`Newsletter`** — メール登録フォーム（Server Actions 接続前提）

### 4-D. 商品系
- **`ProductCard`** — グラデーション + ナンバーバッジ + ホバー拡大
- **商品詳細ページ (`products/[handle]`)** — sticky 右カラム / breadcrumb / 関連スペック表

### 4-E. 3D（Phase 2 で実装予定）
- `HeroDistortionMesh` / `ProductOrbit` / `ParticleField` / `LiquidBlob` / `TopographicalMesh` / `IridescentShader`

---

## 5. タイポグラフィ・スケール

| 用途 | サイズ | font-family | tracking |
|---|---|---|---|
| Hero display (h1) | 12vw–16vw / 180px | Display | tightest (-0.06em) |
| h2 | 4xl–6xl | Display | tighter (-0.04em) |
| h3 | xl–2xl | Sans 600 | tight (-0.02em) |
| Body | base–lg | Sans 400 | normal |
| Kicker / Label | text-[10px]–text-[11px] | Mono | widest (0.18em) UPPERCASE |
| Price | text-sm tabular-nums | Mono | tight |

ベースは Tailwind の type ramp。`font-display` ユーティリティをグローバル CSS で追加済み。

---

## 6. モーションの作法

| 場面 | 推奨ライブラリ | 推奨パラメータ |
|---|---|---|
| ページ間遷移 | View Transitions API + Motion fallback | duration: 350ms, ease: easeInOut |
| ホバー（カード等） | CSS or Motion | duration: 700ms, ease: ease-out |
| スクロール反応 | GSAP ScrollTrigger | once: true, start: "top 80%" |
| スムーススクロール | Lenis | lerp: 0.1, duration: 1.1 |
| マグネティックカーソル | Motion + Pointer events | strength: 12px, デスクトップのみ |

`prefers-reduced-motion` を尊重するヘルパー: `useReducedMotion()` (Motion / R3F 共通)。

---

## 7. アクセシビリティ・チェックリスト

- [ ] 全ての対話可能要素にキーボードフォーカス可能
- [ ] フォーカスインジケーター（`acid` 色 outline 2px）が visible
- [ ] aria-current / aria-label / aria-hidden を適切に
- [ ] 画像に alt（装飾は alt=""）
- [ ] フォームに label
- [ ] カラーコントラスト比 4.5:1 以上 (AA基準)
- [ ] `prefers-reduced-motion` 完全対応（GSAP / Lenis / R3F すべて）
- [ ] スクリーンリーダーで主要操作が完結
- [ ] 色のみで情報を伝えない（テキスト併記）

---

## 8. Claude Designへの引き渡し物（テンプレ）

外部デザイン委託先に渡す内容のチェックリスト:

- [ ] `BrandTokens` の選定済み JSON（6ムードからの選択 + カスタマイズ）
- [ ] 商品写真撮影ガイド（背景白 / 床 / シルエット / 着用 の4パターン要件）
- [ ] ブランドストーリーのテキスト（150字 × 3段落）
- [ ] ロゴ（SVG 推奨。PNG なら 4K 透過）
- [ ] 店舗写真 5枚（外観 / 内観 / 店主 / 棚 / 詳細）
- [ ] パフォーマンス予算（draw calls / vertices / texture MB）

雛形は `templates/design-brief-template.md` を埋めて手渡す形を推奨。

---

## 9. 「やってはいけない」リスト

- ❌ 派手さのために 60fps を犠牲にする
- ❌ 商品画像を読みにくくするエフェクト（コンバージョンを下げる）
- ❌ アクセシビリティを後回しの装飾扱いする
- ❌ ライセンス不明なモデル / テクスチャ / フォントを使用
- ❌ 1つのページに 3D シーンを 2 つ以上
- ❌ ブランドカラーを 4 色以上にする
- ❌ Drop shadow を多用する（2026年的にダサい）
- ❌ Gradient text の濫用
- ❌ Lorem ipsum を本番に残す

---

## 10. 自分たちの審美眼を保つために、毎回問うこと

1. これは **古着が一番似合う**世界観になっているか？
2. **店主の人柄**を画面の向こうに感じさせられるか？
3. **海外の客**が見て「日本で買いたい」と思える見た目か？
4. **6ヶ月後**に見て、まだ「カッコいい」と思えるか？（流行追いすぎていないか）
5. パフォーマンス予算を**割っていないか**？
