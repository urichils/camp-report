import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const photosDir = path.join(rootDir, 'public', 'photos');
const outputFile = path.join(rootDir, 'src', 'photoManifest.json');

// Optional friendly captions for specific filenames
const KNOWN_CAPTIONS = {
  'bg.JPG': 'Camp at Wayanad',
  'd1.1.JPG': 'Anchoring',
  'd1.2.JPG': 'An unexpected pair of guests',
  'd1.3.JPG': 'Group dance',
  'd1.4.JPG': 'Guitar performance',
  'd1.5.JPG': 'Another group dance',
  'd2.1.JPG': 'Camp arrival',
  'd2.2.JPG': 'Campsite setup'
};

export function generatePhotoManifest() {
  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
  }

  const entries = fs.readdirSync(photosDir);
  const imageFiles = entries.filter((file) => /\.(jpe?g|png|webp|gif|svg)$/i.test(file));

  // Sort logically (putting themed day highlights first, then DSC sequence)
  imageFiles.sort((a, b) => {
    const isNamedA = a.startsWith('d') || a.startsWith('bg');
    const isNamedB = b.startsWith('d') || b.startsWith('bg');
    if (isNamedA && !isNamedB) return -1;
    if (!isNamedA && isNamedB) return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  const manifest = imageFiles.map((file) => {
    const baseName = file.replace(/\.[^/.]+$/, '');
    const defaultCaption = KNOWN_CAPTIONS[file] || (file.startsWith('DSC') ? '' : baseName.replace(/[-_]/g, ' '));
    return {
      filename: file,
      url: `/photos/${encodeURIComponent(file)}`,
      caption: defaultCaption
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`[photo-manifest] Generated ${manifest.length} photo entries in src/photoManifest.json`);
  return manifest;
}

// Run immediately if executed directly via CLI
if (process.argv[1] === __filename) {
  generatePhotoManifest();
}
