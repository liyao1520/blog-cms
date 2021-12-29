<template>
  <el-row>
    <el-button type="primary" size="mini">新增用户</el-button>
  </el-row>
  <el-table :data="userData">
    <el-table-column prop="user_name" label="用户名" />
    <el-table-column prop="is_admin" label="是否管理员" />
    <el-table-column prop="avatar" label="头像" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createdAt" label="创建时间" />
    <el-table-column prop="updatedAt" label="更新时间" />
    /></el-table
  >
</template>

<script setup lang="ts">
import { reqUserList } from '@/service/user'
import { onMounted, ref } from 'vue'
const parmas = ref({
  pageNum: '1',
  pageSize: '10',
  pageFlag: 1
})
const userData = ref([])
onMounted(async () => {
  const res = await reqUserList(parmas.value)
  console.log(res)
  if (res.code == 0) {
    userData.value = res.result
  }
})
</script>

<style lang="less"></style>
