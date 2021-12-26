<template>
  <el-container>
    <el-aside width="200px"> <my-menu /></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import myMenu from './components/menu/index.vue'
</script>
<style>
@import './assets/css/base.css';
</style>
