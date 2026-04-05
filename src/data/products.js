// Import women's perfumes
import { women } from './products-women.js';

// All men's perfume products with FULLY CORRECTED IMAGE PATHS
// Every image path matches the actual files in public/men/ folders

export const menProducts = [
  {
    id: "m1",
    name: "Dior Sauvage Eau de Parfum",
    brand: "Dior",
    category: "men",
    description:
      "A bold and woody fragrance with fresh top notes. The iconic scent for the modern man.",
    rating: 4.8,
    reviewCount: 3847,
    ratingDistribution: {
      5: 2950,
      4: 680,
      3: 165,
      2: 35,
      1: 17,
    },
    tag: "Bestseller",
    tagColor: "#FFF5E0",
    tagTextColor: "#8B6C10",
    sizes: [
      {
        oz: "1.0",
        price: 90,
        image: "/men/01-dior-sauvage/DiorS 1.0oz -1.jpg",
      },
      {
        oz: "2.0",
        price: 135,
        image: "/men/01-dior-sauvage/DiorS 2.0oz -2.jpg",
      },
      {
        oz: "3.4",
        price: 165,
        image: "/men/01-dior-sauvage/DiorS 3.4oz -3.jpg",
      },
      {
        oz: "6.8",
        price: 232,
        image: "/men/01-dior-sauvage/DiorS 6.8oz -4.jpg",
      },
      {
        oz: "10.0 (Refill)",
        price: 289,
        image: "/men/01-dior-sauvage/DiorS 10.0oz(refill) -5.jpg",
      },
    ],
    mainImage: "/men/01-dior-sauvage/DiorS 3.4oz -3.jpg",
  },
  {
    id: "m2",
    name: "Dior Sauvage Elixir",
    brand: "Dior",
    category: "men",
    description:
      "An ultra-concentrated fragrance with rich, spicy, and woody notes. Intense and long-lasting.",
    rating: 4.7,
    reviewCount: 2156,
    ratingDistribution: {
      5: 1582,
      4: 431,
      3: 108,
      2: 21,
      1: 14,
    },
    tag: "Premium",
    tagColor: "#FDE8D8",
    tagTextColor: "#B87848",
    sizes: [
      {
        oz: "2.0",
        price: 199,
        image: "/men/02-sauvage-elixir/ELIX 2.0oz -1.jpg",
      },
      {
        oz: "3.4",
        price: 265,
        image: "/men/02-sauvage-elixir/ELIX 3.4oz -2.jpg",
      },
      {
        oz: "5.0",
        price: 330,
        image: "/men/02-sauvage-elixir/ELIX 5.0oz -3.jpg",
      },
    ],
    mainImage: "/men/02-sauvage-elixir/ELIX 3.4oz -2.jpg",
  },
  {
    id: "m3",
    name: "Dior Homme Parfum",
    brand: "Dior",
    category: "men",
    description:
      "A sophisticated and elegant scent with iris and woody notes. Perfect for evening wear.",
    rating: 4.5,
    reviewCount: 1923,
    ratingDistribution: {
      5: 1347,
      4: 385,
      3: 154,
      2: 28,
      1: 9,
    },
    tag: "Classic",
    tagColor: "#F0EDE5",
    tagTextColor: "#777",
    sizes: [
      { oz: "1.7", price: 168, image: "/men/03-dior-homme/hom 1.7oz -1.jpg" },
      { oz: "2.5", price: 189, image: "/men/03-dior-homme/hom 2.5oz -2.jpg" },
      { oz: "4.2", price: 227, image: "/men/03-dior-homme/hom 4.2oz.jpg" },
    ],
    mainImage: "/men/03-dior-homme/hom 2.5oz -2.jpg",
  },
  {
    id: "m4",
    name: "Emporio Armani Absolu",
    brand: "Emporio Armani",
    category: "men",
    description:
      "A warm and sensual fragrance built around rich amber and tonka bean.",
    rating: 4.3,
    reviewCount: 1654,
    ratingDistribution: {
      5: 1055,
      4: 423,
      3: 142,
      2: 24,
      1: 10,
    },
    tag: "Trending",
    tagColor: "#FDE8D8",
    tagTextColor: "#B87848",
    sizes: [
      { oz: "1.3", price: 130, image: "/men/04-absolu/ab 1.3oz -2.jpg" },
      { oz: "2.0", price: 180, image: "/men/04-absolu/ab 2.0oz -3.jpg" },
      { oz: "3.3", price: 210, image: "/men/04-absolu/ab 3.3oz -4.jpg" },
    ],
    mainImage: "/men/04-absolu/ab 2.0oz -3.jpg",
  },
  {
    id: "m5",
    name: "Bleu de Chanel Eau de Parfum",
    brand: "Chanel",
    category: "men",
    description:
      "A fresh and clean fragrance with citrus, mint, and cedar. Timeless and versatile.",
    rating: 4.9,
    reviewCount: 4223,
    ratingDistribution: {
      5: 3408,
      4: 695,
      3: 89,
      2: 19,
      1: 12,
    },
    tag: "Bestseller",
    tagColor: "#FFF5E0",
    tagTextColor: "#8B6C10",
    sizes: [
      {
        oz: "1.7",
        price: 135,
        image: "/men/05-bleu-de-chanel/bleu 1.7oz -1.jpg",
      },
      {
        oz: "3.4",
        price: 173,
        image: "/men/05-bleu-de-chanel/bleu3.4oz -2.jpg",
      },
      {
        oz: "5.0",
        price: 211,
        image: "/men/05-bleu-de-chanel/bleu 5.0oz -3.jpg",
      },
    ],
    mainImage: "/men/05-bleu-de-chanel/bleu3.4oz -2.jpg",
  },
  {
    id: "m6",
    name: "Bleu de Chanel L'Exclusif",
    brand: "Chanel",
    category: "men",
    description:
      "The most luxurious expression of Bleu de Chanel. Deep, rich, and magnetic.",
    rating: 4.6,
    reviewCount: 987,
    ratingDistribution: {
      5: 713,
      4: 198,
      3: 59,
      2: 12,
      1: 5,
    },
    tag: "Exclusive",
    tagColor: "#E8E0F5",
    tagTextColor: "#5A3D8A",
    sizes: [
      {
        oz: "2.0",
        price: 205,
        image: "/men/06-bleu-chanel-exclusif/De 2.0oz -1.jpg",
      },
      {
        oz: "3.4",
        price: 275,
        image: "/men/06-bleu-chanel-exclusif/De 3.4oz -2.jpg",
      },
    ],
    mainImage: "/men/06-bleu-chanel-exclusif/De 3.4oz -2.jpg",
  },
  {
    id: "m7",
    name: "Acqua di Giò Profondo",
    brand: "Giorgio Armani",
    category: "men",
    description:
      "A deep aquatic fragrance inspired by the Mediterranean. Fresh and invigorating.",
    rating: 4.4,
    reviewCount: 1432,
    ratingDistribution: {
      5: 916,
      4: 358,
      3: 126,
      2: 20,
      1: 12,
    },
    tag: "New",
    tagColor: "#E8F5E0",
    tagTextColor: "#3D7A1C",
    sizes: [
      { oz: "1.6", price: 88, image: "/men/07-acqua-di-gio/ara 1.6oz 01.jpg" },
      { oz: "3.3", price: 120, image: "/men/07-acqua-di-gio/ara 3.3oz -2.jpg" },
    ],
    mainImage: "/men/07-acqua-di-gio/ara 1.6oz 01.jpg",
  },
  {
    id: "m8",
    name: "Bad Boy Cobalt",
    brand: "Carolina Herrera",
    category: "men",
    description:
      "A bold, electrifying scent with sage and tonka bean. For the rule-breaker.",
    rating: 3.9,
    reviewCount: 876,
    ratingDistribution: {
      5: 511,
      4: 245,
      3: 98,
      2: 16,
      1: 6,
    },
    tag: "New",
    tagColor: "#E8F5E0",
    tagTextColor: "#3D7A1C",
    sizes: [
      {
        oz: "0.34",
        price: 39,
        image: "/men/08-bad-boy-cobalt/bad 0.34oz -1.jpg",
      },
      {
        oz: "1.7",
        price: 125,
        image: "/men/08-bad-boy-cobalt/bad 1.7oz -2.jpg",
      },
      {
        oz: "3.4",
        price: 160,
        image: "/men/08-bad-boy-cobalt/bad 3.4oz -3.jpg",
      },
    ],
    mainImage: "/men/08-bad-boy-cobalt/bad 1.7oz -2.jpg",
  },
  {
    id: "m9",
    name: "Invictus Victory Elixir",
    brand: "Paco Rabanne",
    category: "men",
    description:
      "An intense parfum with smoky and amber notes. Victory in every spray.",
    rating: 4.7,
    reviewCount: 1567,
    ratingDistribution: {
      5: 1123,
      4: 334,
      3: 89,
      2: 15,
      1: 6,
    },
    tag: "Trending",
    tagColor: "#FDE8D8",
    tagTextColor: "#B87848",
    sizes: [
      {
        oz: "1.7",
        price: 138,
        image: "/men/09-invictus-victory/inv 1.7oz -1.jpg",
      },
      {
        oz: "3.4",
        price: 176,
        image: "/men/09-invictus-victory/inv 3.4oz -2.jpg",
      },
    ],
    mainImage: "/men/09-invictus-victory/inv 3.4oz -2.jpg",
  },
  {
    id: "m10",
    name: "Le Beau Le Parfum",
    brand: "Jean Paul Gaultier",
    category: "men",
    description:
      "A fresh and sensual fragrance with coconut and sandalwood. Paradise in a bottle.",
    rating: 4.2,
    reviewCount: 1289,
    ratingDistribution: {
      5: 803,
      4: 346,
      3: 111,
      2: 20,
      1: 9,
    },
    tag: "Classic",
    tagColor: "#F0EDE5",
    tagTextColor: "#777",
    sizes: [
      { oz: "0.34", price: 40, image: "/men/10-le-beau/beau 0.34oz -1.jpg" },
      { oz: "2.5", price: 134, image: "/men/10-le-beau/beau 2.5oz 2.jpg" },
      { oz: "4.2", price: 169, image: "/men/10-le-beau/beau 4.2oz -3.jpg" },
    ],
    mainImage: "/men/10-le-beau/beau 2.5oz 2.jpg",
  },
  {
    id: "m11",
    name: "Le Male Elixir Parfum",
    brand: "Jean Paul Gaultier",
    category: "men",
    description:
      "A powerful and addictive elixir with lavender, vanilla, and amber.",
    rating: 4.8,
    reviewCount: 2654,
    ratingDistribution: {
      5: 2087,
      4: 448,
      3: 95,
      2: 18,
      1: 6,
    },
    tag: "Premium",
    tagColor: "#FDE8D8",
    tagTextColor: "#B87848",
    sizes: [
      {
        oz: "0.34",
        price: 40,
        image: "/men/11-le-male-elixir/Lemlae  0.34oz -1.jpg",
      },
      {
        oz: "2.5",
        price: 141,
        image: "/men/11-le-male-elixir/lemale 2.5oz -2.jpg",
      },
      {
        oz: "4.2",
        price: 178,
        image: "/men/11-le-male-elixir/lemale 4.2oz.jpg",
      },
    ],
    mainImage: "/men/11-le-male-elixir/lemale 2.5oz -2.jpg",
  },
  {
    id: "m12",
    name: "MYSLF Le Parfum",
    brand: "Yves Saint Laurent",
    category: "men",
    description:
      "A floral masculine fragrance with orange blossom. Redefining what it means to be yourself.",
    rating: 4.6,
    reviewCount: 1876,
    ratingDistribution: {
      5: 1321,
      4: 378,
      3: 141,
      2: 26,
      1: 10,
    },
    tag: "New",
    tagColor: "#E8F5E0",
    tagTextColor: "#3D7A1C",
    sizes: [
      { oz: "0.34", price: 39, image: "/men/12-myslf/MYS 0.34oz -1.jpg" },
      { oz: "1.35", price: 115, image: "/men/12-myslf/MYS 1.35oz -2.jpg" },
      { oz: "2.0", price: 165, image: "/men/12-myslf/MYS 2.0oz -3.jpg" },
      { oz: "3.3", price: 196, image: "/men/12-myslf/MYS 3.3oz -4 .jpg" },
      { oz: "5.0", price: 232, image: "/men/12-myslf/MYS 5.0oz -5.jpg" },
      { oz: "Refill", price: 216, image: "/men/12-myslf/MYS refill -6.jpg" },
    ],
    mainImage: "/men/12-myslf/MYS 3.3oz -4 .jpg",
  },
  {
    id: "m13",
    name: "Prada Paradigme",
    brand: "Prada",
    category: "men",
    description:
      "A contemporary scent that blends tradition with innovation. Clean and modern.",
    rating: 4.1,
    reviewCount: 743,
    ratingDistribution: {
      5: 453,
      4: 201,
      3: 72,
      2: 12,
      1: 5,
    },
    tag: "New",
    tagColor: "#E8F5E0",
    tagTextColor: "#3D7A1C",
    sizes: [
      { oz: "0.33", price: 37, image: "/men/13-paradigme/para 0.33oz -1.jpg" },
      { oz: "1.6", price: 136, image: "/men/13-paradigme/para 1.6oz -2.jpg" },
    ],
    mainImage: "/men/13-paradigme/para 1.6oz -2.jpg",
  },
  {
    id: "m14",
    name: "Valentino Uomo Born in Roma",
    brand: "Valentino",
    category: "men",
    description:
      "A spicy and woody fragrance inspired by Roman streets. Bold and unforgettable.",
    rating: 4.5,
    reviewCount: 1945,
    ratingDistribution: {
      5: 1382,
      4: 389,
      3: 146,
      2: 21,
      1: 7,
    },
    tag: "Trending",
    tagColor: "#FDE8D8",
    tagTextColor: "#B87848",
    sizes: [
      { oz: "1.7", price: 110, image: "/men/14-valentino/va 1.7oz -1.jpg" },
      { oz: "3.4", price: 136, image: "/men/14-valentino/va 3.4oz -2.jpg" },
      { oz: "5.0", price: 168, image: "/men/14-valentino/va 5.0oz -3.jpg" },
    ],
    mainImage: "/men/14-valentino/va 3.4oz -2.jpg",
  },
  {
    id: "m15",
    name: "Y Eau de Parfum",
    brand: "Yves Saint Laurent",
    category: "men",
    description:
      "A fresh and bold fragrance with apple, sage, and cedar. The scent of ambition.",
    rating: 4.9,
    reviewCount: 3521,
    ratingDistribution: {
      5: 2813,
      4: 578,
      3: 98,
      2: 21,
      1: 11,
    },
    tag: "Bestseller",
    tagColor: "#FFF5E0",
    tagTextColor: "#8B6C10",
    sizes: [
      {
        oz: "0.33",
        price: 38,
        image: "/men/15-yves-saint-laurent/Yves 0.33oz -1.jpg",
      },
      {
        oz: "2.0",
        price: 136,
        image: "/men/15-yves-saint-laurent/Yves 2.0oz -2.jpeg",
      },
      {
        oz: "3.3",
        price: 165,
        image: "/men/15-yves-saint-laurent/Yves 3.3oz -3.jpg",
      },
      {
        oz: "6.8",
        price: 230,
        image: "/men/15-yves-saint-laurent/yves 6.8oz -4.jpg",
      },
      {
        oz: "5.0 (Refill)",
        price: 182,
        image: "/men/15-yves-saint-laurent/yves 5.0(refill) -5.jpg",
      },
    ],
    mainImage: "/men/15-yves-saint-laurent/Yves 3.3oz -3.jpg",
  },
];

// Use imported women products (convert to match format if needed)
export const womenProducts = women;

// Combined for shop page - NOW HAS BOTH MEN & WOMEN!
export const allProducts = [...menProducts, ...womenProducts];

// Get bestsellers (for homepage) - Men's
export const bestSellers = menProducts.filter((p) =>
  ["m1", "m5", "m15"].includes(p.id)
);

// Get bestsellers (for homepage) - Women's (using highest rated/reviewed)
export const bestSellerWomen = womenProducts.slice(0, 5); // First 5 women perfumes

// Get new arrivals (for homepage)
export const newArrivals = menProducts.filter((p) =>
  ["m7", "m8", "m12", "m13"].includes(p.id)
);

// Testimonials
export const testimonials = [
  {
    id: 1,
    quote:
      "Dior Sauvage is literally confidence in a bottle. I get compliments every single time.",
    name: "Sophia L.",
    role: "Repeat Buyer",
  },
  {
    id: 2,
    quote:
      "Bought Bleu de Chanel as a gift and he absolutely loved it. Ordering one for myself now.",
    name: "Diana W.",
    role: "Gift Buyer",
  },
  {
    id: 3,
    quote:
      "The Valentino scent lasts from morning to night. Never going back to my old cologne.",
    name: "Luna K.",
    role: "New Customer",
  },
];
