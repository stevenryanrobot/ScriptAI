'use client';

import { useState } from 'react';
import { Save, Key, Bell, Palette, Globe, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    scriptReady: true,
    marketing: false,
  });

  const handleSave = () => {
    // TODO: 调用 API 保存设置
    alert('设置已保存（演示）');
  };

  const tabs = [
    { id: 'api', label: 'API 配置', icon: Key },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'appearance', label: '外观偏好', icon: Palette },
    { id: 'language', label: '语言区域', icon: Globe },
    { id: 'privacy', label: '隐私安全', icon: Shield },
    { id: 'subscription', label: '订阅管理', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-600 mt-1">管理你的账户配置和偏好</p>
      </div>

      {/* 选项卡导航 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 选项卡内容 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* API 配置 */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">火山引擎 ARK API</h2>
              <p className="text-sm text-gray-600 mb-4">
                配置 AI 脚本生成所需的 API 密钥。获取密钥请访问
                <a href="https://console.volcengine.com/ark" target="_blank" rel="noopener noreferrer" 
                   className="text-primary-600 hover:underline ml-1">火山引擎控制台</a>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-xxxxxxxxxxxxxxxx"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    {showApiKey ? '隐藏' : '显示'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  模型选择
                </label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500">
                  <option value="doubao-seed-2-0-mini-260215">Doubao Seed 2.0 Mini</option>
                  <option value="doubao-pro-4k">Doubao Pro 4K</option>
                  <option value="doubao-lite-4k">Doubao Lite 4K</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  保存配置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 通知设置 */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">通知偏好</h2>
              <p className="text-sm text-gray-600">选择你希望接收的通知类型</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: '邮件通知', desc: '接收脚本生成完成、账户相关的邮件' },
                { key: 'browser', label: '浏览器通知', desc: '在浏览器中显示实时通知' },
                { key: 'scriptReady', label: '脚本完成通知', desc: '当 AI 脚本生成完成时提醒' },
                { key: 'marketing', label: '营销信息', desc: '接收产品更新、优惠信息' },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 外观偏好 */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">外观设置</h2>
              <p className="text-sm text-gray-600">自定义界面显示方式</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主题模式</label>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 rounded-lg border-2 border-primary-600 bg-primary-50 text-center text-sm font-medium text-primary-700">
                    ☀️ 浅色
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-center text-sm font-medium text-gray-600 hover:bg-gray-50">
                    🌙 深色
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-center text-sm font-medium text-gray-600 hover:bg-gray-50">
                    ⚙️ 跟随系统
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 语言区域 */}
        {activeTab === 'language' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">语言和区域</h2>
              <p className="text-sm text-gray-600">选择你偏好的语言和时区</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500">
                  <option value="zh-CN">简体中文</option>
                  <option value="zh-TW">繁體中文</option>
                  <option value="en-US">English</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时区</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500">
                  <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
                  <option value="Asia/Tokyo">日本标准时间 (UTC+9)</option>
                  <option value="America/New_York">美国东部时间 (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 隐私安全 */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">隐私与安全</h2>
              <p className="text-sm text-gray-600">管理你的数据和安全设置</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-2">数据导出</h3>
                <p className="text-xs text-gray-600 mb-3">下载你所有的脚本数据和个人信息</p>
                <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-white">
                  导出数据
                </button>
              </div>

              <div className="p-4 rounded-lg bg-red-50">
                <h3 className="text-sm font-medium text-red-900 mb-2">删除账户</h3>
                <p className="text-xs text-red-700 mb-3">永久删除你的账户和所有数据，此操作不可恢复</p>
                <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700">
                  删除账户
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 订阅管理 */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">订阅计划</h2>
              <p className="text-sm text-gray-600">管理你的订阅和账单</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-primary-100 text-sm">当前计划</p>
                  <p className="text-2xl font-bold">免费版</p>
                </div>
                <div className="text-right">
                  <p className="text-primary-100 text-sm">剩余生成次数</p>
                  <p className="text-2xl font-bold">3/3</p>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-lg bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors">
                升级 Pro - ¥29/月
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Pro 计划权益</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  无限脚本生成
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  全部 8 种模板
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  导出为文本/图片
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  优先支持
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
