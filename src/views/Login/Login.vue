<template>
  <div style="width: 400px" class="t-container">
    <el-card class="box-card" >
      <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="账号密码登录" name="first">
<!--          账号密码登录-->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="username">
              <el-input
                type="text"
                class="username input-public"
                placeholder="请输入账号"
                prefix-icon="el-icon-user"
                v-model="loginForm.username">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                class="password input-public"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="loginForm.password">
              </el-input>
            </el-form-item>
            <el-form-item class="t-code" prop="code">
              <el-input
                type="text"
                class="code input-public"
                placeholder="请输入验证码"
                prefix-icon="el-icon-lock"
                v-model="loginForm.code">
              </el-input>
<!--              <el-form-item required class="code-img">-->
                <img id="img" alt="验证码" :src="Vcode" @click="reqImgCode"/>
<!--              </el-form-item>-->
            </el-form-item>
            <el-checkbox class="input-public" v-model="loginForm.checked">自动登录</el-checkbox>
            <el-button class="input-public login-but"
                       type="primary"
                       :loading="loading"
                       @click.native.prevent="submitForm">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号码登录" name="second">
          <el-form ref="loginPhoneFormRef" :model="loginPhoneForm" :rules="loginPhoneFormRules">
            <el-form-item prop="phone">
              <el-input
                type="text"
                class="input-phone-public"
                placeholder="请输入手机号"
                prefix-icon="el-icon-user"
                v-model="loginPhoneForm.phone">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                type="text"
                class="input-phone-public input-phone-private"
                placeholder="请输入手机验证码"
                prefix-icon="el-icon-user"
                v-model="loginPhoneForm.phoneCode">
              </el-input>
              <el-button class="move" type="primary">获取验证码</el-button>
            </el-form-item>
            <el-checkbox class="input-phone-public" v-model="loginPhoneForm.phoneChecked">自动登录</el-checkbox>
            <el-button class="input-phone-public login-phone-but"
                       type="primary"
                       :loading="loading"
                       @click.native.prevent="submitForm">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="微信扫码登录" name="thred">
          单点登录
<!--          https://www.cnblogs.com/ywlaker/p/6113927.html-->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../network/request'

export default {
  name: 'Login',
  data () {
    return {
      activeName: 'first',
      loading: false,
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: 'admin',
        checked: true
      },
      loginPhoneForm:{
        phone:'15225951720',
        phoneCode:'',
        phoneChecked:true
      },
      loginFormRules: {
        // eslint-disable-next-line no-undef
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loginPhoneFormRules:{
        phone:[
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
        ]
      },
      Vcode:''
    }
  },
  created () {
    this.reqImgCode();
  },
  methods: {
    // 验证码
    reqImgCode:function(){
      request({
        url:'/createImageCode',
        method: 'get'
      }).then(response => {
        // console.log("验证码",response.data.data.img)
        this.Vcode = 'data:image/png;base64,'+response.data.data.img
      }).catch(error =>{
        console.log(error)
      })
    },
    handleClick: function (tab, event) {
      console.log('tab', tab, 'event', event)
    },
    submitForm: function () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(response => {
              this.loading = false
              let code = response.data.code
              if (code == 200) {
                localStorage.setItem('username',this.loginForm.username)
                this.$router.replace({
                  path: '/index'
                  // query: { data: response.data.data }
                })
              } else {
                this.$router.push({
                  path: '/error',
                  query: { message: response.data.message }
                })
              }
            })
            .catch((err) => {
              this.loading = false
              console.log('err', err)
            })
        } else {
          console.log('参数不合法！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .t-container{
    float: right;
    position: relative;
    top: 250px;
    right: 150px;
  }
  .input-public{
    margin-top: 0px;
  }
  .t-code{
    width: 100%;
  }
  .code{
    width: 68%;
    vertical-align: top;
  }
  .login-but{
    width: 100%;
    margin-top: 20px;
  }
  .input-phone-public{
    margin-top: 5px;
  }
  .input-phone-private{
    width: 65%;
  }
  .move:hover{
    background-color: #fff;
    color: #409EFF;
  }
  .login-phone-but{
    width: 100%;
    margin-top: 20px;
  }

</style>
