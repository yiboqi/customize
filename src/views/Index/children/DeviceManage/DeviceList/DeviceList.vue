<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        <el-button @click="refresh">刷新</el-button>
        <el-button type="primary" @click="addDevice">添加设备</el-button>
        <el-button type="danger" @click="batchDel">批量删除</el-button>
        <el-button type="primary" @click="clickImport">导入</el-button>
        <el-button type="primary" @click="clickExport">导出</el-button>
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
          prop="did"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="120">
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
      <el-dialog title="编辑设备" :visible.sync="dialogFormVisible">
        <el-form :model="updateForm" :rules="updateFormRules">
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.deviceName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickEnsure">确 定</el-button>
        </div>
      </el-dialog>

      <!--      添加用户 弹窗-->
      <el-dialog title="添加设备" :visible.sync="dialogFormaddDevice">
        <el-form :model="addForm" :rules="addFormRules">
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.deviceName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormaddDevice = false">取 消</el-button>
          <el-button type="primary" @click="addDeviceEnsure">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  import {reqDeviceList,reqDevicePageList , delDevice, addDevice, updateDevice,delDeviceArr, exportDevice} from '../../../../../api/device'
  export default {
    name: 'DeviceList',
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
        // 点击编辑设备列表 显示该弹窗
        dialogFormVisible:false,
        // 点击添加设备 显示该弹窗
        dialogFormaddDevice:false,
        //编辑 提交表单
        updateForm:{},
        // 添加设备 提交表单
        addForm:{},
        // 编辑 ---> 规则
        updateFormRules:{},
        // 添加 ---> 规则
        addFormRules:{},
        formLabelWidth:90+'px',

      }
    },
    created () {
      this.reqDeviceList();
    },
    methods:{
      reqDeviceList:function(){
        let item = JSON.stringify(this.query);
        reqDevicePageList(item).then(res => {
          console.log("请求成功",res.data.data)
          this.tableData = res.data.content;
          this.totalPage = res.data.totalSize;
          this.query.pageIndex = res.data.pageNum;
          this.query.pageSize = res.data.pageSize;
        }).catch(err => {
          console.log("请求失败！",err)
        })
      },
      // 刷新 列表数据
      refresh:function () {
        this.reqDeviceList();
      },
      addDeviceEnsure:function(){
        let item = JSON.stringify(this.addForm);
        addDevice(item).then(res => {
          console.log("成功",res)
          this.reqDeviceList();
          this.dialogFormaddDevice = false;
          if(res.data.code == 200){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.addForm.deviceName = '';
          }else{
            // 添加失败
          }
        }).catch(err => {
          console.log("失败",err)
        })
      },
      // 添加 设备
      addDevice:function () {
        this.dialogFormaddDevice = true;
      },
      // 多选删除
      handleSelectionChange:function(val){
        console.log('多选',val)
        this.delList = val;
      },
      // 批量 删除设备
      batchDel:function () {
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
                delDeviceArr({list}).then(res => {
                  console.log('删除成功',res)
                  this.reqDeviceList();
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
      clickEnsure:function(){
        let item = JSON.stringify(this.updateForm);
        updateDevice(item).then(res => {
          console.log("修改成功",res)
          this.dialogFormVisible = false;
          this.reqDeviceList();
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
      // 编辑 设备信息
      handleEdit:function(val){
        this.dialogFormVisible = true;
        this.updateForm = val;
      },
      // 删除设备 单个
      handleDelete:function(row){
        let item = JSON.stringify(row);
        this.$confirm('确认永久删除？')
          .then(res => {
            console.log('确定！')
            delDevice({item}).then(res => {
              console.log('删除成功',this)
              this.reqDeviceList();
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
      // 导入
      clickImport:function(){

      },
      // 导出
      clickExport:function(){
        exportDevice().then(res => {
          console.log('导出成功',res)
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          let url = window.URL.createObjectURL(blob);
          var filename = '设备信息表';
          let link = document.createElement('a')
          console.log("url",url)
          console.log("link",link)
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filename + '.xls')
          document.body.appendChild(link)
          link.click()
        }).catch(err => {
          console.log('导出失败',err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageSize = val;
        this.reqDeviceList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageIndex = val;
        this.reqDeviceList();
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
