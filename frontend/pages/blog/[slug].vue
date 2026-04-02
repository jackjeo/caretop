<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="animate-pulse">
        <div class="h-8 bg-cardHover rounded w-1/4 mb-4" />
        <div class="h-12 bg-cardHover rounded w-3/4 mb-6" />
        <div class="h-64 bg-cardHover rounded mb-8" />
        <div class="space-y-4">
          <div class="h-4 bg-cardHover rounded" />
          <div class="h-4 bg-cardHover rounded" />
          <div class="h-4 bg-cardHover rounded w-2/3" />
        </div>
      </div>

      <template v-else-if="post">
        <article>
          <header class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <span
                class="px-3 py-1 text-sm font-medium rounded-lg"
                :class="categoryClass"
              >
                {{ post.category }}
              </span>
              <span class="text-text-muted text-sm">
                {{ formatDate(post.createdAt) }}
              </span>
            </div>

            <h1 class="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              {{ post.title }}
            </h1>

            <div class="flex items-center gap-4 pb-8 border-b border-border">
              <div class="flex items-center gap-3">
                <UserAvatar :user="post.author" size="medium" />
                <div>
                  <div class="text-white font-medium">{{ post.author.username }}</div>
                  <div class="text-text-muted text-sm">{{ post.views }} 阅读</div>
                </div>
              </div>
              <div class="ml-auto flex items-center gap-3">
                <LikeButton
                  :count="post.likes"
                  :is-liked="post.isLiked"
                  @like="handleLike"
                />
                <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cardHover text-text-secondary hover:text-primary transition-colors">
                  <Share2 class="w-4 h-4" />
                  分享
                </button>
              </div>
            </div>
          </header>

          <div
            v-if="post.coverImage"
            class="aspect-video rounded-2xl overflow-hidden mb-8"
          >
            <img
              :src="post.coverImage"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>

          <MarkdownRenderer :content="post.content" />

          <footer class="mt-12 pt-8 border-t border-border">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <span class="text-text-secondary">标签：</span>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 text-sm rounded-lg bg-cardHover text-text-secondary">
                    {{ post.category }}
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </article>

        <section class="mt-12">
          <h3 class="text-xl font-bold text-white mb-6">评论 ({{ comments.length }})</h3>

          <div class="space-y-4 mb-8">
            <ForumPost
              v-for="comment in comments"
              :key="comment.id"
              :reply="comment"
              :thread-id="post.id"
              :can-reply="isLoggedIn"
            />
          </div>

          <div v-if="isLoggedIn" class="glass-card p-6">
            <h4 class="text-lg font-medium text-white mb-4">发表评论</h4>
            <textarea
              v-model="newComment"
              class="input-field w-full min-h-[120px] resize-none"
              placeholder="写下你的评论..."
            />
            <div class="flex justify-end mt-4">
              <button
                class="btn-primary"
                :disabled="isSubmitting || !newComment.trim()"
                @click="submitComment"
              >
                {{ isSubmitting ? '提交中...' : '发表评论' }}
              </button>
            </div>
          </div>

          <div v-else class="glass-card p-6 text-center">
            <p class="text-text-secondary mb-4">登录后参与评论</p>
            <NuxtLink to="/auth/login" class="btn-primary">
              登录
            </NuxtLink>
          </div>
        </section>
      </template>

      <div v-else class="glass-card p-12 text-center">
        <FileText class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">文章不存在</h3>
        <NuxtLink to="/blog" class="btn-primary mt-4">
          返回博客
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Share2, FileText } from 'lucide-vue-next'
import { useBlog } from '~/composables/useBlog'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const slug = route.params.slug as string
const { post, comments, isLoading, fetchPost, fetchComments, likePost, addComment } = useBlog()
const { isLoggedIn } = useAuth()

const newComment = ref('')
const isSubmitting = ref(false)

const categoryClass = computed(() => {
  if (!post.value) return ''
  const classes: Record<string, string> = {
    '技术文章': 'bg-blue-500/20 text-blue-400',
    '产品动态': 'bg-green-500/20 text-green-400',
    '行业洞察': 'bg-cyan-500/20 text-cyan-300'
  }
  return classes[post.value.category] || 'bg-gray-500/20 text-gray-400'
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleLike = async () => {
  if (post.value) {
    await likePost(post.value.id)
    await fetchPost(slug)
  }
}

const submitComment = async () => {
  if (!post.value || !newComment.value.trim()) return
  isSubmitting.value = true
  try {
    await addComment(post.value.id, newComment.value)
    newComment.value = ''
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  await fetchPost(slug)
  if (post.value) {
    await fetchComments(post.value.id)
  }
})
</script>
