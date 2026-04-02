<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="block glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
    :class="{
      'col-span-2 row-span-2': size === 'large',
      'col-span-1 row-span-1': size === 'medium' || size === 'small'
    }"
  >
    <div class="flex items-start gap-4">
      <div
        class="rounded-2xl p-3 flex items-center justify-center shrink-0"
        :class="size === 'large' ? 'w-16 h-16' : 'w-12 h-12'"
        :style="{ backgroundColor: `${product.color}20` }"
      >
        <component
          :is="product.icon"
          class="transition-transform group-hover:scale-110"
          :class="size === 'large' ? 'w-8 h-8' : 'w-6 h-6'"
          :style="{ color: product.color }"
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h3
            class="font-bold text-white group-hover:text-primary transition-colors"
            :class="size === 'large' ? 'text-2xl' : 'text-lg'"
          >
            {{ product.name }}
          </h3>
          <span
            v-if="product.isNew"
            class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/20 text-green-400"
          >
            NEW
          </span>
        </div>
        <p
          class="text-text-secondary mt-1"
          :class="size === 'large' ? 'text-base' : 'text-sm'"
        >
          {{ product.tagline }}
        </p>
      </div>
    </div>

    <p
      v-if="size !== 'small'"
      class="text-text-muted mt-4 line-clamp-2"
      :class="size === 'large' ? 'text-base' : 'text-sm'"
    >
      {{ product.description }}
    </p>

    <div
      v-if="size === 'large'"
      class="mt-6 grid grid-cols-3 gap-4"
    >
      <div
        v-for="(stat, index) in product.stats"
        :key="index"
        class="text-center"
      >
        <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
        <div class="text-text-muted text-sm">{{ stat.label }}</div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in product.tags"
        :key="tag"
        class="px-2 py-1 text-xs rounded-lg bg-cardHover text-text-secondary"
      >
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MessageCircle, Globe, Monitor } from 'lucide-vue-next'

interface ProductStats {
  value: string
  label: string
}

interface Product {
  name: string
  slug: string
  tagline: string
  description: string
  icon: any
  color: string
  isNew?: boolean
  tags: string[]
  stats?: ProductStats[]
}

defineProps<{
  product: Product
  size: 'large' | 'medium' | 'small'
}>()

const productsData: Record<string, Product> = {
  mindlink: {
    name: 'MindLink',
    slug: 'mindlink',
    tagline: '高效团队协作工具',
    description: 'MindLink是一款专为现代团队打造的协作平台，支持即时通讯、文件共享、任务管理等功能，让团队协作更加高效便捷。',
    icon: MessageCircle,
    color: '#007ACC',
    isNew: true,
    tags: ['协作', '即时通讯', '项目管理'],
    stats: [
      { value: '10K+', label: '活跃用户' },
      { value: '99.9%', label: '可用性' },
      { value: '50+', label: '集成' }
    ]
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
    color: '#8B5CF6',
    tags: ['远程', '桌面', '跨平台']
  }
}
</script>
