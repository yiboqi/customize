<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item style="font-weight: 700;" :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.box-card{
  margin-top: 10px;
}
</style>
