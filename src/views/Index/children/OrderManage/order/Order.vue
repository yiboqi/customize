<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form ref="orderFormRef" class="order-form" :model="orderForm" label-width="100px">
        <el-form-item label="发起支付时间">
         <el-date-picker
            v-model="params"
            class="input-public"
            style="width: 240px"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" size="mini" type="primary" @click="searchOrder(orderForm)">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="refreshOrderForm">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 10px">
        <el-table-column
          fixed
          prop="oid"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150">
        </el-table-column>
        <el-table-column
          prop="gid"
          label="商品ID"
          width="250">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="250">
            <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
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

    </el-card>
  </div>
</template>

<script>
  import {reqUserPageList, searchOrder} from '../../../../../api/order'

  export default {
    name: 'Order',
    data(){
      return{
        orderForm:{
          status:'',
          createTime: undefined,
          beginTime: undefined,
          endTime:undefined,
        },
        params:[],
        tableData:[],
        query:{
          pageIndex:1,
          pageSize:20,
        },
        totalPage:100,
        arrayPage:[20, 40, 60, 60],
      }
    },
    created () {
      this.reqOrderListFun();
    },
    methods:{
      // 分页 请求数据
      reqOrderListFun:function(){
        let item = JSON.stringify(this.query);
        reqUserPageList(item).then(res => {
          console.log("请求成功！",res.data.content)
          this.tableData = res.data.content;
          this.totalPage = res.data.totalSize;
          this.query.pageIndex = res.data.pageNum;
          this.query.pageSize = res.data.pageSize;
        }).catch(err => {
          console.log("--->获取订单信息失败",err)
        })
      },
      searchOrder:function(){
        console.log("模糊搜索")
         if( this.params != null){
          this.orderForm.beginTime = this.params[0];
          this.orderForm.endTime = this.params[1];
        }    
        let arr = [];
        let item = this.orderForm;
        searchOrder(item).then(res => {
          console.log('模糊搜索成功',res.data.data)
          arr.push(res.data.data)
          this.tableData = arr[0];
          console.log(this.tableData);
        }).catch(err => {
          console.log('模糊搜索失败')
        })
      },
      //重置
      refreshOrderForm:function(){
        this.orderForm.status = "";
        this.orderForm.createTime = "";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageSize = val;
        this.reqOrderListFun();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageIndex = val;
        this.reqOrderListFun();
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-top: 15px;
  }
  .order-form{
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
