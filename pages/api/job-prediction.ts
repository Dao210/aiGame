import type { NextApiRequest, NextApiResponse } from 'next';

type JobPrediction = {
  timeframe: string;
  confidence: number;
  reasons: string[];
  tips: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobPrediction | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, age, education, experience, skills, targetPosition, location, resumeText } = req.body;

    // In a real application, this would use AI to analyze the input data
    // For demo purposes, we'll generate a random prediction
    const randomDays = Math.floor(Math.random() * 90) + 30; // 30-120 days
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + randomDays);
    
    const prediction: JobPrediction = {
      timeframe: `${randomDate.toLocaleDateString('zh-CN')} (约${randomDays}天)`,
      confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
      reasons: [
        '你的技能组合与当前市场需求匹配度高',
        '你所在地区的就业市场正在复苏',
        '你的目标职位在近期有较多招聘需求',
      ],
      tips: [
        '每天花至少1小时在求职网站上投递简历',
        '参加行业相关的线上或线下交流活动',
        '优化你的LinkedIn个人资料，增加被猎头发现的机会',
        '学习一项与目标职位相关的新技能',
      ],
    };
    
    // Add a small delay to simulate processing time
    setTimeout(() => {
      res.status(200).json(prediction);
    }, 1000);
  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ error: '生成预测时出错，请稍后再试' });
  }
} 