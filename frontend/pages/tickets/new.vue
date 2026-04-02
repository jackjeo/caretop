<template>
  <div class="py-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink to="/tickets" class="text-text-secondary hover:text-primary transition-colors">
          ← 返回工单列表
        </NuxtLink>
      </div>

      <div class="glass-card p-6">
        <h1 class="text-2xl font-bold text-white mb-6">提交工单</h1>

        <div v-if="!isLoggedIn" class="text-center py-8">
          <p class="text-text-secondary mb-4">请先登录后再提交工单</p>
          <NuxtLink to="/auth/login" class="btn-primary">
            登录
          </NuxtLink>
        </div>

        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-text-secondary text-sm mb-2">工单类型</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="type in ticketTypes"
                :key="type.value"
                type="button"
                class="p-4 rounded-xl border transition-all text-left"
                :class="form.type === type.value
                  ? 'border-primary bg-primary/10 text-white'
                  : 'border-border bg-cardHover text-text-secondary hover:border-primary/50'"
                @click="form.type = type.value"
              >
                <component :is="type.icon" class="w-6 h-6 mb-2" />
                <div class="font-medium">{{ type.label }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-text-secondary text-sm mb-2">标题</label>
            <input
              v-model="form.title"
              type="text"
              class="input-field w-full"
              placeholder="请简要描述您的问题"
              required
            />
          </div>

          <div>
            <label class="block text-text-secondary text-sm mb-2">详细描述</label>
            <textarea
              v-model="form.content"
              class="input-field w-full min-h-[200px] resize-none"
              placeholder="请详细描述您遇到的问题，包括复现步骤、环境信息等"
              required
            />
          </div>

          <div>
            <label class="block text-text-secondary text-sm mb-2">附件（可选）</label>
            <div
              class="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <input
                ref="fileInput"
                type="file"
                multiple
                class="hidden"
                @change="handleFileSelect"
              />
              <Upload class="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p class="text-text-secondary">
                拖拽文件到此处，或 <span class="text-primary">点击上传</span>
              </p>
              <p class="text-text-muted text-sm mt-2">
                支持 jpg、png、pdf、zip 格式，单个文件不超过 10MB
              </p>
            </div>

            <div v-if="form.attachments.length" class="mt-4 space-y-2">
              <div
                v-for="(file, index) in form.attachments"
                :key="index"
                class="flex items-center justify-between p-3 bg-cardHover rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <File class="w-5 h-5 text-text-muted" />
                  <span class="text-text-secondary text-sm">{{ file.name }}</span>
                </div>
                <button
                  type="button"
                  class="text-text-muted hover:text-red-400 transition-colors"
                  @click="removeAttachment(index)"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <NuxtLink to="/tickets" class="btn-secondary">
              取消
            </NuxtLink>
            <button
              type="submit"
              class="btn-primary"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '提交中...' : '提交工单' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bug, Lightbulb, HelpCircle, MoreHorizontal, Upload, File, X } from 'lucide-vue-next'
import { useTicket, type TicketType, type CreateTicketData } from '~/composables/useTicket'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: '提交工单 - 凯普软件'
})

const { createTicket } = useTicket()
const { isLoggedIn } = useAuth()

const router = useRouter()

const ticketTypes = [
  { label: 'Bug反馈', value: 'bug' as TicketType, icon: Bug },
  { label: '功能请求', value: 'feature' as TicketType, icon: Lightbulb },
  { label: '问题咨询', value: 'question' as TicketType, icon: HelpCircle },
  { label: '其他', value: 'other' as TicketType, icon: MoreHorizontal }
]

const form = reactive({
  type: 'question' as TicketType,
  title: '',
  content: '',
  attachments: [] as File[]
})

const fileInput = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const handleFileDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files))
  }
}

const addFiles = (files: File[]) => {
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip']
  const maxSize = 10 * 1024 * 1024

  for (const file of files) {
    if (!validTypes.includes(file.type)) {
      continue
    }
    if (file.size > maxSize) {
      continue
    }
    form.attachments.push(file)
  }
}

const removeAttachment = (index: number) => {
  form.attachments.splice(index, 1)
}

const handleSubmit = async () => {
  if (!form.title.trim() || !form.content.trim()) return

  isSubmitting.value = true
  try {
    const data: CreateTicketData = {
      type: form.type,
      title: form.title,
      content: form.content,
      attachments: form.attachments.length ? form.attachments : undefined
    }

    const result = await createTicket(data)
    if (result.success) {
      router.push('/tickets')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
