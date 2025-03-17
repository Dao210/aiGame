import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ShareButton from './ShareButton';

type JobPrediction = {
  timeframe: string;
  confidence: number;
  reasons: string[];
  tips: string[];
};

type JobPredictionResultProps = {
  prediction: JobPrediction;
  onReset: () => void;
};

export default function JobPredictionResult({ prediction, onReset }: JobPredictionResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-1">预计找到工作的时间</h2>
        <div className="text-4xl font-bold text-primary my-4">
          {prediction.timeframe}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          预测准确度: {prediction.confidence}%
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">预测理由:</h3>
        <ul className="space-y-2">
          {prediction.reasons.map((reason, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">加速求职的建议:</h3>
        <ul className="space-y-3">
          {prediction.tips.map((tip, index) => (
            <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
              <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <ShareButton prediction={prediction} />
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="btn border border-gray-300 hover:bg-gray-50 flex-1"
        >
          重新分析
        </button>
        <Link href="/" passHref>
          <button className="btn btn-primary flex-1">
            返回游戏列表
          </button>
        </Link>
      </div>
    </motion.div>
  );
} 