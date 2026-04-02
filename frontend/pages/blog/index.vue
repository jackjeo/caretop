<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="section-title text-white mb-4">博客</h1>
        <p class="text-text-secondary max-w-2xl mx-auto">
          阅读最新的技术文章、产品动态和行业洞察
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            :class="selectedCategory === cat
              ? 'bg-primary text-white'
              : 'bg-card text-text-secondary hover:text-white'"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="input-field pl-10 w-64"
          />
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="glass-card animate-pulse">
          <div class="aspect-video bg-cardHover" />
          <div class="p-5 space-y-3">
            <div class="h-4 bg-cardHover rounded w-1/4" />
            <div class="h-6 bg-cardHover rounded" />
            <div class="h-4 bg-cardHover rounded" />
          </div>
        </div>
      </div>

      <div v-else-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>

      <div v-else class="glass-card p-12 text-center">
        <FileText class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">暂无文章</h3>
        <p class="text-text-secondary">稍后再来看看吧</p>
      </div>

      <div v-if="pagination.totalPages > 1" class="flex justify-center mt-12">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, FileText } from 'lucide-vue-next'
import { useBlog } from '~/composables/useBlog'

useHead({
  title: '博客 - 凯普软件'
})

const { posts, isLoading, pagination, fetchPosts } = useBlog()

const categories = ['全部', '技术文章', '产品动态', '行业洞察']
const selectedCategory = ref('全部')
const searchQuery = ref('')

const handlePageChange = async (page: number) => {
  await fetchPosts({
    page,
    category: selectedCategory.value !== '全部' ? selectedCategory.value : undefined,
    search: searchQuery.value || undefined
  })
}

watch(selectedCategory, () => {
  handlePageChange(1)
})

watch(searchQuery, () => {
  handlePageChange(1)
})

onMounted(() => {
  fetchPosts({ page: 1 })
})
</script>
