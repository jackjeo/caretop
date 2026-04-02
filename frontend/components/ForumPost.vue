<template>
  <div class="glass-card p-5">
    <div class="flex items-start gap-4">
      <UserAvatar :user="reply.author" size="medium" />

      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-white font-medium">{{ reply.author.username }}</span>
            <span
              v-if="reply.isStaff"
              class="px-1.5 py-0.5 text-xs font-medium rounded bg-primary/20 text-primary"
            >
              官方
            </span>
            <span class="text-text-muted text-sm">
              {{ formatDate(reply.createdAt) }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <LikeButton
              :count="reply.likes"
              :is-liked="reply.isLiked"
              @like="handleLike"
            />
            <button
              v-if="canReply"
              class="text-text-secondary hover:text-primary transition-colors text-sm"
              @click="showReplyForm = !showReplyForm"
            >
              回复
            </button>
          </div>
        </div>

        <div class="mt-3">
          <MarkdownRenderer :content="reply.content" />
        </div>

        <div v-if="showReplyForm" class="mt-4">
          <textarea
            v-model="replyContent"
            class="input-field w-full min-h-[100px] resize-none"
            placeholder="写下你的回复..."
          />
          <div class="flex justify-end gap-2 mt-2">
            <button class="btn-secondary" @click="showReplyForm = false">取消</button>
            <button class="btn-primary" :disabled="isSubmitting" @click="submitReply">
              {{ isSubmitting ? '提交中...' : '提交回复' }}
            </button>
          </div>
        </div>

        <div v-if="reply.replies?.length" class="mt-4 space-y-3">
          <ForumPost
            v-for="childReply in reply.replies"
            :key="childReply.id"
            :reply="childReply"
            :thread-id="threadId"
            :can-reply="canReply"
            @replied="$emit('replied')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ForumReply } from '~/composables/useForum'
import { useForum } from '~/composables/useForum'

const props = defineProps<{
  reply: ForumReply
  threadId: number
  canReply?: boolean
}>()

const emit = defineEmits<{
  replied: []
}>()

const { likeReply, replyThread } = useForum()
const showReplyForm = ref(false)
const replyContent = ref('')
const isSubmitting = ref(false)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLike = async () => {
  await likeReply(props.reply.id)
}

const submitReply = async () => {
  if (!replyContent.value.trim()) return
  isSubmitting.value = true
  try {
    await replyThread(props.threadId, replyContent.value, props.reply.id)
    replyContent.value = ''
    showReplyForm.value = false
    emit('replied')
  } finally {
    isSubmitting.value = false
  }
}
</script>
