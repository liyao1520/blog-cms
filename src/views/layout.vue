<template>
  <el-container class="container-layout">
    <el-aside :style="{ width: isFold ? '63px' : '200px' }"
      ><my-menu :isFold="isFold"
    /></el-aside>
    <el-container style="flex-direction: column">
      <el-header>
        <div @click="isFold = !isFold" class="hover">
          <el-icon v-if="isFold" :size="30"><fold /></el-icon>
          <el-icon v-else :size="30"><expand /></el-icon>
        </div>
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <el-avatar :icon="UserFilled" :size="40"></el-avatar>
            <el-icon :size="20" class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="dialogVisible = true"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click="handleLogout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="修改密码" width="30%">
    <el-input v-model="password" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="hanbleSumit">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import myMenu from '@/components/menu/index.vue'
import { UserFilled, ArrowDown, Expand, Fold } from '@element-plus/icons-vue'
import { removeItem } from '@/utils/storage'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reqUpdatePassword } from '@/service/user'
const router = useRouter()
const isFold = ref(false)
const password = ref('')
// 退出登录
const handleLogout = () => {
  removeItem('token')
  removeItem('userInfo')
  router.replace('/login')
  ElMessage.info('退出登录')
}
// 修改密码框
const dialogVisible = ref(false)
const hanbleSumit = async () => {
  const res = await reqUpdatePassword({ password: password.value })
  if (res.code == 0) {
    removeItem('token')
    removeItem('userInfo')
    router.replace('/login')
    ElMessage.success('修改密码成功!')
  }
}
</script>

<style scoped lang="less">
.el-header {
  position: relative;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.my-dropdown {
  position: absolute;
  right: 20px;
}
.el-aside {
  transition: 0.5s;
  overflow-x: hidden;
}
.container-layout {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
