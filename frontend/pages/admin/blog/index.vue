<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">博客管理</h1>
      <button @click="showCreateModal = true"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
        + 创建文章
      </button>
    </div>

    <!-- 筛选 -->
    <div class="flex gap-4 mb-4">
      <select v-model="filterCategory" class="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm">
        <option value="">全部分类</option>
        <option value="tech">技术文章</option>
        <option value="product">产品动态</option>
        <option value="industry">行业洞察</option>
      </select>
    </div>

    <!-- 文章列表 -->
    <div class="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
      <table class="w-full">
        <thead class="bg-neutral-800 text-neutral-400 text-sm">
          <tr>
            <th class="text-left px-4 py-3">标题</th>
            <th class="text-left px-4 py-3">分类</th>
            <th class="text-left px-4 py-3">作者</th>
            <th class="text-left px-4 py-3">阅读</th>
            <th class="text-left px-4 py-3">状态</th>
            <th class="text-left px-4 py-3">发布时间</th>
            <th class="text-left px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-800 text-sm">
          <tr v-for="post in filteredPosts" :key="post.id" class="hover:bg-neutral-800/50">
            <td class="px-4 py-3 text-white font-medium">{{ post.title }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded text-xs" :class="categoryClass(post.category)">
                {{ categoryName(post.category) }}
              </span>
            </td>
            <td class="px-4 py-3 text-neutral-400">{{ post.author?.username }}</td>
            <td class="px-4 py-3 text-neutral-400">{{ post.view_count }}</td>
            <td class="px-4 py-3">
              <span v-if="post.is_published" class="text-green-400 text-xs">已发布</span>
              <span v-else class="text-yellow-400 text-xs">草稿</span>
            </td>
            <td class="px-4 py-3 text-neutral-400">{{ formatDate(post.published_at) }}</td>
            <td class="px-4 py-3">
              <button @click="editPost(post)" class="text-blue-400 hover:text-blue-300 mr-3 text-xs">编辑</button>
              <button @click="deletePost(post.id)" class="text-red-400 hover:text-red-300 text-xs">删除</button>
            </td>
          </tr>
          <tr v-if="posts.length === 0">
            <td colspan="7" class="px-4 py-8 text-center text-neutral-500">暂无文章</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 创建/编辑弹窗 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-neutral-900 rounded-xl border border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-neutral-800">
          <h2 class="text-xl font-bold text-white">{{ editingPost ? '编辑文章' : '创建文章' }}</h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm text-neutral-400 mb-1">标题</label>
            <input v-model="form.title" type="text"
                   class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">分类</label>
            <select v-model="form.category" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
              <option value="tech">技术文章</option>
              <option value="product">产品动态</option>
              <option value="industry">行业洞察</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">摘要</label>
            <textarea v-model="form.summary" rows="2"
                      class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"></textarea>
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">内容 (Markdown)</label>
            <textarea v-model="form.content" rows="10"
                      class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white font-mono text-sm"></textarea>
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">封面图 URL</label>
            <input v-model="form.cover_image_url" type="text"
                   class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
          </div>
          <div class="flex items-center gap-2">
            <input v-model="form.is_published" type="checkbox" id="published" class="w-4 h-4" />
            <label for="published" class="text-sm text-neutral-300">立即发布</label>
          </div>
        </div>
        <div class="p-6 border-t border-neutral-800 flex justify-end gap-3">
          <button @click="showCreateModal = false" class="px-4 py-2 text-neutral-400 hover:text-white">取消</button>
          <button @click="savePost" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
            {{ editingPost ? '保存' : '创建' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: posts, refresh } = await useFetch('/api/v1/admin/blog', {
  headers: useRequestHeaders(['cookie']),
})

const filterCategory = ref('')
const showCreateModal = ref(false)
const editingPost = ref<any>(null)
const form = ref({
  title: '',
  category: 'tech',
  summary: '',
  content: '',
  cover_image_url: '',
  is_published: false,
})

const filteredPosts = computed(() => {
  if (!posts.value?.data) return []
  if (!filterCategory.value) return posts.value.data
  return posts.value.data.filter((p: any) => p.category === filterCategory.value)
})

function categoryName(cat: string) {
  return { tech: '技术文章', product: '产品动态', industry: '行业洞察' }[cat] || cat
}

function categoryClass(cat: string) {
  return { tech: 'bg-blue-900 text-blue-300', product: 'bg-green-900 text-green-300', industry: 'bg-purple-900 text-purple-300' }[cat] || ''
}

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('zh-CN') : '-'
}

function editPost(post: any) {
  editingPost.value = post
  form.value = { ...post }
  showCreateModal.value = true
}

async function savePost() {
  const method = editingPost.value ? 'PUT' : 'POST'
  const url = editingPost.value ? `/api/v1/admin/blog/${editingPost.value.id}` : '/api/v1/admin/blog'
  await $fetch(url, { method, body: form.value })
  showCreateModal.value = false
  refresh()
}

async function deletePost(id: string) {
  if (!confirm('确定删除这篇文章？')) return
  await $fetch(`/api/v1/admin/blog/${id}`, { method: 'DELETE' })
  refresh()
}
</script>
