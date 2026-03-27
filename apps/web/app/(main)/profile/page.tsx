'use client';

import { useState } from 'react';
import { Camera, Mail, Shield, Edit2, Check, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nickname: '用户',
    email: 'user@example.com',
    bio: '这个人很懒，什么都没写~',
    avatar: '',
  });

  const handleSave = () => {
    // TODO: 调用 API 保存
    setIsEditing(false);
    alert('个人信息已保存（演示）');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">个人信息</h1>
        <p className="text-gray-600 mt-1">管理你的个人资料和账户信息</p>
      </div>

      {/* 头像卡片 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-700">
                {profile.nickname.charAt(0).toUpperCase()}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.nickname}</h2>
            <p className="text-gray-600 mt-1">{profile.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                免费版
              </span>
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                已验证
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 个人信息表单 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">基本信息</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              编辑
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* 昵称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              昵称
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
              />
            ) : (
              <p className="text-gray-900">{profile.nickname}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                />
              ) : (
                <p className="text-gray-900">{profile.email}</p>
              )}
            </div>
          </div>

          {/* 个人简介 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              个人简介
            </label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 resize-none"
                placeholder="介绍一下自己..."
              />
            ) : (
              <p className="text-gray-900">{profile.bio}</p>
            )}
          </div>

          {/* 编辑操作按钮 */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                保存
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                取消
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 账户安全 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">账户安全</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900">密码</p>
              <p className="text-xs text-gray-500 mt-1">定期修改密码可以提高账户安全性</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              修改密码
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900">两步验证</p>
              <p className="text-xs text-gray-500 mt-1">使用身份验证器应用增强账户安全</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
              启用
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">登录设备</p>
              <p className="text-xs text-gray-500 mt-1">管理已登录的设备</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              查看
            </button>
          </div>
        </div>
      </div>

      {/* 使用统计 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">使用统计</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600 mt-1">已生成脚本</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600 mt-1">已保存人设</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-600 mt-1">今日剩余次数</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600 mt-1">收藏模板</p>
          </div>
        </div>
      </div>
    </div>
  );
}
