<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form ref="userFormRef" class="user-form" :model="userForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input
            placeholder="请选择用户名"
            class="input-public"
            v-model="userForm.userName"
            clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            placeholder="请选择手机号"
            class="input-public"
            v-model="userForm.mobile"
            clearable>
            <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <!-- <el-input
            placeholder="请选择..."
            class="input-public"
            v-model="userForm.status"
            clearable>
            <i slot="prefix" class="el-input__icon el-icon-more-outline"></i>
          </el-input> -->
          <el-select v-model="userForm.status" placeholder="请输入用户状态" @change="clickChange">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="userForm.createTime"
            class="input-public"
            type="datetime"
            placeholder="选择起始时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-button class="btn-search" type="primary" @click="serachUser(userForm)">搜索</el-button>
        <el-button class="btn-search"  @click="refreshUserForm">重置</el-button>
      </el-form>
      <div style="margin-top: 5px">
        <el-button @click="refresh">刷新</el-button>
<!--        <el-button type="info" @click="ImportUser">导入</el-button>-->
        <el-button type="success" @click="ExportUser">导出</el-button>
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 10px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="userId"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="ssex"
          label="性别"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="250">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="200">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用"
              @change="changeSwitch( scope.row )">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="250">
            <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right"
                         width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      分页插件-->
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageIndex"
        :page-sizes="arrayPage"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>

      <!--   修改 弹窗-->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" :rules="updateFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="updateForm.username"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="updateForm.ssex" style="width: 100%" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="updateForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="updateForm.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickEnsure">确 定</el-button>
        </div>
      </el-dialog>

<!--      添加用户 弹窗-->
      <el-dialog title="添加用户" :visible.sync="dialogFormaddUser">
        <el-form :model="addForm" :rules="addFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="addForm.ssex" style="width: 100%" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="addForm.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserEnsure">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    searchUser,
    reqUserList,
    reqUserPageList,
    updateStatus,
    addUser,
    delUserArr,
    delUser,
    updateUser,
    exportUser
  } from '../../../../../api/user'

  export default {
    name: 'User',
    data(){
      return{
        userForm:{
          username:'',
          mobile:'',
          status:'',
          createTime:'',
        },
        tableData:[],
        query:{
          pageIndex:1,
          pageSize:20,
        },
        totalPage:100,
        arrayPage:[20, 40, 60, 60],
        // 批量删除 数据
        delList:[],
        // 点击编辑用户 显示该弹窗
        dialogFormVisible:false,
        // 点击添加用户 显示该弹窗
        dialogFormaddUser:false,
        //编辑 提交表单
        updateForm:{},
        // 添加用户 提交表单
        addForm:{},
        // 编辑 ---> 规则
        updateFormRules:{},
        // 添加 ---> 规则
        addFormRules:{},
        formLabelWidth:90+'px',
      }
    },
    created () {
      this.reqUserListFun();
    },
    methods:{
      // 导出 用户
      ExportUser:function(){
        let user = this.tableData;
        console.log("进入",user)
        exportUser(user).then(res => {
          // let blob = new Blob([res.data]);

          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          var filename = '修改的名字';
          let link = document.createElement('a')
          console.log("url",url)
          console.log("link",link)
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filename + '.xls')
          document.body.appendChild(link)
          link.click()
          console.log("导出成功",res)
        }).catch(err => {
          console.log("导出失败",err)
        })
      },
      // 导入用户
      ImportUser:function(){

      },
      clickChange:function(){
        
      },
      // 模糊搜索
      serachUser:function(val){
        let username = this.userForm.username;
        let mobile = this.userForm.mobile;
        let status = this.userForm.status;
        let createTime = this.userForm.createTime;
        let arr = [];
        searchUser(username,mobile,status,createTime).then(res => {
          console.log('模糊搜索成功',res.data.data)
          arr.push(res.data.data)
          this.tableData = arr[0];
        }).catch(err => {
          console.log('模糊搜索失败')
        })
      },
      // 重置
      refreshUserForm:function(){
        this.userForm.username = "";
        this.userForm.mobile = "";
        this.userForm.status = "";
        this.userForm.createTime = "";
      },
      //  0/1 ==> 男/女
      disableFun:function(){
        for (let i = 0; i < this.tableData.length;i++){
          if(this.tableData[i].ssex == 0 ){
            this.tableData[i].ssex = "男";
          }else{
            this.tableData[i].ssex = "女";
          }
        }
      },
      // 请求用户方法
      reqUserListFun:function () {
        let item = JSON.stringify(this.query);
        console.log(item)
        reqUserPageList(item).then(res => {
          this.tableData = res.data.content;
          this.totalPage = res.data.totalSize;
          this.query.pageIndex = res.data.pageNum;
          this.query.pageSize = res.data.pageSize;
          console.log("--->获取用户成功",res)
          this.disableFun();
        }).catch( err => {
          console.log("--->获取用户失败",err)
        })
      },
      // 是否禁用用户
      changeSwitch:function(row){
        updateStatus(row).then(res => {
          console.log('res 禁用成功',res)
        }).catch(err => {
          console.log('err禁用失败',err)
        })
      },
      // 刷新数据
      refresh:function(){
        this.reqUserListFun();
      },
      addUser:function(){
        this.dialogFormaddUser = true;
      },
      addUserEnsure:function(){
        let item = JSON.stringify(this.addForm);
        console.log(item)
        addUser(item).then(res => {
          console.log("成功",res)
          this.reqUserListFun();
          this.dialogFormaddUser = false;
          if(res.data.code == 200){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.addForm.username = '';
            this.addForm.ssex = '';
            this.addForm.mobile = '';
            this.addForm.email = '';
          }else{
            // 添加失败
          }
        }).catch(err => {
          console.log("失败",err)
        })
        this.dialogFormaddUser = true;
      },
      // 点击批量删除 显现 多炫酷
      batchDel:function(){
        // this.showFlag = true;
        // 数组转JSON     JSON 转 对象  JSON.parse(jsonString);
        let list = JSON.stringify(this.delList);
        if(this.delList.length == 0){
          this.$message({
            message: '请选择用户！',
            type: 'warning',
            duration:'1500'
          });
        }else{
          this.$confirm('确认永久删除？')
            .then(resp => {
              console.log(('确定！'))
              delUserArr({list}).then(res => {
                console.log('删除成功',res)
                this.reqUserListFun();
                if(res.data.code == 200){
                  this.$message({
                    message: '删除成功！',
                    type: 'success'
                  });
                }else{
                  // 删除 失败
                }
              }).catch(err => {
                console.log('删除失败',err)
              })
            })
            .catch(error => {
              console.log('已取消！')
            });
        }
      },
      // 多选删除
      handleSelectionChange:function(val){
        console.log('多选',val)
        this.delList = val;
      },
      // 单个 删除
      handleDelete:function(row){
        console.log('row',row)
        let item = JSON.stringify(row);
        this.$confirm('确认永久删除？')
          .then(res => {
            console.log('确定！')
            delUser({item}).then(res => {
              console.log('删除成功',this)
              this.reqUserListFun();
              if(res.data.code == 200){
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                });
              }else{
                // 删除失败
              }
            }).catch(err => {
              console.log('删除失败')
            })
          }).catch(res => {
            console.log('已取消')
          });
      },
      // 点击 编辑修改
      handleEdit:function(val){
        this.dialogFormVisible = true;
        this.updateForm = val;
        console.log("--",this.updateForm)
      },
      // 点击确定完成修改
      clickEnsure:function(){
        let item = JSON.stringify(this.updateForm);
        console.log(item)
        updateUser(item).then(res => {
          console.log("修改成功",res)
          this.dialogFormVisible = false;
          this.reqUserListFun();
          if(res.data.code == 200){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }else{
            // 修改失败
          }
        }).catch(err => {
          console.log("修改失败",err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageSize = val;
        this.reqUserListFun();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageIndex = val;
        this.reqUserListFun();
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-top: 10px;
  }
  .user-form{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
  }
  .input-public{
    width: 230px;
  }
  .btn-search{
    margin-left: 50px;
    width: 100px;
    height: 40px;
  }
  .pagination{
    float: right;
    margin-top: 15px;
    margin-bottom: 20px;
  }
</style>
