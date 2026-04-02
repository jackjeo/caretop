<template>
  <div>
    <section class="py-16 md:py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span
                class="px-3 py-1 text-sm font-medium rounded-full"
                :style="{ backgroundColor: `${product.color}20`, color: product.color }"
              >
                {{ product.category }}
              </span>
              <span v-if="product.isNew" class="px-3 py-1 text-sm font-medium rounded-full bg-green-500/20 text-green-400">
                NEW
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              {{ product.name }}
            </h1>
            <p class="text-xl text-text-secondary mb-6">
              {{ product.tagline }}
            </p>
            <p class="text-text-muted mb-8">
              {{ product.description }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn-primary flex items-center justify-center gap-2">
                <Download class="w-5 h-5" />
                立即下载
              </button>
              <NuxtLink to="/auth/register" class="btn-secondary flex items-center justify-center gap-2">
                免费注册
              </NuxtLink>
            </div>
          </div>

          <div class="relative">
            <div class="aspect-video rounded-2xl overflow-hidden bg-card border border-border">
              <img
                v-if="product.screenshot"
                :src="product.screenshot"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <component :is="product.icon" class="w-24 h-24 text-text-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-card/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title text-white text-center mb-12">核心功能</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in product.features"
            :key="index"
            class="glass-card p-6"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              :style="{ backgroundColor: `${product.color}20` }"
            >
              <component :is="feature.icon" class="w-6 h-6" :style="{ color: product.color }" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-text-secondary text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title text-white text-center mb-12">适用场景</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(scenario, index) in product.scenarios"
            :key="index"
            class="glass-card p-6 flex items-start gap-4"
          >
            <div class="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Check class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-white font-medium mb-1">{{ scenario.title }}</h3>
              <p class="text-text-secondary text-sm">{{ scenario.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-card/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title text-white text-center mb-12">相关链接</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            v-for="(link, index) in product.links"
            :key="index"
            href="#"
            class="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all"
          >
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.title }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Download, Check, MessageCircle, Globe, Monitor, Users, Zap, Shield,
  Clock, FileText, Bell, Settings, Code, Layers, Database, Cloud
} from 'lucide-vue-next'

const route = useRoute()
const slug = route.params.slug as string

const productsData: Record<string, any> = {
  mindlink: {
    name: 'MindLink',
    slug: 'mindlink',
    category: '团队协作',
    tagline: '高效团队协作工具',
    description: 'MindLink是一款专为现代团队打造的协作平台，支持即时通讯、文件共享、任务管理等功能，让团队协作更加高效便捷。',
    icon: MessageCircle,
    color: '#007ACC',
    isNew: true,
    screenshot: 'https://picsum.photos/seed/mindlink-screen/1200/675',
    features: [
      { title: '即时通讯', description: '支持群聊、私聊、频道等多种沟通方式', icon: MessageCircle },
      { title: '任务管理', description: '灵活的看板和列表视图，追踪项目进度', icon: Check },
      { title: '文件共享', description: '轻松共享和协作文档，支持多种格式', icon: FileText },
      { title: '视频会议', description: '内置高清视频会议，屏幕共享', icon: Users },
      { title: '智能通知', description: 'AI驱动的通知摘要，不错过重要信息', icon: Bell },
      { title: '安全可靠', description: '端到端加密，符合安全标准', icon: Shield }
    ],
    scenarios: [
      { title: '远程团队协作', description: '为分布式团队提供统一的沟通和协作平台' },
      { title: '项目管理', description: '可视化的任务追踪和进度管理' },
      { title: '客户沟通', description: '与客户建立高效的沟通渠道' },
      { title: '知识沉淀', description: '结构化的知识库，沉淀团队经验' }
    ],
    links: [
      { title: '文档中心', icon: FileText },
      { title: 'API文档', icon: Code },
      { title: '社区论坛', icon: Users },
      { title: '更新日志', icon: Zap }
    ]
  },
  henryiway: {
    name: 'HenryIway',
    slug: 'henryiway',
    category: '工作流自动化',
    tagline: '智能工作流引擎',
    description: 'HenryIway是一款强大的工作流自动化工具，帮助企业简化业务流程，提高运营效率，实现工作流程的数字化转型。',
    icon: Globe,
    color: '#10B981',
    isNew: false,
    screenshot: 'https://picsum.photos/seed/henryiway-screen/1200/675',
    features: [
      { title: '可视化编辑器', description: '拖拽式流程设计，无需编码', icon: Layers },
      { title: '多平台集成', description: '连接100+主流应用和服务', icon: Zap },
      { title: '条件分支', description: '灵活的逻辑判断和分支处理', icon: Code },
      { title: '数据处理', description: '强大的数据转换和处理能力', icon: Database },
      { title: '实时监控', description: '实时查看流程执行状态', icon: Clock },
      { title: '云端部署', description: '安全可靠的云服务', icon: Cloud }
    ],
    scenarios: [
      { title: '业务流程自动化', description: '将重复性工作自动化' },
      { title: '审批流程', description: '电子化审批流程，提高效率' },
      { title: '数据同步', description: '多系统间的数据自动同步' },
      { title: '事件触发', description: '基于事件的自动化响应' }
    ],
    links: [
      { title: '快速开始', icon: Zap },
      { title: '模板市场', icon: Layers },
      { title: 'API文档', icon: Code },
      { title: '技术支持', icon: Settings }
    ]
  },
  'remote-desktop': {
    name: 'Remote Desktop',
    slug: 'remote-desktop',
    category: '远程桌面',
    tagline: '远程桌面工具',
    description: '简单易用的远程桌面连接工具，支持多平台，安全的远程访问体验，让远程办公更加便捷高效。',
    icon: Monitor,
    color: '#0EA5E9',
    isNew: false,
    screenshot: 'https://picsum.photos/seed/remote-screen/1200/675',
    features: [
      { title: '跨平台支持', description: '支持Windows、Mac、Linux', icon: Monitor },
      { title: '安全加密', description: '端到端加密连接', icon: Shield },
      { title: '高清画质', description: '优化的图像压缩算法', icon: Zap },
      { title: '文件传输', description: '便捷的剪贴板和文件传输', icon: FileText },
      { title: '多会话管理', description: '同时管理多个远程连接', icon: Layers },
      { title: '快速连接', description: '收藏常用连接，一键访问', icon: Clock }
    ],
    scenarios: [
      { title: '远程办公', description: '安全访问公司内网资源' },
      { title: '技术支持', description: '快速远程协助解决问题' },
      { title: '服务器管理', description: '便捷管理远程服务器' },
      { title: '教学演示', description: '远程演示和培训' }
    ],
    links: [
      { title: '下载客户端', icon: Download },
      { title: '使用教程', icon: FileText },
      { title: '常见问题', icon: MessageCircle },
      { title: '更新日志', icon: Zap }
    ]
  }
}

const product = computed(() => productsData[slug] || productsData.mindlink)

useHead({
  title: computed(() => `${product.value.name} - 凯普软件`)
})
</script>
