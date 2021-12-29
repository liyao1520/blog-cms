<template>
  <MyTable :method="reqArticleList" ref="tableRef">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="title" label="封面">
      <template #default="{ row }">
        <img :src="row.cover" alt="" class="cover" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" />

    <el-table-column prop="canComment" label="开启评论">
      <template #default="{ row }">
        {{ row.canComment ? '是' : '否' }}</template
      >
    </el-table-column>
    <el-table-column prop="count" label="浏览量" />
    <el-table-column prop="likeCount" label="点赞数" />
    <el-table-column prop="createdAt" label="创建时间" show-overflow-tooltip />
    <el-table-column prop="updatedAt" label="更新时间" show-overflow-tooltip />
    <el-table-column label="操作" width="90px">
      <template #default="{ row }">
        <div>
          <el-button size="mini" type="warning" @click="update(row)"
            >修改</el-button
          >
        </div>
        <br />
        <div>
          <el-button size="mini" type="danger" @click="del(row.id)"
            >删除</el-button
          >
        </div>
      </template>
    </el-table-column>
  </MyTable>
</template>

<script setup lang="ts">
import MyTable from '@/components/base-ui/table/index.vue'
import {
  reqArticleList,
  reqDelArticle,
  reqUpdateArticle
} from '@/service/article'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableRef = ref<InstanceType<typeof MyTable> | null>(null)
const update = (row: any) => {
  router.push('/articles_update/' + row.id)
}
const del = (id: number) => {
  ElMessageBox.confirm(`确认删除id为${id}的数据吗?`, '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      const res = await reqDelArticle(id)
      if (res.code == 0) {
        ElMessage.success('删除成功')
        tableRef.value?.notify()
      }
    })
    .catch(() => {
      ElMessage.info('取消了')
    })
}
</script>

<style lang="less">
.cover {
  width: 80px;
  height: 80px;
}
</style>
