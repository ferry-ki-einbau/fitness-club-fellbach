import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images');
const DL = '/Users/watchless/Downloads';

// ALL images with consistent quality enhancement
const IMAGES = [
  // Existing replacements (Ferry's new photos)
  { name: 'real-trainingsbereich', src: `${DL}/IMG_3049.JPG` },
  { name: 'real-cardio', src: `${DL}/IMG_3006.JPG` },
  { name: 'real-wellness-area', src: `${DL}/IMG_3055.JPG` },
  { name: 'real-kursraum-1', src: `${DL}/IMG_3031.JPG` },
  { name: 'real-geraete', src: `${DL}/IMG_3046.JPG` },
  { name: 'real-eingang', src: `${DL}/Vorher, während oder nachdem Training gönn Dir einen Kaffee, Proteinshake oder Mineralgetränk au.jpg` },
  { name: 'real-pool-area', src: `${DL}/IMG_3052.JPG` },   // Entspannungsraum (outdoor loungers)
  { name: 'real-spinning', src: `${DL}/IMG_3040.JPG` },
  { name: 'real-sauna', src: `${DL}/IMG_3056.JPG` },         // Gemischte Sauna (light wood, modern)
  { name: 'real-functional', src: `${DL}/IMG_3027.JPG` },
  { name: 'real-freihantel', src: `${DL}/IMG_3021.JPG` },    // Freihantel 1 (B&W murals, dark)
  { name: 'real-kraftbereich', src: `${DL}/IMG_3022.JPG` },
  { name: 'real-treadmill', src: `${DL}/IMG_3010.JPG` },
  { name: 'real-egym', src: `${DL}/IMG_3023.JPG` },

  // NEW: Second Freihantel area (panorama windows)
  { name: 'real-freihantel-2', src: `${DL}/IMG_3046.JPG` },

  // NEW: Damen-Umkleide Premium (dark Chesterfield lounge)
  { name: 'real-damen-umkleide', src: '/tmp/fsr1.jpg' },

  // NEW: Damen-Umkleide 2 (modern wood lockers, arch mirror)
  { name: 'real-damen-umkleide-2', src: '/tmp/fsr2.jpg' },

  // NEW: Damen-Sauna (red LED, warm wood)
  { name: 'real-damen-sauna', src: '/tmp/fsr3.jpg' },

  // Replace old ugly umkleide (yellow-green lockers) with Damen-Umkleide Premium
  { name: 'real-umkleide', src: '/tmp/fsr1.jpg' },
];

const SIZES = [
  { suffix: 'sm', width: 800, quality: 78 },
  { suffix: 'md', width: 1600, quality: 82 },
];

async function processImage({ name, src }) {
  for (const { suffix, width, quality } of SIZES) {
    const outPath = path.join(OUT, `${name}-${suffix}.webp`);
    try {
      const info = await sharp(src)
        .resize(width, null, { withoutEnlargement: true })
        // Quality enhancement: normalize + slight contrast/brightness boost
        .normalise({ lower: 1, upper: 99 })   // Histogram stretch (cut 1% darkest/brightest)
        .modulate({
          brightness: 1.03,    // Slight brightness lift
          saturation: 1.08,    // Slightly more vivid colors
        })
        .linear(1.05, -8)     // Gentle contrast boost (multiply + offset)
        .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.3 })  // Subtle sharpening
        .webp({ quality, effort: 6, smartSubsample: true })
        .toFile(outPath);
      const kb = Math.round(info.size / 1024);
      console.log(`  ${name}-${suffix}.webp  ${info.width}x${info.height}  ${kb}KB`);
    } catch (e) {
      console.error(`  ${name}-${suffix}: ${e.message}`);
    }
  }
}

console.log(`Processing ${IMAGES.length} images with quality enhancement -> ${OUT}\n`);

// Process in batches of 4
for (let i = 0; i < IMAGES.length; i += 4) {
  const batch = IMAGES.slice(i, i + 4);
  await Promise.all(batch.map(processImage));
}

console.log('\nDone! All images processed with consistent quality.');
