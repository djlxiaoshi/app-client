<template>
  <section class="app-register">
    <el-row type="flex" justify="center" align="middle">
      <el-col :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>注册</span>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register" class="register-btn">注册</el-button>
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
        return {
          form: {
            username: '',
            password: '',
            email: ''
          }
        };
      },
      methods: {
        register () {
          this.$http({
            method: 'post',
            url: '/user',
            data: {
              username: this.form.username,
              password: this.form.password,
              email: this.form.email
            },
            hasWarning: true
          }).then(() => {
            this.goToHomePage();
          }, () => {});
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
