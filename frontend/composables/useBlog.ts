export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: '技术文章' | '产品动态' | '行业洞察'
  author: {
    id: number
    username: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  isLiked?: boolean
}

export interface BlogComment {
  id: number
  content: string
  author: {
    id: number
    username: string
    avatar?: string
  }
  createdAt: string
  likes: number
  replies?: BlogComment[]
}

export const useBlog = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  const posts = ref<BlogPost[]>([])
  const currentPost = ref<BlogPost | null>(null)
  const comments = ref<BlogComment[]>([])
  const isLoading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  })

  const fetchPosts = async (params?: {
    page?: number
    category?: string
    search?: string
  }) => {
    isLoading.value = true
    try {
      const query = new URLSearchParams()
      if (params?.page) query.set('page', params.page.toString())
      if (params?.category) query.set('category', params.category)
      if (params?.search) query.set('search', params.search)

      const data = await $fetch<{
        posts: BlogPost[]
        pagination: typeof pagination.value
      }>(`${config.public.apiBase}/blog?${query.toString()}`)

      posts.value = data.posts
      pagination.value = data.pagination
    } finally {
      isLoading.value = false
    }
  }

  const fetchPost = async (slug: string) => {
    isLoading.value = true
    try {
      const headers: Record<string, string> = {}
      if (token.value) headers.Authorization = `Bearer ${token.value}`

      const data = await $fetch<BlogPost>(`${config.public.apiBase}/blog/${slug}`, { headers })
      currentPost.value = data
    } finally {
      isLoading.value = false
    }
  }

  const fetchComments = async (postId: number) => {
    try {
      const data = await $fetch<BlogComment[]>(`${config.public.apiBase}/blog/${postId}/comments`)
      comments.value = data
    } catch {
      comments.value = []
    }
  }

  const createPost = async (data: Partial<BlogPost>) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const newPost = await $fetch<BlogPost>(`${config.public.apiBase}/blog`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: data
      })
      return { success: true, post: newPost }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '创建失败' }
    }
  }

  const updatePost = async (id: number, data: Partial<BlogPost>) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const updated = await $fetch<BlogPost>(`${config.public.apiBase}/blog/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: data
      })
      return { success: true, post: updated }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '更新失败' }
    }
  }

  const deletePost = async (id: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token.value}` }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '删除失败' }
    }
  }

  const likePost = async (postId: number) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      await $fetch(`${config.public.apiBase}/blog/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '操作失败' }
    }
  }

  const addComment = async (postId: number, content: string) => {
    if (!token.value) return { success: false, error: '请先登录' }
    try {
      const comment = await $fetch<BlogComment>(`${config.public.apiBase}/blog/${postId}/comments`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: { content }
      })
      comments.value.push(comment)
      return { success: true, comment }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '评论失败' }
    }
  }

  return {
    posts,
    currentPost,
    comments,
    isLoading,
    pagination,
    fetchPosts,
    fetchPost,
    fetchComments,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment
  }
}
