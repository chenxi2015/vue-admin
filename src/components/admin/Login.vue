<template>
  <div class="login">
    <div class="login-form" style="height: 350px;" :style="formPaddingStyle">
      <el-card class="box-card" style="width: 350px; height: 400px; margin: 0px auto;">
        <div class="logo-sider" style="background: none; color: #333; margin-top: 20px;">
          <img src="../../assets/images/logo.png" style="height: 48px; width: 48px;" alt="" >
          <h2 style="font-weight: 300; font-size: 24px;">某某管理系统</h2>
        </div>
        <div style="padding: 20px;">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="account">
              <el-input type="text" v-model="ruleForm.account" placeholder="请输入账号" auto-complete="off">
                <i slot="prefix" class="iconfont icon-user-o" style="color: #999; padding-left: 4px;"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" auto-complete="off">
                <i slot="prefix" class="iconfont icon-unlock-o" style="color: #999; padding-left: 4px;"></i>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 50px;">
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      }
      callback()
    }
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    formPaddingStyle: function () {
      return {
        'padding-top': (window.innerHeight / 2 - 250) + 'px'
      }
    }
  },
  methods: {
    submitForm (formName) {
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '登录成功！',
            type: 'success',
            duration: 500,
            onClose: function () {
              self.$router.push({path: '/home'})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-card {border: none !important;}
  .login {
    background-image: url(../../assets/images/login-bg.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    height: 100vh;
  }
  .demo-ruleForm {margin-top: 30px;}
</style>
