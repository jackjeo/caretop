<template>
  <NuxtLink
    :to="`/forum/${thread.board.slug}/${thread.id}`"
    class="block glass-card p-4 hover:border-primary/50 transition-all duration-300 group"
  >
    <div class="flex items-start gap-4">
      <UserAvatar :user="thread.author" size="medium" />

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-text-primary font-medium group-hover:text-primary transition-colors line-clamp-1">
            <span v-if="thread.isPinned" class="text-yellow-400 mr-1">📌</span>
            <span v-if="thread.isEssence" class="text-amber-400 mr-1">✨</span>
            {{ thread.title }}
          </h3>
        </div>

        <div class="flex items-center gap-3 mt-2 text-sm text-text-secondary flex-wrap">
          <span>{{ thread.author.username }}</span>
          <span class="text-text-muted">·</span>
          <span>{{ formatDate(thread.createdAt) }}</span>
          <span class="text-text-muted">·</span>
          <span class="flex items-center gap-1">
            <MessageCircle class="w-4 h-4" />
            {{ thread.replies }}
          </span>
          <span class="flex items-center gap-1">
            <Eye class="w-4 h-4" />
            {{ thread.views }}
          </span>
        </div>
      </div>

      <div v-if="thread.lastReply" class="hidden sm:block text-right">
        <div class="text-text-muted text-xs">最后回复</div>
        <div class="text-text-secondary text-sm">{{ thread.lastReply.author }}</div>
        <div class="text-text-muted text-xs">{{ formatDate(thread.lastReply.createdAt) }}</div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MessageCircle, Eye } from 'lucide-vue-next'
import type { ForumThread } from '~/composables/useForum'

const props = defineProps<{
  thread: ForumThread
}>()

const formatDate = (date: string) => {
  const now = new Date()
  const d = new Date(date)
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}
</script>
