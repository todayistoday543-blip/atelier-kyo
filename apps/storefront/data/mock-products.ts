export type LocalizedString = { ja: string; en: string };

export type Product = {
  handle: string;
  title: LocalizedString;
  era: string;
  origin: string;
  material: LocalizedString;
  size: string;
  price: number;
  currency: "JPY" | "USD" | "EUR";
  available: boolean;
  gradient: [string, string];
  badgeNumber: string;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    handle: "70s-levis-501-selvedge",
    title: {
      ja: "1972 Levi's 501 セルヴィッジ・デニム",
      en: "1972 Levi's 501 Selvedge Denim",
    },
    era: "1972",
    origin: "USA",
    material: { ja: "コットン 100%", en: "Cotton 100%" },
    size: "W32 / L34",
    price: 78000,
    currency: "JPY",
    available: true,
    gradient: ["#4a6480", "#0e1a2c"],
    badgeNumber: "01",
  },
  {
    handle: "deadstock-french-military-jacket",
    title: {
      ja: "1960年代 フランス軍 M-47 デッドストック",
      en: "1960s French M-47 Deadstock Field Jacket",
    },
    era: "1962",
    origin: "France",
    material: { ja: "コットンサテン", en: "Cotton sateen" },
    size: "M",
    price: 124000,
    currency: "JPY",
    available: true,
    gradient: ["#5a6447", "#1f2616"],
    badgeNumber: "02",
  },
  {
    handle: "champion-reverse-weave-mint",
    title: {
      ja: "1980年代 Champion リバースウィーブ ミントコンディション",
      en: "1980s Champion Reverse Weave (Mint)",
    },
    era: "1986",
    origin: "USA",
    material: { ja: "コットン / ナイロン裏地", en: "Cotton with nylon trim" },
    size: "L",
    price: 38000,
    currency: "JPY",
    available: true,
    gradient: ["#a08a6a", "#3b2e1f"],
    badgeNumber: "03",
  },
  {
    handle: "engineer-boots-1970s-redwing",
    title: {
      ja: "1970年代 Red Wing エンジニアブーツ",
      en: "1970s Red Wing Engineer Boots",
    },
    era: "1974",
    origin: "USA",
    material: { ja: "オイルドレザー", en: "Oiled leather" },
    size: "US 9",
    price: 89000,
    currency: "JPY",
    available: false,
    gradient: ["#3a2a1a", "#0a0606"],
    badgeNumber: "04",
  },
  {
    handle: "schott-perfecto-1970s",
    title: {
      ja: "1976 Schott Perfecto レザーライダース",
      en: "1976 Schott Perfecto Leather Rider",
    },
    era: "1976",
    origin: "USA",
    material: { ja: "ステアハイドレザー", en: "Steerhide leather" },
    size: "38",
    price: 168000,
    currency: "JPY",
    available: true,
    gradient: ["#1a1a1a", "#000000"],
    badgeNumber: "05",
  },
  {
    handle: "vintage-burberry-trench-1980s",
    title: {
      ja: "1980年代 Burberry's トレンチコート（イングランド製）",
      en: "1980s Burberry's Trench Coat (Made in England)",
    },
    era: "1983",
    origin: "England",
    material: { ja: "ギャバジン", en: "Gabardine cotton" },
    size: "44 R",
    price: 96000,
    currency: "JPY",
    available: true,
    gradient: ["#a89572", "#3e3325"],
    badgeNumber: "06",
  },
  {
    handle: "harris-tweed-1990s-jacket",
    title: {
      ja: "1990年代 Harris Tweed テーラードジャケット",
      en: "1990s Harris Tweed Tailored Jacket",
    },
    era: "1993",
    origin: "Scotland",
    material: { ja: "ハリスツイード", en: "Harris Tweed wool" },
    size: "40 R",
    price: 42000,
    currency: "JPY",
    available: true,
    gradient: ["#6e5640", "#1f1812"],
    badgeNumber: "07",
  },
  {
    handle: "navy-issue-peacoat-1965",
    title: {
      ja: "1965 米海軍支給 ピーコート デッドストック",
      en: "1965 U.S. Navy Issue Pea Coat (Deadstock)",
    },
    era: "1965",
    origin: "USA",
    material: { ja: "ウールメルトン", en: "Wool melton" },
    size: "40",
    price: 52000,
    currency: "JPY",
    available: true,
    gradient: ["#1c2a3e", "#06090e"],
    badgeNumber: "08",
  },
  {
    handle: "japanese-workwear-1970s",
    title: {
      ja: "1970年代 日本製 鉄道マンワークシャツ",
      en: "1970s Japanese Railway Worker Shirt",
    },
    era: "1972",
    origin: "Japan",
    material: { ja: "コットンチノ", en: "Cotton chino" },
    size: "M",
    price: 28000,
    currency: "JPY",
    available: true,
    gradient: ["#7a6240", "#2a2018"],
    badgeNumber: "09",
  },
];

export function formatProductPrice(product: Product, locale: string): string {
  return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price);
}
