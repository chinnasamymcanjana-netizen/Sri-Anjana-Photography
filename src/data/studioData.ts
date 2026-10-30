export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Muhurtham & Traditional' | 'Candid Moments' | 'Pre-Wedding' | 'Engagement & Portraits';
  location: string;
  image: string;
  aspect: 'wide' | 'tall' | 'standard';
  exif: string;
  story: string;
  alt: string;
}

export interface ServiceOffering {
  id: string;
  index: string;
  title: string;
  status: 'Core Studio Specialization' | 'Suggested Service · Custom Enquiry';
  shortDescription: string;
  highlights: string[];
  image: string;
  alt: string;
  seoContext: string;
}

export interface ServiceAreaInfo {
  id: string;
  city: string;
  seoHeadline: string;
  tagline: string;
  description: string;
  signatureSettings: string[];
  bookingNote: string;
  coordinates: string;
}

export interface PackageTier {
  id: string;
  name: string;
  kicker: string;
  idealFor: string;
  description: string;
  includedFeatures: string[];
  customizableNote: string;
  featured?: boolean;
}

export const STUDIO_CONTACT = {
  businessName: 'Sri Anjana Photography',
  category: 'Wedding Photography & Videography',
  location: 'Theni, Tamil Nadu, India',
  phoneDisplay: '+91 95979 96616',
  phoneRaw: '+919597996616',
  whatsappNumber: '919597996616',
  whatsappBaseUrl: 'https://wa.me/919597996616',
  serviceAreas: ['Theni', 'Madurai', 'Coimbatore', 'Chennai'],
  googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Theni,+Tamil+Nadu,+India',
};

export const IMAGES = {
  heroCouple: '/src/assets/images/hero_tamil_wedding_couple_1793337730911.jpg',
  candidBride: '/src/assets/images/candid_bridal_laughter_1793337732598.jpg',
  traditionalMuhurtham: '/src/assets/images/traditional_muhurtham_ritual_1793337734258.jpg',
  preweddingHills: '/src/assets/images/prewedding_western_ghats_1793337735115.jpg',
  engagementRings: '/src/assets/images/engagement_ring_ceremony_1793337736473.jpg',
  maternityPortrait: '/src/assets/images/maternity_baby_portrait_1793337736926.jpg',
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'courtyard-vows-theni',
    title: 'Golden Hour in the Heritage Courtyard',
    subtitle: 'Traditional Kanchipuram Silk & Temple Architecture',
    category: 'Muhurtham & Traditional',
    location: 'Theni, Tamil Nadu',
    image: IMAGES.heroCouple,
    aspect: 'wide',
    exif: '50mm f/1.4 · ISO 160 · 1/800s',
    story:
      'Captured just moments after the sacred Muhurtham rituals, as warm morning light filtered through carved wooden pillars and fragrant malligai garlands.',
    alt: 'South Indian Tamil bride and groom in champagne gold Kanchipuram silk walking hand in hand in a heritage courtyard in Theni',
  },
  {
    id: 'bridal-laughter-madurai',
    title: 'Unscripted Bridal Joy',
    subtitle: 'Morning Preparations & Shared Laughter',
    category: 'Candid Moments',
    location: 'Madurai, Tamil Nadu',
    image: IMAGES.candidBride,
    aspect: 'standard',
    exif: '35mm f/1.8 · ISO 400 · 1/320s',
    story:
      'Before the ceremonial grandeur begins, the quiet room where sisters, mothers, and lifelong friends gather holds the purest candid laughter of the wedding day.',
    alt: 'Candid wedding photography in Madurai showing a radiant Tamil bride laughing naturally during morning bridal preparations',
  },
  {
    id: 'sacred-muhurtham-petal-shower',
    title: 'The Sacred Muhurtham Blessing',
    subtitle: 'Thaali Tying & Akshata Petal Shower',
    category: 'Muhurtham & Traditional',
    location: 'Theni, Tamil Nadu',
    image: IMAGES.traditionalMuhurtham,
    aspect: 'standard',
    exif: '85mm f/1.4 · ISO 640 · 1/500s',
    story:
      'Framed between glowing brass kuthuvilakku oil lamps, families bless the couple with a shower of fresh rose petals at the auspicious Muhurtham hour.',
    alt: 'Traditional Tamil Hindu wedding Muhurtham ritual with flower petal shower and brass lamps captured by wedding photographer in Theni',
  },
  {
    id: 'engagement-uruli-coimbatore',
    title: 'Promises Over Jasmine & Gold',
    subtitle: 'Intimate Ring Ceremony & Mehendi Details',
    category: 'Engagement & Portraits',
    location: 'Coimbatore, Tamil Nadu',
    image: IMAGES.engagementRings,
    aspect: 'tall',
    exif: '50mm f/1.8 · ISO 500 · 1/250s',
    story:
      'Delicate mehendi-adorned hands exchanging heirloom gold rings above a brass uruli brimming with fresh jasmine, lotus blooms, and floating diyas.',
    alt: 'Close-up engagement photography in Coimbatore featuring henna-adorned hands exchanging gold rings over a floral brass uruli',
  },
  {
    id: 'western-ghats-dawn-prewedding',
    title: 'Mist Over the Western Ghats',
    subtitle: 'Sunrise Pre-Wedding Portrait Session',
    category: 'Pre-Wedding',
    location: 'Theni Hills & Meghamalai Foothills',
    image: IMAGES.preweddingHills,
    aspect: 'wide',
    exif: '24mm f/2.0 · ISO 100 · 1/1000s',
    story:
      'Surrounded by the rolling emerald tea slopes and golden morning mist near Theni, a quiet walk at dawn creates timeless editorial frames prior to the wedding festivities.',
    alt: 'Cinematic pre-wedding couple shoot in the misty green hills near Theni, Tamil Nadu at sunrise',
  },
  {
    id: 'veranda-heirloom-chennai',
    title: 'Sunlit Veranda Serenade',
    subtitle: 'Fine-Art Couple & Family Portraiture',
    category: 'Engagement & Portraits',
    location: 'Chennai, Tamil Nadu',
    image: IMAGES.maternityPortrait,
    aspect: 'standard',
    exif: '50mm f/1.4 · ISO 200 · 1/640s',
    story:
      'Soft diffused morning sunlight on terracotta tiles and handwoven ivory silk—celebrating new chapters, growing families, and quiet togetherness.',
    alt: 'Fine-art couple and family portrait in a sunlit heritage veranda in Chennai, Tamil Nadu',
  },
];

export const SERVICES_LIST: ServiceOffering[] = [
  {
    id: 'wedding-photography',
    index: '01',
    title: 'Wedding Photography',
    status: 'Core Studio Specialization',
    shortDescription:
      'Complete multi-event wedding coverage blending editorial portraiture with documentary storytelling, from bridal preparations to reception celebrations.',
    highlights: [
      'Full Muhurtham, Reception & pre-wedding ritual documentation',
      'Editorial couple portraits crafted in natural and ambient lighting',
      'Color-graded high-resolution digital gallery & heirloom album options',
    ],
    image: IMAGES.heroCouple,
    alt: 'Luxury wedding photography in Theni and Tamil Nadu by Sri Anjana Photography',
    seoContext: 'Theni · Madurai · Coimbatore · Chennai',
  },
  {
    id: 'candid-photography',
    index: '02',
    title: 'Candid Photography',
    status: 'Core Studio Specialization',
    shortDescription:
      'Unobtrusive, emotion-first photography capturing spontaneous laughter, happy tears, stolen glances, and genuine family interactions without forced posing.',
    highlights: [
      'Discreet storytelling approach that lets you stay present in the moment',
      'Focus on real emotions between couples, parents, and close friends',
      'Natural color science preserving true skin tones and rich silk hues',
    ],
    image: IMAGES.candidBride,
    alt: 'Candid wedding photography in Tamil Nadu capturing joyful bride',
    seoContext: 'Candid Wedding Photography in Tamil Nadu',
  },
  {
    id: 'traditional-photography',
    index: '03',
    title: 'Traditional Photography',
    status: 'Core Studio Specialization',
    shortDescription:
      'Respectful, comprehensive documentation of every sacred Vedic ritual, family blessing, and stage portrait so every honoured guest and custom is preserved.',
    highlights: [
      'Thorough coverage of Panda Kaal, Vratham, Muhurtham & Nalangu rituals',
      'Well-lit, organized family and guest group portraits',
      'Seamless coordination alongside candid and cinema teams',
    ],
    image: IMAGES.traditionalMuhurtham,
    alt: 'Traditional Tamil wedding photography covering sacred Muhurtham rituals',
    seoContext: 'Cultural & Ritual Documentation',
  },
  {
    id: 'cinematic-wedding-films',
    index: '04',
    title: 'Cinematic Wedding Films',
    status: 'Core Studio Specialization',
    shortDescription:
      'Emotionally resonant wedding films crafted with intentional camera movement, ambient vows and music, and timeless color grading.',
    highlights: [
      'Curated highlight film & full-length documentary ceremony edit',
      'Multi-camera angles during key Muhurtham and reception moments',
      'Clean audio capture of ambient music, blessings, and celebrations',
    ],
    image: IMAGES.preweddingHills,
    alt: 'Cinematic wedding videography and films in Theni and Madurai',
    seoContext: '4K Wedding Videography & Storytelling',
  },
  {
    id: 'pre-wedding-shoots',
    index: '05',
    title: 'Pre-Wedding Shoots',
    status: 'Suggested Service · Custom Enquiry',
    shortDescription:
      'Relaxed outdoor or heritage portrait sessions designed to celebrate your chemistry before the wedding day in scenic landscapes across Tamil Nadu.',
    highlights: [
      'Location planning across Theni hills, Madurai heritage sites, or coastal Chennai',
      'Styling and wardrobe palette guidance for timeless visuals',
      'Available as a standalone session or bundled with wedding coverage',
    ],
    image: IMAGES.preweddingHills,
    alt: 'Pre-wedding couple photoshoot in the misty hills of Theni',
    seoContext: 'Suggested Offering · Available on Request',
  },
  {
    id: 'engagement-photography',
    index: '06',
    title: 'Engagement Photography',
    status: 'Suggested Service · Custom Enquiry',
    shortDescription:
      'Intimate coverage of your Nichayathartham or ring exchange ceremony, focusing on family warmth, floral decor details, and couple portraits.',
    highlights: [
      'Ceremonial ring exchange and lagna pathirikai documentation',
      'Editorial couple portraits before or after the formal ceremony',
      'Tailored half-day or full-day coverage options',
    ],
    image: IMAGES.engagementRings,
    alt: 'South Indian engagement ring ceremony photography',
    seoContext: 'Suggested Offering · Available on Request',
  },
  {
    id: 'maternity-photography',
    index: '07',
    title: 'Maternity Photography',
    status: 'Suggested Service · Custom Enquiry',
    shortDescription:
      'Graceful, heartfelt maternity and Valaikappu celebrations documented with soft lighting and an emphasis on family warmth and anticipation.',
    highlights: [
      'Traditional Valaikappu ceremony coverage or intimate couple portraits',
      'Comfort-first pacing tailored to expecting mothers and families',
      'Custom enquiry for home, venue, or outdoor heritage sessions',
    ],
    image: IMAGES.maternityPortrait,
    alt: 'Maternity and Valaikappu portrait photography in Tamil Nadu',
    seoContext: 'Suggested Offering · Available on Request',
  },
  {
    id: 'baby-photography',
    index: '08',
    title: 'Baby & Milestone Photography',
    status: 'Suggested Service · Custom Enquiry',
    shortDescription:
      'Natural, gentle portraits of naming ceremonies, first birthdays, and early childhood milestones that families treasure across generations.',
    highlights: [
      'Child-friendly, patient approach using natural and soft ambient light',
      'Coverage for cradle ceremonies, ear-piercing rituals & first birthdays',
      'Custom enquiry for family sessions in Theni and surrounding districts',
    ],
    image: IMAGES.maternityPortrait,
    alt: 'Baby and family milestone portrait photography in Theni',
    seoContext: 'Suggested Offering · Available on Request',
  },
];

export const SERVICE_AREAS: ServiceAreaInfo[] = [
  {
    id: 'theni',
    city: 'Theni',
    seoHeadline: 'Wedding Photographer in Theni',
    tagline: 'Our Home Studio & Heart of the Western Ghats Foothills',
    description:
      'Based right in Theni, Sri Anjana Photography understands the warmth, traditions, and scenic beauty of our hometown. From grand marriage halls in Theni Allinagaram, Periyakulam, Bodinayakanur, and Cumbum to misty outdoor pre-wedding portraits along the Meghamalai and Kurangani foothills, we provide prompt, personal, and deeply attentive wedding coverage.',
    signatureSettings: [
      'Traditional Kalyana Mandapams & Temple Weddings across Theni District',
      'Golden-hour outdoor couple portraits near Meghamalai, Vaigai Dam & Cumbum Valley',
      'In-person consultation and album planning directly in Theni',
    ],
    bookingNote: 'Zero outstation travel surcharge for ceremonies within Theni town limits.',
    coordinates: '10.0104° N · 77.4768° E',
  },
  {
    id: 'madurai',
    city: 'Madurai',
    seoHeadline: 'Wedding Photography in Madurai',
    tagline: 'Heritage Grandeur & Soulful Celebrations in the Temple City',
    description:
      'Just a short drive from our Theni base, Madurai weddings hold a special place in our craft. Whether you are celebrating an intimate temple-inspired Muhurtham, a grand reception on Bypass Road or Mattuthavani, or a heritage Chettinad-style ceremony, our team brings refined candid wedding photography in Madurai that honours every sacred custom.',
    signatureSettings: [
      'Luxury marriage halls, heritage courtyards & banquet venues across Madurai',
      'Multi-day Tamil Hindu, Christian & Muslim wedding documentation',
      'Seamless early-morning arrival for auspicious Muhurtham timings',
    ],
    bookingNote: 'Frequent coverage corridor from Theni with streamlined team logistics.',
    coordinates: '9.9252° N · 78.1198° E',
  },
  {
    id: 'coimbatore',
    city: 'Coimbatore',
    seoHeadline: 'Wedding Photographer in Coimbatore',
    tagline: 'Contemporary Luxury & Kongu Wedding Traditions',
    description:
      'For couples planning sophisticated celebrations in Coimbatore, Pollachi, or the Nilgiri foothills, we blend modern editorial aesthetics with deep respect for Kongu Nadu and South Indian wedding customs. From sprawling resort lawns on Avinashi Road to serene coconut-grove estates in Pollachi, we craft visual stories with poise and elegance.',
    signatureSettings: [
      'Boutique resort weddings, convention centres & Pollachi heritage estates',
      'Editorial candid photography & 4K cinematic wedding films',
      'Pre-wedding portrait sessions across Western Ghats vistas',
    ],
    bookingNote: 'Dedicated outstation crew scheduling for multi-day Coimbatore events.',
    coordinates: '11.0168° N · 76.9558° E',
  },
  {
    id: 'chennai',
    city: 'Chennai',
    seoHeadline: 'Wedding Photography in Chennai',
    tagline: 'Coastal Resort Celebrations & Classic Madras Sabhas',
    description:
      'From timeless early-morning Muhurthams in Mylapore and T. Nagar marriage halls to breezy sunset receptions along the East Coast Road (ECR), Sri Anjana Photography travels to Chennai to document destination and traditional family weddings with an understated, fine-art editorial eye.',
    signatureSettings: [
      'ECR beach resorts, luxury star hotels & classic Chennai Kalyana Mandapams',
      'Fine-art bridal portraits, candid storytelling & synchronous cinema teams',
      'Pre-event virtual consultations & tailored itinerary planning',
    ],
    bookingNote: 'Advance booking recommended for peak Chennai Muhurtham seasons.',
    coordinates: '13.0827° N · 80.2707° E',
  },
];

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential Collection',
    kicker: 'Intimate Ceremonies & Single-Day Celebrations',
    idealFor: 'Ideal for Muhurtham-only weddings, engagements, or intimate family celebrations',
    description:
      'Thoughtfully structured coverage for couples seeking authentic traditional documentation paired with natural candid portraits for a focused single-event celebration.',
    includedFeatures: [
      'Dedicated Traditional Photography & Videography coverage',
      'Focused Candid Portrait session for the couple & immediate family',
      'High-resolution color-corrected digital photo collection',
      'Edited ceremony documentary video delivery',
      'Custom print album & framing options available on request',
    ],
    customizableNote: 'Tailored to your exact ceremony hours and guest scale.',
  },
  {
    id: 'signature',
    name: 'Signature Collection',
    kicker: 'Our Most Requested Full-Wedding Experience',
    idealFor: 'Ideal for two-day South Indian weddings (Reception + Muhurtham)',
    description:
      'A harmonious balance of candid storytelling, cinematic filmmaking, and comprehensive traditional coverage—crafted so not a single ritual or unscripted emotion is missed.',
    includedFeatures: [
      'Candid Wedding Photography + Traditional Photography team',
      'Cinematic Wedding Film (Highlight Teaser + Full Traditional Video)',
      'Dedicated bridal & groom portrait sessions across Reception & Muhurtham',
      'Curated high-resolution digital gallery with signature editorial color grading',
      'Bespoke handcrafted luxury wedding album consultation',
    ],
    customizableNote: 'Customizable crew size and additional ritual sessions.',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium Heirloom Collection',
    kicker: 'Multi-Day Celebrations & Destination Coverage',
    idealFor: 'Ideal for grand multi-day weddings across Theni, Madurai, Coimbatore, or Chennai',
    description:
      'Our most comprehensive visual storytelling commission, encompassing pre-wedding portraiture, multi-angle candid and cinema teams, and museum-grade heirloom albums.',
    includedFeatures: [
      'Extended Candid & Editorial Photography team across all wedding events',
      'Multi-camera 4K Cinematic Film team for immersive storytelling',
      'Complimentary Pre-Wedding or Post-Wedding Outdoor Couple Session planning',
      'Same-day or next-day preview frames for family sharing',
      'Heirloom bride & groom parent album suite options',
    ],
    customizableNote: 'Bespoke itinerary crafted around your family’s complete celebration schedule.',
  },
];

export const WHY_CHOOSE_PILLARS = [
  {
    number: '01',
    title: 'Authentic Emotional Storytelling',
    description:
      'We look beyond staged poses to notice the quiet, irreplaceable moments—a parent’s tearful blessing during Kanyadaan, spontaneous laughter between cousins, and the calm joy shared between bride and groom.',
  },
  {
    number: '02',
    title: 'Refined Editorial & Cultural Detail',
    description:
      'South Indian weddings are rich with texture—Kanchipuram silk weaves, temple gold jewellery, fragrant malligai, and sacred brass lamps. We compose and light every frame to honour both heritage and artistry.',
  },
  {
    number: '03',
    title: 'Calm, Respectful Presence',
    description:
      'Weddings move quickly and involve elders, priests, and extended family. Our team works with warmth, patience, and quiet professionalism so your rituals unfold naturally without disruption.',
  },
  {
    number: '04',
    title: 'Tailored Around Your Family',
    description:
      'Every celebration has its own rhythm. From intimate ceremonies in Theni to multi-day weddings in Madurai, Coimbatore, and Chennai, we listen closely to your priorities and customize every deliverable.',
  },
];
