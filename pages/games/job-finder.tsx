import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import JobPredictionForm from '../../components/JobPredictionForm';
import JobPredictionResult from '../../components/JobPredictionResult';

type FormData = {
  name: string;
  age: string;
  education: string;
  experience: string;
  skills: string;
  targetPosition: string;
  location: string;
  resumeText: string;
};

type JobPrediction = {
  timeframe: string;
  confidence: number;
  reasons: string[];
  tips: string[];
};

export default function JobFinder() {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<JobPrediction | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      // In a real application, this would be an API call to your backend
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate a random prediction (in a real app, this would come from the API)
      const randomDays = Math.floor(Math.random() * 90) + 30; // 30-120 days
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() + randomDays);
      
      const mockPrediction: JobPrediction = {
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
      
      setPrediction(mockPrediction);
      setStep('result');
    } catch (error) {
      console.error('Error generating prediction:', error);
      alert('生成预测时出错，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
  };

  return (
    <Layout 
      title="你还有多久能找到工作？ | AI 游戏集合"
      description="AI预测你找到工作的时间，并提供加速求职的建议。"
      showBackButton={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-container"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
            你还有多久能找到工作？
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            输入你的基本信息或简历，AI将预测你找到工作的具体时间，并提供加速求职的建议。
          </p>
        </div>
        
        {step === 'input' && (
          <JobPredictionForm onSubmit={handleSubmit} loading={loading} />
        )}
        
        {step === 'result' && prediction && (
          <JobPredictionResult prediction={prediction} onReset={handleReset} />
        )}
      </motion.div>
    </Layout>
  );
} 