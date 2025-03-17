import React, { ReactNode } from 'react';
import Link from 'next/link';
import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  showBackButton?: boolean;
};

export default function Layout({
  children,
  title = 'AI 游戏集合 | 多个有趣的小游戏',
  description = 'AI 驱动的多个有趣小游戏集合，包括职业预测、性格分析等多种互动体验。',
  imageUrl,
  url,
  showBackButton = false,
}: LayoutProps) {
  return (
    <>
      <Meta 
        title={title}
        description={description}
        imageUrl={imageUrl}
        url={url}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {showBackButton && (
            <Link href="/" passHref>
              <button className="mb-6 flex items-center text-primary hover:text-primary/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                返回游戏列表
              </button>
            </Link>
          )}
          
          <main>{children}</main>
        </div>
        
        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AI 游戏集合 | 由人工智能驱动</p>
          <p className="mt-1 text-xs">免责声明：本预测仅供娱乐，不构成任何专业建议。</p>
        </footer>
      </div>
    </>
  );
} 