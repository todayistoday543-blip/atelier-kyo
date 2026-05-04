# インスピレーション・リファレンスライブラリ — 2026-05-05

> 対象: Atelier Kyo のデモストアで「真似る価値のある」EC・ブランドサイト
> 担当: kyo-scout
> ムード分類: Americana Vintage / Tokyo Streetwear / Mid-Century Modern / Gorpcore / Workwear Heritage / Y2K Cyber
> 注: 実装スタックの「推測」は **推測** と明記。kyo-architect / kyo-stylist は構築前に DevTools で必ず再検証してください。
> 著作権: 画像・コピーの転載は禁止。URL のみ参照。

---

## 0. Hero Techniques Shortlist（最優先で実装したい3技術）

デモストアに**必ず1つ以上**組み込みたい技術を、競合分析・実装難易度・ROI から3つ選定しました。

### S1. Scroll-driven WebGL Image Reveal（uProgress shader uniform）
- **元ネタ:** Codrops "Building a Scroll-Revealed WebGL Gallery with GSAP, Three.js, Astro and Barba.js"（2026-02-02）。同種のテクニックは Sal Parasuco / G-Star Elwood / Odd Ritual でも採用。
- **やる事:** ルックブック・特集カット・新作ドロップ画像を Three.js の `PlaneGeometry` で描画し、ScrollTrigger で `uProgress` を 0→1 に補間。GLSL でピクセル分解・歪み・色相シフトのいずれかをスクロールで進行。
- **なぜ採用すべきか:**
  1. **画像主役で「動かしすぎない」**。kyo-stylist の美意識「商品が主役」と整合。
  2. ムード非依存（Americana にも Y2K にも転用可）。シェーダー差し替えだけでテーマ変更可能。
  3. SSR フレンドリー：HTML の `<img>` を残したまま WebGL で覆うため、SEO と a11y を両立。
- **実装メモ:** `next/dynamic({ ssr: false })` で R3F マウント、`prefers-reduced-motion` 時は素の `<img>` をそのまま見せる。

### S2. Magnetic Cursor + WebGL Text on hover
- **元ネタ:** DICH™ Fashion（Awwwards SOTD 2025-06-09）。「Cursor trail」「WebGL Text」を組み合わせて、マウス座標に追従するカーソル + フッター巨大ロゴが歪む構成。
- **やる事:** カスタムカーソルを SVG/Canvas で描画 → 商品リンク・CTA に近づくと吸着 + サイズ拡大。さらに hero / footer の巨大ブランドロゴを TSL（または GLSL）で歪ませ、マウス位置を `uMouse` uniform で渡す。
- **なぜ採用すべきか:**
  1. 「**触れたくなる**」感覚を1ファイルの追加で達成できる、コスパ最高の演出。
  2. タッチデバイスでは自動オフ → モバイル UX を壊さない。
  3. Tokyo Streetwear / Y2K Cyber 系で特に映える（黒背景 + ネオン軌跡）。
- **実装メモ:** `pointer: coarse` メディアクエリで分岐。GSAP `quickTo` で 16ms 以内のレスポンス確保。

### S3. View Transitions API + Barba.js 風シームレス遷移
- **元ネタ:** Adcker（Awwwards SOTD 2026-05-01、GSAP + BARBA.js）/ Odd Ritual（同 GSAP + Three.js + BARBA.js）/ Codrops の Astro+Barba チュートリアル。
- **やる事:** 商品カード → 商品詳細ページの遷移で、サムネイル画像を **そのまま flip して** 詳細ページの hero に着地させる（GSAP Flip plugin or Native View Transitions API）。ページ間で WebGL canvas を破棄せず継続描画。
- **なぜ採用すべきか:**
  1. **「アプリっぽい滑らかさ」が一発で出る**。Shopify テンプレ感を完全に消せる。
  2. Next.js 16 App Router は View Transitions API をネイティブサポート。フォールバックは Framer Motion `AnimatePresence`。
  3. CVR 改善にも寄与する可能性（離脱率低下）。
- **実装メモ:** Cache Components + ISR と組み合わせ、商品詳細を事前生成。Lenis をグローバル装着して scroll を統一。

---

## 1. リファレンス本編（13エントリ）

### 1.1 Sal Parasuco — Luxury Outerwear
- **URL:** https://www.salparasuco.com/ （Awwwards: https://www.awwwards.com/sites/sal-parasuco ）
- **ムード:** Workwear Heritage / Americana Vintage 寄り
- **受賞:** Site of the Day, 2021-10-14（score 7.35/10）
- **Standout techniques:**
  - Three.js + GSAP で商品（ジャケット）画像を WebGL plane に貼って、ドラッグで explore できる shopping experience。
  - GLSL カスタムシェーダーでサーフェス上に微細なテクスチャ歪みを乗せている（推測：noise + displacement）。
  - 配色は #000 / #49c5b6 / #9C9C9C のミニマルなトリオ。
- **Estimated stack（推測）:** Webflow + Three.js + GSAP + GLSL custom shader。
- **Atelier Kyo への転用:**
  - **Workwear Heritage デフォルトテーマ**の hero に採用。インディゴ × 真鍮の2色＋微細な布の繊維感シェーダーで「ヴィンテージ・デニム」を表現。
  - 「ドラッグして見る」UX は **古着の状態確認**（袖の傷み・色落ち）と相性が良い → 商品詳細ページに転用候補。

### 1.2 DICH™ Fashion — Futuristic Concept Boutique
- **URL:** https://dich-fashion.webflow.io/ （Awwwards: https://www.awwwards.com/sites/dichtm-fashion ）
- **ムード:** Y2K / Cyber
- **受賞:** Site of the Day, 2025-06-09
- **Standout techniques:**
  - 「ACCESS GRANTED」のシステムブートUI。グリッチ系タイポグラフィ + モノスペースのコード片。
  - **Cursor trail**（軌跡が後追いするカスタムカーソル）。
  - **WebGL Text** をフッターに配置、マウスで歪む。
  - **3D Rock**（Blender → Spline で軌道運動、Webflow Interactions でスクロール連動）。
  - 配色: #FFFF82（イエロー）+ #FFDFC4（ピーチ）の極小2色構成。
- **Estimated stack（推測）:** Webflow + GSAP + Spline（3D rock）+ カスタム JS（cursor / WebGL text）。
- **Atelier Kyo への転用:**
  - **Y2K / Cyber デフォルトテーマ**の青写真として全面参考。
  - グリッチ・タイポは Tokyo Streetwear テーマでも転用可（黒背景 + ネオングリーン）。
  - 学び: **2色のみで強いブランド世界観**を作れる。Atelier Kyo のテンプレートも「2-3色厳守」をデフォルトルールにすべき。

### 1.3 G-Star Elwood Jeans — WebGL Shopping Experience
- **URL:** Awwwards 詳細: https://www.awwwards.com/sites/g-star-elwood-jeans
- **ムード:** Tokyo Streetwear / Workwear Heritage
- **受賞:** Site of the Day（score 7.22/10）
- **Standout techniques:**
  - WebGL plane 上にジーンズをマップして **ドラッグで自由探索**。
  - smooth transitions + visual effects + GLSL カスタムシェーダー。
  - 配色は #000 / #fff のみのストイック2色。
- **Estimated stack（推測）:** Three.js + GSAP + GLSL + RequireJS（旧世代）。
- **Atelier Kyo への転用:**
  - 「**denim を WebGL で見せる**」具体例として、**Workwear Heritage** または **Tokyo Streetwear** デモの product viewer に直接応用。
  - 旧サイトだが **「ジャンルレス × 黒白2色 × 1ジャンル特化」** の参照価値は今でも高い。

### 1.4 Odd Ritual — Niche Golf E-commerce
- **URL:** https://oddritualgolf.com/ （Awwwards: https://www.awwwards.com/sites/odd-ritual ）
- **ムード:** Mid-Century Modern / Gorpcore（クリーン × 機能美）
- **受賞:** Site of the Day + Developer Award, 2026-04-11（score 7.55/10）
- **Standout techniques:**
  - **GSAP + Three.js + BARBA.js** の王道3点セット。
  - 配色: #FFFFFF + #050fff の極端な2色（鮮烈ブルーの「ブランド色1点突き」）。
  - About ページ等、副次ページでもアニメーションが破綻しない。
- **Estimated stack（推測）:** Contentful（CMS）+ Three.js + GSAP + BARBA.js。
- **Atelier Kyo への転用:**
  - **niche specialty store**（スノーボード、バイク、レコード等）に最適なテンプレ構成。
  - Contentful → **Shopify Storefront API + 簡易CMS** に置換すれば構造そのまま流用可。

### 1.5 Adcker — Beauty/Fashion Creative Agency
- **URL:** Awwwards: https://www.awwwards.com/sites/adcker
- **ムード:** Mid-Century Modern / Workwear Heritage（落ち着いた色 + クラフト感）
- **受賞:** Site of the Day + Developer Award, 2026-05-01（score 7.32/10）
- **Standout techniques:**
  - **GSAP + BARBA.js** によるシームレスなページ遷移（S3 ショートリスト技術の参考）。
  - 配色 #191919 + #efedea。タイポはクリーン。
  - カスタムローダー、メニューに動画プレビュー埋め込み。
- **Estimated stack（推測）:** WordPress + GSAP + BARBA.js。
- **Atelier Kyo への転用:**
  - **クライアント・エージェンシー的な「店主の世界観紹介」ページ**を作る場合の構成参考。
  - 動画プレビュー入りメニューは「**店内の風景**」を見せたい古着屋に最適。

### 1.6 Messenger（abeto）— WebGL Tiny Planet
- **URL:** https://messenger.abeto.co/ （Awwwards: https://www.awwwards.com/sites/messenger ）
- **ムード:** ジャンル外（参考技術）。配色次第で Mid-Century / Y2K どちらにも応用可。
- **受賞:** Site of the Day 2025-11-10、**Site of the Year 2025**（score 7.92/10、Dev 8.21/10）
- **Standout techniques:**
  - WebGL で「歩ける小惑星」。GPU 物理演算 + ライティング + キャラクター描画。
  - WebSockets でマルチプレイヤー（他のユーザーが見える、絵文字を飛ばせる）。
- **Estimated stack（推測）:** Three.js + WebSockets + custom GLSL（地形・キャラ・空）。
- **Atelier Kyo への転用:**
  - そのまま EC に持ち込むのは過剰だが、**「店舗の棚を3D空間で歩ける」コンセプトストア**を upsell オプションとして提案可能。
  - **マルチプレイ機能**は今すぐは不要だが、ライブショッピングと組み合わせると差別化要素になる（将来検討）。

### 1.7 The Renaissance Edition（Shopify）— Generative Renaissance × Commerce
- **URL:** https://shopify.com/editions/winter2026 （Awwwards: https://www.awwwards.com/sites/the-renaissance-edition ）
- **ムード:** Mid-Century Modern / Americana Vintage（クラシカルな油絵テクスチャ）
- **受賞:** Site of the Day 2026-02-09、Site of the Month Feb 2026（score 7.92/10、Dev 8.05/10）
- **Standout techniques:**
  - **150+ の UI セクションをすべて生成的ルネサンス絵画の中に配置**。WebGL + Blender 3D + パララックス + セクション間トランジション。
  - 配色 #F7F7EE + #292919 のシンプル2色。
  - 「Hero transitions」「Intro animations」「Hidden layer effects」を多重化。
- **Estimated stack（推測）:** Shopify Hydrogen ベース + WebGL + Blender 制作の glTF + GSAP。Studio: **Shopify Design + Danetag, Anton Kolisnyk, Damien Mortini ほか**。
- **Atelier Kyo への転用:**
  - Shopify 公式が **Hydrogen で WebGL 演出をやれる**ことを実証している（ただし Atelier Kyo は Next.js + Storefront API 採用方針）。
  - **「全ページが1つの世界観で繋がる」絵画背景**は、**Americana Vintage** デモでセピア油絵テクスチャに置換すると映える。

### 1.8 Aimé Leon Dore — NYC Lifestyle Brand
- **URL:** https://www.aimeleondore.com
- **ムード:** Americana Vintage / Workwear Heritage
- **受賞:** Awwwards 受賞は無いが、**業界基準としての完成度**で言及。
- **Standout techniques:**
  - **動かしすぎない**。Editorial（lookbook + ニュース）+ Shop の二軸ナビ。
  - 配色: 白・ベージュ・写真主役。タイポはセリフ系で品格。
  - SS26 を 4回のドロップに分割（Drop 1-4）。**「待たせる」UX** が hype を作る。
- **Estimated stack（推測）:** Shopify（Liquid テンプレ）+ 微細な CSS トランジションのみ。WebGL/Three.js の痕跡は無し。
- **Atelier Kyo への転用:**
  - 「**派手な技術を使わない選択肢**」も常に持っておく。Americana Vintage / Workwear Heritage の客層は overdesign を嫌う。
  - ただし「Atelier Kyo の差別化」としては、**ALD の品の良さ + 微量の WebGL 演出**（hero のみ）が黄金比。

### 1.9 BODE — NYC Heritage Womens/Mens
- **URL:** https://bode.com
- **ムード:** Workwear Heritage / Americana Vintage（クラフト・パッチワーク）
- **Standout techniques:**
  - 完全 Shopify。バナー画像コラージュ + 上品なグリッド。
  - 配色: オフホワイト・クリーム・黒文字。WebGL 無し。
  - フッターに Tokyo / Paris / NY / LA の店舗住所 → **「店舗のあるブランド」感**。
- **Estimated stack（推測）:** Shopify + 標準テーマカスタム。
- **Atelier Kyo への転用:**
  - **「物語性のある商品ページ」のテンプレ**として、写真コラージュ + 縦組みエッセイの組み合わせを参考に。
  - 個人運営の古着屋でも、店主の「仕入れ旅日記」をブログとして組み込めば BODE 風に化ける。

### 1.10 visvim.tv — Hiroki Nakamura's Vintage Reverence
- **URL:** https://www.visvim.tv
- **ムード:** Americana Vintage / Workwear Heritage（民族 + 職人）
- **Standout techniques:**
  - **「Dissertation」（論文）という編集セクション**を hero に。商品より先に **思想**。
  - ダーク背景 + 6カラム製品グリッド + ハッシュタグ分類（#SS26, #OLD VISVIM NEVER DIES）。
  - 配色: チャコール・ホワイト・写真色のみ。
  - 静的 HTML + CSS Grid。WebGL/3D 無し。
- **Estimated stack（推測）:** カスタム静的サイト + Shopify 別ドメイン併用？要確認。
- **Atelier Kyo への転用:**
  - **「店主の思想を hero にする」**は、個人運営古着屋の最強の差別化。
  - Atelier Kyo の **「店主紹介ページ」テンプレ**として標準装備すべき。

### 1.11 KAPITAL — Okayama Avant-Vintage
- **URL:** https://www.kapital.jp
- **ムード:** Americana Vintage / Tokyo Streetwear（藍染 + 民芸）
- **Standout techniques:**
  - 横スクロールカルーセル（FARM / SEA / 季節別コレクション）。
  - 「BANDANNA MUSEUM」「MILK CAP TRAVEL」のような **コレクション = 物語**の見せ方。
  - サムネイル 200×300px の縦長プロポーション。
  - WebGL/3D 無し、ミニマル。
- **Estimated stack（推測）:** カスタム CMS（"cider_image_thumbnail" 命名）+ jQuery。
- **Atelier Kyo への転用:**
  - **「コレクションごとに小説のタイトルが付く」**手法は Americana 系古着屋に最適。
  - 横スクロールはモバイル UX が壊れがちなので、**Atelier Kyo では縦 stacking + scroll snap で実装**推奨。

### 1.12 Goldwin Online Store
- **URL:** https://goldwin.co.jp/ （Awwwards: https://www.awwwards.com/sites/goldwin-online-store ）
- **ムード:** Gorpcore / Workwear Heritage
- **受賞:** Awwwards Nominee 2024-08-02（コミュニティ最高 9.8/10）。Studio: **Takram**。
- **Standout techniques:**
  - 圧倒的にクリーン。アクティビティ別（camping / climbing / trekking / running）の大型カードグリッド。
  - 黒・白・グレーのみ。タイポは日本語ゴシック。
  - 別ドメインでカスタマイズ系（markon, uniform）を分離。**マルチドメイン戦略**の参考。
- **Estimated stack（推測）:** カスタム実装（Solr 検索）+ infinite scroll + lazy load。WebGL なし。
- **Atelier Kyo への転用:**
  - **Gorpcore デモ**の構造は完全にこれを踏襲推奨（活動別グリッド + 機能性訴求）。
  - 「派手さ無し × 機能美」の勝ちパターンとして覚えておく。

### 1.13 Drake's London — Heritage Tailoring
- **URL:** https://drakes.com
- **ムード:** Workwear Heritage / Americana Vintage（テーラリング寄り）
- **Standout techniques:**
  - "Relaxed Elegance Since 1977" の一貫したコピー。
  - 横スクロールカルーセル（カテゴリ内回遊）。
  - フルワイドの hero 画像。WebGL なし。
- **Estimated stack（推測）:** Shopify。
- **Atelier Kyo への転用:**
  - **「年号入りタグライン」+「フルワイド hero」**の組み合わせは、創業年が古い古着屋（個人で20年やっている店等）に強烈に映える。
  - **Workwear Heritage デモ**の H1 テンプレに採用候補。

---

## 2. ボーナス・参考: Codrops のチュートリアル系（実装直結）

これらは「ライブサイト」ではなく **実装手順そのもの** が公開されている学習資源。kyo-architect / kyo-stylist の作業効率を爆速化します。

| URL | テクニック | 採用候補 |
|---|---|---|
| [Building a Scroll-Revealed WebGL Gallery (2026-02-02)](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) | uProgress shader uniform で画像を順次 reveal | **S1 採用** — 直接コピー可 |
| [Scroll-Driven 3D World (2026-04-28)](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/) | Three.js + GSAP Observer + 粒子2系統 + Blender fracture | 「店主の哲学」ページに応用 |
| [Cinematic 3D Scroll Experiences with GSAP (2025-11-19)](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/) | カメラパスを scroll に同期 | 商品詳細ページの「展示」演出 |
| [Scroll-Reactive 3D Gallery, Mood-Based BG (2026-03-09)](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/) | Z軸スタックギャラリー + 背景色がスクロールで遷移 | コレクション切替演出に最適 |
| [Susurrus: Cozy Watercolor World (2026-04-24)](https://tympanus.net/codrops/2026/04/24/susurrus-crafting-a-cozy-watercolor-world-with-three-js-and-shaders/) | 水彩風シェーダー | Americana Vintage の hero 背景 |

---

## 3. ムード別モードボード（2-3 サイトずつ）

### 🇺🇸 Americana Vintage
1. **Aimé Leon Dore** — editorial × lookbook の二軸構造、セピア寄りの写真。
2. **BODE** — コラージュ写真とエッセイ的縦組みコピー。
3. **visvim.tv** — 「Dissertation（思想）が先、商品が後」の哲学先行型。

### 🗼 Tokyo Streetwear
1. **DICH™ Fashion** — Cyber 寄りだが、配色を黒×ネオングリーンに振れば直結。
2. **G-Star Elwood Jeans** — 黒白2色 × WebGL ジーンズビューア。
3. **KAPITAL** — 「コレクション = 物語タイトル」の見せ方は Tokyo 系古着屋にも応用可。

### 🪑 Mid-Century Modern
1. **Odd Ritual Golf** — 白 + 鮮烈ブルー1点突き、GSAP+Three.js+BARBA。
2. **Adcker** — #191919 + #efedea のクラシカル2色、シームレス遷移。
3. **The Renaissance Edition** — 油絵テクスチャ × Blender 3D の世界観。

### 🏔 Gorpcore / Outdoor
1. **Goldwin Online Store**（Takram） — 活動別グリッド、機能美、マルチドメイン戦略。
2. **The Renaissance Edition** — テクスチャ表現の参考（地形・自然系シェーダー）。
3. *（要追加調査: Snow Peak / Norse Projects ECサイトを次回トラッキング）*

### 🔧 Workwear Heritage
1. **Sal Parasuco** — WebGL outerwear viewer、ドラッグ操作。
2. **BODE** — 物語性のある商品ページ、店舗住所を foot に並べる。
3. **Drake's London** — "Since 1977" タグライン + フルワイド hero。

### 🌌 Y2K / Cyber
1. **DICH™ Fashion** — 全要素のテンプレート。
2. **Messenger（abeto）** — WebGL 小惑星、操作可能な3D空間。EC 文脈に応用するなら upsell。
3. *（要追加調査: Acid graphics 系の Shopify ストア）*

---

## 4. 2026年の高級EC、気付いたトレンド（surprising trend）

> **「色数を2-3色に絞り、すべての差別化を3D / WebGL の質感に委ねる」**
> 2025-2026 の Awwwards SOTD を横断的に観察すると、**配色は驚くほど少ない**（DICH=2色、Adcker=2色、Odd Ritual=2色、Renaissance Edition=2色、Sal Parasuco=3色）。
> かつての「色彩で世界観を作る」設計から、**「素材感（マテリアル・シェーダー）で世界観を作る」**設計にシフトしている。
> Atelier Kyo のデザイントークンも、**配色は2-3色を強制 + 質感（シェーダー / 3D / 写真）でブランドを差別化**するルールにすべきです。

---

## 5. 検証ステータス

| 項目 | 検証方法 | ステータス |
|---|---|---|
| Awwwards 公式の score / 受賞日 | WebFetch で各 SOTD ページ確認 | ✅ |
| Codrops チュートリアル内容 | 各記事を WebFetch | ✅ |
| ライブサイト挙動（Aimé Leon Dore / BODE / visvim 等） | WebFetch で HTML 取得・解析 | ✅（動的演出は HTML だけでは限界。実機確認推奨） |
| Bryceland's | WebFetch 結果がリダイレクト先（コーチング系サイト）に飛んだ。古着系 Bryceland's Co. の本ドメインは **要再確認** | ⚠️ 推測 |
| Beams.co.jp | WebFetch タイムアウト | ⚠️ 未検証、次回再試行 |
| Palace Skateboards | HTML のみで視覚情報抽出不可 | ⚠️ 未検証 |
| 推測スタックすべて | DevTools で再検証必須 | ⚠️ 推測 |

---

## 付録: 引用ソース

- Awwwards SOTY 2025 / E-commerce of the Year — https://www.awwwards.com/annual-awards/
- Awwwards E-commerce of the Year 2024 (Opal Tadpole) — https://www.awwwards.com/annual-awards-2024/ecommerce-site-of-the-year
- Codrops case studies — https://tympanus.net/codrops/
- Orpetron — https://orpetron.com/sites/
- 各 SOTD ページは本文中に記載
