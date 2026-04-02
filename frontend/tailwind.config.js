/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.ts'
  ],
  theme: {
    extend: {
      colors: {
        // 薄荷清新配色方案（参考图片：青绿渐变）
        primary: {
          DEFAULT: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          DEFAULT: '#FACC15',
          hover: '#EAB308',
        },
        // 背景色系（中性过渡）
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--color-card) / <alpha-value>)',
          hover: 'rgb(var(--color-card-hover) / <alpha-value>)',
        },
        cardHover: 'rgb(var(--color-card-hover) / <alpha-value>)',
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
        },
        // 文字色系（偏暖灰，减少冷感）
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        // 状态色
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
        // 渐变色（CSS渐变使用）
        gradient: {
          primary: 'linear-gradient(135deg, #34D399 0%, #22D3EE 55%, #A3E635 100%)',
          accent: 'linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)',
          subtle: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px'
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(2, 6, 23, 0.18)',
        'glow': '0 0 28px rgba(52, 211, 153, 0.30)',
        'glow-accent': '0 0 28px rgba(250, 204, 21, 0.28)',
        'card': '0 4px 16px rgba(2, 6, 23, 0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    }
  },
  plugins: []
}
