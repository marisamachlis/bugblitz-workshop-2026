import { CATEGORY_IMAGES, PRODUCT_IMAGES } from './product-images';

const NUMERIC_KEYS = ['price', 'compare_at_price', 'rating', 'total'];

function resolveImageForRow(row: any): string | undefined {
  const slug = row.slug;
  if (typeof slug !== 'string') return undefined;
  return (
    (PRODUCT_IMAGES as Record<string, string>)[slug] ??
    (CATEGORY_IMAGES as Record<string, string>)[slug]
  );
}

export function coerceNumericFields<T>(rows: any[] | null): T[] {
  if (!rows) return [];
  return rows.map((row: any) => {
    const out = { ...row };
    for (const key of NUMERIC_KEYS) {
      if (key in out && out[key] != null) {
        out[key] = Number(out[key]);
      }
    }
    const resolved = resolveImageForRow(out);
    if (resolved !== undefined) {
      out.image_url = resolved;
    }
    return out;
  });
}
