<template>
  <div
    class="rounded-full bg-gradient-to-br from-primary-500 to-primary-700 ring-1 ring-primary/20 shadow-glow flex items-center justify-center text-[rgb(255,255,255)] font-medium overflow-hidden shrink-0"
    :class="sizeClasses"
  >
    <img
      v-if="user?.avatar"
      :src="user.avatar"
      :alt="user.username"
      class="w-full h-full object-cover"
    />
    <span v-else :class="textSizeClass">
      {{ displayName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/composables/useAuth'

const props = defineProps<{
  user?: { username: string; avatar?: string } | null
  size?: 'small' | 'medium' | 'large'
}>()

const sizeClasses = computed(() => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }
  return sizes[props.size || 'medium']
})

const textSizeClass = computed(() => {
  const sizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-xl'
  }
  return sizes[props.size || 'medium']
})

const displayName = computed(() => {
  if (!props.user?.username) return '?'
  return props.user.username.charAt(0).toUpperCase()
})
</script>
