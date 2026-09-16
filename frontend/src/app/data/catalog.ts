export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductCategory {
  slug: string;
  seoPath: string;
  name: string;
  headline: string;
  summary: string;
  origin: string;
  varieties: string[];
  availability: string;
  packaging: string[];
  quality: string;
  shipment: string;
  compliance: string;
  images: ProductImage[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'millets',
    seoPath: 'millets-exporter-india',
    name: 'Millets',
    headline: 'Indian millets for food, feed and processing',
    summary: 'Foxtail, pearl, finger, little and other millet varieties sourced from established growing regions in India.',
    origin: 'Primarily sourced from millet-growing belts across India, with lot selection based on buyer specification.',
    varieties: ['Foxtail millet', 'Pearl millet (bajra)', 'Finger millet (ragi)', 'Little millet', 'Kodo millet'],
    availability: 'Seasonal harvests with carry-over stock depending on crop cycle and confirmed orders.',
    packaging: ['25 kg / 50 kg PP bags', 'Jute bags', 'Buyer-specified retail or bulk packing'],
    quality: 'Cleaned, graded and packed to the specification agreed at enquiry. Moisture, purity and foreign-matter limits can be aligned to the destination market.',
    shipment: 'Containerised sea freight from Indian ports, with documentation prepared to the agreed Incoterms.',
    compliance: 'Export documentation support. Applicable Indian registrations (such as FSSAI or APEDA-related paperwork) are shared only where they apply to the shipment.',
    images: [
      { src: '/products/millets.jpg', alt: 'Finger millet (ragi) crop in an Indian farm field' },
      { src: '/products/millets-2.jpg', alt: 'Millet field in Rajasthan' },
      { src: '/products/millets-3.jpg', alt: 'Pearl millet (bajra) crop in summer' },
    ],
  },
  {
    slug: 'spices',
    seoPath: 'spices-exporter-india',
    name: 'Spices',
    headline: 'Whole and ground Indian spices',
    summary: 'Turmeric, chilli, cumin, coriander and other spices selected for grade, colour and moisture as specified by the buyer.',
    origin: 'Sourced from recognised spice-growing regions in India according to the required variety and grade.',
    varieties: ['Turmeric', 'Chilli', 'Cumin', 'Coriander', 'Black pepper', 'Other spices on request'],
    availability: 'Most standard grades can be programmed against confirmed orders. Crop timing affects some items.',
    packaging: ['25 kg / 50 kg bags', 'Cartons', 'Vacuum or buyer-specified packing'],
    quality: 'Cleaning, grading and packing to agreed ASTA / ISO style parameters where requested. Lab testing can be arranged for named lots.',
    shipment: 'Dry container shipments from Indian ports, with phytosanitary and quality documents as required.',
    compliance: 'Label, packing and certificate needs are reviewed against the destination market at enquiry stage.',
    images: [
      { src: '/products/spices.jpg', alt: 'Fresh turmeric rhizomes harvested in Erode, India' },
      { src: '/products/spices-2.jpg', alt: 'Red chillies drying in the sun' },
      { src: '/products/spices-3.jpg', alt: 'Cut turmeric rhizomes showing orange flesh' },
    ],
  },
  {
    slug: 'fruits',
    seoPath: 'fruits-exporter-india',
    name: 'Fruits',
    headline: 'Fresh Indian fruits for import programmes',
    summary: 'Pomegranate, banana and other fruits packed for export, subject to season, farm allocation and destination protocol.',
    origin: 'Fruit is sourced from farms and packhouses that can meet the agreed packing and residue requirements.',
    varieties: ['Pomegranate', 'Banana', 'Other fruits on request'],
    availability: 'Strictly seasonal. Shipment windows are confirmed after the buyer’s destination and grade are known.',
    packaging: ['Corrugated cartons', 'Retail crates', 'Buyer-specified packing'],
    quality: 'Size, colour, Brix and packing style are agreed before loading. Cold-chain handling is used where the fruit requires it.',
    shipment: 'Reefer or ventilated containers from Indian ports, depending on the fruit and transit time.',
    compliance: 'Phytosanitary certificates and destination-specific treatments are arranged where required for the market.',
    images: [
      { src: '/products/fruits.jpg', alt: 'Indian pomegranates at a Kolkata market stall' },
      { src: '/products/fruits-2.jpg', alt: 'Pomegranates grown in Kallidaikurichi, Tamil Nadu' },
    ],
  },
  {
    slug: 'vegetables',
    seoPath: 'vegetables-exporter-india',
    name: 'Vegetables',
    headline: 'Fresh Indian vegetables for wholesale buyers',
    summary: 'Onions, potatoes and other vegetables packed for export when quality, season and logistics allow a reliable programme.',
    origin: 'Sourced from producing regions able to meet size, packing and residue requirements for the named market.',
    varieties: ['Onion', 'Potato', 'Other vegetables on request'],
    availability: 'Seasonal, with lead times confirmed after grade and destination are specified.',
    packaging: ['Mesh bags', 'Jute bags', 'Cartons', 'Buyer-specified packing'],
    quality: 'Sorting and packing to the size and defect limits agreed on the purchase order.',
    shipment: 'Containerised sea freight, including reefer where the product and transit require temperature control.',
    compliance: 'Export packing and phytosanitary documents prepared for the destination authority.',
    images: [
      { src: '/products/vegetables.jpg', alt: 'Onion sacks at an Indian wholesale mandi' },
      { src: '/products/vegetables-2.jpg', alt: 'Onions stacked at Koyambedu market, Chennai' },
      { src: '/products/vegetables-3.jpg', alt: 'Onions on a trolley at an Indian market' },
    ],
  },
  {
    slug: 'pulses',
    seoPath: 'pulses-exporter-india',
    name: 'Pulses',
    headline: 'Indian pulses and lentils for food trade',
    summary: 'Toor, moong, urad, chickpeas and other pulses cleaned and packed to the grade requested by the importer.',
    origin: 'Drawn from pulse-growing regions in India, with lots selected against the buyer’s quality sheet.',
    varieties: ['Toor / pigeon pea', 'Moong', 'Urad', 'Chickpea / chana', 'Other pulses on request'],
    availability: 'Programmed against crop availability and confirmed contracts.',
    packaging: ['25 kg / 50 kg bags', 'Bulk bags', 'Buyer-specified packing'],
    quality: 'Cleaning, grading and admixture limits as agreed. Moisture and count specifications can be stated on the contract.',
    shipment: 'Dry containers from Indian ports with standard agricultural export documents.',
    compliance: 'Quality certificates and packing lists issued as required for the shipment.',
    images: [
      { src: '/products/pulses.jpg', alt: 'Pigeon pea (toor) pods on a farm in Raichur, Karnataka' },
      { src: '/products/pulses-2.jpg', alt: 'Indian moong (mung beans)' },
    ],
  },
];

export const RESERVED_SEO_PATHS = [
  'about-us',
  'products',
  'quality-and-packaging',
  'export-markets',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions',
] as const;

export function categoryBySeoPath(
  path: string,
  catalog: ProductCategory[] = PRODUCT_CATEGORIES,
): ProductCategory | undefined {
  return catalog.find((item) => item.seoPath === path);
}

export const REGIONS = ['Middle East', 'Asia', 'Africa', 'Europe'] as const;

export const TRUST_POINTS = [
  {
    kicker: 'Supplier Network',
    title: '50+',
    body: 'Verified farms & processors',
  },
  {
    kicker: 'Industry Experience',
    title: '2+ yrs',
    body: 'Indian agri export industry',
  },
  {
    kicker: 'Destination Markets',
    title: '23+',
    body: 'GCC · Europe · Americas · APAC · Africa',
  },
  {
    kicker: 'Product Breadth',
    title: '120+',
    body: 'Fruits, vegetables, processed foods, millets, snacks & more',
  },
] as const;

export const PROCESS_STEPS = [
  {
    stage: '01',
    title: 'Requirement',
    body: 'Product, grade, volume, packing and destination are captured from the buyer enquiry.',
  },
  {
    stage: '02',
    title: 'Sourcing',
    body: 'Supply is matched from farms and processors that can meet the stated specification.',
  },
  {
    stage: '03',
    title: 'Quality check',
    body: 'Lots are checked against the agreed parameters before packing is released.',
  },
  {
    stage: '04',
    title: 'Packaging & documentation',
    body: 'Goods are packed for export and the document pack is prepared for shipment.',
  },
  {
    stage: '05',
    title: 'Shipment',
    body: 'The consignment is loaded, tracked and delivered under the agreed Incoterms.',
  },
] as const;
