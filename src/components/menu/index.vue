<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/logo.png" alt="" /><span>博客管理系统</span>
    </div>
    <el-menu
      router
      background-color="#0c2039"
      text-color="rgb(231, 229, 229)"
      active-text-color="#409EFF"
    >
      <template v-for="item in navMenuConfig" :key="item.name">
        <el-menu-item v-if="item.path" :index="item.path">
          {{ item.name }}
        </el-menu-item>
        <el-sub-menu :index="item.name" v-else>
          <template #title>{{ item.name }}</template>
          <el-menu-item v-for="i in item.items" :key="i.name" :index="i.path">
            <el-icon :size="12" color="#fff"><Menu /></el-icon> {{ i.name }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import navMenuConfig from './navMenuConfig'
import { Menu } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.nav-menu {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #0c2039;
  .logo {
    height: 25px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -5px;
    padding: 10px 0;

    img {
      height: 100%;
      padding: 0 10px;
    }
  }
}
.el-menu {
  flex: 1;
  // 解决1px elementui出现展开后子菜单宽度多出1px问题
  border: none;
  border-right-width: 0;
}
</style>
