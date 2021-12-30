<template>
  <el-row>
    <el-button type="primary" size="mini" :icon="ArrowLeftBold" @click="goback"
      >返回</el-button
    >
  </el-row>
  <el-row>
    <el-col :span="10">
      <h5>标题</h5>
      <el-input
        size="medium"
        placeholder="文章标题"
        style="width: 400px"
        v-model="formData.title"
      />
      <h5>封面</h5>
      <el-tabs style="width: 400px" active-name="first">
        <el-tab-pane label="上传" name="first">
          <el-upload
            action="/api/upload/img"
            :show-file-list="false"
            :before-upload="beforeImgUpload"
            :on-success="handleImgSuccess"
            name="img"
          >
            <el-button size="small" type="primary"
              >点击上传</el-button
            ></el-upload
          >
        </el-tab-pane>
        <el-tab-pane label="输入url" name="second">
          <el-input
            size="medium"
            placeholder="文章封面src"
            style="width: 400px"
            v-model="formData.cover"
        /></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="8">
      <div class="img-wrap">
        <img :src="formData.cover" alt="" />
      </div>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" class="my-button" @click="submit"
        >修改</el-button
      >
    </el-col>
  </el-row>

  <md-editor
    v-model="formData.content"
    @html-changed="htmlChange"
    style="height: 500px"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
//markdown
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { reqUpdateArticle, reqArticleById } from '@/service/article'
import { useRoute, useRouter } from 'vue-router'

const formData = reactive({
  id: 0,
  content: '',
  title: '',
  cover: '',
  canComment: 1
})
// 调接口获取信息
const id = useRoute().params.id
console.log(useRoute())

const getArticleInfo = () => {
  reqArticleById(id as string).then((res) => {
    // formData
    console.log(res)

    const { id, content, title, cover, canComment } = res.result
    formData.id = id
    formData.content = content
    formData.title = title
    formData.cover = cover
    formData.canComment = canComment ? 1 : 0
  })
}
onMounted(() => {
  getArticleInfo()
})
let timer: number | undefined = undefined

const htmlChange = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    localStorage.setItem('mdHistory', formData.content)
  }, 1000)
}

//修改
const submit = () => {
  ElMessageBox.confirm(`确定要修改id为${formData.id}的文章?`, 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await reqUpdateArticle(formData)
    if (res.code === 0) {
      ElMessage.success('修改成功')
    }
  })
}

// goback
const router = useRouter()
const goback = () => {
  router.go(-1)
  getArticleInfo()
}
//上传图片逻辑
const beforeImgUpload = (file: any) => {
  const isJPG = file.type.includes('image')
  const isLt2M = file.size / 1024 / 1024 < 3

  if (!isJPG) {
    ElMessage.error('必须为图片格式!')
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 3MB!')
  }
  return isJPG && isLt2M
}
const handleImgSuccess = (res: any) => {
  if (res.code === 0) {
    formData.cover = res.result.url
    ElMessage.success(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
}
</script>

<style lang="less">
.el-row {
  display: flex;
  padding-bottom: 10px;
}
h5 {
  margin: 10px 0;
}
.img-wrap {
  height: 200px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }
}
.my-button {
  margin: 80px 40px;
}
</style>
