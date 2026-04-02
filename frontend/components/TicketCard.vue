<template>
  <NuxtLink
    :to="`/tickets/${ticket.id}`"
    class="glass-card p-5 hover:border-primary/50 transition-all duration-300 group block"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="px-2 py-1 text-xs font-medium rounded-lg"
            :class="statusClass"
          >
            {{ statusLabel }}
          </span>
          <span
            class="px-2 py-1 text-xs font-medium rounded-lg bg-cardHover text-text-secondary"
          >
            {{ typeLabel }}
          </span>
        </div>

        <h3 class="text-white font-medium group-hover:text-primary transition-colors line-clamp-1">
          {{ ticket.title }}
        </h3>

        <p class="text-text-muted text-sm mt-1 line-clamp-1">
          {{ ticket.content }}
        </p>

        <div class="flex items-center gap-3 mt-3 text-sm text-text-secondary">
          <span>{{ ticket.author.username }}</span>
          <span class="text-text-muted">·</span>
          <span>{{ formatDate(ticket.createdAt) }}</span>
          <span v-if="ticket.assignee" class="text-text-muted">·</span>
          <span v-if="ticket.assignee" class="text-text-secondary">
            分配给: {{ ticket.assignee.username }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 text-text-muted">
        <MessageCircle class="w-4 h-4" />
        <span class="text-sm">{{ ticket.replies?.length || 0 }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import type { Ticket, TicketStatus, TicketType } from '~/composables/useTicket'
import { useTicket } from '~/composables/useTicket'

const props = defineProps<{
  ticket: Ticket
}>()

const { statusLabels, typeLabels } = useTicket()

const statusClass = computed(() => {
  const classes: Record<TicketStatus, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    resolved: 'bg-green-500/20 text-green-400',
    closed: 'bg-gray-500/20 text-gray-400'
  }
  return classes[props.ticket.status]
})

const statusLabel = computed(() => statusLabels[props.ticket.status])
const typeLabel = computed(() => typeLabels[props.ticket.type])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
