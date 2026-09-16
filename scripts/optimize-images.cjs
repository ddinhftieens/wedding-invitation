/**
 * optimize-images.cjs — Tạo WebP + Thumbnails từ ảnh gốc
 *
 * Quy tắc:
 *   - Ảnh gốc (1.jpg, 2.jpg... bg.jpg) KHÔNG bị chỉnh sửa
 *   - Chỉ tạo thêm các file phái sinh:
 *       public/image/N.webp              ← full WebP (max 1600px)
 *       public/image/thumbnails/N.jpg    ← thumbnail JPG  (max 500px)
 *       public/image/thumbnails/N.webp   ← thumbnail WebP (max 500px)
 *   - Bỏ qua file đã tồn tại (dùng --force để tạo lại)
 *
 * Cách dùng:
 *   node scripts/optimize-images.cjs           ← chỉ xử lý ảnh chưa có output
 *   node scripts/optimize-images.cjs --force   ← tạo lại tất cả
 *
 * Tương thích Node.js 14/16/18+ (CommonJS)
 */
'use strict';

const path = require('path');
const fs   = require('fs');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('Loi: Khong tim thay sharp. Chay: npm install');
  process.exit(1);
}

const FORCE   = process.argv.includes('--force');
const imgDir  = path.resolve(__dirname, '../public/image');
const thumbDir = path.join(imgDir, 'thumbnails');

if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir, { recursive: true });
}

// Chỉ xử lý ảnh gốc: tên số (1.jpg...) hoặc bg.jpg/bg.png
const imageFiles = fs.readdirSync(imgDir)
  .filter(f => /^(\d+|bg)\.(jpe?g|png)$/i.test(f))
  .sort((a, b) => {
    const na = parseInt(a) || 0;
    const nb = parseInt(b) || 0;
    return na - nb;
  });

console.log('\n=== Tao WebP + Thumbnails (anh goc giu nguyen) ===');
console.log('So anh goc tim thay: ' + imageFiles.length);
if (FORCE) console.log('>> Che do FORCE: tao lai tat ca file\n');
else console.log('>> Bo qua file da ton tai. Dung --force de tao lai.\n');

async function processAll() {
  let processed = 0;
  let skipped   = 0;
  let webpTotal = 0;
  let thumbTotal = 0;

  for (const file of imageFiles) {
    const srcPath     = path.join(imgDir,   file);
    const baseName    = path.parse(file).name;
    const fullWebp    = path.join(imgDir,   `${baseName}.webp`);
    const thumbJpg    = path.join(thumbDir, `${baseName}.jpg`);
    const thumbWebp   = path.join(thumbDir, `${baseName}.webp`);

    // Kiểm tra xem tất cả output đã tồn tại chưa
    const allExist = fs.existsSync(fullWebp)
                  && fs.existsSync(thumbJpg)
                  && fs.existsSync(thumbWebp);

    if (allExist && !FORCE) {
      skipped++;
      console.log('  -- ' + file.padEnd(10) + ' (bo qua, da co output)');
      continue;
    }

    const origKB = Math.round(fs.statSync(srcPath).size / 1024);

    // Full size WebP (max 1600px, q85) — lightbox view, quality đủ tốt để zoom
    await sharp(srcPath)
      .resize(1600, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 85, effort: 5 })
      .toFile(fullWebp);

    // Thumbnail JPG (max 500px, q78) — fallback cho browser cũ
    await sharp(srcPath)
      .resize(500, null, { withoutEnlargement: true, fit: 'inside' })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(thumbJpg);

    // Thumbnail WebP (max 500px, q75) — grid gallery
    await sharp(srcPath)
      .resize(500, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 75, effort: 4 })
      .toFile(thumbWebp);

    const fWebpKB = Math.round(fs.statSync(fullWebp).size  / 1024);
    const tJpgKB  = Math.round(fs.statSync(thumbJpg).size  / 1024);
    const tWebpKB = Math.round(fs.statSync(thumbWebp).size / 1024);

    webpTotal  += fs.statSync(fullWebp).size;
    thumbTotal += fs.statSync(thumbJpg).size + fs.statSync(thumbWebp).size;
    processed++;

    console.log(
      '  OK ' + file.padEnd(10) +
      ' ' + String(origKB).padStart(5) + 'KB (goc, giu nguyen)  ->  ' +
      'WebP ' + String(fWebpKB).padStart(4) + 'KB | ' +
      'Thumb JPG ' + String(tJpgKB).padStart(3) + 'KB / WebP ' + String(tWebpKB).padStart(3) + 'KB'
    );
  }

  console.log('\n=============================================');
  if (processed > 0) {
    console.log('Hoan thanh! Da tao output cho ' + processed + ' anh.');
    console.log('  Full WebP (public/image/*.webp):          ' + (webpTotal  / 1024).toFixed(0) + ' KB');
    console.log('  Thumbnails (public/image/thumbnails/*):   ' + (thumbTotal / 1024).toFixed(0) + ' KB');
  }
  if (skipped > 0) {
    console.log('Bo qua: ' + skipped + ' anh (da co output san).');
  }
  console.log('Anh goc *.jpg KHONG bi chinh sua.');
  console.log('=============================================\n');
}

processAll().catch(err => {
  console.error('Loi:', err.message);
  process.exit(1);
});
