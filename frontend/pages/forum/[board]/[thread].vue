<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink :to="`/forum/${route.params.board}`" class="text-text-secondary hover:text-primary transition-colors">
          ← 返回板块
        </NuxtLink>
      </div>

      <div v-if="isLoading" class="animate-pulse">
        <div class="glass-card p-6">
          <div class="h-8 bg-cardHover rounded w-2/3 mb-4" />
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-cardHover rounded-full" />
            <div class="h-4 bg-cardHover rounded w-1/4" />
          </div>
          <div class="space-y-2">
            <div class="h-4 bg-cardHover rounded" />
            <div class="h-4 bg-cardHover rounded" />
            <div class="h-4 bg-cardHover rounded w-2/3" />
          </div>
        </div>
      </div>

      <template v-else-if="thread">
        <article class="glass-card p-6 mb-6">
          <header class="mb-6">
            <div class="flex items-center gap-2 mb-4">
              <span v-if="thread.isPinned" class="px-2 py-1 text-xs font-medium rounded bg-yellow-500/20 text-yellow-400">
                📌 置顶
              </span>
              <span v-if="thread.isEssence" class="px-2 py-1 text-xs font-medium rounded bg-pink-500/20 text-pink-400">
                ✨ 精华
              </span>
            </div>

            <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
              {{ thread.title }}
            </h1>

            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-3">
                <UserAvatar :user="thread.author" size="medium" />
                <div>
                  <div class="text-white font-medium">{{ thread.author.username }}</div>
                  <div class="text-text-muted text-sm">{{ formatDate(thread.createdAt) }}</div>
                </div>
              </div>

              <div class="flex items-center gap-4 ml-auto text-text-muted text-sm">
                <span class="flex items-center gap-1">
                  <Eye class="w-4 h-4" />
                  {{ thread.views }}
                </span>
                <LikeButton
                  :count="thread.likes"
                  :is-liked="thread.isLiked"
                  @like="handleLike"
                />
                <button
                  v-if="isLoggedIn"
                  class="flex items-center gap-1 hover:text-primary transition-colors"
                  :class="{ 'text-yellow-400': thread.isFavorited }"
                  @click="handleFavorite"
                >
                  <Bookmark class="w-4 h-4" />
                  收藏
                </button>
              </div>
            </div>
          </header>

          <div class="prose prose-invert max-w-none">
            <MarkdownRenderer :content="thread.content" />
          </div>
        </article>

        <section class="mb-6">
          <h3 class="text-lg font-bold text-white mb-4">
            回复 ({{ replies.length }})
          </h3>

          <div class="space-y-4">
            <ForumPost
              v-for="reply in replies"
              :key="reply.id"
              :reply="reply"
              :thread-id="thread.id"
              :can-reply="isLoggedIn"
              @replied="loadReplies"
            />
          </div>
        </section>

        <div v-if="isLoggedIn" class="glass-card p-6">
          <h4 class="text-lg font-medium text-white mb-4">发表评论</h4>
          <textarea
            v-model="newReply"
            class="input-field w-full min-h-[120px] resize-none"
            placeholder="写下你的回复..."
          />
          <div class="flex justify-end mt-4">
            <button
              class="btn-primary"
              :disabled="isSubmitting || !newReply.trim()"
              @click="submitReply"
            >
              {{ isSubmitting ? '提交中...' : '发表回复' }}
            </button>
          </div>
        </div>

        <div v-else class="glass-card p-6 text-center">
          <p class="text-text-secondary mb-4">登录后参与讨论</p>
          <NuxtLink to="/auth/login" class="btn-primary">
            登录
          </NuxtLink>
        </div>
      </template>

      <div v-else class="glass-card p-12 text-center">
        <MessageCircle class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">帖子不存在</h3>
        <NuxtLink to="/forum" class="btn-primary mt-4">
          返回论坛
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Bookmark, MessageCircle } from 'lucide-vue-next'
import { useForum } from '~/composables/useForum'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const boardSlug = route.params.board as string
const threadId = parseInt(route.params.thread as string)
const { thread, replies, isLoading, fetchThread, fetchReplies, likeThread, favoriteThread, replyThread } = useForum()
const { isLoggedIn } = useAuth()

const newReply = ref('')
const isSubmitting = ref(false)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLike = async () => {
  await likeThread(threadId)
  await fetchThread(boardSlug, threadId)
}

const handleFavorite = async () => {
  await favoriteThread(threadId)
  await fetchThread(boardSlug, threadId)
}

const loadReplies = async () => {
  await fetchReplies(threadId)
}

const submitReply = async () => {
  if (!newReply.value.trim()) return
  isSubmitting.value = true
  try {
    await replyThread(threadId, newReply.value)
    newReply.value = ''
    await loadReplies()
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  await fetchThread(boardSlug, threadId)
  await loadReplies()
})
</script>
