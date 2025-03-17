import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

// 生成 favicon 的函数
function generateFavicon() {
  // 创建一个 32x32 的画布（标准 favicon 尺寸）
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  // 设置渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 32, 32);
  gradient.addColorStop(0, '#4F46E5');  // 主色调
  gradient.addColorStop(1, '#10B981');  // 辅助色调
  
  // 绘制圆形背景
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();

  // 绘制 "AI" 文字
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AI', 16, 16);

  // 将画布内容保存为 PNG
  const buffer = canvas.toBuffer('image/png');
  
  // 保存到 public 目录
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buffer);
}

// 生成 favicon
generateFavicon(); 