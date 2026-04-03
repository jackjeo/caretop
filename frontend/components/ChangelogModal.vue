<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
      <div class="relative bg-card border border-border rounded-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <h2 class="text-lg font-bold text-white">更新日志</h2>
          <button @click="close" class="text-text-muted hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="overflow-y-auto p-4 space-y-4">
          <div v-for="item in changelog" :key="item.version" class="border border-border rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-primary font-bold">v{{ item.version }}</span>
              <span class="text-text-muted text-sm">{{ item.date }}</span>
            </div>
            <ul class="space-y-1 text-sm text-text-secondary">
              <li v-for="(change, idx) in item.changes" :key="idx" class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span>{{ change }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const close = () => emit('close')

const changelog = [
  {
    version: '1.0.4',
    date: '2026-04-03',
    changes: [
      '修复API响应格式问题 - useAuth所有函数正确解析 {code, message, data} 格式',
      'login, fetchUser, register, updateProfile 全部修复',
      '前端已测试: 登录返回token，/auth/me正确返回用户信息'
    ]
  },
  {
    version: '1.0.2',
    date: '2026-04-02',
    changes: [
      '修复更新日志弹窗点击无响应的问题',
      '修复useAuth初始化逻辑 - 移除SSR时的auto-init避免401错误',
      '添加登录页面登录后的页面跳转'
    ]
  },
  {
    version: '1.0.1',
    date: '2026-04-02',
    changes: [
      '修复登录页面 - 使用email而非username',
      '修复AppHeader添加initAuth调用',
      '修复API代理路径配置',
      '修复注册后登录状态不恢复的问题',
      '登录凭证类型修正'
    ]
  },
  {
    version: '1.0.0',
    date: '2026-04-02',
    changes: [
      '官网正式上线',
      '用户注册和登录功能',
      '产品展示页面',
      '博客系统',
      '论坛系统',
      '工单系统'
    ]
  }
]
</script>
