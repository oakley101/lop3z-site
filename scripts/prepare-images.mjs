// One-off asset pipeline. Run with `npm run assets` after swapping source photos.
//
// - Reads the ORIGINAL photos from public/images/lop3z-website-kit/ (never modified).
// - Writes cleaned copies to src/assets/images/ so Astro's <Image> can optimize them
//   (AVIF/WebP + responsive widths). Some originals are phone screenshots with UI
//   borders; those get cropped here.
// - Generates favicons + the Open Graph share image from cover-omds.jpg into public/.
import sharp from 'sharp';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SRC_DIR = existsSync('public/images/lop3z-website-kit/hero.jpg')
  ? 'public/images/lop3z-website-kit'
  : 'public/images';
const OUT_DIR = 'src/assets/images';

// Crop boxes as fractions of the source (left, top, right, bottom) so they survive
// minor re-exports of the same screenshot. null = use the file as-is.
const CROPS = {
  'hero.jpg': null,
  'band.jpg': null,
  'cover-omds.jpg': null,
  // Screenshot: grey "Files" app frame around the photo.
  'about-portrait.jpg': [42 / 968, 78 / 1280, 928 / 968, 1188 / 1280],
  // Screenshot: dark border + bottom bar.
  'cover-polo.jpg': [26 / 1120, 46 / 1280, 1096 / 1120, 1156 / 1280],
  // Screenshot: dark bars top and bottom.
  'cover-mata.jpg': [0, 54 / 1280, 1, 1222 / 1280],
  // Instagram screenshot: square crop that drops the mute icon (bottom-right).
  'cover-payme.jpg': [0, 50 / 1249, 1160 / 1209, 1210 / 1249],
};

await mkdir(OUT_DIR, { recursive: true });

for (const [file, crop] of Object.entries(CROPS)) {
  const src = `${SRC_DIR}/${file}`;
  const dest = `${OUT_DIR}/${file}`;
  if (!crop) {
    await copyFile(src, dest);
  } else {
    const { width, height } = await sharp(src).metadata();
    const [l, t, r, b] = crop;
    const region = {
      left: Math.round(l * width),
      top: Math.round(t * height),
      width: Math.round((r - l) * width),
      height: Math.round((b - t) * height),
    };
    await sharp(src).extract(region).jpeg({ quality: 92, mozjpeg: true }).toFile(dest);
  }
  const m = await sharp(dest).metadata();
  console.log(`✓ ${dest} (${m.width}×${m.height})`);
}

// ---------- Favicons (from cover-omds.jpg) ----------
// The "OMDs" wordmark sits in the upper-middle of the cover; crop that for small sizes
// so the icon stays legible, and use the full cover for larger touch icons.
const cover = `${OUT_DIR}/cover-omds.jpg`;
const { width: cw, height: ch } = await sharp(cover).metadata();
const wordmark = {
  left: Math.round(cw * 0.22),
  top: Math.round(ch * 0.2),
  width: Math.round(cw * 0.56),
  height: Math.round(cw * 0.56),
};

const png = (size, region) => {
  let img = sharp(cover);
  if (region) img = img.extract(region);
  return img.resize(size, size, { fit: 'cover' }).png().toBuffer();
};

const fav16 = await png(16, wordmark);
const fav32 = await png(32, wordmark);
const fav48 = await png(48, wordmark);
await writeFile('public/favicon-32.png', fav32);
await writeFile('public/apple-touch-icon.png', await png(180));
await writeFile('public/icon-192.png', await png(192));
await writeFile('public/icon-512.png', await png(512));

// Minimal ICO container holding PNG-encoded frames (supported by all modern browsers).
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  const dir = Buffer.alloc(16 * frames.length);
  let offset = 6 + dir.length;
  frames.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...frames.map((f) => f.data)]);
}
await writeFile(
  'public/favicon.ico',
  ico([
    { size: 16, data: fav16 },
    { size: 32, data: fav32 },
    { size: 48, data: fav48 },
  ]),
);
console.log('✓ favicons');

// ---------- Open Graph image 1200×630 ----------
// Blurred, darkened cover fills the frame; the sharp square cover sits on the right,
// with the name + single title on the left.
const W = 1200;
const H = 630;
const bg = await sharp(cover)
  .resize(W, H, { fit: 'cover' })
  .blur(40)
  .modulate({ brightness: 0.35, saturation: 1.2 })
  .toBuffer();
const art = await sharp(cover).resize(510, 510).toBuffer();
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#22e4ff"/>
      <stop offset="1" stop-color="#ffb627"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="#05060a" opacity="0.35"/>
  <rect x="628" y="58" width="514" height="514" fill="none" stroke="url(#g)" stroke-width="4"/>
  <text x="70" y="250" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="132" fill="url(#g)" letter-spacing="4">LOP3Z</text>
  <text x="74" y="310" font-family="Courier New, monospace" font-size="21" fill="#e8edf5" letter-spacing="2">SINGER // RAPPER // SONGWRITER</text>
  <text x="74" y="420" font-family="Arial, sans-serif" font-weight="700" font-size="40" fill="#ffffff">New single “OMDs”</text>
  <text x="74" y="468" font-family="Arial, sans-serif" font-size="28" fill="#c9d3e0">Out now on all platforms</text>
</svg>`);
await sharp(bg)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: art, left: 630, top: 60 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-image.jpg');
console.log('✓ public/og-image.jpg');
