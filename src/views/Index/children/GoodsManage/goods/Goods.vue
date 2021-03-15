<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top: 10px">
        <el-button @click="refresh">刷新</el-button>
        <el-button type="primary" @click="addGoods">添加用户</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="table">
          <el-table-column
          fixed
          prop="id"
          label="ID"
          width="150">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="isDel"
            label="是否删除"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="200">
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {reqGoodsList } from '../../../../../api/goods'

  export default {
    name: 'goods',
    data(){
      return{
        tableData:[]
      }
    },
    created () {
      this.reqGoods();
    },
    methods:{
      reqGoods:function () {
        reqGoodsList().then(res => {
          console.log("加载成功",res);
          this.tableData = res.data.data;
        }).catch(err => {
          console.log("加失败",err)
        })
      },
      // 刷新
      refresh:function(){
        this.reqGoods();
      },
      // 添加商品
      addGoods:function(){

      },
      // 批量 删除
      batchDel:function(){

      },
      // 修改商品列表
      handleEdit:function () {

      },
      // 删除商品列表
      handleDelete:function () {

      }
    }
  }
</script>

<style scoped>

  .table{
    margin-top: 10px;
  }
</style>

