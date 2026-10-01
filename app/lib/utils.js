// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
  const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
  const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
  
  export const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const year = new Date().getFullYear();

/**
 * Calculates the shipping cost for a cart based on the shipping types of its items.
 * Fine art is always free (e.g. local pickup / special delivery).
 * Priority order: fine art > books > print domestic > stickers > default.
 * All amounts are in cents.
 */
export function calculateShipping(items) {
  try {
    if (!items || items.length === 0) return 0;

    const hasFineArt  = items.some((item) => item.shipping === 'fine art');
    const hasBooks    = items.some((item) => item.shipping === 'books');
    const hasPrints   = items.some((item) => item.shipping === 'print domestic');
    const hasStickers = items.every((item) => item.shipping === 'stickers');

    if (hasFineArt)  return 0;
    if (hasBooks)    return 1000;
    if (hasPrints)   return 800;
    if (hasStickers) return 200;

    return 800; // default
  } catch (error) {
    console.error('Something went wrong calculating shipping. A default $8 charge was applied.');
    return 800;
  }
}