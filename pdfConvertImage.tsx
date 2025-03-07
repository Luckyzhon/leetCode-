// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef } from 'react';
import * as echarts from 'echarts';

interface FileInfo {
  name: string;
  size: number;
}

interface ConversionSettings {
  format: string;
  quality: number;
  width: number;
  height: number;
  keepRatio: boolean;
}

const App: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [settings, setSettings] = useState<ConversionSettings>({
    format: 'jpg',
    quality: 80,
    width: 0,
    height: 0,
    keepRatio: true,
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFileInfo({
        name: file.name,
        size: file.size
      });
      setShowError(false);
    } else {
      setShowError(true);
      setErrorMessage('请上传 PDF 文件');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileInfo({
        name: file.name,
        size: file.size
      });
      setShowError(false);
    } else {
      setShowError(true);
      setErrorMessage('请上传 PDF 文件');
    }
  };

  const handleConvert = () => {
    setIsConverting(true);
    setProgress(0);

    // 模拟转换过程
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          
          // 模拟生成预览图
          const mockImages = [
            'https://public.readdy.ai/ai/img_res/ae88f2dee6143dfe1caecc80bf8ffeb0.jpg',
            'https://public.readdy.ai/ai/img_res/eec4db07e1faab51767776aca6b605a7.jpg',
            'https://public.readdy.ai/ai/img_res/10dbaa689b9c7b11959eb42298295f70.jpg',
          ];
          setPreviewImages(mockImages);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setFileInfo(null);
    setProgress(0);
    setIsConverting(false);
    setShowSuccess(false);
    setPreviewImages([]);
    setSettings({
      format: 'jpg',
      quality: 80,
      width: 0,
      height: 0,
      keepRatio: true,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">PDF 转图片工具</h1>

        {/* 上传区域 */}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />
          <i className="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
          <p className="text-lg text-gray-600 mb-2">点击或拖拽上传 PDF 文件</p>
          <p className="text-sm text-gray-500">支持格式：PDF（最大 50MB）</p>
          {fileInfo && (
            <div className="mt-4 text-left bg-gray-50 p-4 rounded">
              <p className="text-gray-700">
                <i className="fas fa-file-pdf text-red-500 mr-2"></i>
                {fileInfo.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                文件大小：{(fileInfo.size / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          )}
        </div>

        {/* 转换设置 */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">输出格式</label>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  value={settings.format}
                  onChange={(e) => setSettings({...settings, format: e.target.value})}
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                图片质量：{settings.quality}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings({...settings, quality: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">输出尺寸</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="宽度"
                  value={settings.width || ''}
                  onChange={(e) => setSettings({...settings, width: parseInt(e.target.value)})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="高度"
                  value={settings.height || ''}
                  onChange={(e) => setSettings({...settings, height: parseInt(e.target.value)})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.keepRatio}
                    onChange={(e) => setSettings({...settings, keepRatio: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">保持原始比例</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 进度条 */}
        {isConverting && (
          <div className="mt-8">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    处理中
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* 预览区域 */}
        {previewImages.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">预览</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    第 {index + 1} 页
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleConvert}
            disabled={!fileInfo || isConverting}
            className={`px-6 py-2 text-white !rounded-button whitespace-nowrap ${
              !fileInfo || isConverting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <i className="fas fa-sync-alt mr-2"></i>
            开始转换
          </button>
          
          {previewImages.length > 0 && (
            <button className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 !rounded-button whitespace-nowrap">
              <i className="fas fa-download mr-2"></i>
              下载全部
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-600 text-white hover:bg-gray-700 !rounded-button whitespace-nowrap"
          >
            <i className="fas fa-redo mr-2"></i>
            重置
          </button>
        </div>

        {/* 提示信息 */}
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <p className="text-green-700 text-center">
              <i className="fas fa-check-circle mr-2"></i>
              转换成功！
            </p>
          </div>
        )}

        {showError && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg">
            <p className="text-red-700 text-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

