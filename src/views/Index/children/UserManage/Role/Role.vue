<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
<!--      模糊搜索-->
      <el-form ref="roleFormRef" class="role-form" :model="roleForm" label-width="100px">
        <el-form-item label="角色名">
          <el-input
            placeholder="请选择角色名称"
            class="input-public"
            v-model="roleForm.roleName"
            clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-input
            placeholder="角色状态"
            class="input-public"
            v-model="roleForm.status"
            clearable>
            <i slot="prefix" class="el-input__icon el-icon-more-outline"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="roleForm.createTime"
            class="input-public"
            type="datetime"
            placeholder="选择起始时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-button class="btn-search" type="primary" @click="searchRole(roleForm)">搜索</el-button>
        <el-button class="btn-search" @click="refreshRoleForm">重置</el-button>
      </el-form>
      <div style="margin-top: 5px">
        <el-button @click="refresh">刷新</el-button>
        <el-button type="primary" @click="addRole">添加角色</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
      </div>
<!--    table表格-->
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
          prop="roleId"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="150">
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
<!--      分页-->
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

      <!--   修改 角色 弹窗-->
      <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" :rules="updateFormRules">
          <el-form-item label="角色名" :label-width="formLabelWidth">
            <el-input v-model="updateForm.roleName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickEnsure">确 定</el-button>
        </div>
      </el-dialog>

      <!--      添加角色 弹窗-->
      <el-dialog title="添加角色" :visible.sync="dialogFormaddRole">
        <el-form :model="addForm" :rules="addFormRules">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormaddRole = false">取 消</el-button>
          <el-button type="primary" @click="addRoleEnsure">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {reqRoleList,reqRolePageList , searchRole, delRole, addRole, updateRole,delRoleArr } from '../../../../../api/role'

  export default {
    name: 'Role',
    data(){
      return {
        roleForm:{
          roleName:'',
          status:'',
          createTime:'',
        },
        // 表格数据
        tableData:[],
        query:{
          pageIndex:1,
          pageSize:20,
        },
        totalPage:100,
        arrayPage:[20, 40, 60, 60],
        // 点击编辑用户 显示该弹窗
        dialogFormVisible:false,
        // 点击添加用户 显示该弹窗
        dialogFormaddRole:false,
        //编辑 提交表单
        updateForm:{},
        // 添加用户 提交表单
        addForm:{},
        // 编辑 ---> 规则
        updateFormRules:{},
        // 添加 ---> 规则
        addFormRules:{},
        // 删除 列表
        delList:[],
        formLabelWidth:90+'px',
      }
    },
    created () {
      this.reqRoleList();
    },
    methods:{
      // 请求所有用户角色
      reqRoleList:function(){
        let item = JSON.stringify(this.query);
        reqRolePageList(item).then(res => {
          this.tableData = res.data.content;
          this.totalPage = res.data.totalSize;
          this.query.pageIndex = res.data.pageNum;
          this.query.pageSize = res.data.pageSize;
          console.log("请求成功！",res)
        }).catch(err => {
          console.log("请求失败！",err)
        })
      },
      // 模糊搜索 用户角色
      searchRole:function (val) {
        console.log("val",val)
        searchRole(val).then(res => {
          console.log("res",res)
          this.tableData = res.data.data;
        }).catch(err => {
          console.log("err",err)
        })
      },
      // 重置表单内容
      refreshRoleForm:function () {
        this.roleForm.roleName = '';
        this.roleForm.status = '';
        this.roleForm.createTime = '';
      },
      handleSelectionChange:function (val) {
        console.log('多选',val)
        this.delList = val;
      },
      // 批量 删除
      batchDel:function(){
        let list = JSON.stringify(this.delList);
        // console.log(this.delList.length)
        if(this.delList.length == 0){
          this.$message({
            message: '请选择角色！',
            type: 'warning',
            duration:'1500'
          });
        }else{
          this.$confirm('确认永久删除？')
            .then(resp => {
              console.log(('确定！'))
              delRoleArr({list}).then(res => {
                console.log('删除成功',res)
                this.reqRoleList();
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
              console.log('已取消！',error)
            });
        }
      },
      // 刷新
      refresh:function(){
        this.reqRoleList();
      },
      // 添加 角色   显示弹窗
      addRole:function(){
        this.dialogFormaddRole = true;
      },
      // 添加 角色
      addRoleEnsure:function(){
        let item = this.addForm;
        addRole(item).then(res => {
          console.log("成功",res)
          this.reqRoleList();
          this.dialogFormaddRole = false;
          if(res.data.code == 200){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.addForm.roleName = '';
          }else {
           // 添加失败
          }
        }).catch(err => {
          console.log("失败",err)
        })
        this.dialogFormaddRole = true;
      },
      // 点击 编辑修改 弹窗显示
      handleEdit:function(val){
        this.dialogFormVisible = true;
        this.updateForm = val;
      },
      // 点击确定 修改角色
      clickEnsure:function(){
        let item = JSON.stringify(this.updateForm);
        updateRole(item).then(res => {
          console.log("修改角色成功",res)
          this.dialogFormVisible = false;
          this.reqRoleList();
          if(res.data.code == 200){
            this.$message({
              message: '修改角色成功！',
              type: 'success'
            });
          }else {
            // 修改 失败
          }
        }).catch(err => {
          console.log("修改失败",err)
        })
      },
      // 单个删除
      handleDelete:function(val){
        console.log("删除信息",val)
        delRole(val).then(res => {
          console.log(res)
          this.reqRoleList();
          if(res.data.code == 200){
            this.$message({
              message: '修改角色成功！',
              type: 'success'
            });
          }else{
            // 删除 失败！
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageSize = val;
        this.reqRoleList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageIndex = val;
        this.reqRoleList();
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-top: 10px;
  }
  .role-form{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
  }
  .input-public{
    width: 200px;
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
