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
        // 2026 高级感配色方案
        primary: {
          DEFAULT: '#6366F1',   // 主色：靛蓝（低饱和蓝紫）
          50: '#EEEEFF',
          100: '#E0E1FD',
          200: '#C7C8FB',
          300: '#A5A7F9',
          400: '#818CF8',      // 渐变浅色
          500: '#6366F1',      // 主色值
          600: '#4F46E5',      // 深色变体
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        accent: {
          DEFAULT: '#22D3EE',  // 点缀色：青蓝（10%占比）
          hover: '#06B6D4',
        },
        // 背景色系（中性过渡）
        background: '#0a0a0a',
        surface: {
          DEFAULT: '#111827',   // 卡片底色
          elevated: '#1F2937',  // 浮层
        },
        card: {
          DEFAULT: '#111827',
          hover: '#1a2035',
        },
        cardHover: '#1a2035',
        border: {
          DEFAULT: '#1F2937',
          subtle: '#374151',
        },
        // 文字色系（偏暖灰，减少冷感）
        text: {
          primary: '#F9FAFB',
          secondary: '#9CA3AF',  // 降饱和暖灰
          muted: '#6B7280',
        },
        // 状态色
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
        // 渐变色（CSS渐变使用）
        gradient: {
          primary: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
          accent: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
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
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 24px rgba(99, 102, 241, 0.25)',
        'glow-accent': '0 0 24px rgba(34, 211, 238, 0.2)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    }
  },
  plugins: []
}
