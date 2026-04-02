type ThemeMode = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'caretop-theme'

export const useTheme = () => {
  const mode = useState<ThemeMode>('theme-mode', () => 'system')
  const systemPrefersDark = useState<boolean>('system-prefers-dark', () => false)
  let media: MediaQueryList | null = null
  let onChange: ((e: MediaQueryListEvent) => void) | null = null

  const resolvedTheme = computed<'light' | 'dark'>(() => {
    if (mode.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return mode.value
  })

  const applyTheme = () => {
    if (!import.meta.client) return
    document.documentElement.setAttribute('data-theme', resolvedTheme.value)
  }

  const setThemeMode = (nextMode: ThemeMode) => {
    mode.value = nextMode
    if (import.meta.client) {
      localStorage.setItem(THEME_STORAGE_KEY, nextMode)
    }
    applyTheme()
  }

  onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    systemPrefersDark.value = media.matches

    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      mode.value = saved
    }

    onChange = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches
      if (mode.value === 'system') {
        applyTheme()
      }
    }

    media.addEventListener('change', onChange)
    applyTheme()
  })

  onBeforeUnmount(() => {
    if (media && onChange) {
      media.removeEventListener('change', onChange)
    }
  })

  return {
    mode,
    resolvedTheme,
    setThemeMode
  }
}

