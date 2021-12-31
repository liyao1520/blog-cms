<template>
  <el-row>
    <el-button type="primary" size="mini" @click="addTagHandle"
      >新增分类</el-button
    >
  </el-row>
  <my-table :method="reqClassifyList" ref="tableRef">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="分类" />
    <el-table-column prop="describe" label="描述" />
    />
    <el-table-column>
      <template #default="{ row }">
        <el-button type="danger" @click="delTagHandle(row)">删除</el-button>
      </template>
    </el-table-column>
  </my-table>
  <el-dialog
    v-model="dialogVisible"
    title="新增分类"
    width="500px"
    @closed="dialogCloseHandle"
  >
    <el-form label-width="80px" :model="formData" ref="from">
      <el-form-item label="分类名" prop="name">
        <el-input placeholder="分类名" v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input placeholder="描述" v-model="formData.describe" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="addClassifySumit"
        >确认新增</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import MyTable from '@/components/base-ui/table/index.vue'
import {
  reqClassifyList,
  reqAddClassify,
  reqDelClassify
} from '@/service/classify'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
const tableRef = ref<InstanceType<typeof MyTable> | null>(null)
const delTagHandle = async ({ id, name }: { id: number; name: string }) => {
  ElMessageBox.confirm(
    `是否删除分类'${name}'
  `,
    '删除分类'
  ).then(async () => {
    const res = await reqDelClassify(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      tableRef.value?.notify()
    }
  })
}
interface IFormData {
  name: string
  describe: string
}
const dialogVisible = ref(false)
const formData = reactive<IFormData>({
  name: '',
  describe: ''
})
const addTagHandle = () => {
  dialogVisible.value = true
}
const dialogCloseHandle = () => {
  formData.name = ''
  formData.describe = ''
}
const addClassifySumit = async () => {
  try {
    const res = await reqAddClassify(formData)
    if (res.code == 0) {
      ElMessage.success('新增成功')
      tableRef.value?.notify()
    }
  } finally {
    dialogVisible.value = false
  }
}
</script>

<style lang="less"></style>
