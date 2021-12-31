<template>
  <el-row>
    <el-button type="primary" size="mini" @click="addTagHandle"
      >新增Tag</el-button
    >
  </el-row>
  <my-table :method="reqTagList" ref="tableRef">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="标签" />
    />
    <el-table-column>
      <template #default="{ row }">
        <el-button type="danger" @click="delTagHandle(row)">删除</el-button>
      </template>
    </el-table-column>
  </my-table>
</template>

<script setup lang="ts">
import MyTable from '@/components/base-ui/table/index.vue'
import { reqTagList, reqDelTag, reqAddTag } from '@/service/tag'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const tableRef = ref<InstanceType<typeof MyTable> | null>(null)
const delTagHandle = async ({ id, name }: { id: number; name: string }) => {
  ElMessageBox.confirm(
    `是否删除标签'${name}'
  `,
    '删除标签'
  ).then(async () => {
    const res = await reqDelTag(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      tableRef.value?.notify()
    }
  })
}
const addTagHandle = () => {
  ElMessageBox.prompt('输入新增标签名', '新增Tag').then(async ({ value }) => {
    const res = await reqAddTag({
      name: value.trim()
    })
    if (res.code === 0) {
      ElMessage.success(`新增标签 '${value.trim()}' 成功~`)
      tableRef.value?.notify()
    }
  })
}
</script>

<style lang="less"></style>
