import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage, registerFont } from 'canvas';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timeframe, confidence } = req.body;
    
    // 创建画布
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // 设置背景
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#10B981');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 添加纹理
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 100 + 50;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 添加标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('我的求职倒计时！', width / 2, 150);
    
    // 添加时间框
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(width / 2 - 400, 200, 800, 150);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(width / 2 - 400, 200, 800, 150);
    
    // 添加时间文本
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 70px sans-serif';
    ctx.fillText(timeframe, width / 2, 290);
    
    // 添加幽默文案
    const funnyTexts = [
      `${confidence}%的概率，我即将脱离无业游民行列！`,
      '正在为简历镀金，老板快来挖我！',
      '求职路上，我比GPS还靠谱！',
      '简历已经饥渴难耐，等待HR的垂青！',
      '离告别泡面的日子不远了！'
    ];
    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(randomText, width / 2, 400);
    
    // 添加底部提示
    ctx.font = '30px sans-serif';
    ctx.fillText('AI预测仅供参考，但我的实力不需要AI证明！', width / 2, 500);
    
    // 生成二维码
    const qrCodeDataURL = await QRCode.toDataURL('https://your-website.com/games/job-finder', {
      margin: 1,
      width: 150,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // 加载二维码
    const qrCodeImage = await loadImage(qrCodeDataURL);
    ctx.drawImage(qrCodeImage, width - 180, height - 180, 150, 150);
    
    // 添加二维码提示
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'right';
    ctx.fillText('扫码测试你的求职时间', width - 30, height - 190);
    
    // 转换为Buffer
    const buffer = canvas.toBuffer('image/png');
    
    // 设置响应头
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating share image:', error);
    res.status(500).json({ error: '生成分享图片时出错' });
  }
} 