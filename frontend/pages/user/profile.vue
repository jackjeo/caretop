<template>
  <div class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="section-title text-white mb-8">个人中心</h1>

      <div v-if="!isLoggedIn" class="glass-card p-12 text-center">
        <User class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">请先登录</h3>
        <NuxtLink to="/auth/login" class="btn-primary">
          登录
        </NuxtLink>
      </div>

      <template v-else>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <div class="glass-card p-6">
              <div class="text-center mb-6">
                <UserAvatar :user="user" size="large" />
                <h3 class="text-xl font-bold text-white mt-4">{{ user?.username }}</h3>
                <p class="text-text-muted text-sm">{{ user?.email }}</p>
                <span
                  class="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full"
                  :class="user?.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-cardHover text-text-secondary'"
                >
                  {{ user?.role === 'admin' ? '管理员' : '普通用户' }}
                </span>
              </div>

              <nav class="space-y-1">
                <button
                  v-for="tab in tabs"
                  :key="tab.value"
                  class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all"
                  :class="activeTab === tab.value
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-white hover:bg-cardHover'"
                  @click="activeTab = tab.value"
                >
                  <component :is="tab.icon" class="w-5 h-5" />
                  {{ tab.label }}
                </button>
              </nav>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="glass-card p-6">
              <template v-if="activeTab === 'profile'">
                <h3 class="text-lg font-bold text-white mb-6">个人资料</h3>

                <div class="space-y-6">
                  <div>
                    <label class="block text-text-secondary text-sm mb-2">用户名</label>
                    <input
                      v-model="profileForm.username"
                      type="text"
                      class="input-field w-full"
                      disabled
                    />
                  </div>

                  <div>
                    <label class="block text-text-secondary text-sm mb-2">邮箱</label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      class="input-field w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-text-secondary text-sm mb-2">个人简介</label>
                    <textarea
                      v-model="profileForm.bio"
                      class="input-field w-full min-h-[100px] resize-none"
                      placeholder="介绍一下自己..."
                    />
                  </div>

                  <div v-if="successMessage" class="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p class="text-green-400 text-sm">{{ successMessage }}</p>
                  </div>

                  <div class="flex justify-end">
                    <button class="btn-primary" @click="saveProfile">
                      保存更改
                    </button>
                  </div>
                </div>
              </template>

              <template v-else-if="activeTab === 'password'">
                <h3 class="text-lg font-bold text-white mb-6">修改密码</h3>

                <div class="space-y-6">
                  <div>
                    <label class="block text-text-secondary text-sm mb-2">当前密码</label>
                    <input
                      v-model="passwordForm.current"
                      type="password"
                      class="input-field w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-text-secondary text-sm mb-2">新密码</label>
                    <input
                      v-model="passwordForm.new"
                      type="password"
                      class="input-field w-full"
                    />
                  </div>

                  <div>
                    <label class="block text-text-secondary text-sm mb-2">确认新密码</label>
                    <input
                      v-model="passwordForm.confirm"
                      type="password"
                      class="input-field w-full"
                    />
                  </div>

                  <div v-if="error" class="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p class="text-red-400 text-sm">{{ error }}</p>
                  </div>

                  <div class="flex justify-end">
                    <button class="btn-primary" @click="changePassword">
                      修改密码
                    </button>
                  </div>
                </div>
              </template>

              <template v-else-if="activeTab === 'posts'">
                <h3 class="text-lg font-bold text-white mb-6">我的帖子</h3>
                <div class="space-y-4">
                  <div
                    v-for="post in userPosts"
                    :key="post.id"
                    class="p-4 bg-cardHover rounded-xl"
                  >
                    <NuxtLink :to="`/forum/${post.board.slug}/${post.id}`" class="text-white font-medium hover:text-primary">
                      {{ post.title }}
                    </NuxtLink>
                    <div class="flex items-center gap-4 mt-2 text-text-muted text-sm">
                      <span>{{ post.board.name }}</span>
                      <span>{{ formatDate(post.createdAt) }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <template v-else-if="activeTab === 'favorites'">
                <h3 class="text-lg font-bold text-white mb-6">我的收藏</h3>
                <div class="text-text-muted text-center py-8">
                  暂无收藏
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, FileText, Bookmark, Lock } from 'lucide-vue-next'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: '个人中心 - 凯普软件'
})

const { user, isLoggedIn, updateProfile } = useAuth()

const tabs = [
  { label: '个人资料', value: 'profile', icon: User },
  { label: '修改密码', value: 'password', icon: Lock },
  { label: '我的帖子', value: 'posts', icon: FileText },
  { label: '我的收藏', value: 'favorites', icon: Bookmark }
]

const activeTab = ref('profile')
const successMessage = ref('')
const error = ref('')

const profileForm = reactive({
  username: '',
  email: '',
  bio: ''
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const userPosts = ref([
  {
    id: 1,
    title: 'MindLink 使用技巧分享',
    board: { name: 'MindLink交流', slug: 'mindlink' },
    createdAt: '2026-03-20'
  },
  {
    id: 2,
    title: 'HenryIway 工作流模板分享',
    board: { name: 'HenryIway交流', slug: 'henryiway' },
    createdAt: '2026-03-15'
  }
])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}

const saveProfile = async () => {
  successMessage.value = ''
  const result = await updateProfile({
    email: profileForm.email,
    bio: profileForm.bio
  })

  if (result.success) {
    successMessage.value = '保存成功'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

const changePassword = async () => {
  error.value = ''
  if (passwordForm.new !== passwordForm.confirm) {
    error.value = '两次输入的密码不一致'
    return
  }
}

watch(user, (newUser) => {
  if (newUser) {
    profileForm.username = newUser.username
    profileForm.email = newUser.email
    profileForm.bio = newUser.bio || ''
  }
}, { immediate: true })
</script>
