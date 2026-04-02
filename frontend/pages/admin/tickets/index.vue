<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-white mb-6">工单管理</h1>

    <!-- 筛选 -->
    <div class="flex gap-3 mb-4">
      <button v-for="s in statuses" :key="s.value"
              @click="filterStatus = s.value"
              class="px-3 py-1.5 rounded-lg text-sm transition-colors"
              :class="filterStatus === s.value ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'">
        {{ s.label }}
      </button>
    </div>

    <!-- 工单列表 -->
    <div class="space-y-3">
      <div v-for="ticket in filteredTickets" :key="ticket.id"
           class="bg-neutral-900 rounded-xl border border-neutral-800 p-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2 py-0.5 rounded text-xs font-medium" :class="typeClass(ticket.type)">
                {{ typeName(ticket.type) }}
              </span>
              <span class="px-2 py-0.5 rounded text-xs" :class="statusClass(ticket.status)">
                {{ statusName(ticket.status) }}
              </span>
            </div>
            <h3 class="text-white font-semibold">{{ ticket.title }}</h3>
          </div>
          <div class="text-xs text-neutral-500">{{ formatDate(ticket.created_at) }}</div>
        </div>
        <p class="text-neutral-400 text-sm mb-3 line-clamp-2">{{ ticket.content }}</p>
        <div class="flex items-center justify-between">
          <div class="text-xs text-neutral-500">
            用户: {{ ticket.user?.username }} · {{ ticket.user?.email }}
          </div>
          <button @click="openTicket(ticket)" class="text-blue-400 hover:text-blue-300 text-sm">查看详情</button>
        </div>
      </div>
      <div v-if="filteredTickets.length === 0" class="text-center text-neutral-500 py-12">
        暂无工单
      </div>
    </div>

    <!-- 工单详情弹窗 -->
    <div v-if="selectedTicket" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-neutral-900 rounded-xl border border-neutral-700 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div class="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">{{ selectedTicket.title }}</h2>
            <div class="flex items-center gap-2 mt-1">
              <span class="px-2 py-0.5 rounded text-xs" :class="typeClass(selectedTicket.type)">{{ typeName(selectedTicket.type) }}</span>
              <span class="px-2 py-0.5 rounded text-xs" :class="statusClass(selectedTicket.status)">{{ statusName(selectedTicket.status) }}</span>
            </div>
          </div>
          <button @click="selectedTicket = null" class="text-neutral-500 hover:text-white">✕</button>
        </div>
        <div class="p-6 flex-1 overflow-y-auto space-y-4">
          <!-- 用户提交 -->
          <div class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-white text-sm shrink-0">
              {{ selectedTicket.user?.username?.[0]?.toUpperCase() }}
            </div>
            <div class="flex-1">
              <div class="text-white text-sm font-medium">{{ selectedTicket.user?.username }}</div>
              <div class="text-neutral-300 text-sm mt-1">{{ selectedTicket.content }}</div>
              <div class="text-xs text-neutral-600 mt-1">{{ formatDateTime(selectedTicket.created_at) }}</div>
            </div>
          </div>
          <!-- 对话记录 -->
          <div v-for="reply in replies" :key="reply.id" class="flex gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0"
                 :class="reply.user?.role === 'admin' ? 'bg-blue-700' : 'bg-neutral-700'">
              {{ reply.user?.username?.[0]?.toUpperCase() }}
            </div>
            <div class="flex-1">
              <div class="text-white text-sm font-medium flex items-center gap-2">
                {{ reply.user?.username }}
                <span v-if="reply.user?.role === 'admin'" class="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded">官方</span>
              </div>
              <div class="text-neutral-300 text-sm mt-1">{{ reply.content }}</div>
              <div class="text-xs text-neutral-600 mt-1">{{ formatDateTime(reply.created_at) }}</div>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-neutral-800 space-y-3">
          <div class="flex gap-2 mb-2">
            <select v-model="newStatus" class="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm">
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="resolved">已解决</option>
              <option value="closed">已关闭</option>
            </select>
            <button @click="updateStatus" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm">更新状态</button>
          </div>
          <textarea v-model="replyContent" rows="3" placeholder="输入回复内容..."
                    class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm resize-none"></textarea>
          <button @click="sendReply" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm">
            发送回复
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data, refresh } = await useFetch('/api/v1/admin/tickets', { headers: useRequestHeaders(['cookie']) })

const filterStatus = ref('')
const selectedTicket = ref<any>(null)
const newStatus = ref('')
const replyContent = ref('')

const statuses = [
  { label: '全部', value: '' },
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已解决', value: 'resolved' },
  { label: '已关闭', value: 'closed' },
]

const filteredTickets = computed(() => {
  const list = (data.value as any)?.data || []
  if (!filterStatus.value) return list
  return list.filter((t: any) => t.status === filterStatus.value)
})

const replies = computed(() => (selectedTicket.value as any)?.replies || [])

function typeName(t: string) {
  return { bug: 'Bug报告', feature: '功能建议', consult: '使用咨询', business: '商务合作' }[t] || t
}
function typeClass(t: string) {
  return { bug: 'bg-red-900 text-red-300', feature: 'bg-purple-900 text-purple-300', consult: 'bg-blue-900 text-blue-300', business: 'bg-yellow-900 text-yellow-300' }[t] || ''
}
function statusName(s: string) {
  return { pending: '待处理', processing: '处理中', resolved: '已解决', closed: '已关闭' }[s] || s
}
function statusClass(s: string) {
  return { pending: 'bg-yellow-900 text-yellow-300', processing: 'bg-blue-900 text-blue-300', resolved: 'bg-green-900 text-green-300', closed: 'bg-neutral-700 text-neutral-400' }[s] || ''
}
function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('zh-CN') : '-'
}
function formatDateTime(d: string) {
  return d ? new Date(d).toLocaleString('zh-CN') : '-'
}

async function openTicket(ticket: any) {
  selectedTicket.value = ticket
  newStatus.value = ticket.status
  replyContent.value = ''
}

async function updateStatus() {
  await $fetch(`/api/v1/admin/tickets/${selectedTicket.value.id}/status`, {
    method: 'PUT',
    body: { status: newStatus.value }
  })
  refresh()
}

async function sendReply() {
  if (!replyContent.value.trim()) return
  await $fetch(`/api/v1/tickets/${selectedTicket.value.id}/reply`, {
    method: 'POST',
    body: { content: replyContent.value }
  })
  replyContent.value = ''
  // 重新获取工单详情
  const detail = await $fetch(`/api/v1/tickets/${selectedTicket.value.id}`, {
    headers: useRequestHeaders(['cookie'])
  })
  selectedTicket.value = detail
}
</script>
