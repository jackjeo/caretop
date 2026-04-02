<template>
  <header class="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">K</span>
            </div>
            <span class="text-lg font-bold text-white">凯普软件</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-1">
            <div class="relative" ref="productsRef">
              <button
                class="flex items-center gap-1 px-4 py-2 text-text-secondary hover:text-white transition-colors"
                @click="toggleProducts"
              >
                产品
                <ChevronDown class="w-4 h-4" />
              </button>
              <div
                v-if="showProducts"
                class="absolute top-full left-0 mt-2 w-64 glass-card p-2 z-50"
              >
                <NuxtLink
                  v-for="product in products"
                  :key="product.slug"
                  :to="`/products/${product.slug}`"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cardHover transition-colors"
                  @click="showProducts = false"
                >
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <component :is="product.icon" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ product.name }}</div>
                    <div class="text-text-muted text-sm">{{ product.tagline }}</div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <NuxtLink to="/blog" class="px-4 py-2 text-text-secondary hover:text-white transition-colors">
              博客
            </NuxtLink>

            <NuxtLink to="/forum" class="px-4 py-2 text-text-secondary hover:text-white transition-colors">
              论坛
            </NuxtLink>

            <NuxtLink
              v-if="isLoggedIn"
              to="/tickets"
              class="px-4 py-2 text-text-secondary hover:text-white transition-colors"
            >
              工单
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          <template v-if="isLoggedIn">
            <div class="relative" ref="userRef">
              <button
                class="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-cardHover transition-colors"
                @click="toggleUserMenu"
              >
                <UserAvatar :user="user" size="small" />
                <span class="text-white hidden sm:block">{{ user?.username }}</span>
                <ChevronDown class="w-4 h-4 text-text-secondary" />
              </button>
              <div
                v-if="showUserMenu"
                class="absolute right-0 top-full mt-2 w-48 glass-card p-2 z-50"
              >
                <NuxtLink
                  to="/user/profile"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-cardHover transition-colors"
                  @click="showUserMenu = false"
                >
                  <User class="w-4 h-4" />
                  个人中心
                </NuxtLink>
                <NuxtLink
                  v-if="isAdmin"
                  to="/admin/dashboard"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-cardHover transition-colors"
                  @click="showUserMenu = false"
                >
                  <Settings class="w-4 h-4" />
                  管理后台
                </NuxtLink>
                <button
                  class="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-cardHover transition-colors"
                  @click="handleLogout"
                >
                  <LogOut class="w-4 h-4" />
                  退出登录
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="px-4 py-2 text-text-secondary hover:text-white transition-colors">
              登录
            </NuxtLink>
            <NuxtLink to="/auth/register" class="btn-primary">
              注册
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown, MessageCircle, Globe, Monitor, User, Settings, LogOut } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

const { user, isLoggedIn, isAdmin, logout } = useAuth()
const productsRef = ref<HTMLElement | null>(null)
const userRef = ref<HTMLElement | null>(null)
const showProducts = ref(false)
const showUserMenu = ref(false)

const products = [
  { name: 'MindLink', slug: 'mindlink', tagline: '高效团队协作工具', icon: MessageCircle },
  { name: 'HenryIway', slug: 'henryiway', tagline: '智能工作流引擎', icon: Globe },
  { name: 'Remote Desktop', slug: 'remote-desktop', tagline: '远程桌面工具', icon: Monitor }
]

const toggleProducts = () => {
  showProducts.value = !showProducts.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showProducts.value = false
}

const handleLogout = () => {
  showUserMenu.value = false
  logout()
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (productsRef.value && !productsRef.value.contains(e.target as Node)) {
      showProducts.value = false
    }
    if (userRef.value && !userRef.value.contains(e.target as Node)) {
      showUserMenu.value = false
    }
  })
})
</script>
