<template>
    <div style="height: 100%">
      <el-container style="height: 100%; " direction="vertical">
        <el-header>
<!--          顶部导航栏-->
          <el-menu :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-header>
        <el-container>
          <el-aside style="background-color: #545c64;width: 200px">
<!--            侧边栏-->
            <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  :default-active="sideIndex"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1">选项1</el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>

          </el-aside>
          <el-main style="">
<!--            主题内容-->
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeIndex: '1',
      sideIndex: '1-1'
    }
  }
}
</script>

<style scoped>
.el-container{
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header{
  padding: 0px;
  margin: 0px;
}
.el-col{
  width: 100%;
}
</style>
