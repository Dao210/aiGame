import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

async function generateIcons() {
  const sizes = [16, 32, 48, 64, 128, 192, 512];
  const publicDir = path.join(process.cwd(), 'public');

  // 确保 public 目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#10B981');

    // 绘制圆形背景
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();

    // 绘制 "AI" 文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', size/2, size/2);

    // 保存不同尺寸的图标
    const buffer = canvas.toBuffer('image/png');
    
    if (size === 16) {
      fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buffer);
    } else if (size === 32) {
      fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buffer);
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buffer);
    } else if (size === 192) {
      fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), buffer);
    } else if (size === 512) {
      fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), buffer);
    }
  }

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 