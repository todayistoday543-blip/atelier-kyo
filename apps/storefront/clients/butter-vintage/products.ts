// Butter Vintage 想定商品データ
// 価格帯 ¥4,500-16,000（kyo-scout の研究より）
// アメカジ・ヴィンテージ中心、メンズ × ユニ

export type ButterProduct = {
  handle: string;
  title: { ja: string; en: string };
  era: string;
  origin: string;
  size: string;
  price: number;
  available: boolean;
  gradient: [string, string];
  badgeNumber: string;
  category: "denim" | "tee" | "outerwear" | "accessory";
};

export const BUTTER_PRODUCTS: ButterProduct[] = [
  {
    handle: "70s-band-tee-aerosmith",
    title: {
      ja: "1970s Aerosmith ツアーTシャツ",
      en: "1970s Aerosmith Tour Tee",
    },
    era: "1976",
    origin: "USA",
    size: "L",
    price: 12800,
    available: true,
    gradient: ["#a05030", "#3a1f12"],
    badgeNumber: "01",
    category: "tee",
  },
  {
    handle: "80s-levis-501",
    title: {
      ja: "1980s Levi's 501 ヴィンテージウォッシュ",
      en: "1980s Levi's 501 Vintage Wash",
    },
    era: "1984",
    origin: "USA",
    size: "W32",
    price: 11500,
    available: true,
    gradient: ["#5a6480", "#1a1f30"],
    badgeNumber: "02",
    category: "denim",
  },
  {
    handle: "90s-champion-reverse-weave",
    title: {
      ja: "1990s Champion リバースウィーブ",
      en: "1990s Champion Reverse Weave",
    },
    era: "1993",
    origin: "USA",
    size: "L",
    price: 8900,
    available: true,
    gradient: ["#c8b890", "#5a4830"],
    badgeNumber: "03",
    category: "tee",
  },
  {
    handle: "70s-hawaiian-shirt",
    title: {
      ja: "1970s ハワイアンシャツ レーヨン",
      en: "1970s Rayon Hawaiian Shirt",
    },
    era: "1972",
    origin: "USA",
    size: "M",
    price: 9500,
    available: true,
    gradient: ["#c84538", "#5a1a14"],
    badgeNumber: "04",
    category: "tee",
  },
  {
    handle: "80s-denim-jacket-trucker",
    title: {
      ja: "1980s デニムトラッカー（Levi's Type III）",
      en: "1980s Levi's Type III Trucker Jacket",
    },
    era: "1986",
    origin: "USA",
    size: "M",
    price: 14500,
    available: false,
    gradient: ["#3a4a60", "#0a1424"],
    badgeNumber: "05",
    category: "outerwear",
  },
  {
    handle: "60s-work-shirt-faded",
    title: {
      ja: "1960s ワークシャツ シャンブレー",
      en: "1960s Chambray Work Shirt",
    },
    era: "1968",
    origin: "USA",
    size: "M",
    price: 7500,
    available: true,
    gradient: ["#6a8090", "#1a242c"],
    badgeNumber: "06",
    category: "tee",
  },
  {
    handle: "70s-print-sweatshirt",
    title: {
      ja: "1970s プリントスウェット カレッジ",
      en: "1970s College Print Sweatshirt",
    },
    era: "1974",
    origin: "USA",
    size: "L",
    price: 9800,
    available: true,
    gradient: ["#5a6b3f", "#1f2814"],
    badgeNumber: "07",
    category: "tee",
  },
  {
    handle: "vintage-trucker-cap-faded",
    title: {
      ja: "ヴィンテージ トラッカーキャップ",
      en: "Vintage Trucker Cap",
    },
    era: "1978",
    origin: "USA",
    size: "Free",
    price: 4500,
    available: true,
    gradient: ["#d54a2e", "#5a1a14"],
    badgeNumber: "08",
    category: "accessory",
  },
];

export function formatButterPrice(price: number, locale: string): string {
  return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(price);
}
