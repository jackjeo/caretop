<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="section-title text-white mb-2">我的工单</h1>
          <p class="text-text-secondary">查看和管理您的支持工单</p>
        </div>
        <NuxtLink to="/tickets/new" class="btn-primary flex items-center gap-2">
          <Plus class="w-5 h-5" />
          提交工单
        </NuxtLink>
      </div>

      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="status in statusFilters"
          :key="status.value"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
          :class="selectedStatus === status.value
            ? 'bg-primary text-white'
            : 'bg-card text-text-secondary hover:text-white'"
          @click="selectedStatus = status.value"
        >
          {{ status.label }}
          <span v-if="status.count" class="ml-1 opacity-60">({{ status.count }})</span>
        </button>
      </div>

      <div v-if="!isLoggedIn" class="glass-card p-12 text-center">
        <Ticket class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">请先登录</h3>
        <p class="text-text-secondary mb-4">登录后查看和管理您的工单</p>
        <NuxtLink to="/auth/login" class="btn-primary">
          登录
        </NuxtLink>
      </div>

      <div v-else-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="glass-card animate-pulse p-5">
          <div class="flex items-start gap-4">
            <div class="flex-1">
              <div class="h-5 bg-cardHover rounded w-1/4 mb-2" />
              <div class="h-4 bg-cardHover rounded w-3/4 mb-2" />
              <div class="h-4 bg-cardHover rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="tickets.length" class="space-y-4">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>

      <div v-else class="glass-card p-12 text-center">
        <Ticket class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-white mb-2">暂无工单</h3>
        <p class="text-text-secondary mb-4">您还没有提交过任何工单</p>
        <NuxtLink to="/tickets/new" class="btn-primary">
          提交工单
        </NuxtLink>
      </div>

      <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
        <div class="flex items-center gap-2">
          <button
            class="px-4 py-2 rounded-xl bg-card text-text-secondary hover:text-white disabled:opacity-50 transition-colors"
            :disabled="pagination.page <= 1"
            @click="handlePageChange(pagination.page - 1)"
          >
            上一页
          </button>
          <span class="px-4 py-2 text-text-secondary">
            第 {{ pagination.page }} / {{ pagination.totalPages }} 页
          </span>
          <button
            class="px-4 py-2 rounded-xl bg-card text-text-secondary hover:text-white disabled:opacity-50 transition-colors"
            :disabled="pagination.page >= pagination.totalPages"
            @click="handlePageChange(pagination.page + 1)"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Ticket } from 'lucide-vue-next'
import { useTicket, type TicketStatus } from '~/composables/useTicket'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: '工单 - 凯普软件'
})

const { tickets, isLoading, pagination, fetchTickets } = useTicket()
const { isLoggedIn } = useAuth()

const selectedStatus = ref<TicketStatus | 'all'>('all')

const statusFilters = computed(() => [
  { label: '全部', value: 'all', count: null },
  { label: '待处理', value: 'pending' as TicketStatus, count: tickets.value.filter(t => t.status === 'pending').length },
  { label: '处理中', value: 'processing' as TicketStatus, count: tickets.value.filter(t => t.status === 'processing').length },
  { label: '已解决', value: 'resolved' as TicketStatus, count: tickets.value.filter(t => t.status === 'resolved').length }
])

const handlePageChange = async (page: number) => {
  await fetchTickets({
    page,
    status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined
  })
}

watch(selectedStatus, () => {
  handlePageChange(1)
})

onMounted(() => {
  if (isLoggedIn.value) {
    fetchTickets({ page: 1 })
  }
})
</script>
