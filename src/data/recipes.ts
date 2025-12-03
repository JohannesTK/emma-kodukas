export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  yield: string;
  image: string;
  category: 'breakfast' | 'main' | 'dessert' | 'snack' | 'drink' | 'baked';
  dietaryTags: ('gluten-free' | 'high-protein' | 'no-oil' | 'raw' | 'soy-free')[];
  ingredients: { title?: string; items: string[] }[];
  instructions: string[];
  notes?: string;
  featured?: boolean;
}

export const categoryLabels: Record<Recipe['category'], string> = {
  breakfast: 'Hommikusöök',
  main: 'Põhiroad',
  dessert: 'Magustoidud',
  snack: 'Suupisted',
  drink: 'Joogid',
  baked: 'Küpsetised',
};

export const dietaryTagLabels: Record<Recipe['dietaryTags'][number], string> = {
  'gluten-free': 'Gluteenivaba',
  'high-protein': 'Kõrge valgusisaldusega',
  'no-oil': 'Ilma õlita',
  'raw': 'Toores',
  'soy-free': 'Sojast vaba',
};

export const recipes: Recipe[] = [
  {
    id: 'valgurikas-snickers',
    title: 'Kodukootud valgurikas Snickers',
    description: 'Tervislik ja valgurikas versioon klassikalisest Snickersist. Täis maapähkleid, kreemine karamell ja tumeda šokolaadi kattega.',
    prepTime: '45 min',
    yield: '12 tükki',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80',
    category: 'snack',
    dietaryTags: ['gluten-free', 'high-protein', 'soy-free'],
    featured: true,
    ingredients: [
      {
        title: 'Põhi',
        items: [
          '200g mandlijahu',
          '100g kookosõli',
          '3 spl vahtrасiirupit',
          '1 tl vanilliekstrakti',
          'Näpuots soola',
        ],
      },
      {
        title: 'Karamellikiht',
        items: [
          '150g tooreid kašupähkleid (leotatud)',
          '100g datleid',
          '3 spl maapähklivõid',
          '2 spl vahtrасiirupit',
          '1 tl vanilliekstrakti',
        ],
      },
      {
        title: 'Peale',
        items: [
          '100g röstitud maapähkleid',
          '150g tumedat šokolaadi (min 70%)',
          '1 spl kookosõli',
        ],
      },
    ],
    instructions: [
      'Sega kõik põhja koostisosad kokku ja pressi ühtlaselt väikesesse vormis. Pane külmkappi.',
      'Blenderda karamelli koostisosad siledaks massiks. Vajadusel lisa veidi vett.',
      'Määri karamellikiht põhja peale ja lisa röstitud maapähklid. Pane sügavkülma 30 minutiks.',
      'Sulata šokolaad koos kookosõliga ja vala ühtlaselt peale.',
      'Lase külmkapis täielikult tarduda (vähemalt 2 tundi). Lõika tükkideks.',
    ],
    notes: 'Säilib külmkapis kuni 2 nädalat. Võib hoida ka sügavkülmas.',
  },
  {
    id: 'krobe-toortatar-musli',
    title: 'Krõbe toortatar-müsli',
    description: 'Tervislik ja krõmpsuv hommikumüsli toortatrast, pähklitest ja kuivatatud marjadest. Ideaalne koos taimse jogurtiga.',
    prepTime: '15 min + kuivatamine',
    yield: '500g',
    image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=800&q=80',
    category: 'breakfast',
    dietaryTags: ['gluten-free', 'raw', 'no-oil', 'soy-free'],
    featured: true,
    ingredients: [
      {
        items: [
          '200g toortatart',
          '100g kaerahelbeid (gluteenivabu)',
          '50g kookosehelbeid',
          '50g päevalilleseemneid',
          '50g kõrvitsaseemneid',
          '50g mandleid, hakitud',
          '50g kuivatatud jõhvikaid',
          '30g kuivatatud mustikaid',
          '2 spl vahtrасiirupit',
          '1 tl kaneeli',
          '1/2 tl vanillipulbrit',
        ],
      },
    ],
    instructions: [
      'Leota toortatart üleöö puhtas vees. Loputa ja kuruta.',
      'Sega tatar kokku kõikide kuivade koostisosadega.',
      'Lisa vahtrasiirup ja maitsestajad, sega korralikult.',
      'Jaga segu kuivatile õhukese kihina.',
      'Kuivata dehüdraatoris 42°C juures 12-15 tundi või ahjus madalal temperatuuril.',
      'Säilita klaaspurgis kuivas kohas.',
    ],
    notes: 'Toortatar säilitab kõik toitained, kuna seda ei kuumutata üle 42°C.',
  },
  {
    id: 'seente-risoto',
    title: 'Kreemjas seente risoto',
    description: 'Rikkaliku maitsega taimetoitlane risoto mitmesuguste seentega ja värskete ürtidega. Koorene tekstuur ilma piimatoodeteta.',
    prepTime: '40 min',
    yield: '4 portsjonit',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    category: 'main',
    dietaryTags: ['gluten-free', 'soy-free'],
    featured: true,
    ingredients: [
      {
        items: [
          '300g risotoriisi (arborio)',
          '400g segaseeni (šampinjonid, šiitake, austriseen)',
          '1 sibul, peeneks hakitud',
          '3 küüslauguküünt',
          '150ml valget veini',
          '1l köögiviljaputjongi',
          '100g kašupähkleid (leotatud)',
          '3 spl oliiviõli',
          'Värske tüümian ja petersell',
          'Soola ja pipart maitse järgi',
        ],
      },
    ],
    instructions: [
      'Leota kašupähklid 2 tundi soojas vees. Blenderda siledaks kreemiks koos 100ml veega.',
      'Kuumuta puljongit väikesel tulel.',
      'Prae sibul ja küüslauk oliiviõlis läbipaistvaks.',
      'Lisa riis ja prae 2 minutit, kuni riis on õliga kaetud.',
      'Vala juurde vein ja sega, kuni aurustub.',
      'Lisa kulbiga kuuma puljongit, segades pidevalt, kuni vedelik imendub.',
      'Eraldi pane prae seened kuldpruuniks.',
      'Kui riis on peaaegu valmis, lisa kašukreem ja seened.',
      'Maitsesta soola ja pipraga. Kaunista värskete ürtidega.',
    ],
  },
  {
    id: 'shokolaadi-avokaado-mousse',
    title: 'Šokolaadi-avokaado mousse',
    description: 'Siidine ja dekadentne šokolaadimagustoit, mille saladus on küpses avokaados. Ilma suhkru ja piimatoodeteta.',
    prepTime: '15 min',
    yield: '4 portsjonit',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80',
    category: 'dessert',
    dietaryTags: ['gluten-free', 'raw', 'soy-free', 'no-oil'],
    ingredients: [
      {
        items: [
          '2 küpset avokaadot',
          '50g kakaoipulbrit',
          '100ml vahtrасiirupit või agaavisiirupit',
          '1 tl vanilliekstrakti',
          '100ml kookospiima',
          'Näpuots meresoola',
          'Värsked marjad serveerimiseks',
        ],
      },
    ],
    instructions: [
      'Lõika avokaadod pooleks ja eemalda kivid.',
      'Lusika avokaado liha blenderisse.',
      'Lisa kakaopulber, siirup, vanilje, kookospiim ja sool.',
      'Blenderda täiesti siledaks, kraapides vajadusel seinu.',
      'Maitse järele - lisa vajadusel veel siirupit magususe jaoks.',
      'Jaga klaasidesse ja jahuta külmkapis vähemalt 30 minutit.',
      'Serveeri värskete marjadega.',
    ],
    notes: 'Avokado annab moussile kreemise tekstuuri ilma koore maitseta.',
  },
  {
    id: 'energia-pallid',
    title: 'Energia pallid maapähkli ja šokolaadiga',
    description: 'Kiire ja energiat andev suupiste treeningu ette või vahepala. Ei vaja küpsetamist!',
    prepTime: '20 min',
    yield: '20 palli',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80',
    category: 'snack',
    dietaryTags: ['gluten-free', 'high-protein', 'no-oil', 'soy-free'],
    featured: true,
    ingredients: [
      {
        items: [
          '200g kaerahelbeid (gluteenivabad)',
          '150g maapähklivõid',
          '100g mett',
          '50g tumedaid šokolaaditükke',
          '30g linaseemneid',
          '2 spl kakaonippe',
          '1 tl vanilliekstrakti',
          'Näpuots soola',
        ],
      },
    ],
    instructions: [
      'Sega kõik koostisosad suures kausis kokku.',
      'Vajadusel lisa veidi vett, kui segu on liiga kuiv.',
      'Lase segul 10 minutit külmkapis seista.',
      'Vormista pallideks (umbes 1 supilusikatäis igaüks).',
      'Aseta paberile ja jahuta külmkapis vähemalt 30 minutit.',
    ],
    notes: 'Säilib külmkapis kuni 2 nädalat hermeetilises anumas.',
  },
  {
    id: 'roheline-smuuti',
    title: 'Roheline hommikusmuuti',
    description: 'Värskendav ja toitainerikas roheline smuuti spinati, banaani ja mango. Täiuslik hommikusöök kiires tempos.',
    prepTime: '5 min',
    yield: '2 portsjonit',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80',
    category: 'drink',
    dietaryTags: ['gluten-free', 'raw', 'no-oil', 'soy-free'],
    ingredients: [
      {
        items: [
          '2 kätt värsket spinatit',
          '1 küps banaan (külmutatud)',
          '100g mangot (külmutatud)',
          '300ml mandlipiima',
          '1 spl linaseemneid',
          '1 spl mett või vahtrасiirupit',
          'Värske ingver (1 cm tükk)',
        ],
      },
    ],
    instructions: [
      'Pane kõik koostisosad blenderisse.',
      'Blenderda siledaks, umbes 1 minut.',
      'Vajadusel lisa veel piima, et saavutada soovitud konsistents.',
      'Serveeri kohe, kaunistades värsete puuviljadega.',
    ],
  },
  {
    id: 'banaani-kaerakook',
    title: 'Banaanikook kaerajahust',
    description: 'Niiske ja magus banaanikook, mis on valmistatud tervislikest koostisosadest. Ideaalne hommikuks või magustoiduks.',
    prepTime: '50 min',
    yield: '8 viilu',
    image: 'https://images.unsplash.com/photo-1606101273945-9c8e0c5c7e7a?w=800&q=80',
    category: 'baked',
    dietaryTags: ['gluten-free', 'soy-free'],
    ingredients: [
      {
        items: [
          '3 väga küpset banaani',
          '200g kaerajahu (gluteenivaba)',
          '100g mandlijahu',
          '2 spl linaseemneid + 6 spl vett (linaseemnemuna)',
          '100ml vahtrасiirupit',
          '100ml taimset piima',
          '1 tl küpsetuspulbrit',
          '1 tl soodat',
          '1 tl kaneeli',
          '1/2 tl vanillipulbrit',
          'Näpuots soola',
        ],
      },
    ],
    instructions: [
      'Eelsoojenda ahi 180°C-ni. Vooderda vorm küpsetuspaberiga.',
      'Sega linaseemned veega ja lase 5 minutit seista.',
      'Muljuda banaanid siledaks.',
      'Sega kokku kõik kuivad koostisosad eraldi kausis.',
      'Lisa banaanidele siirup, piim ja linaseemnesegu.',
      'Sega märjad ja kuivad koostisosad kokku.',
      'Vala tainas vormi ja küpseta 35-40 minutit.',
      'Lase 10 minutit jahtuda enne vormist eemaldamist.',
    ],
    notes: 'Kõige paremad on üliküpsed, pruunide täppidega banaanid.',
  },
  {
    id: 'kookose-datlipallid',
    title: 'Kookose-datlipallid',
    description: 'Lihtsad ja maitsvad magusad pallid datlitest ja kookosest. Vaid 4 koostisosa!',
    prepTime: '15 min',
    yield: '15 palli',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
    category: 'snack',
    dietaryTags: ['gluten-free', 'raw', 'no-oil', 'soy-free', 'high-protein'],
    ingredients: [
      {
        items: [
          '200g medjool datleid (kivita)',
          '100g mandleid',
          '50g kookoshelbeid + lisaks katteks',
          '2 spl kakaopulbrit (valikuline)',
        ],
      },
    ],
    instructions: [
      'Pane mandlid ja kookoshelbed köögikombaini. Hakki peeneks.',
      'Lisa datlid ja kakaopulber. Blenderda, kuni mass kleepub kokku.',
      'Vormista väikesteks pallideks.',
      'Veera pallid läbi kookosehelveste.',
      'Jahuta külmkapis vähemalt 30 minutit.',
    ],
    notes: 'Kui datlid on kuivad, leota neid enne 15 minutit soojas vees.',
  },
];

export const getFeaturedRecipes = (): Recipe[] => {
  return recipes.filter((recipe) => recipe.featured);
};

export const getRecipesByCategory = (category: Recipe['category']): Recipe[] => {
  return recipes.filter((recipe) => recipe.category === category);
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find((recipe) => recipe.id === id);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.description.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some((group) =>
        group.items.some((item) => item.toLowerCase().includes(lowerQuery))
      )
  );
};

export const filterRecipes = (
  category?: Recipe['category'],
  dietaryTags?: Recipe['dietaryTags'][number][],
  searchQuery?: string
): Recipe[] => {
  let filtered = [...recipes];

  if (category) {
    filtered = filtered.filter((recipe) => recipe.category === category);
  }

  if (dietaryTags && dietaryTags.length > 0) {
    filtered = filtered.filter((recipe) =>
      dietaryTags.every((tag) => recipe.dietaryTags.includes(tag))
    );
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        recipe.description.toLowerCase().includes(lowerQuery)
    );
  }

  return filtered;
};
