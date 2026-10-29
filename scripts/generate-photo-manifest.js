import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
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

  const seenHashes = new Set();
  const manifest = [];

  for (const file of imageFiles) {
    const filePath = path.join(photosDir, file);
    try {
      const buffer = fs.readFileSync(filePath);
      const hash = crypto.createHash('md5').update(buffer).digest('hex');

      // Skip exact duplicate photos
      if (seenHashes.has(hash)) {
        continue;
      }
      seenHashes.add(hash);

      const baseName = file.replace(/\.[^/.]+$/, '');
      const defaultCaption = KNOWN_CAPTIONS[file] || (file.startsWith('DSC') ? '' : baseName.replace(/[-_]/g, ' '));

      manifest.push({
        filename: file,
        url: `/photos/${encodeURIComponent(file)}`,
        caption: defaultCaption
      });
    } catch (err) {
      console.error(`[photo-manifest] Error processing ${file}:`, err);
    }
  }

  const newContent = JSON.stringify(manifest, null, 2);
  const existingContent = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : '';

  if (existingContent !== newContent) {
    fs.writeFileSync(outputFile, newContent, 'utf8');
    console.log(`[photo-manifest] Generated ${manifest.length} unique photo entries in src/photoManifest.json`);
  }

  return manifest;
}

// Run immediately if executed directly via CLI
if (process.argv[1] === __filename) {
  generatePhotoManifest();
}
