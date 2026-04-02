<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-8">仪表盘</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Users class="w-6 h-6 text-primary" />
          </div>
          <span class="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp class="w-4 h-4" />
            +12%
          </span>
        </div>
        <div class="text-3xl font-bold text-white mb-1">{{ stats.users }}</div>
        <div class="text-text-muted text-sm">总用户数</div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <FileText class="w-6 h-6 text-green-400" />
          </div>
          <span class="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp class="w-4 h-4" />
            +8%
          </span>
        </div>
        <div class="text-3xl font-bold text-white mb-1">{{ stats.articles }}</div>
        <div class="text-text-muted text-sm">文章数</div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <MessageCircle class="w-6 h-6 text-yellow-400" />
          </div>
          <span class="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp class="w-4 h-4" />
            +15%
          </span>
        </div>
        <div class="text-3xl font-bold text-white mb-1">{{ stats.threads }}</div>
        <div class="text-text-muted text-sm">帖子数</div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Ticket class="w-6 h-6 text-purple-400" />
          </div>
          <span class="text-yellow-400 text-sm flex items-center gap-1">
            <Minus class="w-4 h-4" />
            0%
          </span>
        </div>
        <div class="text-3xl font-bold text-white mb-1">{{ stats.tickets }}</div>
        <div class="text-text-muted text-sm">待处理工单</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="glass-card p-6">
        <h3 class="text-lg font-bold text-white mb-4">最近活动</h3>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start gap-3"
          >
            <div class="w-8 h-8 rounded-full bg-cardHover flex items-center justify-center shrink-0">
              <component :is="activity.icon" class="w-4 h-4 text-text-muted" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-text-secondary text-sm">{{ activity.description }}</p>
              <p class="text-text-muted text-xs mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card p-6">
        <h3 class="text-lg font-bold text-white mb-4">快速操作</h3>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink
            to="/admin/blog?action=create"
            class="flex items-center gap-3 p-4 bg-cardHover rounded-xl hover:bg-card transition-colors"
          >
            <Plus class="w-5 h-5 text-primary" />
            <span class="text-white">创建文章</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/forum?action=manage"
            class="flex items-center gap-3 p-4 bg-cardHover rounded-xl hover:bg-card transition-colors"
          >
            <Settings class="w-5 h-5 text-yellow-400" />
            <span class="text-white">管理论坛</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/tickets"
            class="flex items-center gap-3 p-4 bg-cardHover rounded-xl hover:bg-card transition-colors"
          >
            <Ticket class="w-5 h-5 text-purple-400" />
            <span class="text-white">处理工单</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/users"
            class="flex items-center gap-3 p-4 bg-cardHover rounded-xl hover:bg-card transition-colors"
          >
            <Users class="w-5 h-5 text-green-400" />
            <span class="text-white">用户管理</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users, FileText, MessageCircle, Ticket, TrendingUp, Minus, Plus, Settings } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: '管理后台 - 仪表盘'
})

const stats = ref({
  users: 12580,
  articles: 342,
  threads: 1589,
  tickets: 23
})

const recentActivities = ref([
  { id: 1, icon: Users, description: '新用户注册：张三', time: '5分钟前' },
  { id: 2, icon: FileText, description: '文章发布：《MindLink 3.0 使用指南》', time: '15分钟前' },
  { id: 3, icon: MessageCircle, description: '新帖子：在 MindLink 板块', time: '30分钟前' },
  { id: 4, icon: Ticket, description: '新工单：关于 Remote Desktop 连接问题', time: '1小时前' },
  { id: 5, icon: Settings, description: '系统更新完成', time: '2小时前' }
])
</script>
