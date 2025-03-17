import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL('../../public/fonts/NotoSansSC-Bold.otf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await font;
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
            fontFamily: '"Noto Sans SC"',
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
            {/* 标题 */}
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

            {/* 时间框 */}
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

            {/* 幽默文案 */}
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

          {/* 底部信息 */}
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
        fonts: [
          {
            name: 'Noto Sans SC',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 