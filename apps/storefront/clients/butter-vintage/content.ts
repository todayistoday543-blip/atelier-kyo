// Butter Vintage 想定コピー（ATELIER KYO による提案デモ用）
// 実在のBSの店舗情報を直接コピーするのではなく、リサーチを踏まえた
// 「店主にこの世界観を見せて反応を取るためのデモ用コピー」を起こしている。

export type ButterContent = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
    demoLabel: string;
    demoNotice: string;
  };
  nav: {
    new: string;
    archive: string;
    story: string;
    visit: string;
    cart: string;
    instagram: string;
  };
  hero: {
    kicker: string;
    lineOne: string;
    lineTwo: string;
    lineThree: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
  };
  marquee: string[];
  featured: {
    kicker: string;
    heading: string;
    viewAll: string;
    sold: string;
    available: string;
    sizeLabel: string;
  };
  story: {
    kicker: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    yearMark: string;
  };
  collections: {
    kicker: string;
    heading: string;
    items: Array<{ title: string; subtitle: string; count: string }>;
  };
  visit: {
    kicker: string;
    heading: string;
    address: string;
    hours: string;
    instagramLabel: string;
    directions: string;
    directionsHref: string;
    mapAlt: string;
  };
  newsletter: {
    kicker: string;
    heading: string;
    placeholder: string;
    submit: string;
    consent: string;
    thanks: string;
  };
  footer: {
    shop: string;
    shopLinks: string[];
    about: string;
    aboutLinks: string[];
    follow: string;
    credit: string;
    copyright: string;
  };
};

export const butterContent: Record<"ja" | "en", ButterContent> = {
  ja: {
    meta: {
      title: "Butter Vintage — 横浜・元町のアメリカン・ヴィンテージ",
      description:
        "横浜・元町商店街の1丁目から、1960年代から1990年代までのアメリカン・ヴィンテージを店主が一点ずつ選んでお届けする、個人運営のセレクトショップ。",
    },
    brand: {
      name: "Butter Vintage",
      tagline: "MOTOMACHI · YOKOHAMA",
      demoLabel: "DEMO",
      demoNotice:
        "本サイトは ATELIER KYO が Butter Vintage 様向けに作成した提案デモです。実際の在庫・取引ではありません。",
    },
    nav: {
      new: "新着",
      archive: "アーカイブ",
      story: "店主のはなし",
      visit: "店舗情報",
      cart: "カート",
      instagram: "Instagram",
    },
    hero: {
      kicker: "BUTTER VINTAGE · EST. MOTOMACHI",
      lineOne: "Frequent",
      lineTwo: "Restocks,",
      lineThree: "One of One.",
      subline:
        "毎週ハンドピックの新着、二度と再入荷しない一点もの。横浜・元町からアメリカン・ヴィンテージを店主の眼でお届けしています。",
      ctaPrimary: "今週の新着を見る",
      ctaSecondary: "Instagramで見る",
      scrollHint: "SCROLL",
    },
    marquee: [
      "WEEKLY RESTOCK",
      "ONE OF ONE",
      "1960s — 1990s",
      "横浜・元町",
      "MEN'S × UNI",
      "HAND PICKED",
      "BUTTER VINTAGE",
    ],
    featured: {
      kicker: "THIS WEEK'S PICKS",
      heading: "今週入荷した、店主の8点。",
      viewAll: "すべて見る",
      sold: "SOLD",
      available: "在庫あり",
      sizeLabel: "サイズ",
    },
    story: {
      kicker: "STORE PHILOSOPHY",
      heading: "毎週、新しい古着が届く。元町の小さなドアの奥で。",
      p1: "Butter Vintage は、横浜・元町商店街の一角にある個人運営のヴィンテージショップです。1960年代から1990年代までのアメリカン・カジュアルを中心に、店主が現地で買い付け、毎週新しいラインナップに更新しています。",
      p2: "「再入荷不可な一点もの」が当店の強み。同じデニム、同じバンドTは二度と入りません。だから、気に入った 1 枚は、その日に出会った 1 枚です。",
      p3: "元町という街と、訪れる方の好み — その双方に寄り添える品揃えを心がけています。海外からのお客様も、お気軽にお立ち寄りください。",
      yearMark: "毎週水曜・新着",
    },
    collections: {
      kicker: "ARCHIVES",
      heading: "アーカイブを巡る",
      items: [
        { title: "DENIM ROOTS", subtitle: "70s〜90s のデニム", count: "32点" },
        { title: "BAND TEES", subtitle: "ロック / ヒップホップ", count: "47点" },
        { title: "OUTERWEAR", subtitle: "ミリタリー / ワーク", count: "18点" },
      ],
    },
    visit: {
      kicker: "VISIT US",
      heading: "元町商店街、信号 3 つ目の角。",
      address: "〒231-0861 神奈川県横浜市中区元町1-59-2（公開情報、DEMO 表示）",
      hours: "営業時間は Instagram にて掲載 / 不定休",
      instagramLabel: "@buttervintage",
      directions: "Google Maps で開く",
      directionsHref: "https://maps.google.com/?q=横浜市中区元町1-59-2",
      mapAlt: "店舗マップ（プレースホルダー）",
    },
    newsletter: {
      kicker: "STAY ARCHIVED",
      heading: "毎週水曜の新着を、いち早くメールで。",
      placeholder: "メールアドレス",
      submit: "登録",
      consent: "登録は無料、解除はいつでも。",
      thanks: "ご登録ありがとうございます。",
    },
    footer: {
      shop: "Shop",
      shopLinks: ["新着", "デニム", "Tシャツ", "アウター"],
      about: "About",
      aboutLinks: ["店主のはなし", "セレクト基準", "返品・送料", "プライバシー"],
      follow: "Follow",
      credit: "ATELIER KYO による提案デモ · Next.js 16 · Vercel",
      copyright: "© 2026 BUTTER VINTAGE / DEMO BY ATELIER KYO",
    },
  },
  en: {
    meta: {
      title: "Butter Vintage — Hand-picked Americana from Yokohama Motomachi",
      description:
        "An independently-run Americana vintage shop in Yokohama Motomachi. Hand-picked archive pieces from the 1960s through the 1990s, restocked weekly.",
    },
    brand: {
      name: "Butter Vintage",
      tagline: "MOTOMACHI · YOKOHAMA",
      demoLabel: "DEMO",
      demoNotice:
        "This is a proposal demo built by ATELIER KYO for Butter Vintage. Inventory and transactions shown here are illustrative only.",
    },
    nav: {
      new: "New",
      archive: "Archive",
      story: "Store",
      visit: "Visit",
      cart: "Cart",
      instagram: "Instagram",
    },
    hero: {
      kicker: "BUTTER VINTAGE · EST. MOTOMACHI",
      lineOne: "Frequent",
      lineTwo: "Restocks,",
      lineThree: "One of One.",
      subline:
        "Hand-picked weekly. Never restocked. American vintage curated piece-by-piece from a small storefront in Motomachi, Yokohama.",
      ctaPrimary: "This week's picks",
      ctaSecondary: "See Instagram",
      scrollHint: "SCROLL",
    },
    marquee: [
      "WEEKLY RESTOCK",
      "ONE OF ONE",
      "1960s — 1990s",
      "MOTOMACHI · YOKOHAMA",
      "MEN'S × UNI",
      "HAND PICKED",
      "BUTTER VINTAGE",
    ],
    featured: {
      kicker: "THIS WEEK'S PICKS",
      heading: "Eight pieces, just landed this week.",
      viewAll: "View all",
      sold: "SOLD",
      available: "In stock",
      sizeLabel: "Size",
    },
    story: {
      kicker: "STORE PHILOSOPHY",
      heading: "New old clothes, every week, behind a small door in Motomachi.",
      p1: "Butter Vintage is an independently-run vintage shop tucked into Yokohama's Motomachi shopping street. Our focus is American casual from the 1960s through the 1990s, hand-picked on the road and restocked every week.",
      p2: "Each piece is one-of-one. The same denim, the same band tee, will never come back. The piece you find today is the piece you find — full stop.",
      p3: "We try to balance the character of Motomachi with the taste of those who visit. Travelers from overseas are warmly welcome.",
      yearMark: "New stock every Wednesday",
    },
    collections: {
      kicker: "ARCHIVES",
      heading: "Browse the archive",
      items: [
        { title: "DENIM ROOTS", subtitle: "70s — 90s denim", count: "32 pieces" },
        { title: "BAND TEES", subtitle: "Rock / hip-hop", count: "47 pieces" },
        { title: "OUTERWEAR", subtitle: "Military / workwear", count: "18 pieces" },
      ],
    },
    visit: {
      kicker: "VISIT US",
      heading: "Motomachi street, third corner.",
      address: "1-59-2 Motomachi, Naka-ku, Yokohama 231-0861, Japan (public listing, DEMO)",
      hours: "Hours posted on Instagram / Closed irregularly",
      instagramLabel: "@buttervintage",
      directions: "Open in Google Maps",
      directionsHref: "https://maps.google.com/?q=1-59-2+Motomachi+Yokohama",
      mapAlt: "Store map (placeholder)",
    },
    newsletter: {
      kicker: "STAY ARCHIVED",
      heading: "Get Wednesday's restock straight to your inbox.",
      placeholder: "Email address",
      submit: "Subscribe",
      consent: "Free to subscribe, unsubscribe anytime.",
      thanks: "Thanks — you're on the list.",
    },
    footer: {
      shop: "Shop",
      shopLinks: ["New arrivals", "Denim", "T-shirts", "Outerwear"],
      about: "About",
      aboutLinks: ["About the store", "Curation", "Shipping & returns", "Privacy"],
      follow: "Follow",
      credit: "Proposal demo by ATELIER KYO · Next.js 16 · Vercel",
      copyright: "© 2026 BUTTER VINTAGE / DEMO BY ATELIER KYO",
    },
  },
};
