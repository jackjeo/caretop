<template>
  <header class="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-3">
        <div class="flex items-center gap-4 lg:gap-8 min-w-0">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="brand-logo-wrap">
              <img
                :src="'/caretop-logo-icon.png'"
                alt="Caretop Logo"
                class="brand-logo w-8 h-8 rounded-lg object-cover"
              />
            </span>
            <span class="text-base sm:text-lg font-bold text-text-primary truncate">凯普软件</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-1">
            <div class="relative" ref="productsRef">
              <button
                class="flex items-center gap-1 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
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
                    <div class="text-text-primary font-medium">{{ product.name }}</div>
                    <div class="text-text-muted text-sm">{{ product.tagline }}</div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <NuxtLink to="/blog" class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">
              博客
            </NuxtLink>

            <NuxtLink to="/forum" class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">
              论坛
            </NuxtLink>

            <NuxtLink
              v-if="isLoggedIn"
              to="/tickets"
              class="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              工单
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <div class="relative" ref="themeRef">
            <button
              class="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-cardHover transition-colors text-text-secondary hover:text-text-primary"
              @click="toggleThemeMenu"
            >
              <component :is="currentThemeIcon" class="w-4 h-4" />
              <span class="hidden lg:block text-sm">{{ currentThemeLabel }}</span>
            </button>
            <div
              v-if="showThemeMenu"
              class="absolute right-0 top-full mt-2 w-40 glass-card p-2 z-50"
            >
              <button
                v-for="option in themeOptions"
                :key="option.value"
                class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
                @click="setTheme(option.value)"
              >
                <component :is="option.icon" class="w-4 h-4" />
                <span>{{ option.label }}</span>
              </button>
            </div>
          </div>

          <template v-if="isLoggedIn">
            <div class="relative" ref="userRef">
              <button
                class="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-cardHover transition-colors"
                @click="toggleUserMenu"
              >
                <UserAvatar :user="user" size="small" />
                <span class="text-text-primary hidden sm:block">{{ user?.username }}</span>
                <ChevronDown class="w-4 h-4 text-text-secondary" />
              </button>
              <div
                v-if="showUserMenu"
                class="absolute right-0 top-full mt-2 w-48 glass-card p-2 z-50"
              >
                <NuxtLink
                  to="/user/profile"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
                  @click="showUserMenu = false"
                >
                  <User class="w-4 h-4" />
                  个人中心
                </NuxtLink>
                <NuxtLink
                  v-if="isAdmin"
                  to="/admin/dashboard"
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
                  @click="showUserMenu = false"
                >
                  <Settings class="w-4 h-4" />
                  管理后台
                </NuxtLink>
                <button
                  class="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
                  @click="handleLogout"
                >
                  <LogOut class="w-4 h-4" />
                  退出登录
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login" class="hidden sm:inline-block px-3 lg:px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">
              登录
            </NuxtLink>
            <NuxtLink to="/auth/register" class="btn-primary px-4 sm:px-6 py-2">
              注册
            </NuxtLink>
          </template>

          <button
            class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
            @click="mobileMenuOpen = true"
            aria-label="打开移动端菜单"
          >
            <Menu class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端全屏菜单传送至 body：避免顶栏 backdrop-blur 截断 fixed 叠层导致背景透出 -->
    <Teleport to="body">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        @click="mobileMenuOpen = false"
      />
      <div
        v-if="mobileMenuOpen"
        class="md:hidden fixed z-[61] top-3 right-3 left-12 bottom-4 bg-card border border-border rounded-2xl p-4 flex flex-col gap-4 shadow-2xl overflow-y-auto"
      >
      <div class="flex items-center justify-between">
        <span class="text-text-primary font-semibold">菜单</span>
        <button
          class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
          @click="mobileMenuOpen = false"
          aria-label="关闭移动端菜单"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <NuxtLink to="/" class="px-3 py-2 rounded-xl text-text-primary hover:bg-cardHover" @click="mobileMenuOpen = false">
        首页
      </NuxtLink>
      <NuxtLink to="/blog" class="px-3 py-2 rounded-xl text-text-primary hover:bg-cardHover" @click="mobileMenuOpen = false">
        博客
      </NuxtLink>
      <NuxtLink to="/forum" class="px-3 py-2 rounded-xl text-text-primary hover:bg-cardHover" @click="mobileMenuOpen = false">
        论坛
      </NuxtLink>
      <NuxtLink v-if="isLoggedIn" to="/tickets" class="px-3 py-2 rounded-xl text-text-primary hover:bg-cardHover" @click="mobileMenuOpen = false">
        工单
      </NuxtLink>
      <div class="border-t border-border pt-3 space-y-1">
        <NuxtLink
          v-for="product in products"
          :key="product.slug"
          :to="`/products/${product.slug}`"
          class="block px-3 py-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-cardHover"
          @click="mobileMenuOpen = false"
        >
          {{ product.name }}
        </NuxtLink>
      </div>
      <div class="mt-auto flex gap-2">
        <NuxtLink
          to="/auth/login"
          class="flex-1 px-3 py-2 text-center rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-cardHover transition-colors"
          @click="mobileMenuOpen = false"
        >
          登录
        </NuxtLink>
        <NuxtLink
          to="/auth/register"
          class="flex-1 px-3 py-2 text-center rounded-xl bg-primary text-white hover:brightness-105 transition-colors"
          @click="mobileMenuOpen = false"
        >
          注册
        </NuxtLink>
      </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown, MessageCircle, Globe, Monitor, User, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'
import { useTheme } from '~/composables/useTheme'

const { user, isLoggedIn, isAdmin, logout } = useAuth()
const productsRef = ref<HTMLElement | null>(null)
const userRef = ref<HTMLElement | null>(null)
const themeRef = ref<HTMLElement | null>(null)
const showProducts = ref(false)
const showUserMenu = ref(false)
const showThemeMenu = ref(false)
const mobileMenuOpen = ref(false)
const { mode, resolvedTheme, setThemeMode } = useTheme()

const themeOptions = [
  { value: 'light' as const, label: '浅色', icon: Sun },
  { value: 'dark' as const, label: '深色', icon: Moon },
  { value: 'system' as const, label: '跟随系统', icon: Monitor }
]

const currentThemeLabel = computed(() => {
  const hit = themeOptions.find(option => option.value === mode.value)
  return hit?.label ?? '跟随系统'
})

const currentThemeIcon = computed(() => {
  if (mode.value === 'system') return Monitor
  return resolvedTheme.value === 'dark' ? Moon : Sun
})

const products = [
  { name: 'MindLink', slug: 'mindlink', tagline: '高效团队协作工具', icon: MessageCircle },
  { name: 'HenryIway', slug: 'henryiway', tagline: '智能工作流引擎', icon: Globe },
  { name: 'Remote Desktop', slug: 'remote-desktop', tagline: '远程桌面工具', icon: Monitor }
]

const toggleProducts = () => {
  showProducts.value = !showProducts.value
  showUserMenu.value = false
  mobileMenuOpen.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showProducts.value = false
  showThemeMenu.value = false
  mobileMenuOpen.value = false
}

const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value
  showProducts.value = false
  showUserMenu.value = false
  mobileMenuOpen.value = false
}

const setTheme = (nextMode: 'light' | 'dark' | 'system') => {
  setThemeMode(nextMode)
  showThemeMenu.value = false
}

const handleLogout = () => {
  showUserMenu.value = false
  mobileMenuOpen.value = false
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
    if (themeRef.value && !themeRef.value.contains(e.target as Node)) {
      showThemeMenu.value = false
    }
  })
})
</script>
