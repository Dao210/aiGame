import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ShareButtonProps = {
  prediction: {
    timeframe: string;
    confidence: number;
  };
};

export default function ShareButton({ prediction }: ShareButtonProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}` 
    : 'https://aijob.com';
  
  const shareUrl = `${baseUrl}/games/job-finder`;
  
  const ogImageUrl = `${baseUrl}/api/generate-share-image?` + 
    `timeframe=${encodeURIComponent(prediction.timeframe)}` +
    `&confidence=${encodeURIComponent(prediction.confidence)}`;

  const shareTexts = [
    `【震惊】AI预测我将在${prediction.timeframe}找到工作！准确率高达${prediction.confidence}%！`,
    `重磅消息：我的失业生涯即将在${prediction.timeframe}结束！据AI分析，这波稳了！`,
    `AI算命：${prediction.timeframe}后，我将正式加入打工人行列！准确率${prediction.confidence}%！`,
    `求职倒计时：距离我告别泡面生活还有${prediction.timeframe}！HR们准备好offer了吗？`,
    `AI预言：${prediction.timeframe}后，我将成为一名光荣的社畜！朋友们，请为我的自由默哀！`
  ];
  
  const randomShareText = shareTexts[Math.floor(Math.random() * shareTexts.length)];
  const fullShareText = `${randomShareText}\n\n来测测你的求职时间：${shareUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText);
      alert('分享文案已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const saveImage = () => {
    window.open(ogImageUrl, '_blank');
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn bg-accent text-white hover:bg-accent/90 w-full flex items-center justify-center mt-8"
        onClick={() => setShowShareModal(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        分享预测结果
      </motion.button>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full relative"
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold mb-4">分享预测结果</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{fullShareText}</p>
              </div>

              <div className="aspect-[1200/630] w-full bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={ogImageUrl} 
                  alt="分享图片" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-share-image.png';
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-green-500 text-white hover:bg-green-600"
                  onClick={() => {
                    alert('请长按图片保存后分享到朋友圈');
                    saveImage();
                  }}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .186-.059l2.114-1.225a.644.644 0 0 1 .5-.047 9.608 9.608 0 0 0 2.825.425c.197 0 .39-.012.584-.024-.171-.482-.267-.989-.267-1.514 0-3.77 3.63-6.827 8.102-6.827.203 0 .401.012.597.03C16.746 4.69 13.055 2.188 8.691 2.188zm-1.8 3.764c.591 0 1.066.476 1.066 1.066 0 .588-.475 1.064-1.066 1.064-.59 0-1.066-.476-1.066-1.064 0-.59.475-1.066 1.066-1.066zm5.064 0c.59 0 1.066.476 1.066 1.066 0 .588-.475 1.064-1.066 1.064-.59 0-1.066-.476-1.066-1.064 0-.59.476-1.066 1.066-1.066z"/>
                  </svg>
                  分享到微信
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-blue-500 text-white hover:bg-blue-600"
                  onClick={copyToClipboard}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  复制文案
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 