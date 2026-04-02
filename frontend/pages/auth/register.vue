<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span class="text-white font-bold">K</span>
          </div>
          <span class="text-xl font-bold text-white">凯普软件</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-white">创建账户</h1>
        <p class="text-text-secondary mt-2">加入凯普软件社区</p>
      </div>

      <div class="glass-card p-8">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-text-secondary text-sm mb-2">用户名</label>
            <input
              v-model="form.username"
              type="text"
              class="input-field w-full"
              placeholder="请输入用户名"
              required
              minlength="3"
              maxlength="20"
            />
            <p class="text-text-muted text-xs mt-1">3-20个字符，可包含字母、数字、下划线</p>
          </div>

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
                minlength="6"
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
            <p class="text-text-muted text-xs mt-1">至少6个字符</p>
          </div>

          <div>
            <label class="block text-text-secondary text-sm mb-2">确认密码</label>
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              class="input-field w-full"
              placeholder="请再次输入密码"
              required
            />
          </div>

          <div v-if="error" class="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p class="text-red-400 text-sm">{{ error }}</p>
          </div>

          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? '注册中...' : '注册' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-text-secondary">
            已有账户？
            <NuxtLink to="/auth/login" class="text-primary hover:underline">
              登录
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
  title: '注册 - 凯普软件'
})

const { register, isLoading } = useAuth()
const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (form.password.length < 6) {
    error.value = '密码至少需要6个字符'
    return
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  if (!usernameRegex.test(form.username)) {
    error.value = '用户名格式不正确'
    return
  }

  const result = await register({
    username: form.username,
    email: form.email,
    password: form.password
  })

  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || '注册失败'
  }
}
</script>
