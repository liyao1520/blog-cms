<template>
  <div class="login">
    <div class="form-container">
      <h2 class="title">博客后台管理系统</h2>
      <el-form
        class="form"
        label-width="60px"
        :model="loginModel"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="账号" prop="user_name">
          <el-input v-model="loginModel.user_name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginModel.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ILoginData, reqLogin } from '@/service/user'
import { ElForm, ElMessage } from 'element-plus'

import { useRouter } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    //定义数据
    const loginModel = reactive<ILoginData>({
      user_name: '',
      password: ''
    })
    const rules = {
      user_name: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          required: true,
          max: 10,
          min: 1,
          message: '1-10位大小',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 18,
          message: '5-18位大小'
        }
      ]
    }

    const formRef = ref<InstanceType<typeof ElForm>>()
    //定义方法
    const submitForm = () => {
      formRef.value?.validate(async (valid) => {
        if (valid) {
          const res = await reqLogin(loginModel)
          if (res.code === 0) {
            ElMessage.success('登录成功!')
            const { token } = res.result
            const userInfo = res.result.userInfo
            store.commit('loginModule/setToken', token)
            store.commit('loginModule/setUserInfo', userInfo)
            router.replace('/')
          }
        }
        return false
      })
    }

    //返回
    return {
      loginModel,
      rules,
      submitForm,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>
.login {
  background: url('~@/assets/img/login-bg.svg');
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-container {
    .title {
      text-align: center;
    }
    .form {
      border: 1px solid #ccc;
      padding: 50px 60px;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #ccc;
    }
  }
}
</style>
