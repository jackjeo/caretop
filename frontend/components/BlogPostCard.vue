<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="glass-card overflow-hidden group hover:border-primary/50 transition-all duration-300"
  >
    <div
      v-if="post.coverImage"
      class="aspect-video bg-cover bg-center"
      :style="{ backgroundImage: `url(${post.coverImage})` }"
    />
    <div v-else class="aspect-video bg-gradient-to-br from-primary/20 to-card flex items-center justify-center">
      <FileText class="w-12 h-12 text-text-muted" />
    </div>

    <div class="p-5">
      <div class="flex items-center gap-2 mb-3">
        <span
          class="px-2 py-1 text-xs font-medium rounded-lg"
          :class="categoryClass"
        >
          {{ post.category }}
        </span>
        <span class="text-text-muted text-sm">
          {{ formatDate(post.createdAt) }}
        </span>
      </div>

      <h3 class="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">
        {{ post.title }}
      </h3>

      <p class="text-text-secondary text-sm mt-2 line-clamp-2">
        {{ post.excerpt }}
      </p>

      <div class="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div class="flex items-center gap-2">
          <UserAvatar :user="post.author" size="small" />
          <span class="text-text-secondary text-sm">{{ post.author.username }}</span>
        </div>
        <div class="flex items-center gap-4 text-text-muted text-sm">
          <span class="flex items-center gap-1">
            <Eye class="w-4 h-4" />
            {{ post.views }}
          </span>
          <span class="flex items-center gap-1">
            <Heart class="w-4 h-4" />
            {{ post.likes }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { FileText, Eye, Heart } from 'lucide-vue-next'
import type { BlogPost } from '~/composables/useBlog'

const props = defineProps<{
  post: BlogPost
}>()

const categoryClass = computed(() => {
  const classes: Record<string, string> = {
    '技术文章': 'bg-blue-500/20 text-blue-400',
    '产品动态': 'bg-green-500/20 text-green-400',
    '行业洞察': 'bg-cyan-500/20 text-cyan-300'
  }
  return classes[props.post.category] || 'bg-gray-500/20 text-gray-400'
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
