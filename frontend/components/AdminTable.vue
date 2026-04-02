<template>
  <div class="glass-card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-semibold text-white"
              :class="column.align === 'right' ? 'text-right' : 'text-left'"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="border-b border-border last:border-0 hover:bg-cardHover/50 transition-colors"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-4 text-sm"
              :class="column.align === 'right' ? 'text-right' : 'text-left'"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination" class="flex items-center justify-between px-4 py-3 border-t border-border">
      <div class="text-text-secondary text-sm">
        显示 {{ pagination.page * pagination.pageSize - pagination.pageSize + 1 }} - {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} 条，共 {{ pagination.total }} 条
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1.5 rounded-lg bg-cardHover text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="pagination.page <= 1"
          @click="$emit('page-change', pagination.page - 1)"
        >
          上一页
        </button>
        <span class="text-text-secondary text-sm">
          第 {{ pagination.page }} / {{ pagination.totalPages }} 页
        </span>
        <button
          class="px-3 py-1.5 rounded-lg bg-cardHover text-text-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="pagination.page >= pagination.totalPages"
          @click="$emit('page-change', pagination.page + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

defineProps<{
  columns: Column[]
  data: any[]
  pagination?: Pagination | null
}>()

defineEmits<{
  'page-change': [page: number]
}>()
</script>
