import React, { useState } from 'react';

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

type JobPredictionFormProps = {
  onSubmit: (data: FormData) => void;
  loading: boolean;
};

export default function JobPredictionForm({ onSubmit, loading }: JobPredictionFormProps) {
  const [inputType, setInputType] = useState<'basic' | 'resume'>('basic');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    education: '',
    experience: '',
    skills: '',
    targetPosition: '',
    location: '',
    resumeText: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex mb-6 border-b">
        <button
          type="button"
          className={`py-2 px-4 font-medium ${inputType === 'basic' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setInputType('basic')}
        >
          基本信息
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium ${inputType === 'resume' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setInputType('resume')}
        >
          简历分析
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {inputType === 'basic' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input"
                placeholder="请输入你的姓名"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="input"
                placeholder="请输入你的年龄"
              />
            </div>
            
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">最高学历</label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">请选择</option>
                <option value="高中">高中</option>
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">工作经验</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">请选择</option>
                <option value="应届毕业生">应届毕业生</option>
                <option value="1-3年">1-3年</option>
                <option value="3-5年">3-5年</option>
                <option value="5-10年">5-10年</option>
                <option value="10年以上">10年以上</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">技能特长</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="input"
                placeholder="例如：Python, 数据分析, 项目管理"
              />
            </div>
            
            <div>
              <label htmlFor="targetPosition" className="block text-sm font-medium text-gray-700 mb-1">目标职位</label>
              <input
                type="text"
                id="targetPosition"
                name="targetPosition"
                value={formData.targetPosition}
                onChange={handleInputChange}
                className="input"
                placeholder="例如：前端开发工程师"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">求职城市</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input"
                placeholder="例如：北京"
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="resumeText" className="block text-sm font-medium text-gray-700 mb-1">粘贴你的简历内容</label>
            <textarea
              id="resumeText"
              name="resumeText"
              value={formData.resumeText}
              onChange={handleInputChange}
              className="input h-64"
              placeholder="请粘贴你的简历内容，包括教育背景、工作经历、技能等..."
            />
          </div>
        )}
        
        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                分析中...
              </span>
            ) : '开始分析'}
          </button>
        </div>
      </form>
    </div>
  );
} 