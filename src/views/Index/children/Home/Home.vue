<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="home">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
      <el-card class="box-card">
      </el-card>
      <el-card class="box-card">
      </el-card>
      <el-card class="box-card">
      </el-card>
      <el-card class="box-card">
      </el-card>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped>
  .home{
    font-weight: bold;
  }
  .block{
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .box-card{
    width: 50%;
    margin-left: 30px;
  }
</style>
