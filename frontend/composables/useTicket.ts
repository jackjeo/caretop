export type TicketStatus = 'pending' | 'processing' | 'resolved' | 'closed'
export type TicketType = 'bug' | 'feature' | 'question' | 'other'

export interface Ticket {
  id: number
  title: string
  content: string
  type: TicketType
  status: TicketStatus
  attachments?: string[]
  author: {
    id: number
    username: string
    avatar?: string
  }
  assignee?: {
    id: number
    username: string
  }
  createdAt: string
  updatedAt: string
  replies: TicketReply[]
}

export interface TicketReply {
  id: number
  content: string
  author: {
    id: number
    username: string
    avatar?: string
  }
  isStaff: boolean
  createdAt: string
}

export interface CreateTicketData {
  type: TicketType
  title: string
  content: string
  attachments?: File[]
}

export const useTicket = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  const tickets = ref<Ticket[]>([])
  const currentTicket = ref<Ticket | null>(null)
  const isLoading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const statusLabels: Record<TicketStatus, string> = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已解决',
    closed: '已关闭'
  }

  const typeLabels: Record<TicketType, string> = {
    bug: 'Bug反馈',
    feature: '功能请求',
    question: '问题咨询',
    other: '其他'
  }

  const fetchTickets = async (params?: {
    page?: number
    status?: TicketStatus
  }) => {
    isLoading.value = true
    try {
      const query = new URLSearchParams()
      if (params?.page) query.set('page', params.page.toString())
      if (params?.status) query.set('status', params.status)

      const data = await $fetch<{
        tickets: Ticket[]
        pagination: typeof pagination.value
      }>(`${config.public.apiBase}/tickets?${query.toString()}`, {
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
      })

      tickets.value = data.tickets
      pagination.value = data.pagination
    } finally {
      isLoading.value = false
    }
  }

  const fetchTicket = async (id: number) => {
    isLoading.value = true
    try {
      const data = await $fetch<Ticket>(`${config.public.apiBase}/tickets/${id}`, {
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
      })
      currentTicket.value = data
    } finally {
      isLoading.value = false
    }
  }

  const createTicket = async (data: CreateTicketData) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const formData = new FormData()
      formData.append('type', data.type)
      formData.append('title', data.title)
      formData.append('content', data.content)
      if (data.attachments) {
        data.attachments.forEach(file => formData.append('attachments', file))
      }

      const ticket = await $fetch<Ticket>(`${config.public.apiBase}/tickets`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: formData
      })
      return { success: true, ticket }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '创建失败' }
    }
  }

  const replyTicket = async (id: number, content: string) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const reply = await $fetch<TicketReply>(`${config.public.apiBase}/tickets/${id}/replies`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: { content }
      })
      if (currentTicket.value) {
        currentTicket.value.replies.push(reply)
      }
      return { success: true, reply }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '回复失败' }
    }
  }

  const updateTicketStatus = async (id: number, status: TicketStatus) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/tickets/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: { status }
      })
      if (currentTicket.value) {
        currentTicket.value.status = status
      }
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '更新失败' }
    }
  }

  return {
    tickets,
    currentTicket,
    isLoading,
    pagination,
    statusLabels,
    typeLabels,
    fetchTickets,
    fetchTicket,
    createTicket,
    replyTicket,
    updateTicketStatus
  }
}
