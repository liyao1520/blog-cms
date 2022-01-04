<template>
  <el-button
    type="primary"
    size="mini"
    @click="
      () => {
        dialogVisible = true
        title = '添加'
      }
    "
    >新增</el-button
  >
  <my-table :method="reqGetMdAll" ref="tableRef">
    <el-table-column label="ID" prop="id" />
    <el-table-column label="名字" prop="name" />
    <el-table-column label="内容" prop="content" show-overflow-tooltip />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" size="mini" @click="updateHandle(row)"
          >修改</el-button
        >
        <el-button type="danger" size="mini" @click="delHandle(row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </my-table>
  <el-dialog
    v-model="dialogVisible"
    :title="title + 'md'"
    width="1100px"
    @closed="closeHandle"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="唯一Name"
          ><el-input v-model="state.name" placeholder="请输入name"
        /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-button
          style="margin-left: 100px"
          type="primary"
          @click="submitHandle"
          >提交</el-button
        >
      </el-col>
    </el-row>
    <md-editor v-model="state.content" style="height: 500px" />
  </el-dialog>
</template>

<script setup lang="ts">
import myTable from '@/components/base-ui/table/index.vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reqAddMd, reqDelMd, reqGetMdAll, reqUpdateMd } from '@/service/md'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const tableRef = ref<InstanceType<typeof myTable> | null>(null)
const state = reactive({
  content: '',
  name: '',
  id: 0
})
const title = ref('')
const submitHandle = async () => {
  const { id, content, name } = state
  if (title.value === '添加') {
    const res = await reqAddMd({ content, name })

    if (res.code == 0) {
      ElMessage.success('添加成功')
      tableRef.value?.notify()
      dialogVisible.value = false
    }
  } else {
    const res = await reqUpdateMd({ id, content, name })

    if (res.code == 0) {
      ElMessage.success('修改成功')
      tableRef.value?.notify()
      dialogVisible.value = false
    }
  }
}
const delHandle = async (row: any) => {
  ElMessageBox.confirm(
    `是否删除
  `,
    '删除'
  ).then(async () => {
    const res = await reqDelMd(row.id)

    if (res.code == 0) {
      ElMessage.success('删除成功')
      tableRef.value?.notify()
    }
  })
}
const updateHandle = (row: any) => {
  title.value = '修改'
  state.content = row.content
  state.name = row.name
  state.id = row.id
  dialogVisible.value = true
}
const closeHandle = () => {
  state.content = ''
  state.name = ''
  state.id = 0
}
</script>

<style></style>
