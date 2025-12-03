export type DietaryTag = 'gluten-free' | 'dairy-free' | 'sugar-free' | 'egg-free' | 'high-protein' | 'raw' | 'vegan';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'e-cookbook' | 'muesli' | 'snacks' | 'sweets' | 'baked';
  images: string[];
  inStock: boolean;
  ingredients?: string[];
  weight?: string;
  featured?: boolean;
  dietaryTags?: DietaryTag[];
}

export const categoryLabels: Record<Product['category'], string> = {
  'e-cookbook': 'E-raamatud',
  muesli: 'Müslid',
  snacks: 'Suupisted',
  sweets: 'Maiustused',
  baked: 'Küpsetised',
};

export const dietaryTagLabels: Record<DietaryTag, string> = {
  'gluten-free': 'Gluteenivaba',
  'dairy-free': 'Piimatootedevaba',
  'sugar-free': 'Suhkruvaba',
  'egg-free': 'Munavaba',
  'high-protein': 'Valgurikas',
  'raw': 'Toortoit',
  'vegan': 'Vegan',
};

export const products: Product[] = [
  // E-Cookbooks
  {
    id: 'e-cookbook-tervislik-hommik',
    name: 'Tervislik Hommik - E-kokaraamat',
    description: 'Üle 30 tervislikku ja lihtsa hommikusöögi retsepti. Kõik retseptid on vabad laktoosist, gluteenist ja rafineeritud suhkrust. Ideaalne neile, kes soovivad alustada päeva energiliselt!',
    price: 12.90,
    category: 'e-cookbook',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80'],
    inStock: true,
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free'],
  },
  {
    id: 'e-cookbook-magusad-patud',
    name: 'Magusad Patud - E-kokaraamat',
    description: 'Tervislikud magustoidud ilma süütundeta! 25 retsepti, mis tõestavad, et tervislik võib olla ka maitsev. Koogid, mousse\'id, pallid ja palju muud.',
    price: 14.90,
    category: 'e-cookbook',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'],
    inStock: true,
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free'],
  },

  // Muesli Products
  {
    id: 'musli-classic',
    name: 'Klassikaline Toortatar-Müsli',
    description: 'Käsitsi valmistatud krõbe müsli toortatrast, kookosest ja kuivatatud marjadest. Valmistatud armastusega, ilma lisatud suhkruta.',
    price: 8.90,
    category: 'muesli',
    images: ['https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&q=80'],
    inStock: true,
    weight: '350g',
    ingredients: [
      'Toortatar',
      'Gluteenivabad kaerahelbed',
      'Kookoshelbed',
      'Päevalilleseemned',
      'Kõrvitsaseemned',
      'Mandlid',
      'Kuivatatud jõhvikad',
      'Kuivatatud mustikad',
      'Vahtrasiirup',
      'Kaneel',
    ],
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan', 'high-protein'],
  },
  {
    id: 'musli-shokolaad',
    name: 'Šokolaadi-Pähkli Müsli',
    description: 'Kakaoga rikastatud müsli, täis pähkleid ja tumedat šokolaadi. Dekadentne, aga tervislik!',
    price: 9.90,
    category: 'muesli',
    images: ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80'],
    inStock: true,
    weight: '350g',
    ingredients: [
      'Toortatar',
      'Gluteenivabad kaerahelbed',
      'Sarapuupähklid',
      'Mandlid',
      'Tume šokolaad (min 70%)',
      'Kakaonibud',
      'Mesi',
    ],
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'high-protein'],
  },

  // Snacks
  {
    id: 'snickers-box',
    name: 'Kodused Valgurikad Snickersid',
    description: 'Tervislik versioon klassikalisest Snickersist! Maapähklivõi, karamell ja tume šokolaad. Karp sisaldab 6 tükki.',
    price: 14.90,
    category: 'snacks',
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80'],
    inStock: true,
    weight: '180g (6 tk)',
    ingredients: [
      'Mandlijahu',
      'Kašupähklid',
      'Datlid',
      'Maapähklivõi',
      'Tume šokolaad',
      'Kookosõli',
      'Vahtrasiirup',
    ],
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan', 'high-protein'],
  },
  {
    id: 'energia-pallid-mix',
    name: 'Energia Pallide Mix',
    description: 'Kolme erineva maitsega energia pallid: šokolaad-maapähkel, kookos-dattel ja matcha-spirulina. 15 palli karbis.',
    price: 11.90,
    category: 'snacks',
    images: ['https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80'],
    inStock: true,
    weight: '250g (15 tk)',
    ingredients: [
      'Kaerahelbed',
      'Datlid',
      'Pähklid',
      'Kookos',
      'Kakao',
      'Matcha',
      'Mesi',
    ],
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'high-protein'],
  },
  {
    id: 'vegan-protein-bar',
    name: 'Taimevalgu Batoon',
    description: 'Võimas taimevalgu batoon herneja kanepivalguga, kaetud tumeda šokolaadiga. 20g valku batooni kohta! Ideaalne treeningu järgseks taastumiseks või kiireks energialaadimiseks.',
    price: 4.90,
    category: 'snacks',
    images: ['/images/valgukas.png'],
    inStock: true,
    weight: '60g',
    ingredients: [
      'Hernepulber',
      'Kanepipulber',
      'Datlid',
      'Mandlivõi',
      'Kaerahelbed',
      'Tume šokolaad (min 85%)',
      'Kookosõli',
      'Vanillieksrakt',
      'Meresool',
    ],
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan', 'high-protein'],
  },
  {
    id: 'mushroom-brain-bar',
    name: 'Adaptogeenne Valgubatoon',
    description: 'Funktsionaalne valgubatoon adaptogeensete seentega! Sisaldab lõvilakk-, reishi- ja chaga-seeneekstrakte, mis toetavad ajutegevust, keskendumist ja stressitaluvust. 18g valku batooni kohta.',
    price: 6.90,
    category: 'snacks',
    images: ['/images/seenekas.png'],
    inStock: true,
    weight: '55g',
    ingredients: [
      'Hernepulber',
      'Mandlijahu',
      'Datlid',
      'Lõvilakk-seeneekstrakt',
      'Reishi-seeneekstrakt',
      'Chaga-seeneekstrakt',
      'Kakao',
      'Kookosõli',
      'Tume šokolaad',
      'Kaneel',
      'Meresool',
    ],
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan', 'high-protein'],
  },

  // Sweets
  {
    id: 'honey-marzipan',
    name: 'Mee-Martsipan',
    description: 'Pehme ja maitsev martsipan, magustatud puhta meega. Traditsiooniline retsept tervislikus võtmes.',
    price: 9.90,
    category: 'sweets',
    images: ['https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=800&q=80'],
    inStock: true,
    weight: '150g',
    ingredients: [
      'Mandlid',
      'Mesi',
      'Vanillieksrakt',
      'Meresool',
    ],
    featured: true,
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'raw'],
  },
  {
    id: 'cookies-classic',
    name: 'Mandli-Šokolaadi Küpsised',
    description: 'Krõbedad küpsised mandlijahust tumeda šokolaadiga. Gluteeni- ja piimatootedevabad.',
    price: 7.90,
    category: 'sweets',
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80'],
    inStock: true,
    weight: '200g (10 tk)',
    ingredients: [
      'Mandlijahu',
      'Kookossuhkur',
      'Tume šokolaad',
      'Linaseemnepulber',
      'Küpsetuspulber',
      'Vanillieksrakt',
    ],
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan'],
  },

  // Baked Goods
  {
    id: 'banana-bread',
    name: 'Banaanikook',
    description: 'Niiske ja maitsev banaanikook kaerajahust. Sobib magusaks hommikusöögiks või desseriks.',
    price: 16.90,
    category: 'baked',
    images: ['https://images.unsplash.com/photo-1606101273945-9c8e0c5c7e7a?w=800&q=80'],
    inStock: true,
    weight: '~500g',
    ingredients: [
      'Banaanid',
      'Kaerajahu',
      'Mandlijahu',
      'Vahtrasiirup',
      'Kaneel',
      'Linaseemned',
    ],
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan', 'high-protein'],
  },
  {
    id: 'carrot-cake',
    name: 'Porgandikook Kašukreemiga',
    description: 'Mahlane porgandikook kreemja kašupähklist toorjuustu kattega. Gluteeni- ja piimatootedevaba.',
    price: 24.90,
    category: 'baked',
    images: ['https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80'],
    inStock: false,
    weight: '~800g',
    ingredients: [
      'Porgandid',
      'Mandlijahu',
      'Kaerajahu',
      'Kašupähklid',
      'Kookosõli',
      'Vahtrasiirup',
      'Sidrunimaitsestaja',
      'Kaneel',
      'Ingver',
    ],
    dietaryTags: ['gluten-free', 'dairy-free', 'sugar-free', 'egg-free', 'vegan'],
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const filterProducts = (category?: Product['category']): Product[] => {
  if (category) {
    return products.filter((product) => product.category === category);
  }
  return products;
};
