import { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { timeframe, confidence } = req.query;

    const funnyTexts = [
      `${confidence}%的概率，我即将脱离无业游民行列！`,
      '正在为简历镀金，老板快来挖我！',
      '求职路上，我比GPS还靠谱！',
      '简历已经饥渴难耐，等待HR的垂青！',
      '离告别泡面的日子不远了！'
    ];
    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4F46E5',
            padding: '40px',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '60px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '40px',
                  textAlign: 'center',
                },
                children: '我的求职倒计时！',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '20px 40px',
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  marginBottom: '40px',
                },
                children: {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '70px',
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                    },
                    children: timeframe,
                  },
                },
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '40px',
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: '30px',
                },
                children: randomText,
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '24px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: '80px',
                },
                children: 'AI预测仅供参考，但我的实力不需要AI证明！',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '20px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                },
                children: 'AI求职预测 · your-website.com',
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'NotoSansSC',
            data: await fetch(
              'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'
            ).then((res) => res.arrayBuffer()),
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );

    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
} 