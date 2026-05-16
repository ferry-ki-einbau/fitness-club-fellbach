import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images');
const DL = '/Users/watchless/Downloads';

// Mapping: output name → source file
const IMAGES = [
  // Replace existing (same filenames)
  { name: 'real-trainingsbereich', src: `${DL}/IMG_3049.JPG` },
  { name: 'real-cardio', src: `${DL}/IMG_3006.JPG` },
  { name: 'real-wellness-area', src: `${DL}/IMG_3055.JPG` },
  { name: 'real-kursraum-1', src: `${DL}/IMG_3031.JPG` },
  { name: 'real-geraete', src: `${DL}/IMG_3046.JPG` },
  { name: 'real-eingang', src: `${DL}/Vorher, während oder nachdem Training gönn Dir einen Kaffee, Proteinshake oder Mineralgetränk au.jpg` },
  { name: 'real-pool-area', src: `${DL}/IMG_3052.JPG` },

  // New images for expanded gallery
  { name: 'real-spinning', src: `${DL}/IMG_3040.JPG` },
  { name: 'real-sauna', src: `${DL}/IMG_3056.JPG` },
  { name: 'real-functional', src: `${DL}/IMG_3027.JPG` },
  { name: 'real-freihantel', src: `${DL}/IMG_3021.JPG` },
  { name: 'real-kraftbereich', src: `${DL}/IMG_3022.JPG` },
  { name: 'real-treadmill', src: `${DL}/IMG_3010.JPG` },
  { name: 'real-egym', src: `${DL}/IMG_3023.JPG` },
  { name: 'real-umkleide', src: `${DL}/IMG_3057.JPG` },
];

const SIZES = [
  { suffix: 'sm', width: 800, quality: 75 },
  { suffix: 'md', width: 1600, quality: 80 },
];

async function processImage({ name, src }) {
  for (const { suffix, width, quality } of SIZES) {
    const outPath = path.join(OUT, `${name}-${suffix}.webp`);
    try {
      const info = await sharp(src)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(outPath);
      const kb = Math.round(info.size / 1024);
      console.log(`✅ ${name}-${suffix}.webp  ${info.width}×${info.height}  ${kb}KB`);
    } catch (e) {
      console.error(`❌ ${name}-${suffix}: ${e.message}`);
    }
  }
}

console.log(`Processing ${IMAGES.length} images → ${OUT}\n`);

// Process all in parallel (batches of 4 to not overwhelm)
for (let i = 0; i < IMAGES.length; i += 4) {
  const batch = IMAGES.slice(i, i + 4);
  await Promise.all(batch.map(processImage));
}

console.log('\n🎉 Done! All images processed.');
