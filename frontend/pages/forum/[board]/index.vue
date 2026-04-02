<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink to="/forum" class="text-text-secondary hover:text-primary transition-colors">
          ← 返回论坛
        </NuxtLink>
      </div>

      <div v-if="board" class="mb-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 class="section-title text-white mb-2">{{ board.name }}</h1>
            <p class="text-text-secondary">{{ board.description }}</p>
          </div>
          <button
            v-if="isLoggedIn"
            class="btn-primary flex items-center gap-2"
            @click="showNewThread = true"
          >
            <Plus class="w-5 h-5" />
            发布帖子
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div class="flex gap-2">
          <button
            v-for="sort in sortOptions"
            :key="sort.value"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            :class="selectedSort === sort.value
              ? 'bg-primary text-white'
              : 'bg-card text-text-secondary hover:text-white'"
            @click="selectedSort = sort.value"
          >
            {{ sort.label }}
          </button>
        </div>

        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索帖子..."
            class="input-field pl-10 w-64"
          />
        </div>
      </div>

      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="glass-card animate-pulse p-4">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-cardHover rounded-full" />
            <div class="flex-1">
              <div class="h-5 bg-cardHover rounded w-2/3 mb-2" />
              <div class="h-4 bg-cardHover rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="threads.length" class="space-y-3">
        <ForumThreadCard
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        />
      </div>

      <div v-else class="glass-card p-12 text-center">
        <MessageCircle class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">暂无帖子</h3>
        <p class="text-text-secondary mb-4">成为第一个发帖的人吧</p>
        <button v-if="isLoggedIn" class="btn-primary" @click="showNewThread = true">
          发布帖子
        </button>
      </div>

      <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
        <div class="flex items-center gap-2">
          <button
            class="px-4 py-2 rounded-xl bg-card text-text-secondary hover:text-white disabled:opacity-50 transition-colors"
            :disabled="pagination.page <= 1"
            @click="handlePageChange(pagination.page - 1)"
          >
            上一页
          </button>
          <span class="px-4 py-2 text-text-secondary">
            第 {{ pagination.page }} / {{ pagination.totalPages }} 页
          </span>
          <button
            class="px-4 py-2 rounded-xl bg-card text-text-secondary hover:text-white disabled:opacity-50 transition-colors"
            :disabled="pagination.page >= pagination.totalPages"
            @click="handlePageChange(pagination.page + 1)"
          >
            下一页
          </button>
        </div>
      </div>

      <div v-if="showNewThread" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showNewThread = false" />
        <div class="relative glass-card p-6 w-full max-w-2xl">
          <h3 class="text-xl font-bold text-white mb-6">发布新帖子</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-text-secondary text-sm mb-2">标题</label>
              <input
                v-model="newThread.title"
                type="text"
                class="input-field w-full"
                placeholder="请输入帖子标题"
              />
            </div>
            <div>
              <label class="block text-text-secondary text-sm mb-2">内容</label>
              <textarea
                v-model="newThread.content"
                class="input-field w-full min-h-[200px] resize-none"
                placeholder="请输入帖子内容"
              />
            </div>
            <div class="flex justify-end gap-3">
              <button class="btn-secondary" @click="showNewThread = false">取消</button>
              <button
                class="btn-primary"
                :disabled="isSubmitting || !newThread.title.trim() || !newThread.content.trim()"
                @click="submitThread"
              >
                {{ isSubmitting ? '发布中...' : '发布' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, MessageCircle } from 'lucide-vue-next'
import { useForum } from '~/composables/useForum'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const boardSlug = route.params.board as string
const { board, threads, isLoading, pagination, fetchBoard, fetchThreads, createThread } = useForum()
const { isLoggedIn } = useAuth()

const sortOptions = [
  { label: '最新', value: 'latest' },
  { label: '最热', value: 'hot' },
  { label: '精华', value: 'essence' }
]

const selectedSort = ref('latest')
const searchQuery = ref('')
const showNewThread = ref(false)
const isSubmitting = ref(false)
const newThread = ref({
  title: '',
  content: ''
})

const handlePageChange = async (page: number) => {
  await fetchThreads(boardSlug, {
    page,
    sort: selectedSort.value as 'latest' | 'hot' | 'essence',
    search: searchQuery.value || undefined
  })
}

const submitThread = async () => {
  if (!newThread.value.title.trim() || !newThread.value.content.trim()) return
  isSubmitting.value = true
  try {
    const result = await createThread(boardSlug, newThread.value)
    if (result.success) {
      showNewThread.value = false
      newThread.value = { title: '', content: '' }
      await fetchThreads(boardSlug, { page: 1, sort: selectedSort.value as any })
    }
  } finally {
    isSubmitting.value = false
  }
}

watch(selectedSort, () => {
  handlePageChange(1)
})

watch(searchQuery, () => {
  handlePageChange(1)
})

onMounted(async () => {
  await fetchBoard(boardSlug)
  await fetchThreads(boardSlug, { page: 1 })
})
</script>
