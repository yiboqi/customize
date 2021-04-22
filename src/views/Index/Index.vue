<template>
    <div style="height: 100%">
      <el-container style="height: 100%; " direction="horizontal">

        <el-aside style="background-color: #545c64;width: 200px">
          <div class="image">

          </div>
          <!--            侧边栏-->
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                :default-active="sideIndex"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @open="handleOpen"
                @close="handleClose"
                unique-opened>
                <template  v-for="items in menus" >
                  <!--eslint-disable-next-line-->
                  <el-submenu :index="items.menuId + ''" :key="items.menuId">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>{{ items.menuName }}</span>
                    </template>
                    <template v-for="item in items.children">
                      <el-menu-item-group :key="item.menuId">
                        <el-menu-item :index="item.path + ''"
                                      :route="item.path"
                                      :key="item.menuId+''"
                                      @click="handleSub(item.path)">{{ item.menuName }}</el-menu-item>
                      </el-menu-item-group>
                    </template>
                  </el-submenu>
                </template>
              </el-menu>
            </el-col>
          </el-row>

        </el-aside>

        <el-container>
          <el-header>
  <!--          顶部导航栏-->
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
              <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
              <!-- <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu> -->
              <el-menu-item index="4" class="logout" @click="logout">退出</el-menu-item>
              <!-- <el-menu-item index="3" class="el-icon-location news">消息</el-menu-item> -->
            </el-menu>
          </el-header>
          <el-main style="">
<!--            主题内容-->
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import {request} from '../../network/request';
import { setActivePath, removeToken ,getaAtivePath,removeActivePath } from '../../assets/js/auth'

export default {
  name: 'Index',
  data () {
    return {/*  */
      activeIndex: '1',
      sideIndex: '',
      menus: []
    }
  },
  computed:{
  },
  created () {
    let path = getaAtivePath();
    this.sideIndex = path;
    this.req();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("123123",key, keyPath);
      if(key == keyPath){
        this.$router.push("/home")
      }
      this.sideIndex = '';
      removeActivePath();
    },
    handleClose(key, keyPath) {
      console.log("2123123",key, keyPath);
    },
    handleSub:function(key){
      this.sideIndex = key;
      setActivePath(key);
      this.$router.push(key);
    },
    // 请求菜单
    req:function(){
      let userName = localStorage.getItem('userName')
      console.log("userName ==>",userName)
      request({
        url: '/menu/getUserMenu',
        method: 'post',
        data: {
          userName: userName
        }
      }).then(res => {
        // console.log(res.data.data)
        this.menus = this.getTree(0, res.data.data, []);
        this.$store.commit('menus',this.menus);
      }).catch(err => {
        console.log(err)
      })
    },
    // 菜单整理  参考： https://blog.qianxiaoduan.com/archives/1569
    getTree:function(pid, arr, res) {
      let that = this;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parentId == pid) {
          res.push(arr[i])
          arr.splice(i, 1)
          i--
        }
      }
      res.map(r => {
        r.children = []
        that.getTree(r.menuId, arr, r.children)
        if (r.children.length == 0) {
          delete  r.children
        }
      })
      return res
    },
    // 退出
    logout() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then((res) => {
        if (res === "confirm") {
        removeToken();
        removeActivePath();
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "已退出登入"
        });
      }
      }).catch((err) => {
        if(err === "cancel"){
          this.$message({
          type: "info",
          message: "已取消退出登入"
        });
        }
      });
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
  .image{
    width: 100%;
    height: 60px;
  }
  .logout,
  .news{
    float: right;
  }
</style>
