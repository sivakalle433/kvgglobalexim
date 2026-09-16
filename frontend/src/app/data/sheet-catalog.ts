import { PRODUCT_CATEGORIES, ProductCategory, ProductImage, RESERVED_SEO_PATHS } from './catalog';

export function mapCatalogPayload(data: unknown): ProductCategory[] {
  const rows = extractRows(data);
  const usedSlugs = new Set<string>();
  const usedPaths = new Set<string>(RESERVED_SEO_PATHS);
  return rows
    .map((row) => mapProduct(row, usedSlugs, usedPaths))
    .filter((item): item is ProductCategory => item !== undefined);
}

function extractRows(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === 'object' && 'products' in data) {
    const products = (data as { products: unknown }).products;
    return Array.isArray(products) ? products : [];
  }
  return [];
}

function mapProduct(
  row: unknown,
  usedSlugs: Set<string>,
  usedPaths: Set<string>,
): ProductCategory | undefined {
  if (typeof row === 'string') {
    const name = row.trim();
    if (!name) {
      return undefined;
    }
    return fromFields({ name }, usedSlugs, usedPaths);
  }
  if (!row || typeof row !== 'object') {
    return undefined;
  }
  const rec = row as Record<string, unknown>;
  if (isInactive(str(rec, 'active', 'enabled', 'show'))) {
    return undefined;
  }
  return fromFields(rec, usedSlugs, usedPaths);
}

function fromFields(
  rec: Record<string, unknown>,
  usedSlugs: Set<string>,
  usedPaths: Set<string>,
): ProductCategory | undefined {
  const category = str(rec, 'category', 'categories', 'group');
  const variety = str(rec, 'variety', 'varieties', 'grade', 'grades');
  let name = str(rec, 'name', 'product', 'products', 'item', 'sku');
  if (!name) {
    if (category && variety) {
      name = `${category} — ${variety}`;
    } else {
      name = variety || category;
    }
  }
  if (!name || name.toLowerCase() === 'product' || name.toLowerCase() === 'name') {
    return undefined;
  }
  const slug = unique(slugify(str(rec, 'slug', 'id')) || slugify(name), usedSlugs);
  let seo = slugify(str(rec, 'seoPath', 'seopath', 'seo_path', 'url', 'page'));
  if (!seo) {
    seo = slug.endsWith('exporter-india') ? slug : `${slug}-exporter-india`;
  }
  const seoPath = unique(seo, usedPaths);
  const headline = str(rec, 'headline', 'title') || name;
  const summary = str(rec, 'summary', 'description', 'details');
  const images = collectImages(rec, name);
  return {
    slug,
    seoPath,
    name,
    headline,
    summary,
    origin: str(rec, 'origin', 'source'),
    varieties: list(rec, 'varieties', 'variety', 'grades', 'grade'),
    availability: str(rec, 'availability', 'season'),
    packaging: list(rec, 'packaging', 'packing'),
    quality: str(rec, 'quality', 'specification', 'specs'),
    shipment: str(rec, 'shipment', 'shipping'),
    compliance: str(rec, 'compliance', 'documents'),
    images: images.length > 0 ? images : fallbackImages(name),
  };
}

function collectImages(rec: Record<string, unknown>, name: string): ProductImage[] {
  const images: ProductImage[] = [];
  const seen = new Set<string>();
  const push = (srcRaw: string, altRaw: string) => {
    const src = normalizeImageUrl(srcRaw);
    if (!src || seen.has(src)) {
      return;
    }
    seen.add(src);
    images.push({ src, alt: altRaw.trim() || name });
  };
  const bundled = rec['images'] ?? rec['photos'];
  if (Array.isArray(bundled)) {
    bundled.forEach((item) => {
      if (item && typeof item === 'object') {
        const img = item as Record<string, unknown>;
        push(String(img['src'] ?? ''), String(img['alt'] ?? name));
      } else if (typeof item === 'string') {
        push(item, name);
      }
    });
  } else {
    list(rec, 'images', 'photos', 'image').forEach((src) => push(src, name));
  }
  for (let n = 1; n <= 6; n++) {
    push(str(rec, `image${n}`, `photo${n}`, `img${n}`), str(rec, `imageAlt${n}`, `imagealt${n}`, `alt${n}`));
  }
  return images;
}

function fallbackImages(name: string): ProductImage[] {
  const n = name.toLowerCase();
  const hit = PRODUCT_CATEGORIES.find(
    (item) =>
      n.includes(item.slug) ||
      n.includes(item.name.toLowerCase()) ||
      item.varieties.some((variety) => n.includes(variety.toLowerCase().split('(')[0].trim())),
  );
  if (hit) {
    return hit.images;
  }
  if (/millet|ragi|bajra|kodo|foxtail/.test(n)) {
    return PRODUCT_CATEGORIES.find((item) => item.slug === 'millets')?.images ?? [];
  }
  if (/spice|turmeric|chilli|chili|cumin|coriander|pepper/.test(n)) {
    return PRODUCT_CATEGORIES.find((item) => item.slug === 'spices')?.images ?? [];
  }
  if (/fruit|pomegranate|banana|mango/.test(n)) {
    return PRODUCT_CATEGORIES.find((item) => item.slug === 'fruits')?.images ?? [];
  }
  if (/vegetable|onion|potato/.test(n)) {
    return PRODUCT_CATEGORIES.find((item) => item.slug === 'vegetables')?.images ?? [];
  }
  if (/pulse|dal|toor|moong|urad|chana|chickpea|lentil/.test(n)) {
    return PRODUCT_CATEGORIES.find((item) => item.slug === 'pulses')?.images ?? [];
  }
  return PRODUCT_CATEGORIES[0]?.images ?? [];
}

export function normalizeImageUrl(raw: string): string {
  const value = raw.trim();
  if (!value) {
    return '';
  }
  const file = value.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
  if (file) {
    return `https://drive.google.com/uc?export=view&id=${file[1]}`;
  }
  const id = value.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (value.includes('drive.google.com') && id) {
    return `https://drive.google.com/uc?export=view&id=${id[1]}`;
  }
  return value;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function unique(base: string, used: Set<string>): string {
  const candidate = base || 'product';
  let slug = candidate;
  let n = 2;
  while (used.has(slug)) {
    slug = `${candidate}-${n}`;
    n += 1;
  }
  used.add(slug);
  return slug;
}

function isInactive(value: string): boolean {
  const v = value.trim().toLowerCase();
  return v === 'no' || v === 'n' || v === 'false' || v === '0' || v === 'hide' || v === 'inactive';
}

function str(rec: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const match = findKey(rec, key);
    if (match === undefined) {
      continue;
    }
    if (Array.isArray(match)) {
      return match.map((item) => String(item).trim()).filter(Boolean).join(', ');
    }
    const value = String(match).trim();
    if (value) {
      return value;
    }
  }
  return '';
}

function list(rec: Record<string, unknown>, ...keys: string[]): string[] {
  for (const key of keys) {
    const match = findKey(rec, key);
    if (match === undefined) {
      continue;
    }
    if (Array.isArray(match)) {
      return match.map((item) => String(item).trim()).filter(Boolean);
    }
    const parts = String(match)
      .split(/[,;|\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (parts.length) {
      return parts;
    }
  }
  return [];
}

function findKey(rec: Record<string, unknown>, key: string): unknown {
  if (key in rec) {
    return rec[key];
  }
  const want = key.replace(/[\s_-]/g, '').toLowerCase();
  for (const [name, value] of Object.entries(rec)) {
    if (name.replace(/[\s_-]/g, '').toLowerCase() === want) {
      return value;
    }
  }
  return undefined;
}
