<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div style="">
        <el-button icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addGoods">添加商品</el-button>
        <el-button type="danger" size="mini"  icon="el-icon-delete" @click="batchDel">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="table"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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

      <!--   修改 弹窗-->
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" :rules="updateFormRules">
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="updateForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickEnsure">确 定</el-button>
        </div>
      </el-dialog>

      <!--      添加用户 弹窗-->
      <el-dialog title="添加商品" :visible.sync="dialogFormaddGoods">
        <el-form :model="addForm" :rules="addFormRules">
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="addForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormaddGoods = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsEnsure">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {reqGoodsList,reqGoodsPageList , delGoods, addGoods, delGoodsArr, updateGoods } from '../../../../../api/goods'

  export default {
    name: 'goods',
    data(){
      return{
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
        dialogFormaddGoods:false,
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
      this.reqGoods();
    },
    methods:{
      reqGoods:function () {
        let item = JSON.stringify(this.query);
        reqGoodsPageList(item).then(res => {
          console.log("加载成功",res);
          this.tableData = res.data.content;
          this.totalPage = res.data.totalSize;
          this.query.pageIndex = res.data.pageNum;
          this.query.pageSize = res.data.pageSize;
        }).catch(err => {
          console.log("加失败",err)
        })
      },
      // 刷新
      refresh:function(){
        this.reqGoods();
      },
      // 添加商品  显示弹窗
      addGoods:function(){
        this.dialogFormaddGoods = true;
      },
      // 点击确定 添加商品
      addGoodsEnsure:function(){
        let item = JSON.stringify(this.addForm);
        addGoods(item).then(res => {
          console.log("成功",res)
          this.reqGoods();
          this.dialogFormaddGoods = false;
          if(res.data.code == 200){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.addForm.price = '';
          }else{
            // 添加失败
          }
        }).catch(err => {
          console.log("失败",err)
        })
      },
      handleSelectionChange:function(val){
        this.delList = val;
      },
      // 批量 删除
      batchDel:function(){
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
              delGoodsArr({list}).then(res => {
                console.log('删除成功',res)
                this.reqGoods();
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
      // 点击确定修改 关闭弹窗
      clickEnsure:function(){
        let item = JSON.stringify(this.updateForm);
        updateGoods(item).then(res => {
          console.log("修改成功",res)
          this.dialogFormVisible = false;
          this.reqGoods();
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
      // 修改商品列表
      handleEdit:function (val) {
        this.dialogFormVisible = true;
        this.updateForm = val;
      },
      // 删除商品列表
      handleDelete:function(row){
        console.log('row',row)
        let item = JSON.stringify(row);
        this.$confirm('确认永久删除？')
          .then(res => {
            console.log('确定！')
            delGoods(row).then(res => {
              console.log('删除成功',this)
              this.reqGoods();
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

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageSize = val;
        this.reqGoods();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageIndex = val;
        this.reqGoods();
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-top: 10px;
  }
  .table{
    margin-top: 10px;
  }
  .pagination{
    float: right;
    margin-top: 15px;
    margin-bottom: 20px;
  }
</style>

