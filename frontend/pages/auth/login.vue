<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
          <img
            :src="'/caretop-logo-icon.png'"
            alt="Caretop Logo"
            class="w-10 h-10 rounded-xl object-cover"
          />
          <span class="text-xl font-bold text-text-primary">凯普软件</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-text-primary">欢迎回来</h1>
        <p class="text-text-secondary mt-2">登录您的账户继续</p>
      </div>

      <div class="glass-card p-8">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-text-secondary text-sm mb-2">邮箱</label>
            <input
              v-model="form.email"
              type="email"
              class="input-field w-full"
              placeholder="请输入邮箱"
              required
            />
          </div>

          <div>
            <label class="block text-text-secondary text-sm mb-2">密码</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="input-field w-full pr-10"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div v-if="error" class="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p class="text-red-400 text-sm">{{ error }}</p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-text-secondary">
            还没有账户？
            <NuxtLink to="/auth/register" class="text-primary hover:underline">
              注册
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: '登录 - 凯普软件'
})

const { login, isLoading } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  const result = await login({ email: form.email, password: form.password })
  if (result.success) {
    // 登录成功后强制刷新页面确保状态同步
    await router.push('/')
    window.location.reload()
  } else {
    error.value = result.error || '登录失败'
  }
}
</script>
