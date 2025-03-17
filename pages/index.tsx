import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const games = [
  {
    id: 'job-finder',
    title: '你还有多久能找到工作？',
    description: '输入你的基本信息或简历，AI将预测你找到工作的具体时间，并提供加速求职的建议。',
    color: 'bg-primary',
    icon: '💼',
  },
  {
    id: 'coming-soon-1',
    title: '即将推出',
    description: '更多有趣的AI小游戏即将上线，敬请期待！',
    color: 'bg-secondary',
    icon: '🎮',
  },
  {
    id: 'coming-soon-2',
    title: '即将推出',
    description: '更多有趣的AI小游戏即将上线，敬请期待！',
    color: 'bg-accent',
    icon: '🎲',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            AI 游戏集合
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            探索由人工智能驱动的有趣小游戏，获得独特的互动体验和有趣的洞察。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={item}>
              <Link href={`/games/${game.id}`} passHref>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className={`${game.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
                    {game.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} AI 游戏集合 | 由人工智能驱动</p>
      </footer>
    </div>
  );
} 