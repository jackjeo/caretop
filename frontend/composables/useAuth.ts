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
      const data = await $fetch<User>(`${config.public.apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = data
    } catch {
      user.value = null
      token.value = null
    }
  }

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      const data = await $fetch<{ token: string; user: User }>(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: credentials
      })
      token.value = data.token
      user.value = data.user
      if (import.meta.client) {
        localStorage.setItem('auth_token', data.token)
      }
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
      const response = await $fetch<{ token: string; user: User }>(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: data
      })
      token.value = response.token
      user.value = response.user
      if (import.meta.client) {
        localStorage.setItem('auth_token', response.token)
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
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    navigateTo('/')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!token.value) return { success: false, error: '未登录' }
    try {
      const updated = await $fetch<User>(`${config.public.apiBase}/auth/profile`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: data
      })
      user.value = updated
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.data?.message || '更新失败' }
    }
  }

  const initAuth = async () => {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        token.value = storedToken
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
