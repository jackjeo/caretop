<template>
  <div class="markdown-content prose prose-invert max-w-none" v-html="renderedContent" />
</template>

<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

marked.setOptions({
  breaks: true,
  gfm: true
})

const renderedContent = computed(() => {
  return marked(props.content) as string
})
</script>

<style scoped>
.markdown-content :deep(h1) {
  @apply text-2xl font-bold text-white mt-8 mb-4;
}

.markdown-content :deep(h2) {
  @apply text-xl font-bold text-white mt-6 mb-3;
}

.markdown-content :deep(h3) {
  @apply text-lg font-semibold text-white mt-4 mb-2;
}

.markdown-content :deep(p) {
  @apply text-text-secondary my-4 leading-relaxed;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  @apply my-4 pl-6 text-text-secondary;
}

.markdown-content :deep(li) {
  @apply my-1;
}

.markdown-content :deep(a) {
  @apply text-primary hover:underline;
}

.markdown-content :deep(code) {
  @apply bg-card px-1.5 py-0.5 rounded text-sm text-primary;
}

.markdown-content :deep(pre) {
  @apply bg-card rounded-xl p-4 my-4 overflow-x-auto;
}

.markdown-content :deep(pre code) {
  @apply bg-transparent p-0 text-text-secondary;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-primary pl-4 my-4 text-text-muted italic;
}

.markdown-content :deep(img) {
  @apply rounded-xl my-4 max-w-full;
}

.markdown-content :deep(table) {
  @apply w-full my-4 border-collapse;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  @apply border border-border px-4 py-2 text-left;
}

.markdown-content :deep(th) {
  @apply bg-card text-white font-semibold;
}

.markdown-content :deep(hr) {
  @apply border-border my-8;
}
</style>
