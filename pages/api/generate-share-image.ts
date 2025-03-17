import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe');
    const confidence = searchParams.get('confidence');

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
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #4F46E5, #10B981)',
            padding: '40px',
          }}
        >
          {/* 标题 */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            我的求职倒计时！
          </div>

          {/* 时间框 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px 40px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '70px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {timeframe}
            </div>
          </div>

          {/* 幽默文案 */}
          <div
            style={{
              fontSize: '40px',
              color: 'white',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            {randomText}
          </div>

          {/* 底部提示 */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              position: 'absolute',
              bottom: '80px',
            }}
          >
            AI预测仅供参考，但我的实力不需要AI证明！
          </div>

          {/* 网站信息 */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.6)',
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            AI求职预测 · your-website.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 