import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') || '90天';
    const confidence = searchParams.get('confidence') || '80';

    const funnyTexts = [
      `${confidence}%的概率，我即将脱离无业游民行列！`,
      '正在为简历镀金，老板快来挖我！',
      '求职路上，我比GPS还靠谱！',
      '简历已经饥渴难耐，等待HR的垂青！',
      '离告别泡面的日子不远了！'
    ];
    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #4F46E5, #10B981)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              我的求职倒计时！
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px 40px',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: 70,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {timeframe}
              </div>
            </div>

            <div
              style={{
                fontSize: 40,
                color: 'white',
                textAlign: 'center',
                maxWidth: 800,
              }}
            >
              {randomText}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
              }}
            >
              AI预测仅供参考，但我的实力不需要AI证明！
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              AI求职预测 · aijob.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // 使用内置字体，避免外部字体加载问题
        emoji: 'twemoji',
      },
    );
  } catch (e: any) {
    console.error(`Failed to generate image: ${e.message}`);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
} 