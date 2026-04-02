<template>
  <div>
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-text-secondary text-base font-medium mb-6">
            <Sparkles class="w-4 h-4" />
            创新软件解决方案
          </div>
          <h1 class="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
            创新软件，<span class="text-gradient">驱动未来</span>
          </h1>
          <p class="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            凯普软件专注于打造优质的软件产品，帮助团队提升协作效率，实现工作流程自动化。
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/products/mindlink" class="btn-primary flex items-center gap-2">
              了解我们的产品
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink to="/forum" class="btn-secondary flex items-center gap-2">
              加入社区
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title text-white mb-4">我们的产品</h2>
          <p class="text-text-secondary max-w-2xl mx-auto">
            探索我们精心打造的软件产品线，满足不同场景的需求
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard :product="productsData.mindlink" size="large" />
          <ProductCard :product="productsData.henryiway" size="medium" />
          <ProductCard :product="productsData['remote-desktop']" size="small" />
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-card/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="section-title text-white mb-2">最新博客</h2>
            <p class="text-text-secondary">了解我们的最新动态和技术分享</p>
          </div>
          <NuxtLink to="/blog" class="btn-secondary">
            查看全部
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BlogPostCard
            v-for="post in latestPosts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="section-title text-white mb-2">精选论坛</h2>
            <p class="text-text-secondary">加入讨论，与社区互动</p>
          </div>
          <NuxtLink to="/forum" class="btn-secondary">
            查看全部
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <ForumThreadCard
            v-for="thread in featuredThreads"
            :key="thread.id"
            :thread="thread"
          />
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-gradient-to-r from-primary/20 via-card to-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="section-title text-white mb-4">准备好开始了吗？</h2>
        <p class="text-text-secondary max-w-2xl mx-auto mb-8">
          立即体验我们的产品，加入数千个已经受益的团队
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/auth/register" class="btn-primary">
            免费注册
          </NuxtLink>
          <NuxtLink to="/products/mindlink" class="btn-secondary">
            了解更多
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Sparkles, MessageCircle, Globe, Monitor } from 'lucide-vue-next'
import { useBlog } from '~/composables/useBlog'
import { useForum } from '~/composables/useForum'

useHead({
  title: '凯普软件 - 创新软件，驱动未来'
})

const { posts: blogPosts, fetchPosts: fetchBlogPosts } = useBlog()
const { threads: forumThreads, fetchThreads: fetchForumThreads } = useForum()

const productsData = {
  mindlink: {
    name: 'MindLink',
    slug: 'mindlink',
    tagline: '高效团队协作工具',
    description: 'MindLink是一款专为现代团队打造的协作平台，支持即时通讯、文件共享、任务管理等功能，让团队协作更加高效便捷。',
    icon: MessageCircle,
    color: '#007ACC',
    isNew: true,
    tags: ['协作', '即时通讯', '项目管理']
  },
  henryiway: {
    name: 'HenryIway',
    slug: 'henryiway',
    tagline: '智能工作流引擎',
    description: 'HenryIway是一款强大的工作流自动化工具，帮助企业简化业务流程，提高运营效率。',
    icon: Globe,
    color: '#10B981',
    tags: ['自动化', '工作流', '企业级']
  },
  'remote-desktop': {
    name: 'Remote Desktop',
    slug: 'remote-desktop',
    tagline: '远程桌面工具',
    description: '简单易用的远程桌面连接工具，支持多平台，安全的远程访问体验。',
    icon: Monitor,
    color: '#0EA5E9',
    tags: ['远程', '桌面', '跨平台']
  }
}

const latestPosts = ref([
  {
    id: 1,
    title: 'MindLink 3.0 全新发布：更智能的团队协作体验',
    slug: 'mindlink-3-0-release',
    excerpt: 'MindLink 3.0带来了全新的界面设计和更强大的协作功能，让团队沟通更加高效。',
    coverImage: 'https://picsum.photos/seed/mindlink/800/450',
    category: '产品动态' as const,
    author: { id: 1, username: '凯普软件', avatar: '' },
    createdAt: '2026-03-15',
    views: 1234,
    likes: 89
  },
  {
    id: 2,
    title: '如何利用工作流自动化提升团队效率',
    slug: 'workflow-automation-guide',
    excerpt: '本文将介绍如何通过HenryIway实现工作流程自动化，减少重复性工作。',
    coverImage: 'https://picsum.photos/seed/workflow/800/450',
    category: '技术文章' as const,
    author: { id: 2, username: '技术团队', avatar: '' },
    createdAt: '2026-03-10',
    views: 856,
    likes: 67
  },
  {
    id: 3,
    title: '远程办公的安全最佳实践',
    slug: 'remote-work-security',
    excerpt: '随着远程办公的普及，如何保障远程访问的安全性成为重要课题。',
    coverImage: 'https://picsum.photos/seed/security/800/450',
    category: '行业洞察' as const,
    author: { id: 3, username: '安全专家', avatar: '' },
    createdAt: '2026-03-05',
    views: 2341,
    likes: 156
  }
])

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

onMounted(async () => {
  await Promise.all([
    fetchBlogPosts({ page: 1 }),
    fetchForumThreads('mindlink', { page: 1 })
  ])
})
</script>
