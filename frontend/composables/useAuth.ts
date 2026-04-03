export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  bio?: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = useState<User | null>('auth-user', () => null)
  const token = useState<string | null>('auth-token', () => null)
  const isLoading = ref(false)
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const response = await $fetch<{ code: number; message: string; data: User }>(`${config.public.apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = response.data
    } catch {
      user.value = null
      token.value = null
    }
  }

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      const response = await $fetch<{ code: number; message: string; data: { token: string; user: User } }>(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: credentials
      })
      const { token: authToken, user: authUser } = response.data
      // 保存 token 和 user 到 localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', authToken)
        localStorage.setItem('auth_user', JSON.stringify(authUser))
      }
      // 设置状态
      token.value = authToken
      user.value = authUser
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '登录失败' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    isLoading.value = true
    try {
      const response = await $fetch<{ code: number; message: string; data: { token: string; user: User } }>(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: data
      })
      const { token: authToken, user: authUser } = response.data
      token.value = authToken
      user.value = authUser
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', authToken)
        localStorage.setItem('auth_user', JSON.stringify(authUser))
      }
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '注册失败' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
    navigateTo('/')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!token.value) return { success: false, error: '未登录' }
    try {
      const response = await $fetch<{ code: number; message: string; data: User }>(`${config.public.apiBase}/auth/profile`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: data
      })
      user.value = response.data
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '更新失败' }
    }
  }

  const initAuth = async () => {
    if (typeof window === 'undefined') return // SSR 跳过
    
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (storedToken && !token.value) {
      token.value = storedToken
      // 优先从 localStorage 恢复 user，避免 API 调用失败
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch {
          // 解析失败，尝试调用 API
          await fetchUser()
        }
      } else {
        await fetchUser()
      }
    }
  }

  return {
    user,
    token,
    isLoading,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    fetchUser,
    initAuth
  }
}
