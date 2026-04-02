import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()
  
  // 在 app 启动时初始化 auth 状态
  initAuth()
})
