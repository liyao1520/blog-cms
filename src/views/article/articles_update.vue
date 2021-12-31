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
      <el-tabs
        style="width: 400px"
        active-name="first"
        @tab-click="tabClickHandle"
      >
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
        <el-tab-pane label="上传历史" name="history">
          <ul class="img-list">
            <li
              class="img-item"
              @click="imgClickHandle(item.url)"
              v-for="item in imgList"
              :key="item.hash"
            >
              <img :src="item.url" />
            </li>
          </ul>
          <el-pagination
            layout="prev, pager, next"
            :total="imgInfo.total"
            @current-change="pageChangeHandle"
            small
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="10">
          <h5 style="height: 28px">分类</h5>
          <el-select size="mini" v-model="formData.classify" filterable>
            <el-option
              v-for="item in classifyOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-col>
        <el-col :span="14">
          <h5 style="height: 28px">
            标签
            <el-button
              type="primary"
              size="mini"
              :icon="Plus"
              circle
              style="margin-left: 180px"
              @click="addTagHandle"
            ></el-button>
          </h5>
          <el-select
            style="width: 250px"
            size="mini"
            v-model="formData.tags"
            filterable
            multiple
            allow-create
          >
            <el-option
              v-for="item in TagOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
          /></el-select>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <div class="img-wrap">
        <img :src="formData.cover" alt="" />
      </div>
      <h5>开启评论</h5>
      <el-switch
        v-model="formData.canComment"
        :active-value="1"
        :inactive-value="0"
      />
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
import { onMounted, reactive, ref } from 'vue'
//markdown
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { reqUpdateArticle, reqArticleById } from '@/service/article'
import { useRoute, useRouter } from 'vue-router'
import { reqAddTag, reqTagList } from '@/service/tag'
import { reqClassifyList } from '@/service/classify'
import { reqUploadImgHistory } from '@/service/upload'
import { Plus } from '@element-plus/icons-vue'
interface ITagItem {
  id: number
  name: string
}
interface IFormData {
  id: number
  content: string
  title: string
  cover: string
  canComment: 1 | 0
  tags: ITagItem[]
  classify: number | ''
}

// 调接口获取信息
const id = useRoute().params.id
console.log(useRoute())
const formData = reactive<IFormData>({
  id: 0,
  content: '',
  title: '',
  cover: '',
  canComment: 1,
  tags: [],
  classify: ''
})
const getArticleInfo = () => {
  reqArticleById(id as string).then((res) => {
    // formData
    console.log(res)
    const { id, content, title, cover, canComment, classify, tags } = res.result
    formData.id = id
    formData.content = content
    formData.title = title
    formData.cover = cover
    formData.canComment = canComment ? 1 : 0
    formData.classify = classify.id
    formData.tags = tags.map((item: any) => item.id)
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
//历史图片
interface Iimg {
  url: string
  hash: string
}
const imgList = ref<Iimg[]>([])
const imgInfo = reactive({
  page: 1,
  total: 0
})
const tabClickHandle = async (tab: any) => {
  if (tab.props.name !== 'history') {
    imgInfo.page = 1
    return
  }
  const res = await reqUploadImgHistory(imgInfo.page)
  imgList.value = res.result
  imgInfo.total = (res as any).TotalPages
}
const pageChangeHandle = async (page: any) => {
  const res = await reqUploadImgHistory(page)
  imgList.value = res.result
  imgInfo.total = (res as any).TotalPages
}
const imgClickHandle = (url: string) => {
  formData.cover = url
}
//分类和标签逻辑
interface IClassifyItem {
  name: string
  id: number
}
const TagOptions = ref<ITagItem[]>([])
const classifyOptions = ref<IClassifyItem[]>([])
onMounted(async () => {
  const { result: tagData } = await reqTagList({ pageFlag: 0 })
  const { result: classifyData } = await reqClassifyList({ pageFlag: 0 })
  TagOptions.value = tagData
  classifyOptions.value = classifyData
})
const addTagHandle = () => {
  ElMessageBox.prompt('输入新增标签名', '新增Tag').then(async ({ value }) => {
    const res = await reqAddTag({
      name: value.trim()
    })
    if (res.code === 0) {
      ElMessage.success(`新增标签 '${value.trim()}' 成功~`)
      const { result } = await reqTagList({ pageFlag: 0 })
      TagOptions.value = result
    }
  })
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
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    display: flex;
    width: 30%;
    margin: 4px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
