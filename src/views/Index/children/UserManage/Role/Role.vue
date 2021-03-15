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
        <el-button type="primary" @click="addRole">添加用户</el-button>
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
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>


    </el-card>
  </div>
</template>

<script>
  import {searchRole} from '../../../../../api/role'

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
        currentPage4: 1,

      }
    },
    methods:{
      // 模糊搜索 用户角色
      searchRole:function (val) {
        console.log("val",val)
        searchRole({val}).then(res => {
          console.log("res",res)
        }).catch(err => {
          console.log("err",err)
        })
      },
      // 重置表单内容
      refreshRoleForm:function () {

      },
      handleSelectionChange:function () {

      },
      // 刷新
      refresh:function(){

      },
      // 添加 角色
      addRole:function(){

      },
      // 批量 删除
      batchDel:function(){

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
