<template>
  <section class="app-register">
    <el-row type="flex" justify="center" align="middle">
      <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>注册</span>
          </div>
          <div class="card-body">
            <el-form
              ref="form"
              :rules="rules"
              :model="form">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="formValidate" class="register-btn">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="card-footer">
            <span class="login-text">已有账户，直接<span @click="goToLogin" class="go-login">登录</span></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    export default {
      name: 'register',
      data () {

        const checkEmail = (rule, value, callback) => {

          value = value.trim();
          const regexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!regexp.test(value)) {
            callback(new Error('请输入正确的邮箱地址'));
          } else {
            callback();
          }
        };

        const checkEmailExsit = (rule, value, callback) => {
          value = value.trim();
          const { xhrInstance } = this.$http({
            url: '/getUserBy',
            data: {
              userMsg: value,
              getUserMethod: 'USER_EMAIL'
            }
          });

          xhrInstance.then(res => {
            if (res) {
              callback(new Error('邮箱已存在'));
            } else {
              callback();
            }
          });
        };

        return {
          form: {
            username: '',
            password: '',
            email: ''
          },
          rules: {
            username: [
              { required: true, trigger: 'blur', message: '请输入用户名' }
            ],
            password: [
              { required: true, trigger: 'blur', message: '请输入密码' }
            ],
            email: [
              { required: true, trigger: 'blur', message: '请输入邮箱' },
              { trigger: 'blur', validator: checkEmail },
              { trigger: 'blur', validator: checkEmailExsit }
            ]
          }
        };
      },
      methods: {
        register () {
          const { xhrInstance } = this.$http({
            method: 'post',
            url: '/user',
            data: {
              username: this.form.username,
              password: this.form.password,
              email: this.form.email
            },
            showErrorMsg: true
          });

          xhrInstance.then(() => {
            this.goToHomePage();
          }, () => {});
        },
        formValidate () {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.register();
            }
          });
        },
        goToLogin () {
          this.$router.push('/login');
        },
        goToHomePage () {
          this.$router.push('/home');
        }
      }
    };
</script>

<style scoped lang="less">
  .app-register {
    position: relative;
    height: calc(100vh - 100px);
    /deep/ .el-row {
      height: 100%;
    }
    .box-card {
      margin-top: 50px;

      /deep/ .el-form-item {
        .el-input__inner {
          border-radius: 50px;
        }
      }
      .register-btn {
        width: 100%;
        border-radius: 20px;
      }

      .card-footer {
        display: flex;

        .login-text {
          margin-left: auto;
          color: #999;
        }
        .go-login {
          cursor: pointer;
          color: #66b1ff;
        }
      }
    }

  }
</style>
