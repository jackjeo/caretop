<template>
  <button
    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
    :class="isLiked
      ? 'bg-pink-500/20 text-pink-400'
      : 'bg-cardHover text-text-secondary hover:text-pink-400'"
    :disabled="isLoading"
    @click.prevent="handleClick"
  >
    <Heart
      class="w-4 h-4 transition-transform"
      :class="{ 'fill-current scale-110': isLiked }"
    />
    <span class="text-sm font-medium">{{ count }}</span>
  </button>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

const props = defineProps<{
  count: number
  isLiked?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  like: []
}>()

const isLoading = ref(false)

const handleClick = async () => {
  if (isLoading.value) return
  isLoading.value = true
  emit('like')
  isLoading.value = false
}
</script>
