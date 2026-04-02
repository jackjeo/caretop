export interface ForumBoard {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  threadCount: number
  postCount: number
  lastThread?: {
    title: string
    author: string
    createdAt: string
  }
}

export interface ForumThread {
  id: number
  title: string
  content: string
  author: {
    id: number
    username: string
    avatar?: string
  }
  board: {
    id: number
    name: string
    slug: string
  }
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  replies: number
  isPinned: boolean
  isEssence: boolean
  isLiked?: boolean
  isFavorited?: boolean
  lastReply?: {
    author: string
    createdAt: string
  }
}

export interface ForumReply {
  id: number
  content: string
  author: {
    id: number
    username: string
    avatar?: string
  }
  threadId: number
  parentId?: number
  createdAt: string
  likes: number
  isLiked?: boolean
  replies?: ForumReply[]
}

export const useForum = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  const boards = ref<ForumBoard[]>([])
  const currentBoard = ref<ForumBoard | null>(null)
  const threads = ref<ForumThread[]>([])
  const currentThread = ref<ForumThread | null>(null)
  const replies = ref<ForumReply[]>([])
  const isLoading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  const fetchBoards = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<ForumBoard[]>(`${config.public.apiBase}/forum/boards`)
      boards.value = data
    } finally {
      isLoading.value = false
    }
  }

  const fetchBoard = async (slug: string) => {
    isLoading.value = true
    try {
      const data = await $fetch<ForumBoard>(`${config.public.apiBase}/forum/boards/${slug}`)
      currentBoard.value = data
    } finally {
      isLoading.value = false
    }
  }

  const fetchThreads = async (boardSlug: string, params?: {
    page?: number
    sort?: 'latest' | 'hot' | 'essence'
    search?: string
  }) => {
    isLoading.value = true
    try {
      const query = new URLSearchParams()
      if (params?.page) query.set('page', params.page.toString())
      if (params?.sort) query.set('sort', params.sort)
      if (params?.search) query.set('search', params.search)

      const data = await $fetch<{
        threads: ForumThread[]
        pagination: typeof pagination.value
      }>(`${config.public.apiBase}/forum/boards/${boardSlug}/threads?${query.toString()}`)

      threads.value = data.threads
      pagination.value = data.pagination
    } finally {
      isLoading.value = false
    }
  }

  const fetchThread = async (boardSlug: string, threadId: number) => {
    isLoading.value = true
    try {
      const headers: Record<string, string> = {}
      if (token.value) headers.Authorization = `Bearer ${token.value}`

      const data = await $fetch<ForumThread>(`${config.public.apiBase}/forum/boards/${boardSlug}/threads/${threadId}`, { headers })
      currentThread.value = data
    } finally {
      isLoading.value = false
    }
  }

  const fetchReplies = async (threadId: number) => {
    try {
      const data = await $fetch<ForumReply[]>(`${config.public.apiBase}/forum/threads/${threadId}/replies`)
      replies.value = data
    } catch {
      replies.value = []
    }
  }

  const createThread = async (boardSlug: string, data: { title: string; content: string }) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const thread = await $fetch<ForumThread>(`${config.public.apiBase}/forum/boards/${boardSlug}/threads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: data
      })
      return { success: true, thread }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '创建失败' }
    }
  }

  const replyThread = async (threadId: number, content: string, parentId?: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const reply = await $fetch<ForumReply>(`${config.public.apiBase}/forum/threads/${threadId}/replies`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: { content, parentId }
      })
      replies.value.push(reply)
      return { success: true, reply }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '回复失败' }
    }
  }

  const likeThread = async (threadId: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/forum/threads/${threadId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '操作失败' }
    }
  }

  const favoriteThread = async (threadId: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/forum/threads/${threadId}/favorite`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '操作失败' }
    }
  }

  const likeReply = async (replyId: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/forum/replies/${replyId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '操作失败' }
    }
  }

  const manageThread = async (threadId: number, action: 'pin' | 'unpin' | 'essence' | 'unessence' | 'delete') => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/admin/forum/threads/${threadId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: { action }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '操作失败' }
    }
  }

  return {
    boards,
    currentBoard,
    threads,
    currentThread,
    replies,
    isLoading,
    pagination,
    fetchBoards,
    fetchBoard,
    fetchThreads,
    fetchThread,
    fetchReplies,
    createThread,
    replyThread,
    likeThread,
    favoriteThread,
    likeReply,
    manageThread
  }
}
