<template>
  <footer class="bg-card border-t border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="brand-logo-wrap">
              <img
                :src="'/caretop-logo-icon.png'"
                alt="Caretop Logo"
                class="brand-logo w-8 h-8 rounded-lg object-cover"
              />
            </span>
            <span class="text-lg font-bold text-white">凯普软件</span>
          </div>
          <p class="text-text-secondary text-sm">
            创新软件，驱动未来。<br />
            致力于打造优质的软件产品。
          </p>
          <div class="flex items-center gap-4 mt-4">
            <a href="#" class="text-text-secondary hover:text-primary transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-text-secondary hover:text-primary transition-colors">
              <Github class="w-5 h-5" />
            </a>
            <a href="#" class="text-text-secondary hover:text-primary transition-colors">
              <Youtube class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">产品</h4>
          <ul class="space-y-2">
            <li v-for="product in products" :key="product.slug">
              <NuxtLink
                :to="`/products/${product.slug}`"
                class="text-text-secondary hover:text-primary transition-colors text-sm"
              >
                {{ product.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">资源</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/blog" class="text-text-secondary hover:text-primary transition-colors text-sm">
                博客
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/forum" class="text-text-secondary hover:text-primary transition-colors text-sm">
                论坛
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tickets" class="text-text-secondary hover:text-primary transition-colors text-sm">
                工单
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">关于</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-text-secondary hover:text-primary transition-colors text-sm">
                关于我们
              </a>
            </li>
            <li>
              <a href="#" class="text-text-secondary hover:text-primary transition-colors text-sm">
                联系方式
              </a>
            </li>
            <li>
              <a href="#" class="text-text-secondary hover:text-primary transition-colors text-sm">
                隐私政策
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-text-muted text-sm">
          © 2026 凯普软件 版权所有 | <a href="https://beian.miit.gov.cn/" target="_blank" class="hover:text-primary">粤ICP备13041060号</a>
        </p>
        <div class="flex items-center gap-6">
          <button @click="showChangelog = true" class="text-text-secondary hover:text-primary transition-colors text-sm">
            更新日志 <span class="text-primary">v1.0.5</span>
          </button>
          <a href="#" class="text-text-secondary hover:text-primary transition-colors text-sm">
            服务条款
          </a>
          <a href="#" class="text-text-secondary hover:text-primary transition-colors text-sm">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  </footer>
  <ChangelogModal :is-open="showChangelog" @close="showChangelog = false" />
</template>

<script setup lang="ts">
import { Twitter, Github, Youtube } from 'lucide-vue-next'
import ChangelogModal from './ChangelogModal.vue'

const products = [
  { name: 'MindLink', slug: 'mindlink' },
  { name: 'HenryIway', slug: 'henryiway' },
  { name: 'Remote Desktop', slug: 'remote-desktop' }
]

const showChangelog = ref(false)
</script>
