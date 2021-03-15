<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-input
        placeholder="请选择内容"
        suffix-icon="el-icon-search"
        v-model="input1">
      </el-input>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data(){
      return{
        input1:''
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-top: 15px;
  }
</style>
