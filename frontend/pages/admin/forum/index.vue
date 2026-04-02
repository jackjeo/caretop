<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-white mb-6">论坛管理</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 板块管理 -->
      <div class="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">板块管理</h2>
          <button @click="showBoardModal = true" class="text-sm text-blue-400 hover:text-blue-300">+ 添加板块</button>
        </div>
        <div class="space-y-2">
          <div v-for="board in boards" :key="board.id"
               class="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
            <div>
              <div class="text-white font-medium">{{ board.name }}</div>
              <div class="text-xs text-neutral-500">/{{ board.slug }}</div>
            </div>
            <button @click="deleteBoard(board.id)" class="text-red-400 hover:text-red-300 text-xs">删除</button>
          </div>
        </div>
      </div>

      <!-- 帖子管理 -->
      <div class="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h2 class="text-lg font-semibold text-white mb-4">帖子管理</h2>
        <div class="space-y-2 max-h-80 overflow-y-auto">
          <div v-for="thread in threads" :key="thread.id"
               class="p-3 bg-neutral-800 rounded-lg">
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="text-white text-sm font-medium truncate">{{ thread.title }}</div>
                <div class="text-xs text-neutral-500 mt-1">
                  {{ thread.board?.name }} · {{ thread.user?.username }}
                </div>
              </div>
              <div class="flex gap-2 ml-2 shrink-0">
                <button v-if="!thread.is_pinned" @click="pinThread(thread)" class="text-yellow-400 hover:text-yellow-300 text-xs">置顶</button>
                <button v-if="!thread.is_essential" @click="essentialThread(thread)" class="text-cyan-300 hover:text-cyan-200 text-xs">加精</button>
                <button @click="deleteThread(thread.id)" class="text-red-400 hover:text-red-300 text-xs">删</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户管理 -->
    <div class="mt-6 bg-neutral-900 rounded-xl border border-neutral-800 p-6">
      <h2 class="text-lg font-semibold text-white mb-4">用户管理</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-neutral-400 border-b border-neutral-800">
            <tr>
              <th class="text-left py-2 px-3">用户名</th>
              <th class="text-left py-2 px-3">邮箱</th>
              <th class="text-left py-2 px-3">角色</th>
              <th class="text-left py-2 px-3">状态</th>
              <th class="text-left py-2 px-3">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-800">
            <tr v-for="user in users" :key="user.id" class="hover:bg-neutral-800/50">
              <td class="py-2 px-3 text-white">{{ user.username }}</td>
              <td class="py-2 px-3 text-neutral-400">{{ user.email }}</td>
              <td class="py-2 px-3">
                <select v-model="user.role" @change="changeRole(user)"
                        class="bg-neutral-800 border border-neutral-700 rounded text-xs px-2 py-1 text-white">
                  <option value="user">用户</option>
                  <option value="moderator">版主</option>
                  <option value="admin">管理员</option>
                </select>
              </td>
              <td class="py-2 px-3">
                <span v-if="user.is_banned" class="text-red-400 text-xs">已禁言</span>
                <span v-else class="text-green-400 text-xs">正常</span>
              </td>
              <td class="py-2 px-3">
                <button v-if="!user.is_banned" @click="banUser(user)" class="text-red-400 hover:text-red-300 text-xs">禁言</button>
                <button v-else @click="unbanUser(user)" class="text-green-400 hover:text-green-300 text-xs">解禁</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加板块弹窗 -->
    <div v-if="showBoardModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-neutral-900 rounded-xl border border-neutral-700 w-full max-w-md p-6">
        <h3 class="text-lg font-bold text-white mb-4">添加板块</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-neutral-400 mb-1">板块名称</label>
            <input v-model="boardForm.name" type="text" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">Slug</label>
            <input v-model="boardForm.slug" type="text" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm text-neutral-400 mb-1">描述</label>
            <textarea v-model="boardForm.description" rows="2" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-4">
          <button @click="showBoardModal = false" class="px-4 py-2 text-neutral-400 hover:text-white">取消</button>
          <button @click="createBoard" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">创建</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: boardsData } = await useFetch('/api/v1/admin/forum/stats', { headers: useRequestHeaders(['cookie']) })
const { data: usersData, refresh: refreshUsers } = await useFetch('/api/v1/admin/users', { headers: useRequestHeaders(['cookie']) })
const { data: threadsData } = await useFetch('/api/v1/forum/boards', { headers: useRequestHeaders(['cookie']) })

const boards = computed(() => (boardsData.value as any)?.boards || [])
const users = computed(() => (usersData.value as any)?.data || [])
const threads = computed(() => (threadsData.value as any)?.threads?.slice(0, 20) || [])

const showBoardModal = ref(false)
const boardForm = ref({ name: '', slug: '', description: '' })

async function createBoard() {
  await $fetch('/api/v1/admin/forum/boards', { method: 'POST', body: boardForm.value })
  showBoardModal.value = false
  boardForm.value = { name: '', slug: '', description: '' }
}

async function deleteBoard(id: number) {
  if (!confirm('确定删除该板块？')) return
  await $fetch(`/api/v1/admin/forum/boards/${id}`, { method: 'DELETE' })
  refresh()
}

async function pinThread(thread: any) {
  await $fetch(`/api/v1/admin/forum/threads/${thread.id}/pin`, { method: 'PUT' })
  refresh()
}

async function essentialThread(thread: any) {
  await $fetch(`/api/v1/admin/forum/threads/${thread.id}/essential`, { method: 'PUT' })
  refresh()
}

async function deleteThread(id: string) {
  if (!confirm('确定删除该帖？')) return
  await $fetch(`/api/v1/admin/forum/threads/${id}`, { method: 'DELETE' })
  refresh()
}

async function changeRole(user: any) {
  await $fetch(`/api/v1/admin/users/${user.id}/role`, { method: 'PUT', body: { role: user.role } })
  refreshUsers()
}

async function banUser(user: any) {
  await $fetch(`/api/v1/admin/users/${user.id}/ban`, { method: 'PUT' })
  refreshUsers()
}

async function unbanUser(user: any) {
  await $fetch(`/api/v1/admin/users/${user.id}/ban`, { method: 'DELETE' })
  refreshUsers()
}

const refresh = () => {
  refreshUsers()
}
</script>
