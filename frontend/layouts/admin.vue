<template>
  <div class="min-h-screen bg-background">
    <header class="bg-card border-b border-border sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <NuxtLink to="/admin/dashboard" class="text-xl font-bold text-gradient">
              凯普软件 · 管理后台
            </NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-text-secondary hover:text-white transition-colors">
              返回首页
            </NuxtLink>
            <UserAvatar :user="auth.user.value" size="small" />
          </div>
        </div>
      </div>
    </header>
    <div class="flex">
      <aside class="w-64 bg-card border-r border-border min-h-[calc(100vh-64px)]">
        <nav class="p-4 space-y-1">
          <NuxtLink
            v-for="item in adminNavItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-cardHover transition-all"
            active-class="!text-white !bg-primary/10"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, FileText, MessageSquare, Ticket, Users } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

const { auth } = useAuth()

const adminNavItems = [
  { label: '仪表盘', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: '文章管理', path: '/admin/blog', icon: FileText },
  { label: '论坛管理', path: '/admin/forum', icon: MessageSquare },
  { label: '工单管理', path: '/admin/tickets', icon: Ticket },
  { label: '用户管理', path: '/admin/users', icon: Users }
]
</script>
