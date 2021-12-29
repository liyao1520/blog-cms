<template>
  <el-table :data="data">
    <slot />
  </el-table>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :currentPage="params.pageNum"
    :pageSize="params.pageSize"
  />
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  onMounted,
  reactive,
  ref,
  withDefaults,
  defineExpose
} from 'vue'
const props = withDefaults(
  defineProps<{
    method: (params: any) => any
    params?: any
  }>(),
  {
    params: {},
    method: () => Promise.resolve()
  }
)

// porps.params 中的参数与 本组件 params 属性合并
const params = reactive({
  pageNum: 1,
  pageSize: 10,
  pageFlag: 1
})

// params 是请求method的参数
const reqParams = computed(() => {
  return {
    ...params,
    ...props.params
  }
})

const data = ref([])
const total = ref(40)
// 得到表格数据
const getTableData = () => {
  props.method(reqParams.value).then((res: any) => {
    total.value = res.count
    data.value = res.result
  })
}
onMounted(() => {
  getTableData()
})
//页大小改变
const handleSizeChange = (pageSize: number) => {
  params.pageSize = pageSize
  getTableData()
}
// 页数改变
const handleCurrentChange = (pagNum: number) => {
  params.pageNum = pagNum
  getTableData()
}

// 暴露出去的方法
defineExpose({
  notify: () => {
    getTableData()
  }
})
</script>

<style scoped lang="less"></style>
