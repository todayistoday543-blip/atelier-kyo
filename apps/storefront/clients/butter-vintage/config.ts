// Butter Vintage — BrandTokens
// Mood: Americana Vintage (kyo-stylist mood library より)
// Source research: docs/research/butter-vintage.md
// Recommended by kyo-scout: 70s映画オープニング風 / バタークリーム × フィルムグレイン

export const butterVintageConfig = {
  slug: "butter-vintage",
  brand: {
    name: "Butter Vintage",
    nameKana: "バタービンテージ",
    location: "Yokohama Motomachi",
    locationJa: "横浜・元町",
    establishedYear: null, // 要確認
    instagramHandle: "buttervintage",
  },
  colors: {
    ink: "#2c1f12", // dark brown 主前景
    charcoal: "#3a2f1f",
    graphite: "#4a3e2c",
    smoke: "#5a4d3a",
    fog: "#7a6b54",
    haze: "#8a7a5e",
    bone: "#f5e7c4", // butter cream 主背景
    paper: "#efe5d0",
    acid: "#d54a2e", // tomato red アクセント
    acidSoft: "#b83a22",
    flare: "#5a6b3f", // moss green サブアクセント
  },
  typography: {
    sans: "EB Garamond", // serif body fallback
    mono: "Geist Mono",
    display: "Yeseva One", // 70s movie title vibe
  },
  motion: {
    intensity: "moderate" as const,
    style: "editorial" as const,
    reducedMotionFallback: "static" as const,
  },
  three: {
    enabled: false, // Phase 2 でハンガー回転 3D を検討
    scenes: [],
    performanceBudget: { maxDrawCalls: 100, maxVertices: 200000, maxTextureMB: 30 },
  },
  pricing: {
    minProductPrice: 4500,
    maxProductPrice: 16000,
    averagePrice: 9500,
    currency: "JPY" as const,
  },
} as const;
