<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="section-title text-white mb-4">社区论坛</h1>
        <p class="text-text-secondary max-w-2xl mx-auto">
          加入我们的社区，讨论产品使用心得，分享经验技巧
        </p>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 5" :key="i" class="glass-card animate-pulse p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-cardHover rounded-xl" />
            <div class="flex-1">
              <div class="h-5 bg-cardHover rounded w-1/2 mb-2" />
              <div class="h-4 bg-cardHover rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="board in boards"
          :key="board.id"
          :to="`/forum/${board.slug}`"
          class="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageCircle class="w-6 h-6 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold group-hover:text-primary transition-colors">
                {{ board.name }}
              </h3>
              <p class="text-text-muted text-sm mt-1 line-clamp-2">
                {{ board.description }}
              </p>
              <div class="flex items-center gap-4 mt-3 text-text-muted text-sm">
                <span>{{ board.threadCount }} 帖子</span>
                <span>{{ board.postCount }} 回复</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <section class="mt-16">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title text-white text-2xl">精选帖子</h2>
          <NuxtLink to="/forum/mindlink" class="btn-secondary">
            查看更多
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <ForumThreadCard
            v-for="thread in featuredThreads"
            :key="thread.id"
            :thread="thread"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import { useForum } from '~/composables/useForum'

useHead({
  title: '论坛 - 凯普软件'
})

const { boards, isLoading, fetchBoards } = useForum()

const featuredThreads = ref([
  {
    id: 1,
    title: 'MindLink 使用技巧分享：如何高效管理项目',
    content: '',
    author: { id: 1, username: '社区用户1', avatar: '' },
    board: { id: 1, name: 'MindLink交流', slug: 'mindlink' },
    createdAt: '2026-03-20T10:30:00Z',
    updatedAt: '2026-03-20T10:30:00Z',
    views: 456,
    likes: 34,
    replies: 12,
    isPinned: true,
    isEssence: true,
    lastReply: { author: '热心用户', createdAt: '2026-03-21T08:00:00Z' }
  },
  {
    id: 2,
    title: 'HenryIway 工作流模板分享',
    content: '',
    author: { id: 2, username: '社区用户2', avatar: '' },
    board: { id: 2, name: 'HenryIway交流', slug: 'henryiway' },
    createdAt: '2026-03-19T15:20:00Z',
    updatedAt: '2026-03-19T15:20:00Z',
    views: 234,
    likes: 18,
    replies: 5,
    isPinned: false,
    isEssence: false,
    lastReply: { author: '模板作者', createdAt: '2026-03-20T12:00:00Z' }
  },
  {
    id: 3,
    title: 'Remote Desktop 连接问题求助',
    content: '',
    author: { id: 3, username: '社区用户3', avatar: '' },
    board: { id: 3, name: 'RemoteDesktop交流', slug: 'remote-desktop' },
    createdAt: '2026-03-18T09:15:00Z',
    updatedAt: '2026-03-18T09:15:00Z',
    views: 123,
    likes: 5,
    replies: 3,
    isPinned: false,
    isEssence: false,
    lastReply: { author: '技术支持', createdAt: '2026-03-19T14:30:00Z' }
  }
])

onMounted(() => {
  fetchBoards()
})
</script>
